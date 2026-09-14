/* TRADUCERI */
const translations = {
  ro: {
    nav_home: "Acasă",
    nav_about: "Despre",
    nav_menu: "Meniu",
    nav_gallery: "Galerie",
    nav_location: "Locație",
    nav_contact: "Contact",

    hero_title: "Filo Cafe Brașov",
    hero_subtitle: "Cafea de specialitate, atmosferă cozy și priveliște spre centrul vechi al Brașovului.",
    cta_button: "Vezi meniul",

    about_title: "Despre Filo Cafe",
    about_text: "Filo Cafe este un spațiu dedicat celor care iubesc cafeaua bună, conversațiile liniștite și un design cald, urban.",

    menu_title: "Meniu",
    menu_espresso: "Single / Double",
    menu_cappuccino: "Espresso, lapte, spumă fină",
    menu_flatwhite: "Espresso dublu, lapte cremos",
    menu_latte: "Espresso, lapte, arome la alegere",

    gallery_title: "Galerie foto",

    location_title: "Locație & Program",
    location_address: "Adresă: Strada Exemplu nr. 1, Brașov",
    location_schedule: "Program: Luni–Duminică, 08:00–21:00",

    contact_title: "Contact",
    contact_phone: "Telefon: 07xx xxx xxx",
    contact_email: "Email: contact@filocafe.ro",

    social_facebook: "Facebook",
    social_instagram: "Instagram"
  },

  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_menu: "Menu",
    nav_gallery: "Gallery",
    nav_location: "Location",
    nav_contact: "Contact",

    hero_title: "Filo Cafe Brașov",
    hero_subtitle: "Specialty coffee, cozy atmosphere and a beautiful view of Brașov’s old town.",
    cta_button: "View Menu",

    about_title: "About Filo Cafe",
    about_text: "Filo Cafe is a space dedicated to those who love good coffee, quiet conversations and warm urban design.",

    menu_title: "Menu",
    menu_espresso: "Single / Double",
    menu_cappuccino: "Espresso, milk, fine foam",
    menu_flatwhite: "Double espresso, creamy milk",
    menu_latte: "Espresso, milk, flavors of your choice",

    gallery_title: "Photo Gallery",

    location_title: "Location & Schedule",
    location_address: "Address: Exemplu Street no. 1, Brașov",
    location_schedule: "Schedule: Monday–Sunday, 08:00–21:00",

    contact_title: "Contact",
    contact_phone: "Phone: 07xx xxx xxx",
    contact_email: "Email: contact@filocafe.ro",

    social_facebook: "Facebook",
    social_instagram: "Instagram"
  }
};

/* SCHIMBARE LIMBĂ */
function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key];
  });
}

document.getElementById("lang-ro").addEventListener("click", () => setLanguage("ro"));
document.getElementById("lang-en").addEventListener("click", () => setLanguage("en"));

/* LIGHTBOX GALERIE */
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

galleryItems.forEach(item => {
  item.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = item.src;
  });
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});
