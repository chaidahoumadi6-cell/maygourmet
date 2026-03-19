// j'importe le framewordk Expressjs.
const express = require('express');

// J'importe le pilote Mysql2 utilisé interroger la BDD Mysql
const mysql2 = require("mysql2");

// J'importe le pilote express-myconnection utilisé pour me connecter à la BDD
const myconnection = require('express-myconnection');
const connection = require('express-myconnection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Je configure les éléments attendus pour me connecter à Mysql
const optionsConnexioBaseDeDonnees = {
    host: "localhost",
    user: "root",
    password: "Hakim02112006",
    database: "maygourmet",
    port: 3306
};

// Middleware pour se connecter à la BDD Mysql pool est la stratégie de connexion à la BDD Mysql
app.use(myconnection(mysql2,optionsConnexioBaseDeDonnees,"pool"));

// Je précise que les vues sont dans le dossier views
app.set('views', './views');

// Je précise que nous utilisons le moteur EJS pour les vues
app.set('view engine', 'ejs');

// Je précise que j'utilise le dossier 'public' qui contient les fichiers statics
app.use(express.static('public'));


//  API Route pour la racine de la page : localhost:3004/
app.get('/', (req, res) => {
    // Message à afficher : Bienvenue chez May Gourmet
    res.write("<h1> Bienvenue chez May Gourmet </h1>");
    res.end();
});

// API route pour la page d'accueil
app.get("/api/accueil", (req, res) => {
    console.log(" Je passe dans /api/accueil");

    res.render('accueil');

    // Le type d'encodage du tex
    //res.writeHead(200,{ "content-type": "text/html;charset=utf-8"})

    // Le conten qui seraa affiché côté navigateur 
    //res.write("<p> Je suis à l'accueil </p>");

    // Fin de la réponse
    //res.end();
});

app.get("/api/equipe", (req, res) => {
    console.log(" Je passe dans /api/equipe");

    req.getConnection((erreur, connection) => {
        if(erreur){
            console.log(erreur);
            return res.status(500).send("Erreur DB");
        }
        connection.query("SELECT * FROM equipe", [], (err,resultatEquipe) => {
            if (err) {
                console.log("Erreur dans la requête Sql SELECT", err);
                return res.status(500).send("Erreur SQL");
            }
            res.render("equipe", {resultatEquipe});
        });
    });
});

app.get('/api/contact', (req, res) => {
    res.render('contact', { success: false });
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Nouveau contact:', name, email, message);
    // Optionnel: ajouter en base de données si la table existe.
    res.render('contact', { success: true });
});

app.delete('/api/equipe/:id', (req, res) => {
    const idMembreEquipe = req.params.id;
    const queryDelete = "DELETE From equipe WHERE id = ?";

    req.getConnection((erreur, connection) => {
        if(erreur){
            console.log("Erreur suppression equipe : ", erreur);

        } else{
            connection.query(queryDelete, [idMembreEquipe], (erreur, resultat) => {
                if(erreur) {
                    console.log("Erreur requet Suppression : ", erreur);

                } else{
                    console.log("Bravo! Le membre est supprimé dans la table quipe");

                    // Redirect
                    res.status(200).json({ routeAccueil:"/api/accueil"});
                }
            });
        }
    });
});




/**
 * API pour ajouter un membre d'équipe.
 * Le membre sera inséré dans sla table equipe
 */
app.post("/api/equipe",(req,res) =>{
    const { nom, prenom, email, telephone, poste, adressepostale, presentation, daterecrutement } = req.body;

    const requeteSql = "INSERT INTO equipe (nom, prenom, email, telephone, poste, adresse_postale, presentation, date_recrutement) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const ordreChamps = [nom, prenom, email, telephone, poste, adressepostale, presentation, daterecrutement];

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur de connexion base de données :", erreur);
            res.status(500).send("Erreur serveur");
        } else {
            connection.query(requeteSql, ordreChamps, (erreur,resultat) => {
                if (erreur) {
                    console.log("Erreur d'ajout equipe :", erreur);
                    res.status(500).send("Erreur insertion");
                } else {
                    console.log("Bravo ! Nouveau membre ajouté à l'équipe");
                    res.redirect("/api/equipe");
                }
            });
        }
    });
});

// J'ajoute un fournisseur dans la table fournisseur pour cela j'utilise la méthode POST
app.post('/api/fournisseur', (req, res) => {
    console.log("corps de la requête : ", req.body);

    console.log(req.body.nom);
    const nomFournisseur = req.body.nom;

    console.log(req.body.responsable);
    const responsableFournisseur= req.body.responsable;

    console.log(req.body.email);
    const emailFournisseur = req.body.email;

    console.log(req.body.telephone);
    const telephoneFournisseur = req.body.telephone;

    console.log(req.body.adresse_postale);
    const adresseFournisseur = req.body.adresse_postale;

    console.log(req.body.Presentation);
    const PresentationFournisseur = req.body.Presentation;


    const requeteSql = "INSERT INTO fournisseur (nom, responsable, email, telephone, adresse_postale, Presentation_fournisseur) VALUES (?, ?, ?, ?, ?, ?)";

    const ordreChamps = [nomFournisseur, responsableFournisseur, emailFournisseur, telephoneFournisseur, adresseFournisseur, PresentationFournisseur]; 

    // Je me connecte à la base de données
    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log("Erreur de connxion à la base de données : ", erreur);

        } else{ // Si j'ai réussi à me connecter à la base de données
            connection.query(requeteSql, ordreChamps, (erreur,nouveauFournisseur) => {
                if(erreur) {
                    console.log("Erreur d'ajout fournisseur :", erreur);
                } else{
                    console.log("Bravo! Nouveau fournisseur ajoute");
                    res.status(300).redirect("/api/accueil");
                }

            });
        }
    });
    

});



app.get('/api/plats', (req, res) => {
    res.render('plats');
});

app.post('/api/plats/ajouter', (req, res) => {
    const { entree, plat, dessert } = req.body;
    console.log('Nouveau menu:', entree, plat, dessert);
    // Ici vous pouvez ajouter une insertion en base si besoin.
    res.redirect('/api/plats');
});

app.get('/api/fournisseur', (req, res) => {
    res.render('fournisseur');
});


//fin du fichier. Donc ne pas coder en dessous de celui-ci
module.exports = app;