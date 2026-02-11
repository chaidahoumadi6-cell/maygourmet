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
UPDATE8 FROM equipe SET nom = "sha"





-- 1. Créer la table plat
CREATE TABLE plat (
    id_plat INT AUTO_INCREMENT PRIMARY KEY,
    nom_plat VARCHAR(100) NOT NULL,
    prix DECIMAL(10, 2),
    categorie VARCHAR(50),
    date_creation DATE
);

-- 2. Créer la table fournisseur
CREATE TABLE fournisseur IF NOT EXIST (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom_fournisseur VARCHAR(100) NOT NULL,
    adresse VARCHAR(200),
    telephone VARCHAR(20),
    email VARCHAR(100),
    date_partenariat DATE
    -- J'associe la table fournisseur à la table produit en utilisant l' ID PRODUIT 
    -- L'ID_PRODUIT PROVIENT de la table produit 
    id_produit INT NOT NULL,
    FOREIGN KEY (id_produit) REFERENCES produit(id_produit),
);


alter table fournisseur
add id_produit int not null,
add FOREIGN KEY (id_produit) REFERENCES produit(id_produit);

CREATE TABLE produit IF NOT EXISTS(
    id_produit INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nom VARCHAR(100) NOT NULL,
    presentation VARCHAR(155),
    prix INT NOT NULL,
    origin VARCHAR(30)NOT NULL,
    categorie VARCHAR(30),
    disponibilite BOOLEAN DEFAULT false,
    type_culture VARCHAR(30)
    id_fournisseur INT NOT NULL,
    -- J'associe la table produit à la table fournisseur en utilisant l' ID FOURNISSEUR
    FOREIGN KEY (id_fournisseur) REFERENCES fournisseur(id_fournisseur)
);


-- 3. Lister les noms des tables existantes dans la base de données
SHOW TABLES;

-- 4. Ajouter 4 fournisseurs au minimum dans la table fournisseur
-- Ajouter une ligne dans la table founisseur
INSERT INTO fournisseur (nom_fournisseur, adresse, telephone, email, date_partenariat) VALUES("Fournisseur Alimentaire Mayotte", "Kaweni, Mamoudzou", "0269612345", "contact@fam-mayotte.com", "2007-05-03");
INSERT INTO fournisseur (nom_fournisseur, adresse, telephone, email, date_partenariat) VALUES("TETRAMA", "129 rue mazava 97600 Kaweni", "0269601234", "tetramagroupe@gmail.com", "2015-07-04");
INSERT INTO fournisseur (nom_fournisseur, adresse, telephone, email, date_partenariat) VALUES("Jambo", "Majicavo Lamir", "0269624567", "commande@pfoi.fr", "2019-09-10");
INSERT INTO fournisseur (nom_fournisseur, adresse, telephone, email, date_partenariat) VALUES("BDM", "Mamoudzou Centre", "0269617890", "vente@BD-mayotte.com", "2010-12-12");

-- 5. Afficher tous les fournisseurs enregistrés dans la table fournisseur
SELECT * FROM fournisseur;

-- 6. Modifier le nom d'un fournisseur
UPDATE fournisseur SET nom_fournisseur = "Mayana Gourmande" WHERE id = 1;

-- 7. Supprimer un fournisseur de votre choix
DELETE FROM fournisseur WHERE id = 4;

-- 8. Ajouter 5 plats dans la table plat

INSERT INTO plat (nom_plat, prix, categorie, date_creation) VALUES("Poulet coco", 15.00, "Plat principal", "2026-01-29");
INSERT INTO plat (nom_plat, prix, categorie, date_creation) VALUES("Brochettes de boeuf", 10.00, "Grillades", "2026-01-30");
INSERT INTO plat (nom_plat, prix, categorie, date_creation) VALUES("Riz au lait de coco", 6.50, "Dessert", "26-02-03");
INSERT INTO plat (nom_plat, prix, categorie, date_creation) VALUES("Salade de papaye verte", 8.00, "Entrée", "26-02-02");

-- 9. Lister tous les plats enregistrés dans la table plat
SELECT * FROM plat;

-- 10. Modifier le nom d'un plat au choix
UPDATE plat SET nom_plat = "Poulet au curry et lait de coco" WHERE id_plat = 2;

-- 11. Supprimer un plat au choix
DELETE FROM plat WHERE id_plat = 5;

-- Modifier un champ pour une ligne spécifique
UPDATE equipe SET nom = ""WHERE id =4

-- Vérification finale des fournisseurs restants
SELECT * FROM fournisseur;

-- Vérification finale des plats restants
SELECT * FROM plat;

-- 1. Désactiver la vérification des clés étrnagères
SET FOREIGN_KEY_CHHECKS=0;
-- 2.Supprimer la table founisseur
Drop table founisseur
-- 3. Ractiver la vérification des clés étrangéres
SET FOREIGN_KEY_CHHECKS=1;

-- créer la table 'fournisseur'
CREATE TABLE fournisseur(
    id_fournisseur INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,
    responsable VARCHAR(155) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telephone VARCHAR(100),
    adresse_postale VARCHAR(255),
    presentation_fournisseur VARCHAR(255)
);