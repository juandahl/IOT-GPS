DROP TABLE Patients;

CREATE TABLE Patients (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    lat FLOAT NOT NULL,
    lng FLOAT NOT NULL,
    polygone VARCHAR(255) NOT NULL, 
    OK VARCHAR(255) NOT NULL
);

INSERT INTO Patients( name, lastName, lat, lng, polygone , OK) VALUES('Pepe', 'Perez', 43, 56, '[]', 'Inside');

