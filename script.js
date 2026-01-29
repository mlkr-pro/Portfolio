gsap.registerPlugin(Flip);

const buttons = document.querySelectorAll('.nav-btn');
const cards = document.querySelectorAll('.card');
const moreContainer = document.getElementById('more-btn-container');
const moreBtn = document.getElementById('more-btn');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targets = [...cards, moreContainer];
        const state = Flip.getState(targets);
        const filter = btn.getAttribute('data-filter');

        cards.forEach(card => {
            const category = card.getAttribute('data-cat');
            if (filter === 'all' || category === filter) {
                card.style.display = "flex"; 
                card.style.opacity = '1';
                card.style.filter = 'grayscale(0%)';
            } 
            else {
                card.style.display = "none"; 
            }
        });

        if (filter === 'about') {
            moreContainer.style.display = 'block';
            moreBtn.textContent = 'En savoir plus sur moi →';
            moreBtn.href = 'about.html';
        } 
        else if (filter === 'work') {
            moreContainer.style.display = 'block';
            moreBtn.textContent = 'Voir tous les projets →';
            moreBtn.href = 'projets.html';
        } 
        else {
            moreContainer.style.display = 'none';
        }

        Flip.from(state, {
            duration: 0.7,
            ease: "power2.inOut",
            absolute: true, 
            onEnter: elements => {
                return gsap.fromTo(elements, 
                    {opacity: 0, scale: 0}, 
                    {opacity: 1, scale: 1, duration: 0.7, ease: "power2.inOut"}
                );
            },
            
            onLeave: elements => {
                return gsap.to(elements, 
                    {opacity: 0, scale: 0, duration: 0.7, ease: "power2.inOut"}
                );
            }
        });
    });
});

// ANIMATION TYPEWRITER 
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
        // Génère un temps aléatoire entre 50ms et 250ms
        const humanSpeed = Math.floor(Math.random() * 200) + 50;
        setTimeout(typeWriter, humanSpeed); 
    } 
    else {
        setTimeout(() => {
            textElement.textContent = finalPhrase;
            descElement.style.opacity = '1';
        }, 1000);
    }
}

window.addEventListener('load', typeWriter);

// DARK MODE
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } 
    else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// LIGHTBOX IMAGE
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("img-en-grand");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close-modal");
const projectImage = document.querySelector(".project-visual img");
if (projectImage) {
    projectImage.onclick = function(){
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modalImg.src = this.src;
    }
}
if (closeBtn) {
    closeBtn.onclick = function() { 
        modal.style.display = "none";
    }
}
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});