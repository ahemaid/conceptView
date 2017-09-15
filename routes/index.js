var express = require('express');
var router = express.Router();
var app = express();


//  GET home page. 
//app.get('/', function (req, res) {

router.get('/', function (req, res) {

    titleNew = 'MobiVoc';

    //console.log("show url" + req.url);
    //debugger;

    //            var result =
    //                " <table id='tableResult' class='table table-striped table-bordered' cellspacing='0'  border='5' width='100%'>";
    //
    //            result += "<thead><tr>  <th>Concept</th>  <th>Type</th>  <th>URI</th> </tr> </thead><tbody>";
    /*            fs.readFile('./results.json', 'utf8', function (err, data) {
                    if (err) throw err;

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
                    var obj = JSON.parse(data);
                    // Call Sort By Name
                    obj.sort(SortByName);
                    JSONTree = uniqurArray(obj);*/
    //console.log(JSONTree);

    /*                for (var i = 0; i <= JSONTree.length - 1; i++) {
                        //for (key in JSONTree[i]) {
                        var concept = JSONTree[i]['concept'];
                        //var URI = JSONTree[i]['URI'];
                        var label = JSONTree[i]['label'];
                        var RDFType = JSONTree[i]['RDFType'];*/
    //tree +='<li><span><i class="icon-folder-open"></i>'  +concept +'</span></li>';
    //                        console.log('concept: ' + concept);
    //                        console.log('parent: ' + obj[i]['parent']);
    //                        console.log('fileName: ' + obj[i]['fileName']);
    //                        console.log('label: ' + obj[i]['label']);
    //                        console.log('URI: ' + URI);
    //                        console.log('RDFType: ' + obj[i]['RDFType'] + "\n");

    //  }

    // console.log(concept + "  " + RDFType + "  " + label);

    //                    result += '<tr>' +
    //                        '<td>' + concept + '</td>' +
    //                        '<td>' + RDFType + '</td>' +
    //                        '<td>' + label + '</td>' +
    //                        '</tr>';



    //  }



    // }

    //console.log(result);
    //});
    //
    //            result += "</tbody></table>";

    /*
            titleNew = titleNew;
            res.render('index', {
            title: titleNew,
            JSONTree: JSON.stringify(this.JSONTree)
            });




            //console.log(err);
            });
            module.exports = router;
    */


    /*

                    var express = require('express');
                    var router = express.Router();

                    var rdfstore = require('rdfstore');
                    var request = require('request');
                    var fs = require('fs');
                    router.get('/', function(req, res, next) {

                    rdfstore.create(function(store) {
                      function load(files, callback) {
                        var filesToLoad = files.length;
                        for (var i = 0; i < files.length; i++) {
                          var file = files[i]
                          fs.createReadStream(file).pipe(
                            request.post( { 
                              url: 'http://localhost:8080/enhancer?uri=file: 
                                ///' + file,
                              headers: {accept: "text/turtle"}
                            },
                          function(error, response, body) {
                            if (!error && response.statusCode == 200) {
                              store.load(
                                "text/turtle",
                                body,
                                function(success, results) {
                                  console.log('loaded: ' + results + " triples  
                                    from file" + file);
                                  if (--filesToLoad === 0) {
                                    callback()
                                  }
                                }
                              );
                            }
                            else {
                              console.log('Got status code: ' + 
                                response.statusCode);
                            }
                          }));
                        }
                      }
                      load(['testdata.txt', 'testdata2.txt'], function() {
                        store.execute(
                          "PREFIX enhancer:<http://fise.iks-project.  
                            eu/ontology/> \
                          PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> \
                          SELECT ?label ?source { \
                            ?a enhancer:extracted-from ?source. \
                            ?a enhancer:entity-reference ?e. \
                            ?e rdfs:label ?label.\
                            FILTER (lang(?label) = \"en\") \
                          }",
                          function(success, results) {
                            if (success) {
                              console.log("*******************");
                              for (var i = 0; i < results.length; i++) {
                                console.log(results[i].label.value +
                                " in " + results[i].source.value);
                              }
                            }
                          });
                      });
                    

    });

    */
    // GET home page. 
    res.render('index', {
        title: 'Express'
    });
});

module.exports = router;
