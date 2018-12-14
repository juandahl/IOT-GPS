DROP TABLE Patients;

CREATE TABLE Patients (
    id int AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    lat FLOAT NOT NULL,
    lng FLOAT NOT NULL,
    polygone VARCHAR(255) NOT NULL, 
    OK FLOAT NOT NULL,
    PRIMARY KEY (id)
);


