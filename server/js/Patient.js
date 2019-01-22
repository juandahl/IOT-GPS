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
		getNom: getName,
		getLastName: getLastName,
		getLat: getLat,
		getLng: getLng,
		getPolygon: getPolygon,
		getOK: getOK
	}
};

