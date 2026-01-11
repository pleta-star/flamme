let played = false;

const cardInner = document.getElementById("cardInner");
const setup = document.getElementById("setup");
const game = document.getElementById("game");
const player = document.getElementById("player");
const cardText = document.getElementById("cardText");
const levelBadge = document.getElementById("levelBadge");

const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const orientationSelect = document.getElementById("orientation");

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const quitBtn = document.getElementById("quitBtn");

let players = [];
let current = 0;
let level = "soft";

/* MENU */
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("show");
});

/* START GAME */
document.getElementById("startBtn").onclick = () => {
  players = [name1.value.trim(), name2.value.trim()];
  if (!players[0] || !players[1]) {
    alert("Entre deux prénoms");
    return;
  }

  localStorage.setItem("flameNames", JSON.stringify(players));
  localStorage.setItem("flameOrientation", orientationSelect.value);

  setup.classList.add("hidden");
  game.classList.remove("hidden");
  quitBtn.style.display = "block";

  current = Math.floor(Math.random() * players.length);
  player.innerText = players[current];

  updateLevelUI();
};

/* LEVEL */
function setLevel(lvl) {
  level = lvl;
  updateLevelUI();
}

/* PLAY ACTION / TRUTH */
function play(type) {
  if (played) return;
  played = true;

  // vibration
  if (navigator.vibrate) {
    if (level === "soft") navigator.vibrate(30);
    if (level === "hard") navigator.vibrate(60);
    if (level === "extreme") navigator.vibrate([80, 40, 80]);
  }

  // animation
  cardInner.classList.add("flip");
  cardInner.classList.remove("soft", "hard", "extreme");
  cardInner.classList.add(level);

  setTimeout(() => {
    const o = orientationSelect.value;
    const list = data[o][level][type];
    cardText.innerText =
      list[Math.floor(Math.random() * list.length)];
  }, 300);

  document
    .querySelectorAll(".choice-btn")
    .forEach(b => (b.disabled = true));

}

/* NEXT TURN */
function nextTurn() {
  played = false;

  cardInner.classList.remove("flip");
  cardText.innerText = "Action ou Vérité ?";

  document
    .querySelectorAll(".actions button")
    .forEach(b => (b.disabled = false));

  current = current === 0 ? 1 : 0;
  player.innerText = players[current];

  updateLevelUI();
}

/* LEVEL UI */
function updateLevelUI() {
  levelBadge.className = "level-badge " + level;

  if (level === "soft") levelBadge.innerText = "😇 SOFT";
  if (level === "hard") levelBadge.innerText = "😈 HARD";
  if (level === "extreme") levelBadge.innerText = "🔥 EXTREME";
}

function hideAllSections() {
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.add("hidden");
  document.getElementById("diceGame").classList.add("hidden");

  // Ferme aussi le menu
  menu.classList.remove("show");
  menu.style.display = "none";
}


/*DEE */
const diceGame = document.getElementById("diceGame");
const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");

const diceActions = {
  soft: ["🤍 Câlin", "✋ Toucher", "💆 Masser", "😊 Caresses", "🌬️ Effleurer", "💋 Bisou"],
  hard: ["✋ Toucher", "💆 Masser", "👏 Fesser", "💋 Lécher", "🔥 Mordiller", "😈 Presser"],
  extreme: ["💋 Lécher", "🔥 Mordiller", "👏 Fesser", "😈 Masturber", "🔥 Sucer", "💥 Penetrer"]
};

const diceZones = {
  soft: ["😊 Visage", "🤍 Ventre", "🍑 Fesses", "🦵 Cuisses", "🤲 Mains", "💆 Nuque"],
  hard: ["💆 Cou", "🤍 Ventre", "🍑 Fesses", "🦵 Cuisses", "🔥 Poitrine", "😏 Sexe"],
  extreme: ["💆 Cou", "🔥 Poitrine", "🍑 Fesses", "🦵 Cuisses", "😈 Zone chaude", "💥 Zone TRÈS chaude"]
};

/* ujj */

function openDiceGame() {
  hideAllSections();
  document.getElementById("diceGame").classList.remove("hidden");
}


function closeDiceGame() {
  hideAllSections();
  document.getElementById("setup").classList.remove("hidden");
}


function rollDoubleDice() {
  if (navigator.vibrate) navigator.vibrate(50);

  dice1.classList.add("roll");
  dice2.classList.add("roll");

  setTimeout(() => {
    const a = Math.floor(Math.random() * 6);
    const z = Math.floor(Math.random() * 6);

    dice1.textContent = diceActions[level][a];
    dice2.textContent = diceZones[level][z];

    dice1.classList.remove("roll");
    dice2.classList.remove("roll");
  }, 600);
}




/* QUIT GAME */
function quitGame() {
  game.classList.add("hidden");
  setup.classList.remove("hidden");
  quitBtn.style.display = "none";
  menu.classList.remove("show");


  played = false;
  cardInner.classList.remove("flip");
  cardText.innerText = "Action ou Vérité ?";
}
