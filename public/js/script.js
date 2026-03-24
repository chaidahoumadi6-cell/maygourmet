function supprimer(id) {
  fetch(`/api/equipe/${id}`, { method: "DELETE" })
    .then(res => res.json())
    .then(data => window.location.href = data.routeAccueil)
    .catch(err => console.log(err));
}