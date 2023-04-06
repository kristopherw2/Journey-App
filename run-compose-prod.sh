#!/bin/sh

# These environment variables come from command line arguments.
# They are consumed by the docker-compose file.
export SECRET_KEY=$1
export DEBUG=$2
export NEW_VERSION=$3
export VITE_BASE_URL=$4
export PARK_API_KEY=$4
export VITE_BASE_URL=$5
#so for our production build any parameters (like api access keys we input here, just like we would with turning DEBUG to False or setting the version to 1.0 we just pass in the access keys.  For every backend view that makes an API call that requires API keys or other secrect variables, spotifly for example requires 2 keys not one to get it working.  Our Nat Parks API only requires 1) 

docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up 