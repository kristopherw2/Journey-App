# run-compose-dev.sh
#!/bin/bash

# These environment variables are consumed by the docker-compose file.
export SECRET_KEY=abc123
export DEBUG=True
export PARK_API_KEY=$1

docker-compose -f docker-compose.dev.yml up --build