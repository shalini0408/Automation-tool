FROM ubuntu:20.04

USER root
ENV DEBIAN_FRONTEND=noninteractive

# ansible installation
RUN apt-get update && \
    apt-get install -y gcc python-dev libkrb5-dev && \
    apt-get install python3-pip -y && \
    pip3 install --upgrade pip && \
    pip3 install --upgrade virtualenv && \
    pip3 install pywinrm[kerberos] && \
    apt install krb5-user -y && \ 
    pip3 install pywinrm && \
    pip3 install ansible

# nodejs and npm
ENV NODE_VERSION=16.13.0
RUN apt install -y curl && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION} && \
    . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION} && \
    . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN npm install -g npm@8.1.4

# ssh realated stuff
RUN apt install openssh-server -y
RUN apt install sshpass -y
RUN ssh-keygen -t rsa -q -f "$HOME/.ssh/id_rsa" -N ""

#ansible configuration
RUN mkdir -p /etc/ansible && \
    printf "[defaults]\nstdout_callback = json\nhost_key_checking = False" > /etc/ansible/ansible.cfg

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

RUN chmod +x /app/src/utils/cli/inventory.js
RUN chmod +x /app/src/lib/SSH/helper.sh

CMD [ "npm", "start" ]