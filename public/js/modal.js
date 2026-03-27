// modal.js

const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  document.querySelector(".modal-header").textContent = "Ajouter un membre";
   
  // Sélectionne le formulaire d'ajout de membre par son ID
  const form = document.getElementById("membreForm");
  form.reset();
  form.action = "/api/equipe";
  form.method = "post";
  form.onsubmit = null;

  // Affiche la fenêtre modale à l'écran
  modal.style.display = "block";
};

// Ferme le modal lorsqu'on clique sur le bouton de fermeture (×)
span.onclick = function () {
  modal.style.display = "none";
};

// Ferme le modal lorsqu'on clique en dehors de celui-ci
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Affiche une notification temporaire (toast) avec un message et un type (succès ou erreur)
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  // Réinitialise les classes précédentes avant d'en ajouter de nouvelles
  toast.textContent = message;
  toast.classList.remove("show", "success", "error");
  toast.classList.add("show", type);

  // Masque le toast après 3 secondes
  setTimeout(() => toast.classList.remove("show", type), 3000);
}

// Ouvre le modal en mode "modification" les champs avec les données du membre
function modifier(id, nom, prenom, email, telephone, poste, adresse_postale, presentation, date_recrutement) {

  // Met à jour le titre du modal
  document.querySelector(".modal-header").textContent = "Modifier un membre";

  //  les champs du formulaire avec les valeurs existantes
  document.getElementById("nom").value = nom || "";
  document.getElementById("prenom").value = prenom || "";
  document.getElementById("email").value = email || "";
  document.getElementById("telephone").value = telephone || "";
  document.getElementById("poste").value = poste || "";
  document.getElementById("adresse_postale").value = adresse_postale || "";
  document.getElementById("presentation").value = presentation || "";
  document.getElementById("dateRecrutement").value = date_recrutement || "";

  // Affiche le modal
  modal.style.display = "block";

  const form = document.getElementById("membreForm");

  // Gère la soumission du formulaire de modification
  form.onsubmit = (e) => {
    // Empêche le rechargement de la page
    e.preventDefault();

    // Récupère les valeurs saisies dans le formulaire
    const data = {
      nom: document.getElementById("nom").value,
      prenom: document.getElementById("prenom").value,
      email: document.getElementById("email").value,
      telephone: document.getElementById("telephone").value,
      poste: document.getElementById("poste").value,
      adresse_postale: document.getElementById("adresse_postale").value,
      presentation: document.getElementById("presentation").value,
      date_recrutement: document.getElementById("dateRecrutement").value
    };

    // Envoie les données modifiées à l'API via une requête PUT
    fetch(`/api/equipe/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        // Ferme le modal
        modal.style.display = "none";
        // Affiche un message de succès
        showToast("Modification réussie !");
        // Recharge la page après 1,2s
        setTimeout(() => location.reload(), 1200);
      } else {
         // Affiche une erreur serveur
        showToast("Erreur serveur", "error");
      }
    })
    // Affiche une erreur réseau
    .catch(() => showToast("Erreur réseau", "error"));
  };
}