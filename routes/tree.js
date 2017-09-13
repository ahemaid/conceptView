var express = require('express');
var app = express();
var router = express.Router();
var appdata = require('../results.json');
var http = require('http');
const url = require('url');

// Prints https://example.org/foo#baz

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

    // translation of concept to URI
    function findURI(array, item) {
        var i = 0;
        while (array[i].concept != item) {
            i++;
        }

        return array[i].URI;
    }

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

    /////////////////////////////////////////////////////////////////////
    // parse URL to get URI
    /////////////////////////////////////////////////////////////////////
    /*    function fullUrl(req) {
            return url.format({
                protocol: req.protocol,
                host: req.get('host'),
                pathname: req.originalUrl
            });
        }
        console.log(fullUrl);*/
    /////////////////////////////////////////////////////////////////////
    // find URI for the concept
    /////////////////////////////////////////////////////////////////////
    var concept = "Longevity";
    console.log(concept);

    var conceptURI = findURI(appdata, concept);

    /*    var conceptURI = appdata.forEach(function (element) {
            if (element.concept == concept)
                return element.URI;
        });*/
    console.log("URI ready for sparql qurey " + conceptURI);

    /*    app.get("/tree/:id", function (req, res) {
            //var concept = req.param('id');
            var str = req.params.id;
            var concept = str.split("/");

            //console.log("concept  " + req.query.id);
            //debugger;
        });*/


    ///////////////////////////////////////////////////////////////////////////
    // query sparql endpoint 
    ///////////////////////////////////////////////////////////////////////////
    var request = require('request');
    var querystring = require('querystring');

    var myquery2 = querystring.stringify({
        query: 'prefix schema: <http://schema.org/> \n' +
            'prefix owl:   <http://www.w3.org/2002/07/owl#> \n' +
            'prefix xsd:   <http://www.w3.org/2001/XMLSchema#> \n' +
            'prefix voaf:  <http://purl.org/vocommons/voaf#> \n' +
            'prefix skos:  <http://www.w3.org/2004/02/skos/core#> \n' +
            'prefix mv:    <http://eccenca.com/mobivoc/> \n' +
            'prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#> \n' +
            'prefix vcard: <http://www.w3.org/2001/vcard-rdf/3.0#> \n' +
            'prefix gr:    <http://purl.org/goodrelations/v1#> \n' +
            'prefix geo:   <http://www.w3.org/2003/01/geo/wgs84_pos#> \n' +
            'prefix s:     <http://schema.org/> \n' +
            'prefix dct:   <http://purl.org/dc/terms/> \n' +
            'prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n' +
            'prefix vCard: <http://www.w3.org/2001/vcard-rdf/3.0#> \n' +
            'prefix foaf:  <http://xmlns.com/foaf/spec/#> \n' +
            'SELECT   ?s ?p ?o WHERE {  <' + conceptURI + '> ?p ?o } limit 25 '
    });

    //var params = "myquery2";
    request.post({
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
                    //'content-type': 'application/sparql-results+json'
            },

            url: "http://localhost:3030/ds/sparql?" + myquery2
        },
        function (error, response, body) {
            console.log(response.statusCode)

            if (!error && response.statusCode == 200) {
                console.log(body);
                console.log('successful update');

            } else {
                console.log(response.statusCode)
                console.warn(error);

            }

        });



    //console.log(files);

    res.render('tree.ejs', {
        title: 'tree',
        data: treeData,
        fileNames: files,
    });

});
module.exports = router;
