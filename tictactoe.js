// Element references
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let nameInputSection = document.querySelector("#name-input-section");
let symbolSelectionSection = document.querySelector("#symbol-selection-section");
let gameSection = document.querySelector("#game-section");
let symbolButtons = document.querySelectorAll(".symbol-btn");
let symbolSelectionText = document.querySelector("#symbol-selection-text");

let nameSubmitBtn = document.querySelector("#name-submit");

let player1Name = "";
let player2Name = "";
let player1Symbol = "";
let player2Symbol = "";
let currentPlayer = "";
let currentSymbol = "";
let count = 0;

// Winning combinations
const winPatterns = [
  [0, 1, 2], [0, 3, 6], [0, 4, 8],
  [1, 4, 7], [2, 5, 8], [2, 4, 6],
  [3, 4, 5], [6, 7, 8],
];

// Name input handling
nameSubmitBtn.addEventListener("click", () => {
  let p1 = document.querySelector("#player1-name").value.trim();
  let p2 = document.querySelector("#player2-name").value.trim();

  if (!p1 || !p2) {
    alert("Please enter both player names.");
    return;
  }

  player1Name = p1;
  player2Name = p2;

  nameInputSection.classList.add("hide");
  symbolSelectionSection.classList.remove("hide");
  symbolSelectionText.innerText = `${player1Name}, choose your symbol`;
});

// Symbol selection
symbolButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    player1Symbol = btn.getAttribute("data-symbol");
    player2Symbol = player1Symbol === "X" ? "O" : "X";

    currentPlayer = player1Name;
    currentSymbol = player1Symbol;

    symbolSelectionSection.classList.add("hide");
    gameSection.classList.remove("hide");

    enableBoxes();
  });
});

// Game box logic
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    box.innerText = currentSymbol;
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (isWinner) {
      showWinner(currentPlayer);
    } else if (count === 9) {
      gameDraw();
    } else {
      switchTurn();
    }
  });
});

const switchTurn = () => {
  if (currentPlayer === player1Name) {
    currentPlayer = player2Name;
    currentSymbol = player2Symbol;
  } else {
    currentPlayer = player1Name;
    currentSymbol = player1Symbol;
  }
};

const showWinner = (winnerName) => {
  msg.innerText = `🎉 Congratulations, ${winnerName} wins !`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      return true;
    }
  }
  return false;
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
  count = 0;
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const resetGame = () => {
  enableBoxes();
  msgContainer.classList.add("hide");
  currentPlayer = player1Name;
  currentSymbol = player1Symbol;
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", () => {
  location.reload(); 
});
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const welcome = document.getElementById("welcome-section");
    if (welcome) {
      welcome.style.display = "none";
    }
  }, 3000); // Hide after 3 seconds
});
