// GAME VARIABLES
var mymap,
	patientsList,	// list of patients
    socket;	// Socket connection
	

// APP INITIALISATION
function init() {
	// Initialise socket connection
	socket = io.connect(this);

	// Initialise remote players array
	patientsList = [];

	// Start listening for events
	setEventHandlers();

};


// APP EVENT HANDLERS
var setEventHandlers = function() {
	// Socket connection successful
	socket.on("connect", onSocketConnected);

	// New patient added
	socket.on("new patient", onNewPatient);

	// Player removed message received
	socket.on("remove patient", onRemovePatient);

	socket.on("show Patients", showPatients);
};



// Socket connected
function onSocketConnected() {
	console.log("Connected to socket server");

};

function updateMap(event){
	mymap.remove();
	mymap = L.map('mapid').setView([48.846659, 2.316756], 13);


	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox.streets'
	}).addTo(mymap);

	var listePointsPolygone = JSON.parse(patientsList[event.parentNode.parentNode.rowIndex-1].polygone)
	L.polygon(listePointsPolygone).addTo(mymap);

	L.marker([patientsList[event.parentNode.parentNode.rowIndex-1].lat, patientsList[event.parentNode.parentNode.rowIndex-1].lng]).addTo(mymap);

	document.getElementById('labelMap').innerHTML = ' Patient selected: ' + (event.parentNode.parentNode.rowIndex).toString() + ' - ' + patientsList[event.parentNode.parentNode.rowIndex-1].name 
	+ ' ' + patientsList[event.parentNode.parentNode.rowIndex-1].lastName;

}

function showPatients(patients) {
	patientsList = patients;
	var html = "  <thead>"
	html += "      <th scope=\"col\">ID</th>";
	html += "      <th scope=\"col\">NAME</th>";
	html += "      <th scope=\"col\">LAST NAME</th>";
	html += "      <th scope=\"col\">LATITUD</th>";
	html += "      <th scope=\"col\">LONGITUD</th>";
	html += "      <th scope=\"col\">POLYGON</th>";
	html += "      <th scope=\"col\">LOCATION</th>";

	html += "</tr>";
	html += "</thead>";
	for (var i = 0; i < patients.length; i++) {
		html+="<tr>";
		html+="<td>"+patients[i].id+"</td>";
		html+="<td>"+patients[i].name+"</td>";
		html+="<td>"+patients[i].lastName+"</td>";
		html+="<td>"+patients[i].lat+"</td>";
		html+="<td>"+patients[i].lng+"</td>";
		
		html+="<td>"+"<button onclick=updateMap(this);>View Map</button>"+"</td>";
		html+="<td>"+patients[i].OK+"</td>";
		html+="</tr>";

	}
	html+="</table>";
	document.getElementById("tablePat").innerHTML = html;

};


// New player
function onNewPatient(patient) {
	patientsList.push(patient);
	showPatients(patients)

};


// Remove player
function onRemovePatient(data) {
	// Question : remove a player
	//get player to be deleted
	var removePlayer = playerById(data.id);

	// Player not found
	if (!removePlayer) {
		util.log("Player not found: "+data.id);
		return;
	};

	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1);

};

//DIAGRAMA DE SECUENCIA UML
//BASE DE DATOS
// NAME LAT LONG OK

