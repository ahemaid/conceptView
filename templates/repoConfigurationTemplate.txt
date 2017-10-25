#!/bin/bash
#

repository=repositoryParam
server=serverParam
user=userParam
password=passwordParam

clientHooks="clientHooksParam"
webHook="webHookParam"
turtleEditor="turtleEditorParam"

repoNameOnly="repoNameOnlyParam"

#GitLab repositoryNamespace=${repository:19}
#GitLab repositoryService="GitLab"

#BitBucket repositoryNamespace=${repository:22}
#BitBucket repositoryService="BitBucket"

#GitHub fullRepositoryURL="${repository}.git"
#GitHub repositoryService="GitHub"

#GitLab fullRepositoryURL="${repository}.git"

#BitBucket fullRepositoryURL=https://bitbucket.org/"${repositoryNamespace}".git

removeHistory=false

echo "${repository:0:8}${user}:${password}@${repository:8}.git"

cd /home/vagrant/
source .nvm/nvm.sh

if [ -d "repoFolder" ]; then

cd repoFolder

localRepository=$(git ls-remote --get-url)

 if [ "$localRepository" = "$fullRepositoryURL" ] || [ "$localRepository" = "${repository:0:8}${user}:${password}@${repository:8}.git" ]; then
    git checkout branchNameParam
    git reset --hard
    git pull 
 else
    cd ..
    rm -r -f repoFolder
    git clone "${repository:0:8}${user}:${password}@${repository:8}.git" repoFolder
    cd repoFolder
    removeHistory=true
 fi
 else 
    git clone "${repository:0:8}${user}:${password}@${repository:8}.git" repoFolder 
    cd repoFolder
    removeHistory=true 
fi


if [ ! -d "VoColClient" ]; then
 git rm -r -f VoColClient
fi


if [ "$clientHooks" == "clientHooksChecked" ]; then

mkdir -p /home/vagrant/repoFolder/VoColClient

cp -r /home/vagrant/VoColClient/Hooks /home/vagrant/repoFolder/VoColClient

cd /home/vagrant/repoFolder/VoColClient/Hooks

serverURL="${server//\//\\/}"

sed -i "s/ServerURL/${serverURL}/g" pre-commit

git config user.email "${user}@vocol.com" 
git config user.name ${user}

git add .

git commit -m "configuration of repository"

#GitHub git push "${repository:0:8}${user}:${password}@${repository:8}.git"

#GitLab git push https://${user}:${password}@gitlab.com/"${repositoryNamespace}".git master

#BitBucket git push https://${user}:${password}@bitbucket.org/"${repositoryNamespace}".git

cd /home/vagrant/VoCol
fuser -k 3002/tcp
node clientServices.js "validationTool" "consistencyChecking" "constraintChecking" "formatting" &

fi


rm -rf /home/vagrant/schemaorg/docs/TurtleEditor

if [ "$turtleEditor" == "turtleEditorChecked" ] && [ "$repositoryService" == "GitHub" ]; then

#if [ "$turtleEditor" == "turtleEditorChecked" ] ; then

cp -r /home/vagrant/VoColClient/TurtleEditor /home/vagrant/schemaorg/docs/TurtleEditor

cd /home/vagrant/schemaorg/docs/TurtleEditor

turtleEditorURL="${user}\/${repoNameOnly}"

sed -i "s/TurtleEditorURL/${turtleEditorURL}/g" github-ttl-editor.html

sed -i "s/TurtleEditorURL/${turtleEditorURL}/g" README.md

sed -i "s/user_to_replace/${user}/g" js/turtle-editor.js

sed -i "s/repo_to_replace/${repoNameOnly}/g" js/turtle-editor.js

cp /home/vagrant/VoCol/templates/turtleEditorTemplate.html /home/vagrant/schemaorg/docs/TurtleEditor/turtle-editor.html


fi



if [ "$webHook" == "webHookChecked" ]; then

 echo ""
 
 #GitHub curl -u "${user}:${password}" -i  https://api.github.com/hub -F "hub.mode=subscribe"  -F "hub.topic=${repository}/events/push.json"  -F "hub.callback=${server}/push"

 #GitLab res=$(curl https://gitlab.com/api/v3/session --data "login=${user}&password=${password}")

 #GitLab private_token=""

 #GitLab temp=`echo $res | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="private_token" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w private_token`
 #GitLab   private_token=${temp##*|}

 #GitLab repositoryNamespaceReplaced="${repositoryNamespace/\//%2F}"

 #GitLab curl --header "PRIVATE-TOKEN: ${private_token}" -H "Accept: application/json" -H "Content-type: application/json" -X POST -d "{ \"id\": \"${repositoryNamespace}\", \"url\": \"${server}/push\", \"push_events\": \"true\"}" https://gitlab.com/api/v3/projects/"${repositoryNamespaceReplaced}"/hooks 

 #BitBucket curl -v -H "Content-Type: application/json" -X POST --data "{\"description\": \"VoCol\", \"url\": \"${server}/push\", \"active\": true, \"events\": [  \"repo:push\",  \"issue:created\", \"issue:updated\" ] }" https://${user}:${password}@api.bitbucket.org/2.0/repositories/${repositoryNamespace}/hooks

fi


cd /home/vagrant/VoCol
fuser -k 3001/tcp
node webHookListener.js &

#Evolution cp /home/vagrant/VoCol/templates/evolutionTemplate.html /home/vagrant/schemaorg/docs/evolution.html 
#Evolution rm /home/vagrant/VoCol/evolution/SingleVoc.ttl
#Evolution echo -n "[]" > /home/vagrant/schemaorg/docs/data.json

#Evolution if [ "$removeHistory" = true ]; then

#Evolution cp /home/vagrant/VoCol/templates/evolutionTemplate.html /home/vagrant/schemaorg/docs/evolution.html 
#Evolution rm /home/vagrant/VoCol/evolution/SingleVoc.ttl
#Evolution echo -n "[]" > /home/vagrant/schemaorg/docs/data.json

#Evolution fi

rm -rf /home/vagrant/schemaorg/docs/otherBranches/*
echo -n "[]" > /home/vagrant/schemaorg/docs/otherBranches.json

rm -rf /home/vagrant/schemaorg/data/*
cp /home/vagrant/VoCol/templates/init.rdfa /home/vagrant/schemaorg/data/init.rdfa

cp /home/vagrant/VoCol/templates/schemasTemplate.html /home/vagrant/schemaorg/docs/schemas.html
sed -i "s/\$li//g" /home/vagrant/schemaorg/docs/schemas.html

rm -f /home/vagrant/schemaorg/docs/webvowl/js/data/SingleVoc.json

cd /home/vagrant/fuseki/apache-jena-fuseki-2.3.0/
rm run/system/tdb.lock
./fuseki-server --mem /myDataset &

rm -rf /home/vagrant/VoCol/serializations/*

cd /home/vagrant/VoCol
bash mainBranchScript.sh "" branchNameParam

#echo "" > repoConfiguration.sh

fuser -k 3000/tcp

mv /home/vagrant/schemaorg/docs/configuration_page.html /home/vagrant/VoCol/configuration_page.html
