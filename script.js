/*
  PERSONALIZE SEUS CONTATOS AQUI:
  Preencha os campos com seus links verdadeiros.
  Exemplo: github: "https://github.com/seuusuario"
*/
const PROFILE = {
  email: "",
  github: "",
  linkedin: "",
  instagram: ""
};

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("bruno-portfolio-theme");
if (savedTheme === "light") root.setAttribute("data-theme", "light");

themeToggle?.addEventListener("click", () => {
  const light = root.getAttribute("data-theme") !== "light";
  if (light) root.setAttribute("data-theme", "light");
  else root.removeAttribute("data-theme");
  localStorage.setItem("bruno-portfolio-theme", light ? "light" : "dark");
  themeToggle.querySelector(".theme-icon").textContent = light ? "☾" : "☼";
});
if (root.getAttribute("data-theme") === "light") {
  themeToggle.querySelector(".theme-icon").textContent = "☾";
}

const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".desktop-nav");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

const emailLink = document.getElementById("emailLink");
const contactConfig = document.getElementById("contactConfig");
const socialLinks = document.getElementById("socialLinks");
const contacts = [
  ["GitHub", PROFILE.github],
  ["LinkedIn", PROFILE.linkedin],
  ["Instagram", PROFILE.instagram]
].filter(([, url]) => url && url.trim());

if (PROFILE.email && PROFILE.email.trim()) {
  emailLink.href = `mailto:${PROFILE.email}`;
  emailLink.textContent = "Enviar um e-mail ↗";
  contactConfig.hidden = true;
} else {
  emailLink.addEventListener("click", event => {
    event.preventDefault();
    contactConfig.textContent = "Para ativar o contato por e-mail, preencha o campo email no arquivo script.js.";
  });
}
contacts.forEach(([name, url]) => {
  const a = document.createElement("a");
  a.href = url;
  a.textContent = name;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  socialLinks.appendChild(a);
});
if (contacts.length || PROFILE.email) contactConfig.hidden = true;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
