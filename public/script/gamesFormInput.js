// This script runs on the client

const modal = document.querySelector(".modal");
const closeBtn = modal.querySelector(".closeBtn");

const studioBtn = document.querySelector(".studioModalBtn");
const genreBtn = document.querySelector(".genreModalBtn");

const studioIdInput = document.querySelector(".studioId");
const genreInput = document.querySelector(".genre-input");

const studiosDiv = modal.querySelector(".studios-div");
const genresDiv = modal.querySelector(".genres-div");

const studiosCards = Array.from(
  modal.querySelector(".studios-container").children
);
const genresCards = Array.from(
  modal.querySelector(".genres-container").children
);

let selectedStudio = null;
let selectedGenre = null;

let studios = false;
let genresArr = [];

closeBtn.addEventListener("click", closeModal);
studioBtn.addEventListener("click", () => {
  studiosDiv.style.display = "block";
  genresDiv.style.display = "none";
  studios = true;
  selectedStudio = null;
  selectedGenre = null;
  modal.showModal();
});
genreBtn.addEventListener("click", () => {
  genresDiv.style.display = "block";
  studiosDiv.style.display = "none";
  studios = false;
  selectedStudio = null;
  selectedGenre = null;
  modal.showModal();
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

function closeModal() {
  if (studios) {
    setStudio();
  } else {
    setGenre();
  }
  modal.close();
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
  genreInput.value += genresArr.join(", ");
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
    setGenreInputValue();
  }
}

start();
