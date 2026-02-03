-- créer une base de données
CREATE DATABASE maygourmet;

-- Créer une table de equipese
CREATE TABLE equipe (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,
    prenom VARCHAR(155) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telephone VARCHAR(100) NOT NULL,
    poste VARCHAR(80) NOT NULL,
    adresse_postale VARCHAR(255),
    presentation VARCHAR(255),
    date_recrutement DATE

);

-- Afficher les tables existante
SHOW TABLES;

INSERT INTO equipe (nom, prenom, email, telephone, poste, adresse_postale, presentation, date_recrutement) VALUES ("SAID","Fatima","hshahida@gamil.com","0639 02 11 20","Gérante","06 Rue de la Mosquée 97600 Mamoudzou","Passionnée de cuisine traditionnelle","2015-02-01");


INSERT INTO equipe (nom, prenom, email, telephone, poste, adresse_postale, presentation, date_recrutement) VALUES ("ALi","Said","shoumadi@gmail.com","0639 02 11 20","gerante","02 Rue de la Mosquée 97600 labattoir","Passionnée de cuisine traditionnelle","2001-02-15");
 
INSERT INTO equipe (nom, prenom, email, telephone, poste, adresse_postale, presentation, date_recrutement) VALUES ("COMBO","Ali","cali@gmail.com","0693 02 01 15","gerante"," 11 Rue de la Mosquée 97600 Pamandzi","Passionnée de cuisine traditionnelle","2011-01-06");

INSERT INTO equipe (nom, prenom, email, telephone, poste, adresse_postale, presentation, date_recrutement) VALUES ("KAMA","Hama","hkama@gamil.com","0693 15 01 02","Gérante", "11 Rue de la Mosquée 97600 Pamandzi","Passionnée de cuisine traditionnelle","2002-06-11");

-- supprimer une ligne de la table
DELETE FROM equipe WHERE id = 1;

-- modifier une ligne de la table
DELETE FROM equipe SET nom = "sha"

