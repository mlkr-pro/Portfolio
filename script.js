const buttons = document.querySelectorAll('.nav-btn');
const cards = document.querySelectorAll('.card');
const moreContainer = document.getElementById('more-btn-container');
const moreBtn = document.getElementById('more-btn');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Gestion visuelle des boutons (Active / Inactive)
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Récupération du filtre cliqué
        const filter = btn.getAttribute('data-filter');

        // Boucle sur chaque carte pour appliquer le tri
        cards.forEach(card => {
            const category = card.getAttribute('data-cat');

            if (filter === 'all' || category === filter) {
                // Carte sélectionnée : Visible, nette, taille normale
                card.style.opacity = '1';
                card.style.filter = 'grayscale(0%)';
                card.style.transform = 'scale(1)';
                card.style.order = '-1'; // Remonte en haut de la grille
                card.style.pointerEvents = 'auto'; // Réactive le clic
            } else {
                // Carte non-sélectionnée : Transparente, grise, plus petite
                card.style.opacity = '0.2';
                card.style.filter = 'grayscale(100%)';
                card.style.transform = 'scale(0.95)';
                card.style.order = '1'; // Descend en bas
                card.style.pointerEvents = 'none'; // Empêche le clic
            }
        });
        // Gestion du bouton "Addicher plus"
        if (filter === 'about') {
            // Si on clique sur "À propos"
            moreContainer.style.display = 'block';
            moreBtn.textContent = 'En savoir plus sur moi →';
            moreBtn.href = 'about.html'; // Pense à créer cette page
        } else if (filter === 'work') {
            // Si on clique sur "Projets"
            moreContainer.style.display = 'block';
            moreBtn.textContent = 'Voir tous les projets →';
            moreBtn.href = 'projets.html'; // Pense à créer cette page
        } else {
            // Pour "*"" ou "Connect", on cache le bouton
            moreContainer.style.display = 'none';
        }
    });
});

// --- ANIMATION TYPEWRITER ---
const textElement = document.getElementById('bio-text');
const descElement = document.getElementById('bio-desc');
const cursorElement = document.querySelector('.cursor');

const codePhrase = 'print("Hello World")'; 
const finalPhrase = 'Hello World';        

let i = 0;

function typeWriter() {
    if (i < codePhrase.length) {
        textElement.textContent += codePhrase.charAt(i);
        i++;
        
        // Génère un temps aléatoire entre 50ms et 250ms pour chaque lettre
        const humanSpeed = Math.floor(Math.random() * 200) + 50;
        
        setTimeout(typeWriter, humanSpeed); 
    } else {
        // Une fois l'écriture finie
        setTimeout(() => {
            textElement.textContent = finalPhrase;
            descElement.style.opacity = '1';
        }, 1000);
    }
}

window.addEventListener('load', typeWriter);

// --- DARK MODE ---
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

// Vérifier si l'utilisateur avait déjà choisi le mode sombre
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeSwitch.checked = true;
}

// Écouter le changement du switch
themeSwitch.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark'); // Sauvegarde
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light'); // Sauvegarde
    }
});