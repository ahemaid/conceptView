
        var express = require('express');
        var router = express.Router();
        //global.__dirname = process.execPath.substr(0,process.execPath.lastIndexOf('/'));
        var path = require('path');

        //var homedir ='../SimpleSparqlQuery'; 
        //__dirname;+'/../SimpleSparqlQuery' ;
        //global.__dirname = process.execPath.substr(0,process.execPath.lastIndexOf('/'));

        const fs = require('fs');
        //var files = fs.readdirSync(homedir);
        //var cmd=require('node-cmd');


        /* Execute a command line. */
        router.get('/', function(req, res) {


        var jsonData = '';
        fs.readFile('./results.json', 'utf8', function (err, data) {
        if(err) throw err;
       // console.log("this is vars  "+data);
        // console.log("data  "+data);
  /*          var obj=JSON.stringify(JSON.parse(data));
            var array = Object.keys(obj)
             for (var i = 0; i < array.length; i++) {
        console.log(array[i], obj[array[i]]);
    }*/
            //console.log("data  "+content);
            console.log(data.files);
//        for (var i = 0; i < content.length; i++) {
//          var results = data.files[i].Concepts;
//          for (var j = 0; j < results.length; j++) {
//            var concept = results[j];
//            var rdfType = concept.rdfType;
//            console.log("rdfType  "+rdfType);
            //var duration = concept.duration.text;
           // var from = origins[i];
            //var to = destinations[j];
          //}
        //}

/*            Object.keys(content).forEach(function(prop) {
  // `prop` is the property name
  // `data[prop]` is the property value
                        console.log("this is vars  "+data[prop]);
    
});*/
/*        for (const prop in data) {
            // `prop` contains the name of each property, i.e. `'code'` or `'items'`
            // consequently, `data[prop]` refers to the value of each property, i.e.
            // either `42` or the array
            console.log("this is vars  "+data[0]);

        }  */       //   console.log(data["files"]["concepts"]["label"]);
//        var origins  = data.files;
//        console.log("origins  "+origins);
//        if (typeof origins !== "undefined") {
//        for (var i = 0; i < origins.length; i++) {
//          var results = data.files[i].Concepts;
//          for (var j = 0; j < results.length; j++) {
//            var concept = results[j];
//            var rdfType = concept.rdfType;
//            console.log("rdfType  "+rdfType);
            //var duration = concept.duration.text;
           // var from = origins[i];
            //var to = destinations[j];
          //}
        //}
   // }
       // console.log("this is vars  "+data.files[2].Concepts[2]['firstName']);

        });

        /*var rawdata = fs.readFileSync('results.json', 'utf8');  
        var data=JSON.parse(rawdata);

        var content = rawdata; 
        console.log("this is vars  "+content.files );

       for(var index=0 ;index<content.files.length; index++)
        {
                console.log("insie loop",content.files[index]);

        //var concept = content.Concepts[item].fileName;
        //var fileName = concept.fileName;
        //console.log("The file names are :  "+concept );

        }
*/
      // let data=JSON.stringify(content);
    //    //console.log("this is vars  "+data );
    //        if(typeof data.files.Concepts !== undefined && data.files.Concepts !== undefined)
    //                console.log("this is vars  "+data.files.Concepts );

        console.log("outside loop");

    //    var bindings = content["files"].Concepts;
    //         console.log(bindings);
    //        for(i in bindings) 
    //            {
    //                 console.log("inside loop");
    //               console.log(bindings[i].concept); 
    //                
    //            }
        // JavaScript  for...in loop iterates
        // through the properties of bindings array
        // which are [0,1,length-1] as opposed to the
        // array item.
        var tree = '<div class="tree structure">'+
        '<ul>'+
        '<li>';
    //    for(i in bindings) {
    //    //var binding = bindings[i];
    //    if (bindings[i].classChild.value)
    //    {
    //        var childClass = bindings[i].classChild.value.split("/").pop();
    //        
    //        //display Child class
    //        console.log("Class Child: "+childClass); // a for-loop to print all the bindings
    //        tree +=' <li class="parent_li" role="treeitem">'+
    //            ' <span><i class="icon-folder-open"></i> '+childClass+'</span> <a href="">Goes somewhere</a></li>';
    //
    //    }
    //
    //    if(typeof  bindings[i].classParent != 'undefined' )
    //    {   
    //        //var pClass = bindings[i].classParent.value;
    //        var pClass = bindings[i].classParent.value.split("/").pop();
    //
    //        if (pClass.includes("#"))
    //           {pClass = pClass.split("#").pop();} 
    //
    //       //display parent class
    //        console.log("Class Parent: "+pClass);
    //    }
    //        else
    //    {    
    //        console.log("Class Parent: "+ "");
    //    }
    //
    //    console.log("\n"); 
    //
    //    }
    //        
    //    console.log("\n"); 

        /*var config = require('results.json');
        console.log(config.head.vars.slice(-1) );*/


        //console.log("he is " + __dirname);
        /*var errorCallback = function(data) {
        useErrorData(data);
        };
        nrc.run('cd  SimpleSparqlQuery/ && java -jar simpleHtmlGenerator.jar', { onError: dataCallback }); */ 

        /*cmd.get(
        'cd SimpleSparqlQuery/ && java -jar simpleHtmlGenerator.jar',
        //   "java -jar  " + homedir+"\\simpleHtmlGenerator.jar", //simpleHtmlGenerator.jar,
        function(err, data, stderr){
        if (!err) {
        console.log('the node-cmd cloned executed the jar file :\n\n')
        } else {
        console.log('error', err)
        }
        }
        );*/

        /*child = exec('cd  SimpleSparqlQuery/ && java -jar simpleHtmlGenerator.jar', 
        {maxBuffer : 500 * 1024},function (error, stdout, stderr){
        console.log('stderr: ' + stderr);
        if(error !== null){
        console.log('exec error: ' + error);
        }
        });*/


    //    ' <span><i class="icon-folder-open"></i> Parent</span> <a href="">Goes somewhere</a>'+
    //    '<ul>'+
    //    ' <li>'+
    //    '<span><i class="icon-minus-sign"></i> Child</span> <a href="">Goes somewhere</a>'+
    //    ' <ul>'+
    //    ' <li>'+
    //      '  <span><i class="icon-leaf"></i> Grand Child</span> <a href="">Goes somewhere</a>'+
    //    '  </li>'+
    //    '  </ul>'+
    //    ' </li>'+
    //       ' <li class="parent_li" role="treeitem">'+
    //            '<span title="Collapse this branch"><i class="icon-minus-sign"></i> Child</span> <a href="">Goes somewhere</a>'+
    //           ' <ul role="group">'+
    //               ' <li>'+
    //                  '  <span><i class="icon-leaf"></i> Grand Child</span> <a href="">Goes somewhere</a>'+
    //               ' </li>'+
    //                '<li class="parent_li" role="treeitem">'+
    //                    '<span title="Collapse this branch"><i class="icon-minus-sign"></i> Grand Child</span> <a href="">Goes somewhere</a>'+
    //                   ' <ul role="group">'+
    //                       ' <li class="parent_li" role="treeitem">'+
    //                           ' <span title="Collapse this branch"><i class="icon-minus-sign"></i> Great Grand Child</span> <a href="">Goes somewhere</a>'+
    //                           ' <ul role="group">'+
    //                               ' <li>'+
    //                                    '<span><i class="icon-leaf"></i> Great great Grand Child</span> <a href="">Goes somewhere</a>'+
    //                               ' </li>'+
    //                                '<li>'+
    //                                  '  <span><i class="icon-leaf"></i> Great great Grand Child</span> <a href="">Goes somewhere</a>'+
    //                               ' </li>'+
    //                            ' </ul>'+
    //                      '  </li>'+
    //                       ' <li>'+
    //                          '  <span><i class="icon-leaf"></i> Great Grand Child</span> <a href="">Goes somewhere</a>'+
    //                       ' </li>'+
    //                       ' <li>'+
    //                          '  <span><i class="icon-leaf"></i> Great Grand Child</span> <a href="">Goes somewhere</a>'+
    //                       ' </li>'+
    //                   ' </ul>'+
    //               ' </li>'+
    //               ' <li>'+
    //                 '   <span><i class="icon-leaf"></i> Grand Child</span> <a href="">Goes somewhere</a>'+
    //               ' </li>'+
    //          '  </ul>'+
    //       ' </li>'+
    //    ' </ul>'+
    //    '  </li>'+
    //    '  <li class="parent_li" role="treeitem">'+
    //    '   <span title="Collapse this branch"><i class="icon-folder-open"></i> Parent2</span> <a href="">Goes somewhere</a>'+
    //    '   <ul role="group">'+
    //    '   <li>'+
    //            '<span><i class="icon-leaf"></i> Child</span> <a href="">Goes somewhere</a>'+
    //       ' </li>'+
    //    ' </ul>'+
    //    ' </li>'+

            tree+='</li></ul></div>';


        res.render('tree', {
        title: 'test',
        tree: tree
        });
        });

        module.exports = router;
