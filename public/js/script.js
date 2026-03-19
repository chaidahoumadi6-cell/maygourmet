function supprimer(id) {
    const routComplet = '/api/equipe/'+id;

    fetch(
        routComplet, {method: "DELETE"}
    ).then(
        (reponse) => reponse.json()
    ).then(
        (donnee) => window.location.href = donnee.routeAccueil
    ).catch(
        (erreur) => console.log(erreur)
    )
}