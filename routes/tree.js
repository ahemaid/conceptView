var express = require('express');
var app = express();
var router = express.Router();
var appdata = require('../jsonDataFiles/RDFSConcepts.json');
var SKOSData = require('../jsonDataFiles/SKOSConcepts.json');
var RDFObjectsPlusURI = require('../jsonDataFiles/RDFSObjects.json');
var SKOSObjectsPlusURI = require('../jsonDataFiles/SKOSObjects.json');
// var http = require('http');
// const url = require('url');
// var parseString = require('xml2js').parseString;
// var sparqlResponse = [];


router.get('/', function(req, res) {

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
  // filter external classes
  function filterExternalConcept(RDFObjects) {
    var out = [];
    var data = [];
    for (var i = 0, j = 0, l = RDFObjects.length; i < l; i++) {
      if (typeof(RDFObjects[i].object) != "undefined") {
        data[j] = RDFObjects[i].object;
        j++;
      }

    }
    for (var i = 0, l = data.length; i < l; i++) {
      var unique = true;
      for (var j = 0, k = out.length; j < k; j++) {
        if (data[i] === out[j])
          unique = false;
      }
      if (unique) {
        out.push(data[i]);
      }
    }
    return out;
  }
  // remove SKOS when same parent and child relationship found
  // function removeDuplicateSKOSData(data) {
  //   var out = [];
  //   var array = data;
  //
  //   for (var i = 0; i < data.length; i++) {
  //     for (var j = 0; j < array.length; j++) {
  //       if (array[j].parent === data[i].parent && array[j].RDFType === "skos:narrower" && data[i].RDFType === "skos:broader") {
  //         array.splice(j--, 1);
  //         console.log("parent   " + array[j].parent + "child     " + data[i].parent)
  //       }
  //     }
  //   }
  //   return array;
  // }

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
  appdata.forEach(function(item) {
    treeData = treeData.concat(item);
    //console.log(treeData);
  });
  var files = [];
  appdata.forEach(function(item) {
    files.push(item.fileName);
  });
  files.sort(SortFiles);
  files = uniquefileNames(files);

  //  remove duplicate data from SKOSData
  // var SKOSResults = removeDuplicateSKOSData(SKOSData);


  var concepts = [];
  var allRDFObjects = filterExternalConcept(RDFObjectsPlusURI);
  var allSKOSObjects = filterExternalConcept(SKOSObjectsPlusURI);

  res.render('tree.ejs', {
    title: 'tree',
    data: treeData,
    fileNames: files,
    allRDFObjects:allRDFObjects,
    allSKOSObjects:allSKOSObjects,
    SKOSData: SKOSData,
    RDFObjectsPlusURI:RDFObjectsPlusURI,
    SKOSObjectsPlusURI:SKOSObjectsPlusURI
  });

});
module.exports = router;
