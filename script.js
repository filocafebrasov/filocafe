// Elemente pentru secțiunea Despre
const aboutRO = document.getElementById("about-text-ro");
const aboutEN = document.getElementById("about-text-en");

// Butoane limbă
const btnRO = document.getElementById("lang-ro");
const btnEN = document.getElementById("lang-en");

// Încarcă fișierul de traduceri
async function loadTranslations(lang) {
    const response = await fetch(`i18n/${lang}.json`);
    return await response.json();
}

// Aplică traducerile pe elementele cu data-i18n
function applyTranslations(dict) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.textContent = dict[key];
    });
}

// Comutare limba RO
btnRO.addEventListener("click", async () => {
    aboutRO.style.display = "block";
    aboutEN.style.display = "none";

    const dict = await loadTranslations("ro");
    applyTranslations(dict);
});

// Comutare limba EN
btnEN.addEventListener("click", async () => {
    aboutRO.style.display = "none";
    aboutEN.style.display = "block";

    const dict = await loadTranslations("en");
    applyTranslations(dict);
});

// MENIU MOBIL (hamburger)
function toggleMenu() {
    const menu = document.querySelector("nav ul");
    menu.classList.toggle("active");
}

// LIGHTBOX GALERIE
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        lightboxImg.src = item.src;
        lightbox.style.display = "flex";
    });
});

lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
});
