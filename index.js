function getModal() {
  return document.querySelector(".modal");
}

function setModalOpen(isOpen) {
  const modal = getModal();

  document.body.classList.toggle("modal--open", isOpen);

  if (modal) {
    modal.setAttribute("aria-hidden", String(!isOpen));

    if (isOpen) {
      const closeButton = modal.querySelector("[data-action='close-modal']");
      (closeButton || modal).focus();
    }
  }
}

function toggleModal() {
  setModalOpen(!document.body.classList.contains("modal--open"));
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.body.classList.contains("modal--open")) {
    setModalOpen(false);
  }
});

function darkTheme() {
  document.body.classList.toggle("darkTheme");
}

function decodeEmailPart(encodedPart) {
  return encodedPart
    .split(",")
    .map((charCode) => Number(charCode))
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
}

function setupEmailLinks() {
  const emailLinks = document.querySelectorAll(".js-email-link");

  for (let i = 0; i < emailLinks.length; i++) {
    const link = emailLinks[i];
    const user = decodeEmailPart(link.dataset.emailUser || "");
    const domain = decodeEmailPart(link.dataset.emailDomain || "");
    const tld = decodeEmailPart(link.dataset.emailTld || "");

    if (!user || !domain || !tld) {
      continue;
    }

    const email = `${user}@${domain}.${tld}`;
    const emailText = link.querySelector(".js-email-text");

    link.setAttribute("href", `mailto:${email}`);

    if (emailText) {
      emailText.textContent = email;
    }
  }
}

const scaleFactor = 1 / 20;
const scaleFactor2 = 1 / 5;

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const xRot = event.clientX * scaleFactor2;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; i++) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${
      y * boolInt
    }px) rotate(${xRot * boolInt}deg)`;
  }
}

function setupActions() {
  const actionElements = document.querySelectorAll("[data-action]");

  for (let i = 0; i < actionElements.length; i++) {
    actionElements[i].addEventListener("click", (event) => {
      const action = event.currentTarget.dataset.action;

      if (action === "open-modal") {
        event.preventDefault();
        setModalOpen(true);
      }

      if (action === "close-modal") {
        event.preventDefault();
        setModalOpen(false);
      }

      if (action === "toggle-theme") {
        event.preventDefault();
        darkTheme();
      }
    });
  }
}

function setupBackgroundMotion() {
  const landingPage = document.querySelector("#landing-page");

  if (landingPage) {
    landingPage.addEventListener("mousemove", moveBackground);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupEmailLinks();
  setupActions();
  setupBackgroundMotion();
});
