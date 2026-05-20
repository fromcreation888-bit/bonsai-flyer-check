const menuToggle = document.getElementById("menuToggle");
const globalNav = document.getElementById("globalNav");

if (menuToggle && globalNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    globalNav.classList.toggle("is-open");
  });

  globalNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      globalNav.classList.remove("is-open");
    });
  });
}
