(function () {
  var GA = "G-KE8PG4PMGB";
  var KEY = "tomasz_ga_consent_v1";
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function loadGA() {
    if (!GA || window.__gaLoaded) return;
    window.__gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", GA, { anonymize_ip: true, send_page_view: true });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA);
    document.head.appendChild(s);
  }
  function closeConsent(bar) {
    bar.classList.remove("is-on");
    document.documentElement.classList.remove("consent-lock");
    document.body.classList.remove("consent-lock");
  }
  if (stored() === "yes") loadGA();
  if (stored()) return;
  var bar = document.createElement("div");
  bar.id = "consent";
  bar.className = "consent is-on";
  bar.setAttribute("role", "dialog");
  bar.setAttribute("aria-modal", "true");
  bar.setAttribute("aria-labelledby", "consent-title");
  bar.setAttribute("aria-describedby", "consent-copy");
  bar.innerHTML =
    '<div class="consent__panel">' +
      '<p class="consent__kicker">Analityka</p>' +
      '<h2 class="consent__title" id="consent-title">Zgoda na Google Analytics</h2>' +
      '<p class="consent__copy" id="consent-copy">Liczy odsłony tej strony. Bez zgody działa tak samo — zero skryptu Google.</p>' +
      '<div class="consent__row">' +
        '<button type="button" data-consent="yes">Zgoda</button>' +
        '<button type="button" class="ghost" data-consent="no">Bez analityki</button>' +
      '</div>' +
      '<a class="consent__more" href="/prywatnosc/">Prywatność</a>' +
    '</div>';
  document.body.appendChild(bar);
  document.documentElement.classList.add("consent-lock");
  document.body.classList.add("consent-lock");
  var yes = bar.querySelector("[data-consent='yes']");
  yes.addEventListener("click", function () { save("yes"); closeConsent(bar); loadGA(); });
  bar.querySelector("[data-consent='no']").addEventListener("click", function () { save("no"); closeConsent(bar); });
  var coarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  if (!coarse) yes.focus();
})();
