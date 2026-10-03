const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const closeMenu = document.getElementById("closeMenu");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");

menuToggle.addEventListener("click", () => navLinks.classList.add("open"));
closeMenu.addEventListener("click", () => navLinks.classList.remove("open"));

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const icon = themeToggle.querySelector("i");
  icon.className = body.classList.contains("light")
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
  localStorage.setItem("portfolioTheme", body.classList.contains("light") ? "light" : "dark");
});

if (localStorage.getItem("portfolioTheme") === "light") {
  body.classList.add("light");
  themeToggle.querySelector("i").className = "fa-solid fa-sun";
}

const loader = document.querySelector(".page-loader");
window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 350);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    projects.forEach(project => {
      project.style.display =
        filter === "all" || project.dataset.category === filter ? "block" : "none";
    });
  });
});

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navItems.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

document.getElementById("year").textContent = new Date().getFullYear();