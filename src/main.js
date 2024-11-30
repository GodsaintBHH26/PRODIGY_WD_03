import "./style.css";

document.querySelector("#app").innerHTML = `
  <div>
    <div class="bg-gradient-to-br from-[#edefff] to-[#00417f] w-112 h-128 rounded-lg flex flex-col items-center justify-items-center">
      
      <h1 class="text-black font-medium text-center text-4xl p-5 mt-8">Tic Tac Toe Game</h1>
      
      <div class="home-screen mt-20 text-2xl">
      <button class="start-btn p-5">Start Game</button><br>
      <button class="stats-btn mt-5 p-5">Stats</button>
      </div>

      <div class="game-screen hidden mt-5">
      <div class="game-container grid grid-cols-3 grid-rows-3 w-60 text-black text-center text-5xl items-center">
        <div cellIndex="0" class="game-cell h-20 w-20 bg-white border-black border-2 flex shadow-Dark justify-center items-center rounded-md"></div>
        <div cellIndex="1" class="game-cell h-20 w-20 bg-white border-black border-2 flex shadow-Dark justify-center items-center rounded-md"></div>
        <div cellIndex="2" class="game-cell h-20 w-20 bg-white border-black border-2 flex shadow-Dark justify-center items-center rounded-md"></div>
        <div cellIndex="3" class="game-cell h-20 w-20 bg-white border-black border-2 flex shadow-Dark justify-center items-center rounded-md"></div>
        <div cellIndex="4" class="game-cell h-20 w-20 bg-white border-black border-2 flex shadow-Dark justify-center items-center rounded-md"></div>
        <div cellIndex="5" class="game-cell h-20 w-20 bg-white border-black border-2 flex shadow-Dark justify-center items-center rounded-md"></div>
        <div cellIndex="6" class="game-cell h-20 w-20 bg-white border-black border-2 flex shadow-Dark justify-center items-center rounded-md"></div>
        <div cellIndex="7" class="game-cell h-20 w-20 bg-white border-black border-2 flex shadow-Dark justify-center items-center rounded-md"></div>
        <div cellIndex="8" class="game-cell h-20 w-20 bg-white border-black border-2 flex shadow-Dark justify-center items-center rounded-md"></div>
      </div>
      <h3 class="game-message mt-2 text-lg font-semibold">Turn</h3>
      <button class="mt-2 restart-btn">Reset</button>
      </div>

      <div class="stats-screen bg-gradient-to-tr from-[#edefff] to-[#007f7b] w-80 h-80 rounded-xl shadow-lg text-black hidden">
        <h1 class="p-4 font-semibold text-5xl">Game Stats</h1>
      
        <div class="text-2xl mt-8 font-medium">
          <h2 class="x-wins">X won - x times</h2>
          <h2 class="o-wins">O won - y times</h2>
          <br>
          <button class="stats-reset-btn text-white">Reset</button>
        </div>
      </div>

      <a class="home-link cursor-pointer hidden hover:drop-shadow-md mt-4 text-white">Go Back to Home Screen</a>
      
    </div>
  </div>
`;
// ===================================================================
// Game Scripting here
// ===================================================================

// Home Screen Work
// --------------------------------------------------------------
const startBtn = document.querySelector(".start-btn");
const statsBtn = document.querySelector(".stats-btn");
const homeLink = document.querySelector(".home-link");
let gameScreen = document.querySelector(".game-screen");
let homeScreen = document.querySelector(".home-screen");
let statsScreen = document.querySelector(".stats-screen");

startBtn.addEventListener("click", () => {
  gameScreen.classList.toggle("hidden");
  homeScreen.classList.toggle("hidden");
  homeLink.classList.toggle("hidden");
});

statsBtn.addEventListener("click", () => {
  homeScreen.classList.toggle("hidden");
  homeLink.classList.toggle("hidden");
  statsScreen.classList.toggle("hidden");
});

homeLink.addEventListener("click", () => {
  if (!gameScreen.classList.contains("hidden")) {
    gameScreen.classList.toggle("hidden");
  } else if (!statsScreen.classList.toggle("hidden")) {
    statsScreen.classList.toggle("hidden");
  }
  homeScreen.classList.toggle("hidden");
  homeLink.classList.toggle("hidden");
  gameReset();
});

// Game Screen Work
// ------------------------------------------------------

let running = false;
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let currentPlayer = "X";
let options = ["", "", "", "", "", "", "", "", ""];
let statusText = document.querySelector(".game-message");
const restartBtn = document.querySelector(".restart-btn");
const gameCells = document.querySelectorAll(".game-cell");
// --------------------------------------------------------------
let score = JSON.parse(localStorage.getItem('score'));

if(score == null){
  score={
    winsX : 0,        // Will be used to count the number of times X wins
    winsO : 0         // Will be used to count the number of times O wins
  }
};
// --------------------------------------------------------------
gameInitial();

function gameInitial() {
  gameCells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", gameReset);
  statusText.textContent = `${currentPlayer}'s Turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] != "" || !running) {
    return;
  }

  cellUpdate(this, cellIndex);
  checkCondition();
}

function cellUpdate(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function gameReset() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s Turn`;
  gameCells.forEach(cell=> cell.textContent = "");
  running = true;
  saveWins();
}

function changeTurn() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkCondition() {
  let roundEnded = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundEnded = true;
      break;
    }
  }

  if (roundEnded) {
    running = false;
    statusText.textContent = `${currentPlayer} Won!`;
    if(currentPlayer=="X"){
      score.winsX = score.winsX +1;
    }else{
     score.winsO = score.winsO +1;
    }
    saveWins();
  }else if(!options.includes("")){
    statusText.textContent = "Draw!";
    running = false;
  }else{
    changeTurn();
  }
}

// Status Screen working
// ---------------------------------------------------------------------

const xWins = document.querySelector(".x-wins");
const oWins = document.querySelector(".o-wins");
const statsResetBtn = document.querySelector(".stats-reset-btn");


statsResetBtn.addEventListener("click", resetStats);
updateStats();

function updateStats(){
  xWins.textContent = `X won - ${score.winsX} times`;
  oWins.textContent = `O won - ${score.winsO} times`;
}

function saveWins(){
  localStorage.setItem('score', JSON.stringify(score));
  updateStats();
}
function resetStats(){
  localStorage.clear();
  score = { winsX: 0, winsO: 0 };
  saveWins();
}