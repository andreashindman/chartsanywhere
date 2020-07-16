# pull most current version of example web site container image
docker pull andreashindman/bbngnclient

# stop and remove current container instance
docker rm -f bbngnc-instance

# run instance of newly-updated container image
docker run -d -p 80:80 --name bbngnc-instance andreashindman/bbngnclient
