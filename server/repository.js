//DATABASE CODE
///home/sasl/encad/pecheux/EISE/EISE5/javascript

//export functions
module.exports = {
  openDB: openDB,
  getPatients: getPatients,
  insertPatient: insertPatient,
  close: close
};

//function implementation
const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird');

var db;
var pathDB = "../db/database.db";

function openDB(){
  // open the database
  db = new sqlite3.Database(pathDB, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the location database.');
  });

}

function getPatients(){
    listePatients = [];
    openDB();

    //sql request
    sql = "SELECT * FROM Patients";

    //use promise to solve async problems
    return new Promise(function(resolve, reject) {
      // Do async job
      db.all(sql, function(err, rows) {
        if (err) {
          reject(err);
      } else {
        resolve(rows);
        return rows;  
      }
      });
    }); 
}


function insertPatient(patient){
  //insert data  
  request = 'INSERT INTO Patients( name, lastName, lat, lng, polygone , OK) VALUES(\''+ patient.getName() + '\', \'' + patient.getLastName() + '\', ' 
	+ patient.getLat() + ', ' + patient.getLng() + ', \'' + JSON.stringify(patient.getPolygon()) + '\', \'' + patient.getOK() +  '\');' 

  db.run(request, function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert name
    console.log('A row has been inserted with rowid ${patient.getName()} ${patient.getLastName()}');
  });
}


function close(){
  //close database 
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}