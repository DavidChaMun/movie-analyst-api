#!/bin/bash
cd $(dirname $0)
docker build -t movie_analyst_api ./
host=$(docker exec -it movie_db_c01 bash -c 'IP=$(hostname -i); echo $IP')
docker run --name malyst_apic01 -e DB_HOST=$host -d movie_analyst_api
echo ""
echo -n "Movie Anlyst API listening on "
echo -n $(docker exec -it malyst_apic01 bash -c 'IP=$(hostname -i); echo $IP')
