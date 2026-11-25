/* Shared behaviour: header, footer, watermarks, terminal, certificates, book, contact form. */
(function () {
  "use strict";
  var S = window.SITE, CERTS = window.CERTIFICATES || [], B = window.BOOK || {};
  var page = document.body.getAttribute("data-page") || "home";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- tiny helpers ---------- */
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];      // only used with static strings below
      else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }
  var P = {
    mail: '<path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><path d="m3 7 9 6 9-6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.7 7L3 21l2-5.2A8 8 0 1 1 21 12z"/><path d="M9 10c0 3 2 5 5 5l1.2-1.6-2-1-.8.8c-.9-.4-1.6-1.2-2-2l.8-.8-1-2z"/>',
    arrow: '<path d="M7 17 17 7M8 7h9v9"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    down: '<path d="M12 3v12m0 0 5-5m-5 5-5-5M4 20h16"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M9 7h6"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
    term: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    cert: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
    pin: '<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>'
  };
  function icon(n) { return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (P[n] || "") + "</svg>"; }
  function ic(n) { var s = el("span", { html: icon(n) }); return s.firstChild; }

  /* ---------- announcement + nav ---------- */
  var NAV = [["Home", "index.html", "home"], ["About", "about.html", "about"], ["Certification", "certification.html", "certification"], ["Book", "book.html", "book"], ["Contact", "contact.html", "contact"]];
  var annHost = document.getElementById("announce");
  if (annHost && S.announcement) {
    annHost.className = "announce";
    annHost.appendChild(el("div", { class: "container" }, [
      el("p", { text: S.announcement }),
      B.pdf ? el("a", { href: "book.html" }, ["Get the book"]) : null
    ]));
  }
  var navHost = document.getElementById("nav");
  if (navHost) {
    var brand = el("a", { class: "brand", href: "index.html", "aria-label": S.alias + " — home" }, [
      el("img", { src: "assets/img/avatar.jpg", alt: "", width: "38", height: "38" }),
      el("span", {}, [el("b", { text: S.alias }), el("small", { text: "cs · pentest · red team" })])
    ]);
    var ul = el("ul", { class: "menu", id: "menu" });
    NAV.forEach(function (n) {
      var a = el("a", { href: n[1], text: n[0] });
      if (n[2] === page) a.setAttribute("aria-current", "page");
      ul.appendChild(el("li", {}, [a]));
    });
    var burger = el("button", { class: "burger", "aria-label": "Toggle menu", "aria-expanded": "false", "aria-controls": "menu" }, [el("span")]);
    burger.addEventListener("click", function () {
      var o = ul.classList.toggle("open"); burger.setAttribute("aria-expanded", o);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && ul.classList.contains("open")) { ul.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); burger.focus(); } });
    var cta = el("a", { class: "nav-cta", href: B.pdf ? "book.html" : "contact.html", text: B.pdf ? "GET THE BOOK" : "CONTACT" });
    navHost.className = "nav";
    var tt = el("button", { class: "tt", type: "button", "aria-label": "Switch between dark and light theme", "aria-pressed": "false" });
    tt.innerHTML = '<svg class="icon moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg><svg class="icon sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    function curTheme() { return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
    function syncTT() { var d = curTheme() === "dark"; tt.setAttribute("aria-pressed", d); tt.title = d ? "Switch to light theme" : "Switch to dark theme"; }
    tt.addEventListener("click", function () {
      var next = curTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncTT();
    });
    syncTT();
    navHost.appendChild(el("div", { class: "container" }, [brand, el("nav", { "aria-label": "Main" }, [ul]), el("div", { class: "navr" }, [cta, tt, burger])]));
  }

  /* ---------- footer ---------- */
  var fHost = document.getElementById("footer");
  if (fHost) {
    fHost.className = "foot";
    var c1 = el("div", { class: "col" }, [el("h4", { text: "Contact" })]);
    function item(i, t, href) {
      var inner = el("span", { html: icon(i) }); inner.removeAttribute("class");
      var a = href ? el("a", { href: href, text: t }) : el("span", { text: t });
      return el("div", { class: "it" }, [inner.firstChild, a]);
    }
    c1.appendChild(item("phone", S.phoneDisplay, "tel:" + S.phone));
    S.emails.forEach(function (m) { c1.appendChild(item("mail", m, "mailto:" + m)); });
    var c2 = el("div", { class: "col" }, [el("h4", { text: "Menu Links" })]);
    var lk = el("div", { class: "links" });
    NAV.forEach(function (n) { lk.appendChild(el("a", { href: n[1], text: n[0] })); });
    c2.appendChild(lk);
    var c3 = el("div", { class: "col" }, [el("h4", { text: "Social Links" })]);
    c3.appendChild(socialRow());
    fHost.appendChild(el("div", { class: "container" }, [
      el("div", { class: "cols" }, [c1, c2, c3]),
      el("div", { class: "copy" }, [el("span", { text: "© " + new Date().getFullYear() + " " + S.name + " (" + S.alias + "). All rights reserved." }), el("span", { text: "Built with plain HTML, CSS & JS" })])
    ]));
  }
  function socialRow() {
    var row = el("div", { class: "socials" });
    function b(label, href, i, ext) {
      var a = el("a", { class: "sbtn", href: href, "aria-label": label, title: label, target: ext ? "_blank" : null, rel: ext ? "noopener noreferrer" : null });
      a.innerHTML = icon(i); row.appendChild(a);
    }
    b("WhatsApp", "https://wa.me/" + S.whatsapp, "chat", true);
    b("Email", "mailto:" + S.emails[0], "mail");
    (S.socials || []).forEach(function (s) { b(s.label, s.url, "link", true); });
    return row;
  }
  document.querySelectorAll("[data-socials]").forEach(function (h) { h.appendChild(socialRow()); });

  /* ---------- kali-style tool watermark ---------- */
  var TOOLS = ["nmap -sV -A", "msfconsole", "burpsuite", "wireshark", "hydra", "john --wordlist", "aircrack-ng", "sqlmap -u", "nikto -h", "gobuster dir", "hashcat -m 0", "nc -lvnp 4444", "ffuf -w", "bettercap", "autopsy", "maltego", "dirb", "enum4linux", "responder -I eth0", "root@kali:~#", "┌──(kali㉿kali)-[~]", "wpscan --url", "searchsploit", "tcpdump -i eth0", "bloodhound", "crackmapexec", "netdiscover", "setoolkit"];
  function rnd(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }
  document.querySelectorAll("[data-wm]").forEach(function (host, hi) {
    var n = parseInt(host.getAttribute("data-wm"), 10) || 16, r = rnd(7 + hi * 13);
    host.classList.add("wm"); host.setAttribute("aria-hidden", "true");
    for (var i = 0; i < n; i++) {
      var s = el("span", { text: TOOLS[(i * 5 + hi * 3) % TOOLS.length] });
      var col = i % 4, row = Math.floor(i / 4), rows = Math.ceil(n / 4);
      s.style.left = (col * 25 + r() * 12 - 4) + "%";
      s.style.top = (row * (100 / rows) + r() * (60 / rows)) + "%";
      s.style.fontSize = (14 + Math.floor(r() * 26)) + "px";
      s.style.transform = "rotate(" + (-14 + Math.floor(r() * 10)) + "deg)";
      s.style.animationDelay = (-r() * 9) + "s";
      host.appendChild(s);
    }
  });

  /* ---------- hero terminal ---------- */
  var tEl = document.getElementById("term-out");
  if (tEl) {
    var certNames = CERTS.map(function (c) { return c.title; });
    var L = [
      [["d", "┌──("], ["u", "ssar㉿kali"], ["d", ")-[~]"]],
      [["d", "└─$ "], ["c", "whoami"]],
      [["u", S.name.toLowerCase().replace(/ /g, "-") + " // " + S.alias.toLowerCase().replace(/ /g, "")]],
      [["d", "└─$ "], ["c", "cat education.txt"]],
      [["k", "CST @ Dhaka Government Polytechnic Institute (2025–)"]],
      [["d", "└─$ "], ["c", "ls certifications/"]],
      [["k", String(certNames.length) + " completed → see Certification"]],
      [["d", "└─$ "], ["c", "cat goals.txt"]],
      [["k", "penetration testing + red teaming"]],
      [["d", "└─$ "], ["c", "echo $IN_PROGRESS"]],
      [["r", S.targetCerts.join("  ")]],
      [["d", "└─$ "], ["caret", ""]]
    ];
    var out = tEl; out.textContent = "";
    var li = 0;
    function addLine(parts) {
      var line = el("div");
      parts.forEach(function (p) {
        if (p[0] === "caret") line.appendChild(el("span", { class: "caret" }));
        else line.appendChild(el("span", { class: p[0], text: p[1] }));
      });
      out.appendChild(line);
    }
    function step() { if (li < L.length) { addLine(L[li++]); setTimeout(step, li % 2 ? 380 : 220); } }
    if (reduce) { L.forEach(addLine); } else { step(); }
  }

  /* ---------- stats ---------- */
  var st = document.getElementById("stats");
  if (st) {
    var items = [[CERTS.length, "Certificates Earned"], [B.pdf ? 1 : 0, "Book Published"], [B.pages || 0, "Book Pages"], [S.targetCerts.length, "Certs In Preparation"]];
    items.forEach(function (it) {
      var b = el("b", { text: "0", "data-to": it[0] });
      st.appendChild(el("div", { class: "stat" }, [b, el("span", { text: it[1] })]));
    });
    st.querySelectorAll("b").forEach(function (b) {
      var to = +b.getAttribute("data-to"), t0 = null;
      if (reduce || !("requestAnimationFrame" in window)) { b.textContent = to; return; }
      function f(t) { if (!t0) t0 = t; var p = Math.min((t - t0) / 1100, 1); b.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); }
      requestAnimationFrame(f);
    });
  }

  /* ---------- home / about text fill ---------- */
  document.querySelectorAll("[data-fill]").forEach(function (n) {
    var v = S[n.getAttribute("data-fill")]; if (typeof v === "string") n.textContent = v;
  });
  var chipHosts = document.querySelectorAll("[data-chips]");
  chipHosts.forEach(function (h) {
    var key = h.getAttribute("data-chips"), cls = h.getAttribute("data-chipclass") || "";
    (S[key] || []).forEach(function (t) { h.appendChild(el("span", { class: "chip " + cls, text: t })); });
  });
  var edu = document.getElementById("edu");
  if (edu) S.education.forEach(function (e) {
    edu.appendChild(el("div", { class: "tl rv" }, [el("small", { text: e.period }), el("h3", { text: e.title }), el("p", { text: e.place + (e.note ? " · " + e.note : "") })]));
  });
  var prj = document.getElementById("projects");
  if (prj) {
    if (!S.projects.length) {
      prj.appendChild(el("div", { class: "info dashed" }, [el("h3", { text: "Projects — coming soon" }), el("p", { text: "Project details are pending. They will appear here as soon as they are added to the data file." })]));
    } else S.projects.forEach(function (p) {
      var kids = [el("h3", { text: p.name }), el("p", { text: p.description || "" })];
      if (p.link) kids.push(el("a", { class: "badge", href: p.link, target: "_blank", rel: "noopener noreferrer", text: "VIEW PROJECT" }));
      prj.appendChild(el("div", { class: "info" }, kids));
    });
  }

  /* ---------- book cover (reusable) ---------- */
  function bookCover() {
    if (B.cover) return el("img", { class: "cover-img", src: B.cover, alt: "Cover of the book " + B.titleEn });
    var d = el("div", { class: "cover", role: "img", "aria-label": "Book cover: " + B.titleEn + " by " + B.author });
    d.appendChild(el("div", {}, [el("small", { text: "CYBER SECURITY · BANGLA" }), el("h3", { text: B.title }), el("p", { text: B.subtitle })]));
    d.appendChild(el("b", { text: B.author }));
    d.insertAdjacentHTML("beforeend", '<svg class="shield" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.2" aria-hidden="true"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>');
    return d;
  }
  var cp = document.querySelectorAll("[data-cover]");
  cp.forEach(function (h) { h.appendChild(bookCover()); });
  document.querySelectorAll("[data-book]").forEach(function (n) { var v = B[n.getAttribute("data-book")]; if (v) n.textContent = v; });

  function bookButtons(host) {
    host.textContent = "";
    if (B.pdf) {
      var d = el("a", { class: "btn btn-red", href: B.pdf, download: "" }); d.innerHTML = icon("down") + " Download PDF"; host.appendChild(d);
      var r = el("a", { class: "btn btn-line", href: B.pdf, target: "_blank", rel: "noopener" }); r.innerHTML = icon("book") + " Read online"; host.appendChild(r);
    } else {
      var x = el("span", { class: "btn btn-line", "aria-disabled": "true", role: "link", text: "PDF coming soon" }); host.appendChild(x);
    }
  }
  document.querySelectorAll("[data-bookbtns]").forEach(bookButtons);

  var toc = document.getElementById("toc");
  if (toc) (B.parts || []).forEach(function (p) {
    var ol = el("ol"); p.chapters.forEach(function (c) { ol.appendChild(el("li", { text: c })); });
    toc.appendChild(el("div", { class: "info rv" }, [el("h3", { text: p.name }), ol]));
  });

  /* ---------- certificates ---------- */
  var cl = document.getElementById("certlist");
  var lb = null;
  function openLb(src, alt) {
    if (!lb) {
      lb = el("div", { class: "lb", role: "dialog", "aria-modal": "true", "aria-label": "Certificate preview" });
      var cb = el("button", { "aria-label": "Close preview", text: "×" });
      var im = el("img", { alt: "" });
      lb.appendChild(im); lb.appendChild(cb); document.body.appendChild(lb);
      function close() { lb.classList.remove("open"); if (lb._from) lb._from.focus(); }
      cb.addEventListener("click", close);
      lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && lb.classList.contains("open")) close(); });
    }
    lb._from = document.activeElement;
    var i = lb.querySelector("img"); i.src = src; i.alt = alt;
    lb.classList.add("open"); lb.querySelector("button").focus();
  }
  if (cl) {
    if (!CERTS.length) cl.appendChild(el("div", { class: "soon", text: "Certificates will appear here once added to the data file." }));
    CERTS.forEach(function (c) {
      var btn = el("button", { type: "button", "aria-label": "Enlarge certificate: " + c.title }, [el("img", { src: c.image, alt: "Scanned certificate: " + c.title + " — " + c.issuer, loading: "lazy" })]);
      btn.addEventListener("click", function () { openLb(c.image, "Certificate: " + c.title); });
      var badge = el("a", { class: "badge", href: c.verifyUrl || c.pdf, target: "_blank", rel: "noopener noreferrer" });
      badge.innerHTML = (c.verifyUrl ? "VERIFY " : "CERTIFIED ") + icon("arrow");
      badge.setAttribute("aria-label", (c.verifyUrl ? "Verify " : "Open ") + c.title + " certificate");
      var meta = el("ul", { class: "meta" });
      function m(k, v) { if (v) meta.appendChild(el("li", {}, [el("b", { text: k }), el("span", { text: v })])); }
      m("Issued by", c.issuer); m("Date", c.date); m("Credential ID", c.credentialId); m("Student ID", c.studentId);
      var act = el("div", { class: "cact" });
      var pdf = el("a", { class: "btn btn-line", href: c.pdf, target: "_blank", rel: "noopener" }); pdf.innerHTML = icon("down") + " Original PDF";
      if (c.verifyUrl) { var vf = el("a", { class: "btn btn-red", href: c.verifyUrl, target: "_blank", rel: "noopener noreferrer" }); vf.innerHTML = icon("shield") + " Verify online"; act.appendChild(vf); }
      act.appendChild(pdf);
      cl.appendChild(el("article", { class: "cert rv" }, [
        el("div", { class: "cimg" }, [btn]),
        el("div", { class: "cbody" }, [el("div", { class: "chead" }, [el("h2", { text: c.title }), badge]), meta, el("p", { text: c.description }), act])
      ]));
    });
  }

  /* ---------- contact ---------- */
  var cd = document.getElementById("contact-rows");
  if (cd) {
    function row(i, label, text, href) {
      var a = el(href ? "a" : "div", { class: "crow", href: href || null, target: href && href.indexOf("http") === 0 ? "_blank" : null, rel: href && href.indexOf("http") === 0 ? "noopener noreferrer" : null });
      a.innerHTML = '<span class="ci">' + icon(i) + "</span>";
      var t = el("div", {}, [el("small", { text: label }), el("span", { text: text })]); a.appendChild(t); cd.appendChild(a);
    }
    S.emails.forEach(function (m, i) { row("mail", i ? "Email (alternate)" : "Email", m, "mailto:" + m); });
    row("phone", "Phone", S.phoneDisplay, "tel:" + S.phone);
    row("chat", "WhatsApp", S.phoneDisplay, "https://wa.me/" + S.whatsapp);
    (S.socials || []).forEach(function (s) { row("link", s.label, s.url.replace(/^https?:\/\//, ""), s.url); });
  }
  var form = document.getElementById("cform");
  if (form) {
    var status = document.getElementById("cstatus");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = new FormData(form), name = f.get("name"), mail = f.get("email"), msg = f.get("message");
      if (S.formspreeId) {
        status.textContent = "Sending…";
        fetch("https://formspree.io/f/" + S.formspreeId, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ name: name, email: mail, message: msg }) })
          .then(function (r) { if (!r.ok) throw 0; status.textContent = "Thanks! Your message was sent."; form.reset(); })
          .catch(function () { status.textContent = "Could not send. Please email me directly."; });
      } else {
        var body = msg + "\n\n— " + name + " (" + mail + ")";
        location.href = "mailto:" + S.emails[0] + "?subject=" + encodeURIComponent("Message from " + name + " via portfolio") + "&body=" + encodeURIComponent(body);
        status.textContent = "Opening your email app… if nothing opens, write to " + S.emails[0] + ".";
      }
    });
    var nt = document.getElementById("cnote");
    if (nt) nt.textContent = S.formspreeId ? "Your message is delivered straight to my inbox." : "This form opens your email app with the message ready to send.";
  }

  /* ---------- scroll reveal ---------- */
  var rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .12 });
    rv.forEach(function (n) { io.observe(n); });
  } else rv.forEach(function (n) { n.classList.add("in"); });
})();
