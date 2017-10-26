var express = require('express');

var http = require('http');
var path = require('path');
var fs = require('fs');

var spawn = require('child_process').spawn;

var repositoryService='#repositoryServiceChecked';
var repositoryNameParam='#repositoryNameParam';
var branchNameParam='#branchNameParam';
var otherBranchesParam='#otherBranchesParam'

// Bootstrap Express
var app = express();

var port = 3001;

app.set('port', port);

var server = http.createServer(app).listen(port, function(){
  console.log('WebHookListener running at http://localhost:' + port);
});

server.on('request', function(req, res) {
  req.setEncoding('utf8');
  req.on('data', function (chunk) {
    console.log('event received');
    
   // console.log(chunk);

try {

    var data = JSON.parse(chunk);

    //console.log(chunk);

    var repositoryName="";
    var branchName="";
    var commitMessage ="";

    if(repositoryService==='gitHubChecked'){
      repositoryName = data.repository.html_url;
      branchName=data.ref.split('/')[2];
      commitMessage=data.head_commit.message;
    }
    else if(repositoryService==='gitLabChecked'){
      repositoryName = data.repository.homepage;
      branchName=data.ref;
      commitMessage=data.commits[0].message;
    }
    else if(repositoryService==='bitBucketChecked'){
       repositoryName = data.repository.links.html.href;
       branchName=data.push.changes[0].old.name;
       commitMessage=data.push.changes[0].new.target.message;
    }
    else {
       repositoryName = repositoryNameParam;
       branchName=data.refChanges[0].refId.split('/')[2];
       commitMessage=data.changesets.values[0].toCommit.message;
    }

    //console.log(repositoryName);

    if(branchName.includes(branchNameParam) && repositoryNameParam===repositoryName && !commitMessage.includes("merge")){
        console.log('contains');

        commitMessage = commitMessage.replace(/\n/g,'');

        spawn('./mainBranchScript.sh', [commitMessage, branchNameParam]);

    }

    else if((repositoryNameParam===repositoryName) && branchName !== "" && otherBranchesParam==="otherBranchesChecked"){
        console.log('other branch');

        spawn('./otherBranchesScript.sh', [branchName]);

    }


}
catch (e) {

    console.log("error:");
    console.log(e);
}


  });
});
