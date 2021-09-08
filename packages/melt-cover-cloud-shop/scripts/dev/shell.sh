#/usr/bin
# 当前镜像版本号
version="1.0.1";
# 镜像名
imageName="melt-cover-cloud-shop";
containerName="melt-cover-cloud-shop";
# jenkins服务器开放的的前端访问端口
port="5222";
# 镜像中server暴露的端口号
exposePort="9527";

echo "--> yarn install"
cd ..
sudo yarn install && sudo yarn build:dev

echo "--> copy files shell.dev.sh"
sudo cp -rf Dockerfile ./dist
cd ./dist

echo "--> docker build"
sudo docker build -t "$imageName":"$version" .
sudo docker rm -f "$containerName" || echo 'continue'
sudo docker run -d -p "$port":"$exposePort" --privileged --restart=always --name "$containerName" "$imageName":"$version"