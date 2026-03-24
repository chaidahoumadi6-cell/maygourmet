// modal.js

const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  document.querySelector(".modal-header").textContent = "Ajouter un membre";

  const form = document.getElementById("membreForm");
  form.reset();
  form.action = "/api/equipe";
  form.method = "post";
  form.onsubmit = null;

  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("show", "success", "error");
  toast.classList.add("show", type);
  setTimeout(() => toast.classList.remove("show", type), 3000);
}

function modifier(id, nom, prenom, email, telephone, poste, adresse_postale, presentation, date_recrutement) {
  document.querySelector(".modal-header").textContent = "Modifier un membre";

  document.getElementById("nom").value = nom || "";
  document.getElementById("prenom").value = prenom || "";
  document.getElementById("email").value = email || "";
  document.getElementById("telephone").value = telephone || "";
  document.getElementById("poste").value = poste || "";
  document.getElementById("adresse_postale").value = adresse_postale || "";
  document.getElementById("presentation").value = presentation || "";
  document.getElementById("dateRecrutement").value = date_recrutement || "";

  modal.style.display = "block";

  const form = document.getElementById("membreForm");

  form.onsubmit = (e) => {
    e.preventDefault();

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

    fetch(`/api/equipe/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        modal.style.display = "none";
        showToast("Modification réussie !");
        setTimeout(() => location.reload(), 1200);
      } else {
        showToast("Erreur serveur", "error");
      }
    })
    .catch(() => showToast("Erreur réseau", "error"));
  };
}