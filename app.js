// j'importe le framewordk Expressjs.
const express = require('express');

// J'importe le pilote Mysql2 utilisé interroger la BDD Mysql
const mysql2 = require("mysql2");

// J'importe le pilote express-myconnection utilisé pour me connecter à la BDD
const myconnection = require('express-myconnection');
const connection = require('express-myconnection');

const app = express();

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

    // 1. Je me connecte à la BDD grâce à la méthode getconnection
    req.getConnection((erreur, connection) => {
        // Je vérifie s'il y a une erreur lors de la connexion à la BDD
        if(erreur){
            console.log(erreur);
        } else{
            connection.query("SELECT * FROM equipe", [], (err,resultatEquipe) => {
                if (erreur) {
                    console.log("Erreur dans la requête Sql SELECT");
                } else{
                    console.log("Mon équipe:", resultatEquipe);

                    // Je retourne au client le résultat de la requpete Sql 
                    res.render("equipe", {resultatEquipe});
                }
            });
                
            
        }
    });

   
});

// J'ajoute un fournisseur dans la table fournisseur pour cela j'utilise la méthode POST
app.post('api/fournisseur', (req, res) => {
    console.log("corps de la requête : ", req.body);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/fournisseur', (req, res) => {
    res.render("fournisseur");
});


//fin du fichier. Donc ne pas coder en dessous de celui-ci
module.exports = app;