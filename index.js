function toggleModal() {
  document.body.classList.toggle("modal--open");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.body.classList.contains("modal--open")) {
    toggleModal();
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

document.addEventListener("DOMContentLoaded", setupEmailLinks);

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
