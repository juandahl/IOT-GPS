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

var db;
var pathDB = "db/database.db";


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
  var patients = [];
  var number;
  //get data



  db.serialize(function(){
   db.each('SELECT * FROM Patients;', function(err, row){
      patients.push(row);
   }, function(err, rowCount){
      console.log(patients);
   });
  });
  console.log(patients);
  return patients;
}


function insertPatient(patient){
  //insert data
  request = 'INSERT INTO Patients(id, name, lat, lng, OK) VALUES('+ patient.id + ', \'' + patient.name + '\', ' 
		+ patient.lat + ', ' + patient.lng + ', ' + patient.OK +  ');' 

  console.log(request);
  db.run(request, function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${patient.id}`);
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


