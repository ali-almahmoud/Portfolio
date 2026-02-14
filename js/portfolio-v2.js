document.addEventListener("DOMContentLoaded", () => {
  /* ──────────────────────────────────────────────
           1. THEME TOGGLE — Dark ↔ Light
           ────────────────────────────────────────────── */
  const themeToggle = document.getElementById("themeToggle");
  const iconSun = document.getElementById("iconSun");
  const iconMoon = document.getElementById("iconMoon");

  // Check for saved preference
  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    iconSun.style.display = "none";
    iconMoon.style.display = "block";
  }

  themeToggle.addEventListener("click", () => {
    const isLight =
      document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      iconSun.style.display = "block";
      iconMoon.style.display = "none";
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      iconSun.style.display = "none";
      iconMoon.style.display = "block";
      localStorage.setItem("theme", "light");
    }
  });

  /* ──────────────────────────────────────────────
           2. NAVBAR — Background on scroll + active link
           ────────────────────────────────────────────── */
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll("section[id]");

  const handleNavbarScroll = () => {
    navbar.classList.toggle("navbar--scrolled", window.scrollY > 60);
  };

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("nav__link--active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("nav__link--active");
          }
        });
      }
    });
  };

  window.addEventListener(
    "scroll",
    () => {
      handleNavbarScroll();
      updateActiveLink();
    },
    { passive: true },
  );

  /* ──────────────────────────────────────────────
           3. HAMBURGER MENU — Mobile toggle
           ────────────────────────────────────────────── */
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger--active");
    nav.classList.toggle("nav--open");
    document.body.style.overflow = nav.classList.contains("nav--open")
      ? "hidden"
      : "";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("hamburger--active");
      nav.classList.remove("nav--open");
      document.body.style.overflow = "";
    });
  });

  /* ──────────────────────────────────────────────
           4. SCROLL REVEAL — Intersection Observer
           ────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ──────────────────────────────────────────────
           5. SKILL BARS — Animate on scroll
           ────────────────────────────────────────────── */
  const skillCards = document.querySelectorAll(".skill-card");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const percent = card.getAttribute("data-percent");
          const fill = card.querySelector(".skill-card__bar-fill");

          fill.style.width = `${percent}%`;
          fill.classList.add("skill-card__bar-fill--animated");

          skillObserver.unobserve(card);
        }
      });
    },
    { threshold: 0.3 },
  );

  skillCards.forEach((card) => skillObserver.observe(card));
});
