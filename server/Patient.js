/**************************************************
** PATIENT CLASS
**************************************************/

var Patient = function(startName, startLastName, startLat, startLng, startPolygon, startOK) {
	var name = startName,
		lastName = startLastName,
		lat = startLat,
		lng = startLng,
		polygon = startPolygon,
		OK = startOK;

	// Getters and setters
	var getName = function() {
		return name;
	};

	var getLastName = function() {
		return lastName;
	};

	var getLat = function() {
		return lat;
	};

	var getLng = function() {
		return lng;
	};

	var getPolygon = function() {
		return polygon;
	};


	var getOK = function() {
		return OK;
	};

	// Define which variables and methods can be accessed
	return {
		getName: getName,
		getLastName: getLastName,
		getLat: getLat,
		getLng: getLng,
		getPolygon: getPolygon,
		getOK: getOK
	}
};

// Export the Patient class so you can use it in
// other files by using require("Patient").Patient
exports.Patient = Patient;
