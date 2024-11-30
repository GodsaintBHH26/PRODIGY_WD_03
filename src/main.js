import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <div class="bg-gradient-to-br from-[#edefff] to-[#00417f] w-112 h-128 rounded-lg flex flex-col items-center justify-items-center">
      
      <h1 class="text-black font-medium text-center text-4xl p-5 mt-8">Tic Tac Toe Game</h1>
      
      <div class="home-screen hidden mt-16 ">
      <button class="start-btn ">Start Game</button><br>
      <button class="stats-btn mt-5">Stats</button>
      </div>

      <div class="game-screen mt-5">
      <div class="game-container grid grid-cols-3 grid-rows-3 w-60">
        <div class="game-cell h-20 w-20 bg-white border-black border-2"></div>
        <div class="game-cell h-20 w-20 bg-white border-black border-2"></div>
        <div class="game-cell h-20 w-20 bg-white border-black border-2"></div>
        <div class="game-cell h-20 w-20 bg-white border-black border-2"></div>
        <div class="game-cell h-20 w-20 bg-white border-black border-2"></div>
        <div class="game-cell h-20 w-20 bg-white border-black border-2"></div>
        <div class="game-cell h-20 w-20 bg-white border-black border-2"></div>
        <div class="game-cell h-20 w-20 bg-white border-black border-2"></div>
        <div class="game-cell h-20 w-20 bg-white border-black border-2"></div>
      </div>
      <h3 class="mt-2 text-lg">Turn</h3>
      <button class="mt-2">Reset</button>
      </div>

      <div class="stats-screen bg-gradient-to-tr from-[#edefff] to-[#007f7b] w-80 h-80 rounded-xl shadow-lg text-black hidden">
        <h1 class="p-4 font-semibold text-5xl">Game Stats</h1>
      
        <div class="text-2xl mt-8 font-medium">
          <h2>X won - x times</h2>
          <h2>O won - y times</h2>
        </div>
      </div>

      <a class="home-link cursor-pointer  mt-5 text-white">Go Back to Home Screen</a>
      
    </div>
  </div>
`
// ===================================================================
// Game Scripting here
// ===================================================================

// Home Screen Work
// --------------------------------------------------------------
const startBtn = document.querySelector(".start-btn");
const statsBtn = document.querySelector(".stats-btn");
const homeLink = document.querySelector(".home-link")
let gameScreen = document.querySelector(".game-screen");
let homeScreen = document.querySelector(".home-screen")
let statsScreen = document.querySelector(".stats-screen");

startBtn.addEventListener("click", ()=>{
  gameScreen.classList.toggle("hidden");
  homeScreen.classList.toggle("hidden");
  homeLink.classList.toggle("hidden");
});

statsBtn.addEventListener("click", ()=>{
  homeScreen.classList.toggle("hidden");
  homeLink.classList.toggle("hidden");
  statsScreen.classList.toggle("hidden");
});

homeLink.addEventListener("click", ()=>{
  if(!gameScreen.classList.contains("hidden")){
    gameScreen.classList.toggle("hidden");
  }else if(!statsScreen.classList.toggle("hidden")){
    statsScreen.classList.toggle("hidden")
  }
  homeScreen.classList.toggle("hidden");
  homeLink.classList.toggle("hidden");
});


// Game Screen Work 
// ------------------------------------------------------

