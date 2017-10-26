var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));

// check if the userConfigurations file is exist
// for the first time of app running
var path = "jsonDataFiles/userConfigurations.json";
fs.exists(path, function(exists) {
  if(exists){
    jsonfile.readFile(filepath, function(err, obj)  {
      if (err)
        console.log(err);  
      }
  }


app.post('/configuration', function(req, res) {

   console.log('Configuration Data Received.');
   // to which repository the user is entered
   var contents = fs.readFileSync('templates/webHookListenerTemplate.txt', 'utf8');

   var repository = req.body.repository.split(".git");


   var repositoryService = '';

   if(repository[0].includes('github')){
        repositoryService = 'gitHubChecked';
   }
   else if(repository[0].includes('gitlab')){
	repositoryService = 'gitLabChecked';
   }
   else if(repository[0].includes('bitbucket')){
	repositoryService = 'bitBucketChecked';
   }

   contents = contents.replace('#repositoryNameParam', repository[0]);

   contents = contents.replace('#repositoryServiceChecked', repositoryService);

   contents = contents.replace('#branchNameParam', req.body.branchName);

   contents = contents.replace('#otherBranchesParam', req.body.otherBranches);

   fs.writeFile("webHookListener.js", contents, function(err) {
        if(err) {
            return console.log(err);
        }
   });

   console.log('File webHookApp.js saved.');

  //Write title

   contents = req.body.vocabularyName;

   fs.writeFile("/home/vagrant/schemaorg/docs/title.html", contents, function(err) {
        if(err) {
            return console.log(err);
        }
   });

   console.log('File title.html saved.');

 // 
 // //HeaderTemplate.html
 //   contents = fs.readFileSync('templates/baseHeader.html', 'utf8');
 //
 //   var documentationGeneration = req.body.documentationGeneration;
 //
 //   if(req.body.turtleEditor ==='turtleEditorChecked' && repository[0].includes('github')){
 //        contents = contents.replace('<!--TurtleEditor', "");
 //        contents = contents.replace('TurtleEditor-->', "");
 //   }
 //
 //   if(documentationGeneration==='schemaOrgChecked'){
 //        contents = contents.replace('<!--Schema', "");
 //        contents = contents.replace('Schema-->', "");
 //   }
 //   else if(documentationGeneration==='widocoChecked'){
 //        contents = contents.replace('<!--Widoco', "");
 //        contents = contents.replace('Widoco-->', "");
 //   }
 //
 //   if(req.body.visualization==='visualizationChecked'){
 //        contents = contents.replace('<!--Visualization', "");
 //        contents = contents.replace('Visualization-->', "");
 //        contents = contents.replace('<!--Visualization', "");
 //        contents = contents.replace('Visualization-->', "");
 //
 //   }
 //
 //   if(req.body.syntaxValidationReport==='syntaxValidationReportChecked'){
 //        contents = contents.replace('<!--SyntaxValidation', "");
 //        contents = contents.replace('SyntaxValidation-->', "");
 //   }
 //
 //   if(req.body.sparqlEndPoint==='sparqlEndPointChecked'){
 //        contents = contents.replace('<!--Sparql', "");
 //        contents = contents.replace('Sparql-->', "");
 //   }
 //
 //   if(req.body.evolutionReport ==='evolutionReportChecked'){
 //        contents = contents.replace('<!--Evolution', "");
 //        contents = contents.replace('Evolution-->', "");
 //   }
 //
 //   if(req.body.otherBranches ==='otherBranchesChecked'){
 //        contents = contents.replace('<!--OtherBranches', "");
 //        contents = contents.replace('OtherBranches-->', "");
 //   }
 //
 //   fs.writeFile("/home/vagrant/schemaorg/docs/header.html", contents, function(err) {
 //        if(err) {
 //            return console.log(err);
 //        }
 //   });
 //
 //
 //   console.log('File header.html saved.');

//otherBranchesHeader.html
  contents = fs.readFileSync('templates/baseOtherBranchesHeader.html', 'utf8');

  if(documentationGeneration==='schemaOrgChecked'){
        contents = contents.replace('<!--Schema', "");
        contents = contents.replace('Schema-->', "");
   }
   else if(documentationGeneration==='widocoChecked'){
        contents = contents.replace('<!--Widoco', "");
        contents = contents.replace('Widoco-->', "");
   }

   if(req.body.syntaxValidationReport==='syntaxValidationReportChecked'){
        contents = contents.replace('<!--SyntaxValidation', "");
        contents = contents.replace('SyntaxValidation-->', "");
   }


   fs.writeFile("templates/otherBranchesHeader.html", contents, function(err) {
        if(err) {
            return console.log(err);
        }
   });


   console.log('File otherBranchesHeader.html saved.');


   contents = fs.readFileSync('templates/syntaxErrorsTemplate.html', 'utf8');

   contents = contents.replace('errors_to_replace', "");

   fs.writeFile("/home/vagrant/schemaorg/docs/syntax_validation.html", contents, function(err) {
        if(err) {
            return console.log(err);
        }
   });

   console.log('File syntax_validation.html saved.');


   contents = fs.readFileSync('templates/mainBranchScriptTemplate.txt', 'utf8');

   var documentationGeneration = req.body.documentationGeneration;


   var subdomain = '';
   var subParts = req.body.server.split('/');

   if(subParts.length > 3) {
    for (var i = 3; i < subParts.length; i++) {
     subdomain += subParts[i] +'/';
     }
   }

   contents = contents.replace(/#subdomain/, subdomain);


   if(documentationGeneration==='schemaOrgChecked'){
        contents = contents.replace(/#SchemaOrg/g, "");
   }
   else if(documentationGeneration==='widocoChecked'){
        contents = contents.replace(/#Widoco/g, "");
   }

   if(req.body.visualization==='visualizationChecked'){
        contents = contents.replace(/#Visualization/g, "");
   }

   if(req.body.sparqlEndPoint==='sparqlEndPointChecked'){
        contents = contents.replace(/#Sparql/g, "");
   }

   if(req.body.syntaxValidationReport==='syntaxValidationReportChecked'){
        contents = contents.replace(/#SyntaxValidationReport/g, "");
   }

   if(req.body.evolutionReport==='evolutionReportChecked'){
        contents = contents.replace(/#Evolution/g, "");
   }

   if(req.body.rdfxml==='rdfxmlChecked'){
        contents = contents.replace(/#RdfXml/g, "");
   }

   if(req.body.ntriples==='ntriplesChecked'){
        contents = contents.replace(/#Ntriples/g, "");
   }
   if(req.body.predefinedQueries==='predefinedQueriesChecked'){
        contents = contents.replace(/#PredefinedQueries/g, "");
   }

   var syntaxValidation = req.body.syntaxValidation;

   if(syntaxValidation==='rapperChecked'){
        contents = contents.replace(/#Rapper/g, "");
   }
   else if(syntaxValidation==='jenaRiotChecked'){
        contents = contents.replace(/#JenaRiot/g, "");
   }

   fs.writeFile("mainBranchScript.sh", contents, function(err) {
        if(err) {
            return console.log(err);
        }
   });

   console.log('File webHookScript.sh saved.');

   contents = fs.readFileSync('templates/otherBranchesScriptTemplate.txt', 'utf8');

   contents = contents.replace(/#subdomain/, subdomain+'/');

   var documentationGeneration = req.body.documentationGeneration;

   if(documentationGeneration==='schemaOrgChecked'){
        contents = contents.replace(/#SchemaOrg/g, "");
   }
   else if(documentationGeneration==='widocoChecked'){
        contents = contents.replace(/#Widoco/g, "");
   }

   if(req.body.syntaxValidationReport==='syntaxValidationReportChecked'){
        contents = contents.replace(/#SyntaxValidationReport/g, "");
   }

   var syntaxValidation = req.body.syntaxValidation;

   if(syntaxValidation==='rapperChecked'){
        contents = contents.replace(/#Rapper/g, "");
   }

   else if(syntaxValidation==='jenaRiotChecked'){
        contents = contents.replace(/#JenaRiot/g, "");
   }

   fs.writeFile("otherBranchesScript.sh", contents, function(err) {
        if(err) {
            return console.log(err);
        }
   });

   console.log('File otherBranchesScript.sh saved.');


   contents = fs.readFileSync('templates/homepageTemplate.txt', 'utf8');

   var documentationGeneration = req.body.documentationGeneration;

   contents = contents.replace('<title> </title>', '<title>'+req.body.vocabularyName+'</title>');

   contents = contents.replace('<div> </div>', req.body.homepageContent);

   fs.writeFile("/home/vagrant/schemaorg/templates/homepage.tpl", contents, function(err) {
        if(err) {
            return console.log(err);
        }
   });

   console.log('File homepage.tpl saved.');



   var contents = fs.readFileSync('templates/templateConfiguration_Page.html', 'utf8');

contents = contents.replace('VocabularyNameVal', req.body.vocabularyName);

contents = contents.replace('DomainNameVal', req.body.server);

contents = contents.replace('RepositoryVal', req.body.repository);

contents = contents.replace('BranchNameVal', req.body.branchName);

contents = contents.replace('UserVal', req.body.user);


if(req.body.clientHooks==='clientHooksChecked'){
  contents = contents.replace('ClientSideVal', 'checked');
}
else {
  contents = contents.replace('ClientSideVal', '');
}

if(req.body.formatting==='formattingChecked'){
  contents = contents.replace('FormattingVal', 'checked');
}
else {
  contents = contents.replace('FormattingVal', '');
}

if(req.body.webHook==='webHookChecked'){
  contents = contents.replace('WebHookVal', 'checked');
}
else {
  contents = contents.replace('WebHookVal', '');
}

if(req.body.turtleEditor==='turtleEditorChecked'){
  contents = contents.replace('TurtleEditorVal', 'checked');
}
else {
  contents = contents.replace('TurtleEditorVal', '');
}

if(req.body.syntaxValidation==='rapperChecked'){
  contents = contents.replace('SyntaxValidationRapperVal', 'checked');
  contents = contents.replace('SyntaxValidationJenaRiotVal', '');
}
else {
  contents = contents.replace('SyntaxValidationRapperVal', '');
  contents = contents.replace('SyntaxValidationJenaRiotVal', 'checked');
}

if(req.body.documentationGeneration==='schemaOrgChecked'){
  contents = contents.replace('DocumentationGenerationSchemaOrgVal', 'checked');
  contents = contents.replace('DocumentationGenerationWidocoVal', '');
}
else {
  contents = contents.replace('DocumentationGenerationWidocoVal', 'checked');
  contents = contents.replace('DocumentationGenerationSchemaOrgVal', '');
}

if(req.body.visualization==='visualizationChecked'){
  contents = contents.replace('VisualizationVal', 'checked');
}
else {
  contents = contents.replace('VisualizationVal', '');
}

if(req.body.sparqlEndPoint==='sparqlEndPointChecked'){
  contents = contents.replace('SpaqlEndPointVal', 'checked');
}
else {
  contents = contents.replace('SpaqlEndPointVal', '');
}

if(req.body.syntaxValidationReport==='syntaxValidationReportChecked'){
  contents = contents.replace('SyntaxValidationReportVal', 'checked');
}
else {
  contents = contents.replace('SyntaxValidationReportVal', '');
}

if(req.body.evolutionReport==='evolutionReportChecked'){
  contents = contents.replace('SchemaEvolutionReportVal', 'checked');
}
else {
  contents = contents.replace('SchemaEvolutionReportVal', '');
}

if(req.body.otherBranches==='otherBranchesChecked'){
  contents = contents.replace('OtherBranchesVal', 'checked');
}
else {
  contents = contents.replace('OtherBranchesVal', '');
}

if(req.body.ntriples==='ntriplesChecked'){
  contents = contents.replace('NTriplesVal', 'checked');
}
else {
  contents = contents.replace('NTriplesVal', '');
}

if(req.body.rdfxml==='rdfxmlChecked'){
  contents = contents.replace('RdfXMLVal', 'checked');
}
else {
  contents = contents.replace('RdfXMLVal', '');
}

if(req.body.predefinedQueries==='predefinedQueriesChecked'){
  contents = contents.replace('PredefinedQueriesVal', 'checked');
}
else {
  contents = contents.replace('PredefinedQueriesVal', '');
}


contents = contents.replace('HomepageContentVal', req.body.homepageContent);

   fs.writeFile("/home/vagrant/schemaorg/docs/configuration_page.html", contents, function(err) {
        if(err) {
            return console.log(err);
        }
   });

   console.log('File configuration_page.html saved.');


   //startup.sh
   contents = fs.readFileSync('templates/startupTemplate.txt', 'utf8');

   var syntaxValidation = req.body.syntaxValidation;

   if(req.body.clientHooks==='clientHooksChecked'){

     contents = contents.replace(/#ClientServices/g, '');

     contents = contents.replace(/validationTool/g, req.body.syntaxValidation);

     contents = contents.replace(/formatting/g, req.body.formatting);

   }

   fs.writeFile("/home/vagrant/startup.sh", contents, function(err) {
        if(err) {
            return console.log(err);
        }
   });

   console.log('File startup.sh saved.');


   //qonsole-config.js
   contents = fs.readFileSync('templates/templateQonsole-config.js', 'utf8');


       var exampleQueries = `

      { "name": "Selection of triples",
        "query": "SELECT ?subject ?predicate ?object\\nWHERE { " +
                 "  ?subject ?predicate ?object\\n}\\n" +
                 "LIMIT 25"
      },
      { "name": "Selection of classes",
        "query": "SELECT DISTINCT ?class ?label ?description\\nWHERE {\\n" +
                 "  ?class a owl:Class.\\n" +
                 "  OPTIONAL { ?class rdfs:label ?label}\\n" +
                 "  OPTIONAL { ?class rdfs:comment ?description}\\n}\\n" +
                 "LIMIT 25",
        "prefixes": ["owl", "rdfs"]
      }

  `;

     contents = contents.replace('#PredefinedQueries', exampleQueries);


   fs.writeFile("/home/vagrant/fuseki/apache-jena-fuseki-2.3.0/webapp/js/app/qonsole-config.js", contents, function(err) {
        if(err) {
            return console.log(err);
        }
   });

   console.log('File qonsole-config.js saved.');



  //repoConfiguration.sh
   contents = fs.readFileSync('templates/repoConfigurationTemplate.txt', 'utf8');

   contents = contents.replace('repositoryParam', repository[0]);
   contents = contents.replace('serverParam', req.body.server);
   contents = contents.replace('userParam', req.body.user);
   contents = contents.replace('passwordParam', req.body.password);

   contents = contents.replace('clientHooksParam', req.body.clientHooks);
   contents = contents.replace('webHookParam', req.body.webHook);
   contents = contents.replace('turtleEditorParam', req.body.turtleEditor);

   contents = contents.replace('repoNameOnlyParam', repository[0].split("/")[4]);

   contents = contents.replace(/branchNameParam/g, req.body.branchName);

   contents = contents.replace(/validationTool/g, req.body.syntaxValidation);

   contents = contents.replace(/formatting/g, req.body.formatting);

   if(repositoryService==='gitHubChecked'){
        contents = contents.replace(/#GitHub/g, "");
   }
   else if(repositoryService==='gitLabChecked'){
        contents = contents.replace(/#GitLab/g, "");
   }
   else if(repositoryService==='bitBucketChecked'){
        contents = contents.replace(/#BitBucket/g, "");
   }

   if(req.body.evolutionReport==='evolutionReportChecked'){
        contents = contents.replace(/#Evolution/g, "");
   }

   fs.writeFile("repoConfiguration.sh", contents, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log('File repoConfiguration.sh saved.');

        var execFile = require('child_process').execFile;

        execFile('./repoConfiguration.sh', function(error, stdout, stderr) {
          console.log( 'exec complete' );
        });

    });


   contents = fs.readFileSync('templates/configurationResponseTemplate.html', 'utf8');

   contents = contents.replace(/VocabularyName/g, req.body.vocabularyName);

   contents = contents.replace('response_to_replace', 'Configuration settings received successfully. \n Repository started configuring. Please check it after few moments.\n <a href=\'/docs/configuration_page.html\'>Back</a>');

   res.send(contents);

});

app.listen(3000, function() {
  console.log('Server running at http://127.0.0.1:3000/');
});
