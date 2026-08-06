(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    const nodes = document.querySelectorAll(
      ".section__head, .contrast, .loop, .beat, .day__step, .mapline, .close-cta"
    );
    nodes.forEach((el) => el.classList.add("reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    nodes.forEach((el) => io.observe(el));
  }

  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const imgEl = lightbox.querySelector(".lightbox__img");
  const capEl = lightbox.querySelector(".lightbox__cap");
  let lastFocus = null;

  function openLightbox(img) {
    if (!(img instanceof HTMLImageElement)) return;
    lastFocus = document.activeElement;
    imgEl.src = img.currentSrc || img.src;
    imgEl.alt = img.alt || "";
    const fig = img.closest("figure");
    const caption = fig?.querySelector("figcaption")?.textContent?.trim() || "";
    if (caption) {
      capEl.hidden = false;
      capEl.textContent = caption;
    } else {
      capEl.hidden = true;
      capEl.textContent = "";
    }
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    lightbox.querySelector(".lightbox__close")?.focus();
  }

  function closeLightbox() {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    imgEl.removeAttribute("src");
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  document.querySelectorAll("figure.shot > img").forEach((img) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "shot__zoom";
    button.setAttribute(
      "aria-label",
      `Enlarge screenshot${img.alt ? `: ${img.alt}` : ""}`
    );
    img.replaceWith(button);
    button.appendChild(img);
    button.addEventListener("click", () => openLightbox(img));
  });

  lightbox.querySelectorAll("[data-lightbox-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
})();
