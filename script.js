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

// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", function () {
  // Référence des éléments DOM
  const body = document.body;
  const navbar = document.querySelector(".main-navbar");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinksContainer = document.querySelector(".nav-links-container");
  const navLinks = document.querySelectorAll(".nav-link");
  const accessibilityToggle = document.getElementById("accessibility-toggle");
  const galleryFilterBtns = document.querySelectorAll(".gallery-filter-btn");

  // Vérifier si le mode d'accessibilité était activé précédemment
  const rgaaMode = localStorage.getItem("rgaaMode") === "true";
  if (rgaaMode) {
    body.classList.add("rgaa-mode");
    accessibilityToggle.checked = true;
  }

  // Gérer le changement du toggle d'accessibilité
  accessibilityToggle.addEventListener("change", function () {
    if (this.checked) {
      body.classList.add("rgaa-mode");
      localStorage.setItem("rgaaMode", "true");
    } else {
      body.classList.remove("rgaa-mode");
      localStorage.setItem("rgaaMode", "false");
    }
  });

  // Animation du navbar au scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Mettre à jour le lien actif en fonction de la section visible
    updateActiveSection();
  });

  // Gestion du menu mobile
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navLinksContainer.classList.toggle("active");
    });
  }

  // Fermer le menu mobile lors d'un clic sur un lien
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (mobileMenuToggle.classList.contains("active")) {
        mobileMenuToggle.classList.remove("active");
        navLinksContainer.classList.remove("active");
      }
    });
  });

  // Navigation smoothscroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Fonction pour mettre à jour la section active dans la navigation
  function updateActiveSection() {
    const sections = document.querySelectorAll("section");
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSectionId = sectionId;
      }
    });

    // Mettre à jour la classe active sur les liens de navigation
    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href").substring(1);
      if (href === currentSectionId) {
        link.classList.add("active");
      }
    });
  }

  // Initialiser le carrousel
  initGallery();

  // Gérer les filtres de la galerie
  if (galleryFilterBtns.length > 0) {
    galleryFilterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Retirer la classe active de tous les boutons
        galleryFilterBtns.forEach((b) => b.classList.remove("active"));
        // Ajouter la classe active au bouton cliqué
        this.classList.add("active");

        // Charger les images correspondant au filtre
        const filter = this.getAttribute("data-filter");
        loadGalleryImages(filter);
      });
    });
  }

  // Appeler updateActiveSection au chargement de la page
  updateActiveSection();

  // Gérer le clic en dehors du menu pour le fermer
  document.addEventListener("click", function (event) {
    const isClickInsideNav = navLinksContainer.contains(event.target);
    const isClickOnToggle = mobileMenuToggle.contains(event.target);

    if (
      !isClickInsideNav &&
      !isClickOnToggle &&
      navLinksContainer.classList.contains("active")
    ) {
      mobileMenuToggle.classList.remove("active");
      navLinksContainer.classList.remove("active");
    }
  });

  // Empêcher la propagation du clic à l'intérieur du menu
  navLinksContainer.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});

// Fonction pour initialiser la galerie
function initGallery() {
  // Charger la première catégorie par défaut (équipe)
  loadGalleryImages("equipe");

  // Activer le premier bouton
  const firstFilterBtn = document.querySelector(".gallery-filter-btn");
  if (firstFilterBtn) {
    firstFilterBtn.classList.add("active");
  }
}

// Fonction pour charger les images de la galerie en fonction du filtre
function loadGalleryImages(filter) {
  const carouselInner = document.getElementById("carousel-inner");
  const titleContainer = document.querySelector(".gallery-title");
  const descriptionContainer = document.querySelector(".gallery-description");

  if (!carouselInner || !photos[filter]) return;

  carouselInner.innerHTML = "";

  photos[filter].forEach((photo, idx) => {
    const div = document.createElement("div");
    div.className = "carousel-item" + (idx === 0 ? " active" : "");
    div.innerHTML = `
      <div class="carousel-content-wrapper">
        <img src="${photo.src}" class="carousel-image" alt="${photo.alt}">
      </div>
    `;
    carouselInner.appendChild(div);

    // Met à jour le titre et la description pour la première image
    if (idx === 0) {
      titleContainer.innerHTML = `<h3>${photo.title}</h3>`;
      descriptionContainer.innerHTML = `<p>${photo.description}</p>`;
    }
  });

  // Détruire l'ancien carrousel s'il existe
  const oldCarousel = bootstrap.Carousel.getInstance(
    document.getElementById("carouselGallery")
  );
  if (oldCarousel) {
    oldCarousel.dispose();
  }

  // Initialiser un nouveau carrousel
  const carousel = new bootstrap.Carousel(
    document.getElementById("carouselGallery")
  );

  // Ajouter l'écouteur d'événements pour le changement de slide
  document
    .getElementById("carouselGallery")
    .addEventListener("slide.bs.carousel", (event) => {
      const slideIndex = event.to;
      const currentPhoto = photos[filter][slideIndex];
      titleContainer.innerHTML = `<h3>${currentPhoto.title}</h3>`;
      descriptionContainer.innerHTML = `<p>${currentPhoto.description}</p>`;
    });
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
