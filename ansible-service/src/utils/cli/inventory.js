#!/root/.nvm/versions/node/v16.13.0/bin//node
const axios = require("axios");

const toList = process.argv.indexOf("--list") != -1 ? true : false;

function parseUsernameIPPairs(labDoc) {
  return labDoc.systems.map((system) => {
    return system.userName + "@" + system.ipAddress;
  })
}

function findSystemWithId(labDoc, systemId) {
  const system = labDoc.systems.find((system) => system._id == systemId)

  return [ system.userName + '@' + system.ipAddress ];
}

if (!toList) {
  console.log("usage: inventory.js [--list]");
  process.exit(0);
}

async function listSystems(labId, systemId) {
  const labDoc = await axios
    .get(`http://system-manager-srv:5000/api/labs/${labId}`)
    .then((res) => {
      return res.data;
    });

  

  const groups = {
    _meta: {
      host_vars: {
        current: {},
      },
    },
    current: {
      hosts: systemId ? findSystemWithId(labDoc, systemId): parseUsernameIPPairs(labDoc),
      vars: {
        ansible_user: "root",
      },
    },
  };

  return JSON.stringify(groups);
}

listSystems(process.env.LAB_ID, process.env.SYSTEM_ID).then((groups) => {
  console.log(groups);
  process.exit(0);
});
