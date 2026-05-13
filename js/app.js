const STORAGE_KEY = "erp-game-progress-v2";
const THEME_KEY = "erp-game-theme";
const CARD_STYLE_KEY = "erp-game-card-style";

const chapters = GAME_CHAPTERS;
const levels = GAME_LEVELS;

const allMissions = chapters.flatMap((chapter, chapterIndex) =>
  chapter.missions.map((mission, missionIndex) => ({
    ...mission,
    id: `${chapterIndex}-${missionIndex}`,
    chapterIndex,
    missionIndex
  }))
);

let progress = loadProgress();

function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return { completed: [] };
  try { return JSON.parse(saved); } catch { return { completed: [] }; }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return savedTheme || (prefersDark ? "dark" : "light");
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Alternar para modo claro" : "Alternar para modo noturno");
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
}

function loadCardStyle() {
  const savedStyle = localStorage.getItem(CARD_STYLE_KEY);
  return savedStyle || "rounded";
}

function setCardStyle(style) {
  document.body.setAttribute("data-card-style", style);
  localStorage.setItem(CARD_STYLE_KEY, style);
}

function toggleCardStyle() {
  const currentStyle = document.body.getAttribute("data-card-style");
  setCardStyle(currentStyle === "square" ? "rounded" : "square");
}

function isMissionDone(id) {
  return progress.completed.includes(id);
}

function getMissionGlobalIndex(id) {
  return allMissions.findIndex((mission) => mission.id === id);
}

function isMissionUnlocked(id) {
  const index = getMissionGlobalIndex(id);
  if (index === 0) return true;
  const previousMission = allMissions[index - 1];
  return isMissionDone(previousMission.id);
}

function getTotalXp() {
  return allMissions
    .filter((mission) => isMissionDone(mission.id))
    .reduce((total, mission) => total + mission.xp, 0);
}

function getLevel(totalXp) {
  return levels.reduce((current, level) => totalXp >= level.min ? level : current, levels[0]).label;
}

function getNextMission() {
  return allMissions.find((mission) => !isMissionDone(mission.id));
}

function toggleMission(id) {
  if (!isMissionUnlocked(id)) {
    showToast("Complete a missão anterior para desbloquear esta.");
    return;
  }

  if (isMissionDone(id)) {
    const index = getMissionGlobalIndex(id);
    const hasCompletedAfter = allMissions.slice(index + 1).some((mission) => isMissionDone(mission.id));
    if (hasCompletedAfter) {
      showToast("Para desmarcar esta missão, desmarque primeiro as missões seguintes.");
      return;
    }
    progress.completed = progress.completed.filter((missionId) => missionId !== id);
    showToast("Missão desmarcada.");
  } else {
    progress.completed.push(id);
    const mission = allMissions.find((item) => item.id === id);
    showToast(`Missão concluída! +${mission.xp} XP`);
  }

  saveProgress();
  render();
}

function isChapterDone(chapterIndex) {
  return chapters[chapterIndex].missions.every((_, missionIndex) => isMissionDone(`${chapterIndex}-${missionIndex}`));
}

function render() {
  renderStats();
  renderChapters();
}

function renderStats() {
  const totalMissions = allMissions.length;
  const completedMissions = progress.completed.length;
  const percent = Math.round((completedMissions / totalMissions) * 100);
  const totalXp = getTotalXp();
  const level = getLevel(totalXp);
  const nextMission = getNextMission();
  const nextLabel = nextMission ? nextMission.title : "Campanha completa";

  document.getElementById("progressFill").style.width = `${percent}%`;
  document.getElementById("progressPercent").textContent = `${percent}% concluído`;
  document.getElementById("xpLabel").textContent = `${totalXp} XP`;
  document.getElementById("levelLabel").textContent = level;
  document.getElementById("topLevelLabel").textContent = level.split("—")[0].trim();
  document.getElementById("nextMissionLabel").textContent = nextLabel;
}

function renderChapters() {
  const container = document.getElementById("chapters");
  container.innerHTML = "";

  chapters.forEach((chapter, chapterIndex) => {
    const chapterElement = document.createElement("article");
    chapterElement.className = "chapter";

    const done = isChapterDone(chapterIndex);
    const completedCount = chapter.missions.filter((_, missionIndex) => isMissionDone(`${chapterIndex}-${missionIndex}`)).length;

    chapterElement.innerHTML = `
      <div class="chapter-header">
        <div>
          <p class="chapter-title">${chapter.title}</p>
          <p class="chapter-description">${chapter.description}</p>
        </div>
        <span class="badge ${done ? "done" : ""}">${done ? "Deck concluído" : `${completedCount}/${chapter.missions.length}`}</span>
      </div>
      <p class="deck-hint">↔ Arraste para o lado para ver os próximos cards deste deck</p>
      <div class="mission-list"></div>
      <div class="boss">
        <strong>Boss da fase:</strong> ${chapter.boss}<br />
        <strong>Recompensa:</strong> ${chapter.reward}
      </div>
    `;

    const missionList = chapterElement.querySelector(".mission-list");

    chapter.missions.forEach((mission, missionIndex) => {
      const id = `${chapterIndex}-${missionIndex}`;
      const missionDone = isMissionDone(id);
      const unlocked = isMissionUnlocked(id);

      const missionElement = document.createElement("div");
      missionElement.className = ["mission", missionDone ? "done" : "", !unlocked ? "locked" : ""].join(" ").trim();
      missionElement.innerHTML = `
        <div class="mission-top">
          <span class="mission-state">${missionDone ? "✅ Concluída" : unlocked ? "⬜ Liberada" : "🔒 Bloqueada"}</span>
          <span class="xp">+${mission.xp} XP</span>
        </div>
        <div>
          <p class="mission-title">${mission.title}</p>
          <p class="mission-meta"><strong>Critério de pronto:</strong> ${mission.doneCriteria}</p>
        </div>
        <button class="check" aria-label="Marcar missão" ${!unlocked ? "disabled" : ""}>✓</button>
      `;

      missionElement.querySelector(".check").addEventListener("click", () => toggleMission(id));
      missionElement.addEventListener("dblclick", () => toggleMission(id));
      missionList.appendChild(missionElement);
    });

    container.appendChild(chapterElement);
  });
}

function resetProgress() {
  const confirmReset = confirm("Tem certeza que deseja resetar todo o progresso?");
  if (!confirmReset) return;
  progress = { completed: [] };
  saveProgress();
  render();
  showToast("Progresso resetado.");
}

function exportProgress() {
  const totalXp = getTotalXp();
  const completedMissions = allMissions.filter((mission) => isMissionDone(mission.id));
  const nextMission = getNextMission();

  const report = {
    project: "ERP Doméstico Local-First",
    level: getLevel(totalXp),
    totalXp,
    completed: completedMissions.map((mission) => ({
      title: mission.title,
      xp: mission.xp,
      chapter: chapters[mission.chapterIndex].title
    })),
    nextMission: nextMission ? nextMission.title : "Campanha completa",
    exportedAt: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "erp-game-progress.json";
  link.click();
  URL.revokeObjectURL(url);
  showToast("Progresso exportado em JSON.");
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.getElementById("resetBtn").addEventListener("click", resetProgress);
document.getElementById("exportBtn").addEventListener("click", exportProgress);
document.getElementById("themeToggle").addEventListener("click", toggleTheme);
document.getElementById("cardStyleToggle").addEventListener("click", toggleCardStyle);

setTheme(loadTheme());
setCardStyle(loadCardStyle());
render();
