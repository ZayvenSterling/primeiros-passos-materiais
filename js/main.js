const checkoutUrls = window.CHECKOUT_URLS || {};

document.querySelectorAll("[data-checkout]").forEach((button) => {
  const product = button.dataset.checkout;
  const url = checkoutUrls[product];
  const isConfigured = url && /^https?:\/\//i.test(url);

  if (isConfigured) {
    button.href = url;
    button.rel = "noopener noreferrer";
  } else {
    button.setAttribute("aria-describedby", "checkout-unavailable");
    button.addEventListener("click", (event) => {
      event.preventDefault();
      showCheckoutNotice();
    });
  }
});

const notice = document.querySelector(".checkout-notice");
let noticeTimer;

function showCheckoutNotice() {
  if (!notice) return;
  notice.hidden = false;
  window.clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(() => {
    notice.hidden = true;
  }, 5200);
}

notice?.querySelector("button")?.addEventListener("click", () => {
  notice.hidden = true;
  window.clearTimeout(noticeTimer);
});

const offerNudge = document.querySelector(".offer-nudge");
const offerNudgeKicker = offerNudge?.querySelector(".offer-nudge-kicker");
const offerNudgeTitle = offerNudge?.querySelector(".offer-nudge-title");
const offerNudgeText = offerNudge?.querySelector(".offer-nudge-text");
const offerNudgeLink = offerNudge?.querySelector(".offer-nudge-link");
const offerNudgeClose = offerNudge?.querySelector(".offer-nudge-close");
const offerNudgeMessages = [
  {
    kicker: "Uma escolha mais completa",
    title: "Leitura e movimento por R$ 39,90",
    text: "No combo, você economiza R$ 16,08 e recebe 150 atividades + 6 bônus.",
    link: checkoutUrls.combo,
    cta: "Conhecer o combo",
  },
  {
    kicker: "Para começar pela leitura",
    title: "100 atividades em 10 etapas",
    text: "O Destrava Leitura organiza sílabas, palavras, frases e pequenos textos.",
    link: checkoutUrls.destrava,
    cta: "Ver Destrava Leitura",
  },
  {
    kicker: "Coordenação com leveza",
    title: "50 missões para desenvolver o traço",
    text: "Caminhos, formas e exercícios progressivos para praticar por 10 a 15 minutos.",
    link: checkoutUrls.movimento,
    cta: "Ver Movimento em Foco",
  },
  {
    kicker: "Compra tranquila",
    title: "Você tem 7 dias de garantia",
    text: "Conheça o material e confirme se ele faz sentido para a sua rotina.",
    link: checkoutUrls.combo,
    cta: "Começar com o combo",
  },
];
let offerNudgeIndex = 0;
let offerNudgeHideTimer;
let offerNudgeNextTimer;

function offerNudgesDismissed() {
  try {
    return window.sessionStorage.getItem("offer-nudges-dismissed") === "true";
  } catch {
    return false;
  }
}

function hideOfferNudge(scheduleNext = true) {
  if (!offerNudge || offerNudge.hidden) return;
  offerNudge.classList.add("is-leaving");
  window.clearTimeout(offerNudgeHideTimer);
  window.setTimeout(() => {
    offerNudge.hidden = true;
    offerNudge.classList.remove("is-leaving");
    if (scheduleNext && !offerNudgesDismissed()) {
      offerNudgeNextTimer = window.setTimeout(showOfferNudge, 22000);
    }
  }, 260);
}

function showOfferNudge() {
  if (!offerNudge || offerNudgesDismissed()) return;
  const message = offerNudgeMessages[offerNudgeIndex % offerNudgeMessages.length];
  if (!message?.link || !/^https?:\/\//i.test(message.link)) return;

  offerNudgeKicker.textContent = message.kicker;
  offerNudgeTitle.textContent = message.title;
  offerNudgeText.textContent = message.text;
  offerNudgeLink.href = message.link;
  offerNudgeLink.innerHTML = `${message.cta} <span aria-hidden="true">→</span>`;
  offerNudge.hidden = false;
  offerNudgeIndex += 1;
  window.clearTimeout(offerNudgeHideTimer);
  offerNudgeHideTimer = window.setTimeout(() => hideOfferNudge(true), 8500);
}

offerNudgeClose?.addEventListener("click", () => {
  try {
    window.sessionStorage.setItem("offer-nudges-dismissed", "true");
  } catch {
    // The notice can still be closed when browser storage is unavailable.
  }
  window.clearTimeout(offerNudgeHideTimer);
  window.clearTimeout(offerNudgeNextTimer);
  hideOfferNudge(false);
});

if (offerNudge && !offerNudgesDismissed()) {
  offerNudgeNextTimer = window.setTimeout(showOfferNudge, 9000);
}

const tabs = document.querySelectorAll(".sample-tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selected = tab.dataset.tab;
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    document.querySelectorAll(".sample-panel").forEach((panel) => {
      const active = panel.id === `samples-${selected}`;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });
  });
});

document.querySelectorAll("details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll("details[open]").forEach((openDetail) => {
      if (openDetail !== detail) openDetail.open = false;
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.08 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.getElementById("current-year").textContent = new Date().getFullYear();
