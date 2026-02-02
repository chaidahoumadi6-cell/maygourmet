CREATE TABLE equipe(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,
    prenom VARCHAR(155) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telephone VARCHAR(100) NOT NULL,
    poste VARCHAR(80) NOT NULL,
    adresse-postale VARCHAR(255),
    presentation VARCHAR(255),

);