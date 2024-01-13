const amigosArroios = [
  {
    name: "martim",
    img: "images/martim.jpg",
  },
  {
    name: "leonor",
    img: "images/leonor.jpg",
  },
  {
    name: "johnny",
    img: "images/johnny.jpg",
  },
  {
    name: "viviane",
    img: "images/viviane.jpg",
  },
  {
    name: "william",
    img: "images/william.jpg",
  },
  {
    name: "lomelino",
    img: "images/lomelino.jpg",
  },
  {
    name: "dany",
    img: "images/dany.jpg",
  },
  {
    name: "martim",
    img: "images/martim.jpg",
  },
  {
    name: "leonor",
    img: "images/leonor.jpg",
  },
  {
    name: "johnny",
    img: "images/johnny.jpg",
  },
  {
    name: "viviane",
    img: "images/viviane.jpg",
  },
  {
    name: "william",
    img: "images/william.jpg",
  },
  {
    name: "lomelino",
    img: "images/lomelino.jpg",
  },
  {
    name: "dany",
    img: "images/dany.jpg",
  },
];

amigosArroios.sort(() => 0.5 - Math.random());

const grid = document.querySelector("#grid");
const result = document.querySelector("#result");
let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];
let attempts = 0;
let startTime = null;
let endTime = null;

function createGrid() {
  for (let i = 0; i < amigosArroios.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);

    grid.appendChild(card);
  }
}

createGrid();

function resetGame() {
  // Reinicia as variáveis
  cardsChosen = [];
  cardsChosenIds = [];
  cardsWon = [];
  attempts = 0;
  startTime = null;
  endTime = null;

  // Limpa o conteúdo HTML relevante
  result.innerHTML = "";
  grid.innerHTML = "";

  // Embaralha as cartas novamente
  amigosArroios.sort(() => 0.5 - Math.random());

  // Cria o novo grid
  createGrid();
}

function checkMatch() {
  const cards = document.querySelectorAll("#grid img");
  const optionOneID = cardsChosenIds[0];
  const optionTwoID = cardsChosenIds[1];
  if (optionOneID == optionTwoID) {
    alert("Não cliques duas vezes no mesmo Amigo de Arroios!");
    cards[optionOneID].setAttribute("src", "images/blank.png");
  } else if (cardsChosen[0] == cardsChosen[1]) {
    cards[optionOneID].classList.add("matched");
    cards[optionTwoID].classList.add("matched");
    cards[optionOneID].removeEventListener("click", flipCard);
    cards[optionTwoID].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneID].setAttribute("src", "images/blank.png");
    cards[optionTwoID].setAttribute("src", "images/blank.png");
  }

  cardsChosen = [];
  cardsChosenIds = [];

  if (cardsWon.length == amigosArroios.length / 2) {
    endTime = Date.now();
    let totalTime = Math.floor((endTime - startTime) / 1000);
    result.innerHTML =
      cardsWon.length +
      ".<br></br>" +
      "Ui! Precisaste de " +
      attempts +
      " tentativas para encontrar os Amigos de Arroios. Só demoraste... " +
      totalTime +
      " segundos.";
    // Exibe o botão "Jogar Novamente"
    document.getElementById("play-again").style.display = "block";
  } else {
    result.innerHTML = cardsWon.length;
  }
}

function flipCard() {
  if (!startTime) {
    startTime = Date.now();
  }

  if (cardsChosen.length < 2) {
    // Add this condition to check if maximum cards are flipped
    const cardId = this.getAttribute("data-id");
    cardsChosen.push(amigosArroios[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute("src", amigosArroios[cardId].img);

    if (cardsChosen.length === 2) {
      attempts++;
      setTimeout(checkMatch, 500);
    }
  }
}
function playAgain() {
  // Esconde o botão "Jogar Novamente"
  document.getElementById("play-again").style.display = "none";

  // Reinicia o jogo
  resetGame();
}
