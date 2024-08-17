// This script runs on the client

const modal = document.querySelector(".modal");
const closeBtn = modal.querySelector(".closeBtn");

const studioBtn = document.querySelector(".studioModalBtn");
const genreBtn = document.querySelector(".genreModalBtn");

const studioIdInput = document.querySelector(".studioId");
const genreInput = document.querySelector(".genre-input");

const studiosDiv = modal.querySelector(".studios-div");
const genresDiv = modal.querySelector(".genres-div");

const studiosCards = Array.from(modal.querySelector(".studios-list").children);
const genresCards = Array.from(modal.querySelector(".genres-list").children);

const bannerInput = document.querySelector("#banner");
const bannerPreview = document.querySelector(".banner-preview");
const logoInput = document.querySelector("#logo");
const logoPreview = document.querySelector(".logo-preview");

let selectedStudio = null;
let selectedGenre = null;

let studios = false;
let genresArr = [];

const MODAL_TRANSITION_DURATION = 200;

closeBtn.addEventListener("click", closeModal);
studioBtn.addEventListener("click", () => {
  studiosDiv.style.display = "block";
  genresDiv.style.display = "none";
  studios = true;
  selectedStudio = null;
  selectedGenre = null;
  modal.showModal();
  modal.style.transitionDuration = MODAL_TRANSITION_DURATION + "ms";
  modal.style.transform = "scale(1)";
});
genreBtn.addEventListener("click", () => {
  genresDiv.style.display = "block";
  studiosDiv.style.display = "none";
  studios = false;
  selectedStudio = null;
  selectedGenre = null;
  modal.showModal();
  modal.style.transitionDuration = MODAL_TRANSITION_DURATION + "ms";
  modal.style.transform = "scale(1)";
});

studiosCards.forEach((card) => {
  card.addEventListener("click", () => {
    unselectCards(studiosCards);
    selectedStudio = card;
    card.classList.toggle("true");
  });
});
genresCards.forEach((card) => {
  card.addEventListener("click", () => {
    unselectCards(genresCards);
    selectedGenre = card;
    card.classList.toggle("true");
  });
});
bannerInput.addEventListener("input", () => {
  console.log("input");
  bannerPreview.src = bannerInput.value;
});
logoInput.addEventListener("input", () => {
  console.log("input");
  logoPreview.src = logoInput.value;
});

function closeModal() {
  if (studios) {
    setStudio();
  } else {
    setGenre();
  }
  modal.style.transitionDuration = MODAL_TRANSITION_DURATION + "ms";
  modal.style.transform = "scale(0)";
  setTimeout(() => {
    modal.close();
  }, MODAL_TRANSITION_DURATION);
}

function setStudio() {
  if (!selectedStudio) {
    return;
  }
  studioBtn.value = selectedStudio.querySelector(".name").textContent;
  studioIdInput.value = selectedStudio.querySelector(".id").textContent;
}
function setGenre() {
  if (!selectedGenre) {
    return;
  }
  genresArr.push(selectedGenre.querySelector(".name").textContent);
  setGenreInputValue();
  renderGenreBullet();
}

function renderGenreBullet() {
  let newGenreName = selectedGenre.querySelector(".name").textContent;
  const genreList = document
    .querySelector(".genres-listing")
    .querySelector(".genres-bulletlist");

  fetch("/getFile/genreBullet").then(async (res) => {
    const data = await res.text();
    genreList.innerHTML += data;
    const newGenre = genreList.lastElementChild;
    console.log(newGenre);
    newGenre.querySelector(".name").textContent = newGenreName;
  });
}

function setGenreInputValue() {
  if (genresArr.length <= 0) {
    return;
  }
  genreInput.value = "{";
  genreInput.value += genresArr.join(",");
  genreInput.value += "}";
  console.log(genreInput.value);
}

function unselectCards(cards) {
  cards.forEach((card) => {
    card.classList.remove("true");
  });
}

function start() {
  const studioId = studioIdInput.value;
  if (studioId) {
    studiosCards.forEach((card) => {
      if (card.querySelector(".id").textContent === studioId) {
        card.classList.add("true");
        selectedStudio = card;
        setStudio();
      }
    });
  }

  genreInput.value = genreInput.value.replace(/{|}/g, "");
  if (genreInput.value.length > 0) genresArr = genreInput.value.split(",");
  console.log(genresArr);
  if (genresArr.length > 0) {
    genresArr.forEach((genre) => {
      genresCards.forEach((card) => {
        if (genre === card.querySelector(".name").textContent) {
          selectedGenre = card;
          renderGenreBullet();
        }
      });
    });
    bannerPreview.src = bannerInput.value;
    logoPreview.src = logoInput.value;
    setGenreInputValue();
  }
}

start();
setTimeout(() => {
  modal.style.transform = "scale(0)";
}, 0);
