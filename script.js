const photos = {
    equipe: [
        { src: "images/cs.jpg", alt: "Équipe 1" },
        { src: "images/League.jpg", alt: "Équipe 2" }
    ],
    tournois: [
        { src: "images/League.jpg", alt: "Tournoi 1" },
        { src: "images/League.jpg", alt: "Tournoi 1" },
        { src: "images/League.jpg", alt: "Tournoi 1" },
        { src: "images/League.jpg", alt: "Tournoi 2" }
    ],
    site: [
        { src: "images/cs.jpg", alt: "Entraînement 1" },
        { src: "images/League.jpg", alt: "Entraînement 2" }
    ],
    evenements: [
        { src: "images/League.jpg", alt: "Divers 1" },
        { src: "images/League.jpg", alt: "Divers 2" }
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