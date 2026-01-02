let played = false;
const cardInner = document.getElementById("cardInner");
const setup = document.getElementById("setup");
const game = document.getElementById("game");
const player = document.getElementById("player");
const card = document.getElementById("card");
const cardText = document.getElementById("cardText");

const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const orientationSelect = document.getElementById("orientation");

let players = [];
let current = 0;
let level = "soft";

document.getElementById("menuBtn").onclick = () => {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
};

document.getElementById("startBtn").onclick = () => {
  players = [name1.value, name2.value];
  if (!players[0] || !players[1]) return alert("Entre deux prénoms");

  localStorage.setItem("flameNames", JSON.stringify(players));
  localStorage.setItem("flameOrientation", orientationSelect.value);

  setup.classList.add("hidden");
  game.classList.remove("hidden");

  current = Math.floor(Math.random() * 2);
  player.innerText = players[current];
};

function setLevel(lvl) {
  level = lvl;
  updateLevelUI();
}


function play(type) {
  if (navigator.vibrate) {
  if (level === "soft") navigator.vibrate(30);
  if (level === "hard") navigator.vibrate(60);
  if (level === "extreme") navigator.vibrate([80, 40, 80]);
}
  if (played) return;

  played = true;
  card.classList.add("flip");
  cardInner.classList.remove("soft", "hard", "extreme");
  cardInner.classList.add(level);


  setTimeout(() => {
    const o = orientationSelect.value;
    const list = data[o][level][type];
    cardText.innerText = list[Math.floor(Math.random() * list.length)];
  }, 300);

  document.querySelectorAll(".actions button").forEach(b => b.disabled = true);
}


function nextTurn() {
  played = false;
  card.classList.remove("flip");

  document.querySelectorAll(".actions button").forEach(b => b.disabled = false);

  current = current === 0 ? 1 : 0;
  player.innerText = players[current];
  updateLevelUI();
}

const levelBadge = document.getElementById("levelBadge");

function updateLevelUI() {
  levelBadge.className = "level-badge " + level;

  if (level === "soft") levelBadge.innerText = "😇 SOFT";
  if (level === "hard") levelBadge.innerText = "😈 HARD";
  if (level === "extreme") levelBadge.innerText = "🔥 EXTREME";
}
