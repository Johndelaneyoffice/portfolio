/* ==========================================================================
   Rendering and behaviour. Copy lives in content.js; you normally don't
   need to edit this file.
   ========================================================================== */
(function () {
  "use strict";

  var S = SITE;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fill(str) { return esc(str.replace(/\{name\}/g, S.name)); }

  var ICONS = {
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>',
    landmark: '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
    trending: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    building: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    doc: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h8M8 17h5"/>'
  };
  function icon(name, cls) {
    return '<svg class="icon ' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + ICONS[name] + "</svg>";
  }

  function head(id, eyebrow, title, extra) {
    return '<div class="section-head reveal">' +
      '<p class="eyebrow">' + esc(eyebrow) + "</p>" +
      '<h2 id="' + id + '">' + esc(title) + "</h2>" +
      '<div class="hairline" aria-hidden="true"></div>' +
      (extra || "") + "</div>";
  }

  function counter(v) {
    return '<span class="count" data-value="' + v.value + '" data-prefix="' + esc(v.prefix || "") +
      '" data-suffix="' + esc(v.suffix || "") + '" aria-label="' + esc((v.prefix || "") + v.value + (v.suffix || "")) +
      '"><span aria-hidden="true">' + esc((v.prefix || "") + "0" + (v.suffix || "")) + "</span></span>";
  }

  /* ---------- document + header ---------- */
  document.title = S.name + " | " + S.role + ", London";
  $("#brand-name").textContent = S.name;

  var navHtml = S.nav.map(function (n) {
    return '<li><a href="' + n.href + '">' + esc(n.label) + "</a></li>";
  }).join("");
  $("#nav-list").innerHTML = navHtml;
  $("#mobile-nav-list").innerHTML = navHtml;

  /* ---------- hero ---------- */
  var H = S.hero;
  $("#hero-eyebrow").textContent = H.eyebrow;
  $("#hero-title").textContent = H.headline;
  $("#hero-sub").textContent = H.sub;
  $("#hero-actions").innerHTML =
    '<a class="btn btn-primary" href="mailto:' + esc(S.contact.email) + '">' + esc(H.primary.label) + "</a>" +
    '<a class="btn btn-secondary" href="' + H.secondary.href + '">' + esc(H.secondary.label) + "</a>";
  $("#hero-stats").innerHTML = H.stats.map(function (s) {
    return '<li><span class="stat-num">' + counter(s) + '</span><span class="stat-label">' + esc(s.label) + "</span></li>";
  }).join("");

  /* ---------- about ---------- */
  var A = S.about;
  $("#about").innerHTML =
    '<div class="container about-grid">' +
      '<figure class="portrait reveal">' +
        '<div class="portrait-frame"><img src="' + esc(A.photo.src) + '" alt="Portrait of ' + esc(S.name) + '" width="900" height="1350" loading="lazy" decoding="async"></div>' +
      "</figure>" +
      '<div class="about-copy">' +
        head("about-title", A.eyebrow, A.title) +
        A.paragraphs.map(function (p, i) {
          return '<p class="lead-p reveal" style="--d:' + (i * 90 + 80) + 'ms">' + fill(p) + "</p>";
        }).join("") +
        '<blockquote class="pull-quote reveal">' + esc(A.quote) + "</blockquote>" +
      "</div>" +
    "</div>";

  /* ---------- expertise ---------- */
  var E = S.expertise;
  $("#expertise").innerHTML =
    '<div class="container">' + head("expertise-title", E.eyebrow, E.title) +
    '<ul class="card-grid">' +
    E.items.map(function (it, i) {
      return '<li class="card reveal" style="--d:' + (i % 3) * 90 + 'ms">' + icon(it.icon, "card-icon") +
        "<h3>" + esc(it.title) + "</h3><p>" + esc(it.text) + "</p></li>";
    }).join("") + "</ul></div>";

  /* ---------- contact ---------- */
  var C = S.contactSection;
  var mailto = "mailto:" + esc(S.contact.email);
  $("#contact").innerHTML =
    '<div class="container contact-simple">' +
      head("contact-title", C.eyebrow, C.title) +
      '<p class="impact-body reveal">' + esc(C.note) + "</p>" +
      '<div class="contact-links reveal">' +
        '<a class="btn btn-primary" href="' + mailto + '">' + esc(C.buttonLabel) + "</a>" +
        '<a class="btn btn-secondary" href="' + esc(S.contact.linkedin) + '" target="_blank" rel="noopener noreferrer">' + icon("linkedin", "icon-sm") + esc(C.linkedinLabel) + "</a>" +
      "</div>" +
    "</div>";

  /* ---------- footer ---------- */
  $("#footer").innerHTML =
    '<div class="container footer-inner">' +
      '<div><p class="footer-name">' + esc(S.name) + '</p><p class="footer-role">' + esc(S.role) + "</p></div>" +
      '<div class="footer-right"><p>© ' + new Date().getFullYear() + " " + esc(S.name) + "</p><p>" + esc(S.footer.privacy) + "</p></div>" +
    "</div>";

  /* ---------- sticky header blur ---------- */
  var header = $("#header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 24); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  var menuBtn = $("#menu-btn");
  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    header.classList.toggle("menu-open", open);
  }
  menuBtn.addEventListener("click", function () {
    setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
  });
  $("#mobile-nav").addEventListener("click", function (e) {
    if (e.target.tagName === "A") setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---------- scroll spy ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-list a"));
  var sections = links.map(function (a) { return $(a.getAttribute("href")); }).filter(Boolean);
  function spy() {
    var y = window.scrollY + 140;
    var current = null;
    sections.forEach(function (s) { if (s.offsetTop <= y) current = s.id; });
    links.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + current;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  }
  spy();
  window.addEventListener("scroll", spy, { passive: true });

  /* ---------- reveal + count-up ---------- */
  function runCount(el) {
    var target = Number(el.dataset.value);
    var pre = el.dataset.prefix, suf = el.dataset.suffix;
    var out = el.firstChild;
    if (reduceMotion) { out.textContent = pre + target + suf; return; }
    var dur = 2200, start = null;
    function tick(ts) {
      if (start === null) start = ts;
      var t = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      out.textContent = pre + Math.round(target * eased) + suf;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var revealEls = document.querySelectorAll(".reveal");
  var countEls = document.querySelectorAll(".count");

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
    countEls.forEach(function (el) { runCount(el); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });

    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCount(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    countEls.forEach(function (el) { co.observe(el); });
  }

})();
