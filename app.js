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

/* QUIT GAME */
function quitGame() {
  game.classList.add("hidden");
  setup.classList.remove("hidden");
  quitBtn.style.display = "none";

  played = false;
  cardInner.classList.remove("flip");
  cardText.innerText = "Action ou Vérité ?";
}
