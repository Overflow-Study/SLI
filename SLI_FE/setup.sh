sudo apt-get upgrade
sudo apt-get update

sudo docker stop nginxtest_container
sudo docker rm nginxtest_container
cd Desktop/sli_node/SLI_FE
sudo docker build --no-cache --tag nginxtest:sli_Project .
sudo docker run -d -p 3000:80 -p 3443:443 --name nginxtest_container nginxtest:sli_Project
