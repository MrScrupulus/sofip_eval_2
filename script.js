document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".index_nav");
  const header = document.querySelector(".index_container_olympe");
  const headerHeight = header.offsetHeight;
  const firstSection = document.querySelector(".index_section");
  let lastScroll = 0;

  // Créer un élément placeholder pour maintenir l'espace
  const placeholder = document.createElement("div");
  placeholder.className = "placeholder";
  document.body.insertBefore(placeholder, firstSection);

  // Récupérer le titre de présentation
  const presentationTitle = firstSection.querySelector("h2");

  // Fonction pour gérer le défilement
  function handleScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > headerHeight) {
      // Quand on dépasse la hauteur de l'en-tête
      if (!nav.classList.contains("fixed")) {
        placeholder.style.height = headerHeight + "px";
        nav.classList.add("fixed");
        header.classList.add("hidden");
      }

      // Faire apparaître le titre de présentation seulement quand on descend
      if (presentationTitle) {
        presentationTitle.style.opacity = "1";
      }
    } else {
      // Quand on est en haut de la page
      nav.classList.remove("fixed");
      header.classList.remove("hidden");
      placeholder.style.height = "0px";

      // Si on remonte tout en haut, cacher le titre de présentation
      if (currentScroll < 10 && presentationTitle) {
        presentationTitle.style.opacity = "0";
      }
    }

    lastScroll = currentScroll;
  }

  // Initialiser l'état du titre de présentation
  if (presentationTitle) {
    presentationTitle.style.opacity = window.pageYOffset > 10 ? "1" : "0";
  }

  // Écouter l'événement de défilement
  window.addEventListener("scroll", handleScroll);

  // Gestion des sections actives
  function updateActiveSection() {
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".index_nav_li");

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        navItems.forEach((item) => item.classList.remove("current"));
        navItems[index].classList.add("current");
      }
    });
  }

  // Écouteur pour le scroll
  window.addEventListener("scroll", updateActiveSection);
  updateActiveSection();

  // Gestion du scroll smooth
  document.querySelectorAll(".index_nav_li a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      const navHeight = nav.offsetHeight;

      window.scrollTo({
        top: targetSection.offsetTop - navHeight,
        behavior: "smooth",
      });
    });
  });
});

// Gestion du carousel
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".index_nav");
  const header = document.querySelector(".index_container_olympe");
  const headerHeight = header.offsetHeight;
  let lastScroll = 0;

  // Gestion de la nav fixe
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > headerHeight) {
      nav.classList.add("fixed");
      header.classList.add("hidden");
    } else {
      nav.classList.remove("fixed");
      header.classList.remove("hidden");
    }

    lastScroll = currentScroll;
  });

  // Gestion des sections actives
  function updateActiveSection() {
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".index_nav_li");

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        navItems.forEach((item) => item.classList.remove("current"));
        navItems[index].classList.add("current");
        navItems.forEach((item) => item.removeAttribute("aria-current"));
        navItems[index].setAttribute("aria-current", "page");
      }
    });
  }

  // Écouteur pour le scroll
  window.addEventListener("scroll", updateActiveSection);
  updateActiveSection();

  // Gestion du scroll smooth
  document.querySelectorAll(".index_nav_li a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      const navHeight = nav.offsetHeight;

      window.scrollTo({
        top: targetSection.offsetTop - navHeight,
        behavior: "smooth",
      });
    });
  });
});

// Gestion du mode RGAA
document.addEventListener("DOMContentLoaded", function () {
  const accessibilityToggle = document.getElementById("accessibility-toggle");

  // Vérifier si le mode RGAA était activé précédemment
  const rgaaMode = localStorage.getItem("rgaaMode") === "true";
  if (rgaaMode) {
    document.body.classList.add("rgaa-mode");
    accessibilityToggle.checked = true;
  }

  // Gérer le changement du toggle
  accessibilityToggle.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("rgaa-mode");
      localStorage.setItem("rgaaMode", "true");
    } else {
      document.body.classList.remove("rgaa-mode");
      localStorage.setItem("rgaaMode", "false");
    }
  });
});

// Gestion du carousel
const photos = {
  equipe: [
    { src: "images/cs.jpg", alt: "Équipe 1" },
    { src: "images/League.jpg", alt: "Équipe 2" },
  ],
  tournois: [
    { src: "images/League.jpg", alt: "Tournoi 1" },
    { src: "images/League.jpg", alt: "Tournoi 1" },
    { src: "images/League.jpg", alt: "Tournoi 1" },
    { src: "images/League.jpg", alt: "Tournoi 2" },
  ],
  site: [
    { src: "images/cs.jpg", alt: "Entraînement 1" },
    { src: "images/League.jpg", alt: "Entraînement 2" },
  ],
  evenements: [
    { src: "images/League.jpg", alt: "Divers 1" },
    { src: "images/League.jpg", alt: "Divers 2" },
  ],
};

function TournePhoto(section) {
  const carouselInner = document.getElementById("carousel-inner");
  carouselInner.innerHTML = "";
  photos[section].forEach((photo, idx) => {
    const div = document.createElement("div");
    div.className = "carousel-item" + (idx === 0 ? " active" : "");
    div.innerHTML = `<img src="${photo.src}" class="d-block w-100" alt="${photo.alt}">`;
    carouselInner.appendChild(div);
  });
  // Réinitialise le carousel Bootstrap à la première image
  const carousel = bootstrap.Carousel.getOrCreateInstance(
    document.getElementById("carouselExample")
  );
  carousel.to(0);
}

// Charge la première section par défaut
window.onload = () => TournePhoto("equipe");

//Gestion d'affichage des composants matériels
document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".machine_toggleButton");

  toggleButtons.forEach((button) => {
    const targetContentId = button.getAttribute("aria-controls");
    const hiddenContent = document.getElementById(targetContentId);

    //Vérification des contenue caché
    if (hiddenContent && !hiddenContent.classList.contains("hidden")) {
      hiddenContent.classList.add("hidden");
      button.setAttribute("aria-expanded", "false");
      buttonText.textContent = "Afficher le contenu";
    }

    button.addEventListener("click", function () {
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      //Changement d'état
      this.setAttribute("aria-expanded", !isExpanded);

      //Afficher ou cacher le contenu associé (utilisant l'ID du aria-controls)
      if (hiddenContent) {
        hiddenContent.classList.toggle("hidden");
      }
    });
  });
});
