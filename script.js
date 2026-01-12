const supportedLangs = ["en", "de", "fr", "es", "ja", "pt"];

function getLang() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  return supportedLangs.includes(lang) ? lang : "en";
}

async function loadLang() {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.body.classList.add(`lang-${lang}`);

  const response = await fetch(`i18n/${lang}.json`);
  const dict = await response.json();

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    let value = dict[el.dataset.i18n];
    if (!value) return;

    if (el.dataset.price) {
      value = value.replace("{{price}}", el.dataset.price);
    }

    el.innerHTML = value;
  });
}

(function handleDevice() {
  const w = Math.min(screen.width, screen.height);
  const h = Math.max(screen.width, screen.height);

  if (h <= 736) {
    document.body.classList.add("device-small");
    return;
  }

  if (w >= 390) {
    document.body.classList.add("device-12");
    return;
  }
})();

loadLang();

(function handlePlans() {
  const plans = document.querySelectorAll(".plan");

  plans.forEach((plan) => {
    plan.addEventListener("click", (e) => {
      e.preventDefault();

      plans.forEach((p) => p.classList.remove("active"));
      plan.classList.add("active");
    });
  });
})();
