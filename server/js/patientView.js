// GAME VARIABLES
var patients,	// list of patients
    socket;	// Socket connection



// APP INITIALISATION
function init() {
	// Initialise socket connection
	socket = io.connect(this);

	// Initialise remote players array
	patients = [];

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


function showPatients(patients) {    
	var html = "  <thead>"
	html += "      <th scope=\"col\">ID</th>";
	html += "      <th scope=\"col\">NAME</th>";
	html += "      <th scope=\"col\">LATITUD</th>";
	html += "      <th scope=\"col\">LONGITUD</th>";
	html += "      <th scope=\"col\">OK</th>";

	html += "</tr>";
	html += "</thead>";
	for (var i = 0; i < patients.length; i++) {
		html+="<tr>";
		html+="<td>"+patients[i].id+"</td>";
		html+="<td>"+patients[i].name+"</td>";
		html+="<td>"+patients[i].lat+"</td>";
		html+="<td>"+patients[i].lng+"</td>";
		html+="<td>"+patients[i].OK+"</td>";
		html+="</tr>";

	}
	html+="</table>";
	document.getElementById("tablePat").innerHTML = html;

	console.log(patients.id + "\t" + patients.name + "\t" + patients.lat + "\t" + patients.lng + "\t" + patients.OK);
//	console.log(patients[0].id + "\t" + patients[0].name + "\t" + patients[0].lat + "\t" + patients[0].lng + "\t" + patients[0].OK);
};


// New player
function onNewPatient(patient) {
	patients.push(patient);
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

