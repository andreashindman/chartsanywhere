# push the most recently-built container image to Docker Hub
docker build -t andreashindman/bbngnclient .
docker push andreashindman/bbngnclient

# execute the upgrade-server.sh script on server
# the -oStrictHostKeyChecking=no skips the prompt
# about adding the host to the list of known hosts
# so that this script doesn't get interrupted if the
# server's IP/hostname is new to us
ssh -oStrictHostKeyChecking=no root@157.230.138.90 'bash -s' < upgrade-server.sh
