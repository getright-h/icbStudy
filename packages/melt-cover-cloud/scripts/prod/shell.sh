#/usr/bin
version="1.6.5";
imageName="melt-cover-cloud-release";
cd ../..
# yarn
# yarn build-dev
echo "--> clean cache"
sudo  yarn cache clean
sudo rm -rf node_modules

echo "--> yarn  install && build"
sudo yarn install && sudo yarn build

echo "--> copy files···"
sudo cp -rf Dockerfile  ./dist

cd ./dist
ls

echo "--> docker build"
sudo docker build -t web/"$imageName":"$version" .
sudo docker tag web/"$imageName":"$version" docker.local61:5000/web/"$imageName":"$version"
sudo docker push docker.local61:5000/web/"$imageName":"$version"
sudo docker rmi web/"$imageName":"$version"


# sudo docker build -t web/"$imageName":"$version" .
# sudo docker tag web/"$imageName":"$version" registry.docker.icb:5000/web/"$imageName":"$version"
# sudo docker push registry.docker.icb:5000/web/"$imageName":"$version"
# sudo docker rmi web/"$imageName":"$version"