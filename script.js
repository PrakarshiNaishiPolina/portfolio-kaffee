
document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // FOOTER YEAR
  // ==========================

  const yearElement = document.getElementById("y");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ==========================
  // PAGE LOADER
  // ==========================

  const loader = document.querySelector(".loader");

  if (loader) {
    window.setTimeout(() => {
      loader.style.display = "none";
    }, 1500);
  }

  // ==========================
  // LIGHT / DARK THEME TOGGLE
  // ==========================

  const themeToggle = document.getElementById("tg");
  const root = document.documentElement;

  function getPreferredTheme() {
    try {
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
    } catch (error) {
      // Continue with the system preference if storage is unavailable.
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark"
          ? "Switch to light theme"
          : "Switch to dark theme"
      );

      themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    }

    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      // The theme still works for this page even if storage is unavailable.
    }
  }

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = root.dataset.theme || "light";

      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }

  // ==========================
  // SCROLL REVEAL ANIMATIONS
  // ==========================

  const revealElements = document.querySelectorAll(".s");

  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    // Keep content visible if IntersectionObserver is unavailable.
    revealElements.forEach((element) => {
      element.classList.add("in");
    });
  }

  // ==========================
  // CUSTOM CURSOR
  // ==========================

  const cursor = document.querySelector(".cursor");
  const supportsCustomCursor = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (cursor && supportsCustomCursor) {
    let cursorVisible = false;

    document.addEventListener("mousemove", (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;

      if (!cursorVisible) {
        cursor.classList.add("on");
        cursorVisible = true;
      }
    });

    document.addEventListener("mouseleave", () => {
      cursor.classList.remove("on");
      cursorVisible = false;
    });

    document.addEventListener("mouseenter", () => {
      cursor.classList.add("on");
      cursorVisible = true;
    });

    document.querySelectorAll("a, button").forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.classList.add("text");
      });

      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("text");
      });
    });

    document.addEventListener("mousedown", () => {
      cursor.classList.add("down");
    });

    document.addEventListener("mouseup", () => {
      cursor.classList.remove("down");
    });
  }
});
