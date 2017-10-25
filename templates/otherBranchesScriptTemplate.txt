#!/bin/bash

cd /home/vagrant/repoFolder

git checkout "${1}"
git reset --hard
git pull

rm -f SingleVoc.ttl
pass=true

errors=""

for fileName in `find . -name '*.ttl'`; do

    #Rapper res=$(rapper -i turtle "${fileName}" -c 2>&1)
  
    #JenaRiot res=$(java -jar /home/vagrant/VoCol/tools/JenaSyntaxValidator.jar "${fileName}" -c 2>&1)

    if echo $res | grep -q "Error"; then
	#echo "\t\033[31mValidation Failed! ${file}\033[0m"
	#echo $res
	#SyntaxValidationReport errors="${errors}<li>${res}</li>"
	pass=false
    else
       #echo "\t\033[32mValidation Passed! ${file}\033[0m"
       rapper -i turtle -o ntriples $fileName > $fileName.nt
    fi
done

cp /home/vagrant/VoCol/templates/otherBranchesHeader.html /home/vagrant/schemaorg/docs/otherBranches/${1}_header.html

sed -i "s/BranchName/${1}/g" /home/vagrant/schemaorg/docs/otherBranches/${1}_header.html

#1SyntaxValidationReport1 fileContent=`cat /home/vagrant/VoCol/templates/otherBranchesSyntaxValidationTemplate.html`

#SyntaxValidationReport fileContent=`cat /home/vagrant/VoCol/templates/syntaxErrorsTemplate.html`

#SyntaxValidationReport result_Content="${fileContent/errors_to_replace/$errors}"

#SyntaxValidationReport echo "${result_Content}" > /home/vagrant/schemaorg/docs/otherBranches/${1}_syntax_validation.html

#Rapper errorFilePath="URI file:///home/vagrant/repoFolder/"

#Rapper errorFilePath="${errorFilePath//\//\\/}"

#Rapper sed -i "s/${errorFilePath}//g" /home/vagrant/schemaorg/docs/otherBranches/${1}_syntax_validation.html

#1SyntaxValidationReport1 sed -i "s/BranchName/${1}/g" /home/vagrant/schemaorg/docs/otherBranches/${1}_syntax_validation.html

if [ "$pass" = false ]; then
	    echo "\033[41mValidation Failed:\033[0m Please fix syntax errors and try again.\n"
	    exit 1
	else 
    
     	    for fileName in `find . -name '*.nt'`; do

	     cat ${fileName} >> SingleVoc.nt
	     
	     rm -f ${fileName}
	    done

	    #java -jar rdf2rdf-1.0.1-2.3.1.jar SingleVoc.nt SingleVoc.ttl

	    rapper -i ntriples -o turtle SingleVoc.nt > SingleVoc.ttl

	    rm -f SingleVoc.nt
  
	    sed -i "s/&/And/g" SingleVoc.ttl

            #SchemaOrg cd /home/vagrant/VoCol
	
	    #OldSchemaOrg java -jar tools/JenaHtmlGenerator.jar ~/repoFolder/SingleVoc.ttl templates/schemasTemplate.html ~/schemaorg/docs/otherBranches/${1}.html templates/template.html ~/schemaorg/data/${1}.rdfa ${1}
            #SchemaOrg java -jar tools/JenaHtmlGenerator.jar /home/vagrant/repoFolder/ templates/schemasTemplate.html /home/vagrant/schemaorg/docs/otherBranches/${1}.html templates/template.html /home/vagrant/schemaorg/data/${1}.rdfa ttl #subdomain${1}

	    #SchemaOrg cd /home/vagrant/schemaorg/data

	    #SchemaOrg iconv -f iso-8859-1 -t utf-8 ${1}.rdfa > ${1}b.rdfa
	    #SchemaOrg rm -f ${1}.rdfa

	    #1SchemaOrg1 sed -i "s/BranchName/${1}/g" /home/vagrant/schemaorg/docs/otherBranches/${1}_syntax_validation.html

	    #Widoco cd /home/vagrant/VoCol/tools

            #Widoco java -jar widoco-0.0.1-jar-with-dependencies.jar -ontFile /home/vagrant/repoFolder/SingleVoc.ttl -outFolder /home/vagrant/schemaorg/docs/otherBranches/${1}/ -confFile /home/vagrant/schemaorg/docs/Widoco/JAR/config/config.properties -rewriteAll
	    
	    #Widoco cp /home/vagrant/VoCol/templates/widocoTemplate.html /home/vagrant/schemaorg/docs/otherBranches/${1}/index.html

	    #1Widoco1 sed -i "s/BranchName/${1}/g" /home/vagrant/schemaorg/docs/otherBranches/${1}/index.html

	    cd /home/vagrant/VoCol
	    node otherBranchesHelper.js "${1}"

	fi



