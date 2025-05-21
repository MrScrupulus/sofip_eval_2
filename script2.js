// Photos pour le carrousel, organisées par catégories
const photos = {
  equipe: [
    { src: "images/cs.jpg", alt: "Équipe 1" },
    { src: "images/League.jpg", alt: "Équipe 2" },
  ],
  tournois: [
    { src: "images/League.jpg", alt: "Tournoi 1" },
    { src: "images/League.jpg", alt: "Tournoi 2" },
    { src: "images/League.jpg", alt: "Tournoi 3" },
    { src: "images/League.jpg", alt: "Tournoi 4" },
  ],
  site: [
    { src: "images/cs.jpg", alt: "Site 1" },
    { src: "images/League.jpg", alt: "Site 2" },
  ],
  evenements: [
    { src: "images/League.jpg", alt: "Événement 1" },
    { src: "images/League.jpg", alt: "Événement 2" },
  ],
};

// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", function() {
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
  accessibilityToggle.addEventListener("change", function() {
    if (this.checked) {
      body.classList.add("rgaa-mode");
      localStorage.setItem("rgaaMode", "true");
    } else {
      body.classList.remove("rgaa-mode");
      localStorage.setItem("rgaaMode", "false");
    }
  });
  
  // Animation du navbar au scroll
  window.addEventListener("scroll", function() {
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
    mobileMenuToggle.addEventListener("click", function() {
      this.classList.toggle("active");
      navLinksContainer.classList.toggle("active");
    });
  }
  
  // Fermer le menu mobile lors d'un clic sur un lien
  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      if (mobileMenuToggle.classList.contains("active")) {
        mobileMenuToggle.classList.remove("active");
        navLinksContainer.classList.remove("active");
      }
    });
  });
  
  // Navigation smoothscroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Fonction pour mettre à jour la section active dans la navigation
  function updateActiveSection() {
    const sections = document.querySelectorAll("section");
    let currentSectionId = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = sectionId;
      }
    });
    
    // Mettre à jour la classe active sur les liens de navigation
    navLinks.forEach(link => {
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
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        // Retirer la classe active de tous les boutons
        galleryFilterBtns.forEach(b => b.classList.remove("active"));
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
  
  if (!carouselInner || !photos[filter]) return;
  
  // Vider le carrousel
  carouselInner.innerHTML = "";
  
  // Ajouter les images correspondant au filtre
  photos[filter].forEach((photo, idx) => {
    const div = document.createElement("div");
    div.className = "carousel-item" + (idx === 0 ? " active" : "");
    div.innerHTML = `
      <img src="${photo.src}" class="d-block w-100" alt="${photo.alt}">
      <div class="carousel-caption d-none d-md-block">
        <h5>${photo.alt}</h5>
      </div>
    `;
    carouselInner.appendChild(div);
  });
  
  // Réinitialiser le carrousel Bootstrap
  const carousel = new bootstrap.Carousel(document.getElementById("carouselGallery"));
  carousel.to(0);
}

// Animation au défilement pour les éléments
const animateOnScroll = function() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight - 100) {
      element.classList.add('animated');
    }
  });
};

// Écouter le défilement pour les animations
window.addEventListener('scroll', animateOnScroll);

// Appeler une première fois pour les éléments déjà visibles
animateOnScroll();