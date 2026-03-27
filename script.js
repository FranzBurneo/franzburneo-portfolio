const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const toggleButtons = document.querySelectorAll(".toggle-button");
const projectImages = document.querySelectorAll(".main-shot, .project-thumbs figure");

if (toggle && header) {
  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("nav-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

toggleButtons.forEach((button) => {
  const targetId = button.getAttribute("data-target");
  const target = targetId ? document.getElementById(targetId) : null;

  if (!target) {
    return;
  }

  button.addEventListener("click", () => {
    const willOpen = target.hasAttribute("hidden");

    if (willOpen) {
      target.removeAttribute("hidden");
    } else {
      target.setAttribute("hidden", "");
    }

    button.setAttribute("aria-expanded", String(willOpen));
    button.textContent = willOpen ? "Hide Screens" : "View Screens";
  });
});

projectImages.forEach((frame) => {
  frame.classList.add("image-frame");

  const image = frame.querySelector("img");
  if (!image) {
    return;
  }

  image.addEventListener("error", () => {
    if (frame.querySelector(".image-fallback")) {
      return;
    }

    frame.classList.add("is-missing");

    const fallback = document.createElement("div");
    fallback.className = "image-fallback";
    fallback.textContent = "Add the screenshot file at the referenced assets path to display this project view.";
    frame.insertBefore(fallback, frame.querySelector("figcaption"));
  });
});
