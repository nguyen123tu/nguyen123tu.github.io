document.addEventListener("DOMContentLoaded", () => {
  const progress = document.querySelector("#scroll-progress");
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max ? scrollY / max : 0})`;
  };
  addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".desktop-nav");
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));
});
