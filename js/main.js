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
