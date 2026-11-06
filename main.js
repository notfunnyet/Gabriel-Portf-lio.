(function () {
  "use strict";
  var S = window.SITE, root = document.documentElement;
  var $ = function (s) { return document.querySelector(s); };
  var rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x) e.textContent = x; return e; }

  if (S.profile.age) $("#age").textContent = ", tenho " + S.profile.age + " anos,";

  /* Projetos: tudo via textContent, sem innerHTML */
  var list = $("#list");
  S.projects.forEach(function (p, i) {
    var c = el("article", "card glass" + (i === 0 ? " big" : i === 1 ? " sm" : ""));
    var pv = el("div", "pv");
    if (p.image) { var im = el("img", "shot"); im.src = p.image; im.alt = p.alt || ""; im.loading = "lazy"; im.decoding = "async"; pv.append(im); pv.classList.add("has-shot"); if (p.tall) pv.classList.add("tall"); }
    else { pv.setAttribute("aria-hidden", "true"); pv.append(el("span", "mark", p.mark)); }
    if (p.pages) { var u = el("ul", "pages"); p.pages.forEach(function (n) { u.append(el("li", "", n)); }); pv.append(u); }
    var b = el("div", "cb");
    b.append(el("h3", "", p.title));
    if (p.role) b.append(el("p", "role", p.role));
    b.append(el("p", "", p.text));
    var t = el("ul", "tags"); p.tech.forEach(function (n) { t.append(el("li", "", n)); }); b.append(t);
    var l = el("div", "links");
    if (p.links && p.links.length) p.links.forEach(function (k) {
      var a = el("a", "lk", k.label); a.href = k.href; a.target = "_blank"; a.rel = "noopener noreferrer"; l.append(a);
    }); else l.append(el("span", "soon", "Código em breve"));
    b.append(l); c.append(pv, b); list.append(c);
  });

  /* Discord: copiar usuário */
  var toast = $("#toast"), tt;
  $("#discord").addEventListener("click", function () {
    var done = function (m) { toast.textContent = m; toast.classList.add("on"); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove("on"); }, 2400); };
    (navigator.clipboard ? navigator.clipboard.writeText("notfunnyet") : Promise.reject())
      .then(function () { done("Usuário copiado: notfunnyet"); }, function () { done("Discord: notfunnyet"); });
  });

  if (rm || !window.gsap || !window.ScrollTrigger) return;

  /* Luz que segue o cursor (só roda enquanto há movimento) */
  var mx = innerWidth / 2, my = innerHeight * .3, tx = mx, ty = my, on = false;
  function f() {
    mx += (tx - mx) * .08; my += (ty - my) * .08;
    root.style.setProperty("--mx", mx + "px"); root.style.setProperty("--my", my + "px");
    if (Math.abs(tx - mx) + Math.abs(ty - my) > .5) requestAnimationFrame(f); else on = false;
  }
  addEventListener("pointermove", function (e) { tx = e.clientX; ty = e.clientY; if (!on) { on = true; requestAnimationFrame(f); } }, { passive: true });

  gsap.registerPlugin(ScrollTrigger);

  /* Abertura: o único momento orquestrado */
  gsap.set(".ln span", { yPercent: 115 });
  gsap.timeline({ defaults: { ease: "expo.out" } })
    .to(".ln span", { yPercent: 0, duration: 1.5, stagger: .16, delay: .15 })
    .from(".bar, .lede, .btn", { opacity: 0, y: 18, duration: 1, stagger: .08 }, "-=.9");

  /* Frase do Sobre acende palavra a palavra com o scroll */
  var st = $("#stmt"), words = st.textContent.trim().split(/\s+/);
  st.textContent = "";
  words.forEach(function (w) { st.append(el("span", "w", w), document.createTextNode(" ")); });
  gsap.set("#stmt .w", { opacity: .2 });
  gsap.to("#stmt .w", { opacity: 1, stagger: .1, ease: "none",
    scrollTrigger: { trigger: st, start: "top 80%", end: "bottom 45%", scrub: true } });

  /* Paralaxe leve nas marcas dos cards */
  document.querySelectorAll(".card").forEach(function (c) {
    var m = c.querySelector(".mark"), sh = c.querySelector(".shot");
    if (m) gsap.fromTo(m, { yPercent: -14 }, { yPercent: 14, ease: "none", scrollTrigger: { trigger: c, scrub: true } });
    if (sh) gsap.fromTo(sh, { yPercent: -5, scale: 1.1 }, { yPercent: 5, scale: 1.1, ease: "none", scrollTrigger: { trigger: c, scrub: true } });
  });

  /* Botões magnéticos (respondem ao cursor) */
  document.querySelectorAll(".btn").forEach(function (b) {
    var x = gsap.quickTo(b, "x", { duration: .5, ease: "power3" }), y = gsap.quickTo(b, "y", { duration: .5, ease: "power3" });
    b.addEventListener("pointermove", function (e) { var r = b.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * .25); y((e.clientY - r.top - r.height / 2) * .35); });
    b.addEventListener("pointerleave", function () { x(0); y(0); });
  });
})();
