sudo apt-get update
sudo apt-get upgrade

cd Desktop/sli_node/SLI_FE

sudo docker stop nginxtest_container
docker rm nginxtest_container

docker build --no-cache --tag nginxtest:sli_Project .
docker run -d -p 3000:80 -p 3443:443 --name nginxtest_container nginxtest:sli_Project
