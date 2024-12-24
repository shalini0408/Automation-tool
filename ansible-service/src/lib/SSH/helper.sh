#!/bin/bash

IFS=','
i=1;
for element in "$@" 
do
    read -ra arr <<< "$element"

    sshpass -p ${arr[0]} ssh-copy-id -i "$HOME/.ssh/id_rsa.pub" -o StrictHostKeyChecking=no ConnectTimeout=10 ${arr[1]}@${arr[2]}
    
    i=$((i + 1));
done