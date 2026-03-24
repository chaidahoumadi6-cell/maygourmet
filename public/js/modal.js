const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Toast
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast show";
  setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}

// Fonction modifier
function modifier(id, nom, prenom, email, telephone, poste, adresse_postale, presentation, date_recrutement) {
  // Changer le titre du modal
  document.querySelector(".modal-header").textContent = "Modifier un membre";

  // Pré-remplir le formulaire
  document.getElementById("nom").value = nom || "";
  document.getElementById("prenom").value = prenom || "";
  document.getElementById("email").value = email || "";
  document.getElementById("telephone").value = telephone || "";
  document.getElementById("poste").value = poste || "";
  document.getElementById("adresse_postale").value = adresse_postale|| "";
  document.getElementById("presentation").value = presentation || "";
  document.getElementById("dateRecrutement").value = date_recrutement || "";

  // Ouvrir le modal
  modal.style.display = "block";

  // Gérer le submit du formulaire
  const form = document.querySelector("form");
  form.onsubmit = (e) => {
    e.preventDefault();
    
    const data = {
      nom: document.getElementById("nom").value,
      prenom: document.getElementById("prenom").value,
      mail: document.getElementById("mail").value,
      telephone: document.getElementById("telephone").value,
      poste: document.getElementById("poste").value,
      adresse: document.getElementById("adresse").value,
      presentation: document.getElementById("presentation").value,
      dateRecrutement: document.getElementById("dateRecrutement").value
    };

    fetch(`/api/equipe/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        showToast("Modification réussie !");
        setTimeout(() => location.reload(), 1200);
      } else {
        showToast("Erreur lors de la modification");
      }
    })
    .catch(() => showToast("Erreur lors de la modification"));
  };
}
