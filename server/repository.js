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
 
function getPatients(arg){
    var listePatients=[];
/*    openDB();
    db.each("SELECT * FROM Patients", function(err, row) {
        if (err) {
            console.log(err);
        } else {
          this.emit("new patient", row);
          listePatients.push(row);
        }
    });
    close();
    console.log(listePatients.length);*/
    return [{ id: 3, name: 'Pepe', lat: 2.2, lng: 2.1, OK: 1 },
    { id: 1, name: 'Pepe', lat: 2.2, lng: 2.1, OK: 1 }];    
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