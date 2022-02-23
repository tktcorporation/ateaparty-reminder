#!/bin/bash

echo "Running entrypoint-dev.sh"

echo "Running npm install"
sudo npm install


SERVICE_NAME=graphql-engine
MAX_ATTEMPTS=10

echo "Waiting for ${SERVICE_NAME} to be ready"
for ((i=1; i <= $MAX_ATTEMPTS; i++)); do
        SLEEP_TIME=$(( 6 * $i ))
        HELTHCHECKTSTATE=$(curl -sSf "http://${SERVICE_NAME}:8080/healthz" || echo "NG")
        echo $HELTHCHECKTSTATE
        if [ "$HELTHCHECKTSTATE" = "OK" ]; then
            echo "ready !!!"
            break
        fi
        sleep $SLEEP_TIME
done;

exec "$@"
