#!/bin/sh

polling_interval=3

echo "wait for db & redis to start first..."

# optional, view db_1 container-related env vars
env | grep DB_1 | sort
evn | grep REDIS_1 | sort

# wait until mongo in db_1 and redis in redis_1
until nc -z $DB_1_PORT_27017_TCP_ADDR $DB_1_PORT_27017_TCP_PORT && nc -z $REDIS_1_PORT_6379_TCP_ADDR $REDIS_1_PORT_6379_TCP_PORT
do
    echo "waiting for $polling_interval seconds..."
    sleep $polling_interval
done

# start node app
grunt serve
