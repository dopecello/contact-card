//Import modules
import { toggleForm, clearForm } from "./form";

// Import CSS Files
import "../css/index.css";

//Import imgs
import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";

//Import database initializer
import { initDb, getDb, postDb, deleteDb, editDb } from "./database";

//import cards functionality
import { fetchCards } from "./cards";

//Import Bootstrap + Popper
import { Tooltip, Toast, Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//Add images onLoad
window.addEventListener("load", function () {
  initDb();
  fetchCards();
  document.getElementById("logo").src = Logo;
  document.getElementById("bearThumbnail").src = Bear;
  document.getElementById("dogThumbnail").src = Dog;
});

// Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener("click", (event) => {
  toggleForm();
});

form.addEventListener("submit", (event) => {
  // Handle data
  event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

  // Post form data to IndexedDB OR Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    postDb(name, email, phone, profile);
  } else {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let profile = document.querySelector('input[type="radio"]:checked').value;
    editDb(profileId, name, email, phone, profile);
    fetchCards();
    submitBtnToUpdate = false;
  }

  clearForm();
  toggleForm();
  fetchCards();
});

window.deleteCard = (e) => {
  let id = parseInt(e.id);
  deleteDb(id);
  fetchCards();
};

window.editCard = (e) => {
  profileId = parseInt(e.dataset.id);
  let editName = e.dataset.name;
  let editEmail = e.dataset.email;
  let editPhone = e.dataset.phone;
  document.getElementById("name").value = editName;
  document.getElementById("email").value = editEmail;
  document.getElementById("phone").value = editPhone;

  form.style.display = "block";

  submitBtnToUpdate = true;
};

// Service worker

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    {
      navigator.serviceWorker.register("./service-worker.js");
    }
  });
}
