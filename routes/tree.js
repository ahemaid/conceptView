var express = require('express');
var app = express();
var router = express.Router();
var appdata = require('../results.json');
var SKOSData = require('../SKOSResults.json');
var externalClassesData = require('../externalClassesResults.json');

var http = require('http');
const url = require('url');
var parseString = require('xml2js').parseString;
var sparqlResponse = [];


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
  function filterExternalConcept(externalClassesData) {
    var out = [];
    var data = [];
    for (var i = 0, j = 0, l = externalClassesData.length; i < l; i++) {
      if (typeof(externalClassesData[i].externalClass) != "undefined")
        if (!(externalClassesData[i].externalClass.includes("www.w3.org"))){
          data[j] = externalClassesData[i].externalClass;
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
  // arrange SKOS in parent and child relationship
  // function getSKOSInParentChildren(data){
  //   var skosElemet = {};
  //   var concepts = [];
  //
  //
  //
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

//  console.log(SKOSData);

  var concepts = [];
  var concepts = filterExternalConcept(externalClassesData);
  //console.log(concepts);

  res.render('tree.ejs', {
    title: 'tree',
    data: treeData,
    fileNames: files,
    externalAndInternalConcepts: concepts,
    SKOSData:SKOSData
  });

});
module.exports = router;
