#!/bin/bash

until docker exec -it $1 mongo --eval "print(\"MongoDB is up\")"
do
sleep 1
done
