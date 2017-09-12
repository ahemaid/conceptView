package HtmlGenerator.SimpleHtmlGenerator;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.io.OutputStreamWriter;
import java.io.Writer;

import javax.swing.filechooser.FileNameExtensionFilter;

import java.awt.List;
import java.io.*;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.json.*;

import org.apache.commons.cli.ParseException;
import org.apache.commons.io.filefilter.FileFileFilter;
//import org.apache.jena.atlas.json.JSON;
//import org.apache.jena.atlas.json.JsonArray;
//import org.apache.jena.atlas.json.JsonObject;
//import org.apache.jena.atlas.json.io.parser.JSONParser;
//import org.apache.jena.atlas.json.io.parserjavacc.javacc.JSON_Parser;
import org.apache.jena.iri.impl.Main;
import org.apache.jena.ontology.DatatypeProperty;
import org.apache.jena.ontology.Individual;
import org.apache.jena.ontology.ObjectProperty;
import org.apache.jena.ontology.OntClass;
import org.apache.jena.ontology.OntModel;
import org.apache.jena.ontology.OntModelSpec;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.riot.RiotException;
import org.apache.jena.riot.RiotNotFoundException;
import org.apache.jena.util.FileManager;
import org.apache.jena.util.iterator.ExtendedIterator;
import org.apache.log4j.varia.NullAppender;
import org.apache.jena.query.ResultSetFormatter;

public class App {
	static String concept = "", prevProp = "", property = "", value = "", table = "", body = "", individualsHTML = "",
			mainQuery = "", Query = "", closedTag = "", splitSymbol = "", range = "", isDefinedBy = "", json = "";
	static // static int ttlFilesCount = 0;
	String filesPath = "./ttlFiles/";

	public static void main(String[] args) throws IOException {
		JSONArray mergingArray = new JSONArray();
		JSONObject mergedJsonObject = new JSONObject();

		try {

			File dir = new File(filesPath);
			clearTheFile("./out/results.JSON");

			String[] files = dir.list(FileFileFilter.FILE);
			for (int i = 0; i < files.length; i++) {
				if (files[i].contains("ttl")) {

					System.out.println(files[i]);
					JSONObject obj = GenerateHTML("./ttlFiles/" + files[i], "../../results.JSON");
					// check for empty JSONobjects
					if (obj.length() != 0) {
						// System.out.println(obj);
						mergingArray.put(obj);

					}
				}

			}
			mergedJsonObject.put("files", mergingArray);

			// call to organize

			fileDecode(mergedJsonObject);

		} catch (ArrayIndexOutOfBoundsException e) {
			System.out.println("ArrayIndexOutOfBoundsException caught");
		} finally {

		}

	}

	@SuppressWarnings({ "null", "resource" })
	public static JSONObject GenerateHTML(String _sourceFile, String _destination) throws IOException {

		org.apache.log4j.BasicConfigurator.configure(new NullAppender());

		FileManager.get().addLocatorClassLoader(Main.class.getClassLoader());

		OntModel ontModel = ModelFactory.createOntologyModel(OntModelSpec.OWL_DL_MEM);
		FileManager.get().readModel(ontModel, _sourceFile);

		mainQuery = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
				+ "PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
				+ "PREFIX owl:  <http://www.w3.org/2002/07/owl#>" + "PREFIX foaf: <http://xmlns.com/foaf/0.1/>"
				+ "PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>"
				+ "PREFIX skos: <http://www.w3.org/2004/02/skos/core#> " + "SELECT  ?concept ?rdfType ?label  WHERE {" +
				// "?root rdfs:label ?root_name1 ."+
				"?concept a ?rdfType ." + "?concept rdfs:label ?label ." + "OPTIONAL {?concept rdfs:label ?label .}" +
				// .}"+
				"} ORDER BY ?concept";
		QueryExecution qexec2 = QueryExecutionFactory.create(mainQuery, ontModel);
		ResultSet result2 = qexec2.execSelect();

		// ResultSetFormatter.out(System.out, result2);

		JSONObject jsonObject = new JSONObject();
		JSONArray array = new JSONArray();

		while (result2.hasNext()) {
			QuerySolution binding = result2.nextSolution();
			if (binding.get("concept").toString() != null) {
				Resource concept = (Resource) binding.get("concept");
				// System.out.println("\concept: " + concept.getURI());
				Resource rdfType = (Resource) binding.get("rdfType");
				String label = binding.get("label").toString();

				JSONObject obj = new JSONObject();

				// trimming of the concept from URI
				obj.put("concept", trim(concept.getURI().toString()));

				obj.put("URI", concept.getURI());

				// trimming of the concept from URI
				obj.put("rdfType", trim(rdfType.getURI().toString()));
				// if (rdfType.getURI().toString().contains("Class")) {
				// obj.put("parent", "");
				Query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
						+ "PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
						+ "PREFIX owl:  <http://www.w3.org/2002/07/owl#>" + "PREFIX foaf: <http://xmlns.com/foaf/0.1/>"
						+ "PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>"
						+ "PREFIX skos: <http://www.w3.org/2004/02/skos/core#> "
						+ "SELECT  ?classChild ?classParent WHERE {" + //
						"?classChild rdfs:subClassOf  ?classParent ." + "}";
				QueryExecution qexec3 = QueryExecutionFactory.create(Query, ontModel);
				ResultSet result3 = qexec3.execSelect();
				while (result3.hasNext()) {
					QuerySolution binding3 = result3.nextSolution();
					Resource classChild = (Resource) binding3.get("classChild");
					Resource classParent = (Resource) binding3.get("classParent");

					if (classChild.getURI() == concept.getURI()) {

						if (classParent.getURI() != null) {
							obj.put("parent", classParent.getURI().toString());
							//System.out.println("parent: " + classParent.getURI().toString());

						}

						/*
						 * } else obj.put("parent", "");
						 */

					}
				}
				File file = new File(_sourceFile);
				obj.put("fileName", file.getName());
				if (label != null)
					obj.put("label", label);

				// obj.put("platform", i);

				// if you are using JSON.simple do this
				array.put(obj);

				// and if you use json-jena
				// array.put(obj);
				jsonObject.put("concepts", array);

			} else
				continue;

		}

		return jsonObject;

	}

	public static void clearTheFile(String fileName) throws IOException {
		FileWriter fwOb = new FileWriter(fileName, false);
		PrintWriter pwOb = new PrintWriter(fwOb, false);
		pwOb.flush();
		pwOb.close();
		fwOb.close();
	}

	public static String trim(String URI) {
		String conceptArray[];
		String conceptTrimmed = "";
		if (URI.contains("/")) {
			conceptArray = URI.split("/");
			if (conceptArray != null && conceptArray.length > 0) {
				conceptTrimmed = conceptArray[conceptArray.length - 1];
				// System.out.println(fileType);
			}
		}
		if (conceptTrimmed.contains("#")) {
			conceptArray = URI.split("#");
			if (conceptArray != null && conceptArray.length > 0) {
				conceptTrimmed = conceptArray[conceptArray.length - 1];

			}

		}
		 //System.out.println("Parent"+conceptTrimmed);

		return conceptTrimmed;
	}

	public static String trim(String URI, Boolean isParent) {
		String conceptTrimmed = "";
		String conceptArray[];
		if (isParent) {
			if (URI.contains("/")) {
				conceptArray = URI.split("/");
				if (conceptArray != null && conceptArray.length > 0) {
					conceptTrimmed = conceptArray[conceptArray.length - 1];
					//System.out.println("test " + conceptTrimmed);
				}
			}
			if (conceptTrimmed.contains("#") || URI.contains("#")) {
				if (conceptTrimmed.equals("")) {
					conceptArray = URI.split("#");
					if (conceptArray != null && conceptArray.length > 0) {
						conceptTrimmed = conceptArray[conceptArray.length - 1];
						// System.out.println(fileType);
					}
				}
				else
				{
					conceptArray = conceptTrimmed.split("#");
					if (conceptArray != null && conceptArray.length > 0) {
						conceptTrimmed = conceptArray[conceptArray.length - 1];
						// System.out.println(fileType);
					}
					
					
				}

			} /*else
				return URI;*/

		}

		return conceptTrimmed;
	}

	public static void fileDecode(JSONObject obj) {

		try {
			JSONObject rootJSON = obj;
			JSONArray orginzedArray = new JSONArray();
			//String conceptTrimmed = "";
			JSONArray dataList = (JSONArray) rootJSON.get("files");
			for (Object projectObj : dataList) {
				JSONObject project = (JSONObject) projectObj;
				JSONArray issueList = (JSONArray) project.get("concepts");
				for (Object issueObj : issueList) {
					JSONObject issue = (JSONObject) issueObj;
					JSONObject orginzedOject = new JSONObject();
					orginzedOject.put("concept", issue.getString("concept"));
					orginzedOject.put("fileName", issue.getString("fileName"));
					orginzedOject.put("label", issue.getString("label"));
					orginzedOject.put("URI", issue.getString("URI"));
					orginzedOject.put("RDFType", issue.getString("rdfType"));
					// if (issue.has("parent")) {
					if (issue.has("parent") && !issue.isNull("parent")) {
						String parentTrimmed = trim(issue.getString("parent"), true);
						orginzedOject.put("parent", parentTrimmed);
						System.out.println("\nParent ::" + parentTrimmed);

					} else {

						orginzedOject.put("parent", "");

					}

					orginzedArray.put(orginzedOject);
				}

			}
			try (FileWriter file = new FileWriter("../../results.JSON")) {
				file.write(orginzedArray.toString());
				// file.flush();
				// file.close();
				System.out.println("Successfully Copied JSON Object to File...");
				// System.out.println("\nJSON Object: " + mergedJsonObject);
				// trim();
			} catch (Exception e) {
				e.printStackTrace();

			}
		} catch (JSONException e) {
			// do smth
			e.printStackTrace();
		}

	}

}
