const photos = {
    equipe: [
        { src: "docs & divers/cs.jpg", alt: "Équipe 1" },
        { src: "docs & divers/League.jpg", alt: "Équipe 2" }
    ],
    tournois: [
        { src: "docs & divers/League.jpg", alt: "Tournoi 1" },
        { src: "docs & divers/League.jpg", alt: "Tournoi 1" },
        { src: "docs & divers/League.jpg", alt: "Tournoi 1" },
        { src: "docs & divers/League.jpg", alt: "Tournoi 2" }
    ],
    site: [
        { src: "docs & divers/cs.jpg", alt: "Entraînement 1" },
        { src: "docs & divers/League.jpg", alt: "Entraînement 2" }
    ],
    evenements: [
        { src: "docs & divers/League.jpg", alt: "Divers 1" },
        { src: "docs & divers/League.jpg", alt: "Divers 2" }
    ]
};

function TournePhoto(section) {
    const carouselInner = document.getElementById('carousel-inner');
    carouselInner.innerHTML = '';
    photos[section].forEach((photo, idx) => {
        const div = document.createElement('div');
        div.className = 'carousel-item' + (idx === 0 ? ' active' : '');
        div.innerHTML = `<img src="${photo.src}" class="d-block w-100" alt="${photo.alt}">`;
        carouselInner.appendChild(div);
    });
    // Réinitialise le carousel Bootstrap à la première image
    const carousel = bootstrap.Carousel.getOrCreateInstance(document.getElementById('carouselExample'));
    carousel.to(0);
}

// Charge la première section par défaut
window.onload = () => TournePhoto('equipe');