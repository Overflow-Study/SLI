# sudo apt-get upgrade
# sudo apt-get update

cd SLI_FE
sudo npm install
sudo npm run build

sudo docker stop nginxtest_container
sudo docker rm nginxtest_container

sudo docker build --no-cache --tag nginxtest:sli_Project .
sudo docker run -d -p 3000:80 -p 3443:443 --name nginxtest_container nginxtest:sli_Project
