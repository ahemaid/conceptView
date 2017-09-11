var express = require('express');
var router = express.Router();
var appdata = require('../results.json');

//var */ = "";
//var JSONTree;
/* Execute a command line. */
router.get('/', function (req, res) {


    var treeData = [];
    // loop to find the classes

    function SortConcepts(x, y) {
        return ((x.concept.toLowerCase() == y.concept.toLowerCase()) ? 0 : ((x.concept.toLowerCase() > y.concept.toLowerCase()) ? 1 : -1));
    }

    function SortFiles(x, y) {
        return ((x.toLowerCase() == y.toLowerCase()) ? 0 : ((x.toLowerCase() > y.toLowerCase()) ? 1 : -1));
    }

    function uniqueConcepts(array) {
        var out = [];
        var sl = array;

        for (var i = 0, l = sl.length; i < l; i++) {
            var unique = true;
            for (var j = 0, k = out.length; j < k; j++) {
                if (sl[i] !== undefined)
                    if (sl[i].concept.toLowerCase() === out[j].concept.toLowerCase()) {
                        unique = false;
                    }
            }
            if (unique) {
                out.push(sl[i]);
            }
        }

        return out;
    }

    function uniquefileNames(array) {
        var out = [];
        var sl = array;

        for (var i = 0, l = sl.length; i < l; i++) {
            var unique = true;
            for (var j = 0, k = out.length; j < k; j++) {
                if (sl[i] !== undefined)
                    if (sl[i].toLowerCase() === out[j].toLowerCase()) {
                        unique = false;
                    }
            }
            if (unique) {
                out.push(sl[i]);
            }
        }

        return out;
    }

    /*function sort_unique(array) {

        if (array.length === 0) return arr;
        array = array.sort(function (a, b) {
            return a * 1 - b * 1;
        });
        var ret = [array[0]];
        for (var i = 1; i < array.length; i++) { // start loop at 1 as element 0 can never be a duplicate
            if (array[i - 1] !== array[i]) {
                ret.push(array[i]);
            }
        }
        return ret;
    }*/

    // Call Sort By Name
    appdata.sort(SortConcepts);
    appdata = uniqueConcepts(appdata);
    appdata.forEach(function (item) {
        treeData = treeData.concat(item);
        //console.log(treeData);
    });
    var files = [];
    appdata.forEach(function (item) {
        files.push(item.fileName);
    });
    files.sort(SortFiles);
    files = uniquefileNames(files);

    console.log(files);

    res.render('tree.ejs', {
        title: 'tree',
        data: treeData,
        fileNames: files
    });

});
/*    //var tree = '<ul>';
    // var jsonData = '';
    var arr = [];

    // read json file and get the result
    fs.readFile('./results.json', 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);

        function SortByName(x, y) {
            return ((x.concept.toLowerCase() == y.concept.toLowerCase()) ? 0 : ((x.concept.toLowerCase() > y.concept.toLowerCase()) ? 1 : -1));
        }

        function uniqurArray(array) {
            var out = [];
            var sl = array;

            for (var i = 0, l = sl.length; i < l; i++) {
                var unique = true;
                for (var j = 0, k = out.length; j < k; j++) {
                    if (sl[i].concept.toLowerCase() === out[j].concept.toLowerCase()) {
                        unique = false;
                    }
                }
                if (unique) {
                    out.push(sl[i]);
                }
            }

            return out;
        }

        // Call Sort By Name
        obj.sort(SortByName);
        JSONTree = uniqurArray(obj);

        //To create json object for tree structure 
        var child = [];
        //var object = eliminateDuplicates(obj);
        for (var i = 0; i <= JSONTree.length - 1; i++) {
            for (key in JSONTree[i]) {
                //if (obj[i].hasOwnProperty('concept'))
                //      {
                var concept = JSONTree[i]['concept'];
                //if (JSONTree[i]['parent'] != "") {
                arr.push({
                    'text': concept
                });
                //                            } else {
                //                                child.push({
                //                                    "text": concept
                //                                });
                //                                arr.push({
                //
                //                                    "text": JSONTree[i]['parent'],
                //                                    "nodes": child
                //                                });
                //
                //                                //var URI = obj[i]['URI'];
                //                            }
                // tree += '<li><a href="#">' + concept + '<a></li>';
                //}
            }
        }
        console.log(arr);

    });*/


//tree +='<li><span><i class="icon-folder-open"></i>'  +concept +'</span></li>';
//console.log('concept: '+concept) ;
//console.log('parent: '+obj[i]['parent']) ;
//console.log('fileName: '+obj[i]['fileName']) ;
//console.log('label: '+obj[i]['label']) ;  
//console.log('URI: '+URI) ;                              
// console.log('RDFType: '+obj[i]['RDFType']+"\n") ;  





//   }
//  }


// console.log(JSONTree);


//tree += '</ul></div>';
/*    res.render('tree', {
        title: 'test'
    });
    //res.send(JSONTree);
});*/

module.exports = router;
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
