let translations = {};

async function loadLanguage(lang) {
    const response = await fetch(`lang/${lang}.json`);
    translations = await response.json();
    applyTranslations();
    localStorage.setItem("lang", lang);
}

function applyTranslations() {

    document.querySelectorAll("[data-key]").forEach(el => {

        const key = el.getAttribute("data-key");

        if (translations[key]) {

            // reinicia animación
            el.classList.remove("fade-effect");

            // fuerza reflow
            void el.offsetWidth;

            // cambia texto
            el.textContent = translations[key];

            // agrega animación
            el.classList.add("fade-effect");
        }
    });
}

function changeLanguage(lang) {
    loadLanguage(lang);
}

// idioma guardado o por defecto
const savedLang = localStorage.getItem("lang") || "es";
loadLanguage(savedLang);

const reactionButtons = document.querySelectorAll(".reaction-btn");

reactionButtons.forEach(button => {

    button.addEventListener("click", () => {

        const iconClass = button.dataset.icon;

        for(let i = 0; i < 8; i++){

            const icon = document.createElement("i");

            icon.className = `bi ${iconClass} float-icon`;

            icon.style.left = `${20 + Math.random() * 20}px`;

            icon.style.setProperty(
                "--x",
                `${(Math.random() - 0.5) * 80}px`
            );

            icon.style.animationDuration =
                `${1 + Math.random()}s`;

            button.appendChild(icon);

            setTimeout(() => {
                icon.remove();
            }, 1800);
        }
    });
});