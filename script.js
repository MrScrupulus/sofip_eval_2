document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".index_nav");
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".index_nav_li");

  // Gestion des sections actives
  function updateActiveSection() {
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
