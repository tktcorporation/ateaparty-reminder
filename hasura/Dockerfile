FROM hasura/graphql-engine:v2.2.2.cli-migrations-v3

RUN apt-get -y update && apt-get -y install curl

COPY ./metadata /hasura-metadata
COPY ./migrations /hasura-migrations
COPY ./seeds /hasura-seeds
