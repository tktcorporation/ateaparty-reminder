FROM hasura/graphql-engine:v2.1.1.cli-migrations-v3

RUN apt-get update -y && apt-get install -y curl socat
# RUN curl -L -o /usr/local/bin/hasura https://github.com/hasura/graphql-engine/releases/download/v2.0.0-beta.2/cli-hasura-linux-amd64
# RUN chmod +x /usr/local/bin/hasura
# RUN hasura update-cli --version v2.1.0-beta.3

WORKDIR /usr/src/hasura

# COPY . .

# RUN chmod +x ./start.sh

CMD "./start.sh"