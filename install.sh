#!/bin/bash


echo fuck you
if [[ -d "/usr/bin/python3" ]]; then
    sudo apt update
    sudo apt upgrade
    sudo apt install Python
    sudo apt install php
    python3 -m pip install websocket-client
    python3 -m pip install simple_http_server
fi
python3 -m http.server