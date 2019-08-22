#!/bin/bash
cd $(dirname $0)

host_dir=$(docker exec -it movie_db_c01 bash -c 'IP=$(hostname -i); echo $IP')
host_dir=$(echo $host_dir | sed -e 's/\n//g')
host_dir=$(echo $host_dir | sed -e 's/\r//g')
docker build -t movie_analyst_api --build-arg DB_HOST=$host_dir ./
docker run --name malyst_apic01 -d movie_analyst_api
echo ""
echo "Movie Anlyst API listening on "
echo $(docker exec -it malyst_apic01 bash -c 'IP=$(hostname -i); echo $IP')
