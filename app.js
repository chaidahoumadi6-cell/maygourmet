// j'importe le framewordk Expressjs.
const express = require('express');
const app = express();

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
    res.render('equipe');
});


//fin du fichier. Donc ne pas coder en dessous de celui-ci
module.exports = app;