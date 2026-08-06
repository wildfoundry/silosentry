(() => {
  const VISITOR_STORAGE_KEY = "dp-silosentry-visitor-id";
  const USAGE_ENDPOINT = "https://api.dataplicity.com/api/public/silosentry-usage/";

  function prefersNoTracking() {
    try {
      const nav = navigator;
      const flag = nav.doNotTrack || nav.msDoNotTrack || window.doNotTrack;
      return flag === "1" || flag === "yes";
    } catch {
      return false;
    }
  }

  function getVisitorId() {
    try {
      const existing = window.localStorage.getItem(VISITOR_STORAGE_KEY);
      if (existing && /^[A-Za-z0-9_-]+$/.test(existing) && existing.length <= 64) {
        return existing;
      }
      const generated =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID().replace(/-/g, "")
          : `v${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
      window.localStorage.setItem(VISITOR_STORAGE_KEY, generated);
      return generated;
    } catch {
      return null;
    }
  }

  function normalizePath(rawPath) {
    try {
      const url = new URL(rawPath, window.location.origin);
      let path = url.pathname || "/";
      if (!path.startsWith("/")) path = `/${path}`;
      path = path.replace(/\/+/g, "/");
      if (path.length > 1) path = path.replace(/\/$/, "");
      const lowered = path.toLowerCase();
      if (
        lowered.startsWith("/assets/") ||
        lowered.startsWith("/robots") ||
        lowered.startsWith("/sitemap") ||
        lowered.startsWith("/favicon")
      ) {
        return null;
      }
      if (/\.(?:js|css|map|png|jpe?g|gif|svg|ico|webp|woff2?|ttf|eot|txt|json)$/i.test(path)) {
        return null;
      }
      if (lowered.endsWith(".html")) {
        path = path.slice(0, -5) || "/";
      }
      if (path === "/index") path = "/";
      return path;
    } catch {
      return null;
    }
  }

  function trackSiloSentryPageview(rawPath = window.location.pathname) {
    if (prefersNoTracking()) return;
    const path = normalizePath(rawPath);
    const visitorId = getVisitorId();
    if (!path || !visitorId) return;
    const body = JSON.stringify({
      path,
      visitor_id: visitorId,
      referrer: document.referrer || "",
      ts: new Date().toISOString(),
    });
    try {
      if (typeof navigator.sendBeacon === "function") {
        const blob = new Blob([body], { type: "application/json" });
        if (navigator.sendBeacon(USAGE_ENDPOINT, blob)) return;
      }
    } catch {
      // fall through
    }
    try {
      void fetch(USAGE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        mode: "cors",
        credentials: "omit",
        keepalive: true,
      });
    } catch {
      // Best-effort telemetry must never break browsing.
    }
  }

  trackSiloSentryPageview();
})();

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
