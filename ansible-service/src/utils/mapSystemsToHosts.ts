export function mapSystemToHosts(hosts: any[], systems: any[]) {
  let results: any[] = [];

  for (const system of systems) {
    // @ts-ignore
    const success = typeof hosts[system.userName + '@' + system.ipAddress].ping != 'undefined' ? true : false;

    const result = {
      _id: system._id,
      success
    }

    results.push(result);
  }

  return results;
}