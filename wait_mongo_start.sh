#!/bin/sh

# Start-up script from inside web_1 (web-application) container
# Gary A. Stafford
# https://github.com/garystafford

# great references:
# Docker Networking Made Simple or 3 Ways to Connect LXC Containers
# (https://blog.codecentric.de/en/2014/01/docker-networking-made-simple-3-ways-connect-lxc-containers)
# Docker 101: Dockerizing Your Infrastructure (http://youtu.be/4W2YY-qBla0)

polling_interval=3

echo "wait for mongo to start first..."

# optional, view db_1 container-related env vars
env | grep DB_1 | sort

# wait until mongo is running in db_1 container
until nc -z $DB_1_PORT_27017_TCP_ADDR $DB_1_PORT_27017_TCP_PORT
do
    echo "waiting for $polling_interval seconds..."
    sleep $polling_interval
done

# start node app
grunt serve
