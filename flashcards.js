const card = document.getElementById("card");
const cardFrontContent = document.getElementById("card-front-content");
const cardBackContent = document.getElementById("card-back-content");
const rememberBtn = document.getElementById("remember");
const dontRememberBtn = document.getElementById("dontRemember");
const pronounceBtn = document.getElementById("pronounce");
const backToHomeBtn = document.getElementById("backToHome");

let words = [];
let currentIndex = 0;
let showingEnglish = true;
let isAnimating = false;

const type = localStorage.getItem("practiceType");
const topic = localStorage.getItem("practiceTopic");

// Datové soubory podle typu
const dataSources = {
  vocabulary: "data/vocabulary.json",
  phrases: "data/phrases.json",
  chunks: "data/chunks.json",
  collocations: "data/collocations.json",
  phrasal_verbs: "data/phrasal_verbs.json",
  idioms: "data/idioms.json"
};

function setButtonsDisabled(disabled) {
  rememberBtn.disabled = disabled;
  dontRememberBtn.disabled = disabled;
  pronounceBtn.disabled = disabled;
  backToHomeBtn.disabled = disabled;
}

// Ověření potřebných údajů
if (!type || !topic || !dataSources[type]) {
  cardFrontContent.textContent = "Chyba: Chybí nebo neznámý typ/téma. Vrať se na hlavní stránku.";
  cardBackContent.textContent = "";
  setButtonsDisabled(true);
  console.error("Missing or invalid practiceType or practiceTopic.");
} else {
  fetch(dataSources[type])
    .then(res => {
      if (!res.ok) throw new Error(`Chyba při načítání ${dataSources[type]}`);
      return res.json();
    })
    .then(data => {
  const category = localStorage.getItem("practiceCategory");
  if (!category || !data[category] || !data[category][topic]) {
    throw new Error("Nenalezená kategorie nebo téma v datech.");
  }

  const topicWords = data[category][topic];
  words = topicWords.map(word => ({ ...word, repeat: 1 }));

  if (words.length === 0) {
    cardFrontContent.textContent = "Tato sada je prázdná.";
    setButtonsDisabled(true);
    return;
  }

  shuffleWords();
  showCard();
})
}

function shuffleWords() {
  words = words.flatMap(word => Array(word.repeat).fill(word));
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
}

function showCard() {
  if (words.length === 0) {
    cardFrontContent.textContent = "Všechna slova jsou označena jako zapamatovaná! Dobrá práce!";
    cardBackContent.textContent = "";
    card.classList.add("finished-message");
    setButtonsDisabled(true);
    return;
  }

  card.classList.remove("flipped", "card-flip-out", "card-flip-in", "card-remember", "card-dont-remember", "finished-message");
  card.classList.add("card-initial");

  showingEnglish = true;
  setButtonsDisabled(true);

  const word = words[currentIndex];
  const sentence = word.sentence ? `<div class='sentence'>${word.sentence}</div>` : "";
  cardFrontContent.innerHTML = `<strong>${word.english}</strong>${sentence}`;
  cardBackContent.textContent = word.czech || "(chybí překlad)";

  setTimeout(() => {
    card.classList.remove("card-initial");
    card.classList.add("card-flip-in");
    card.addEventListener("transitionend", function handleTransitionEnd(e) {
      if ((e.propertyName === "transform" || e.propertyName === "opacity") && card.classList.contains("card-flip-in")) {
        card.classList.remove("card-flip-in");
        isAnimating = false;
        setButtonsDisabled(false);
        pronounceBtn.disabled = !showingEnglish;
      }
    }, { once: true });
  }, 50);
}

card.addEventListener("click", () => {
  if (words.length === 0 || isAnimating) return;
  card.classList.toggle("flipped");
  showingEnglish = !showingEnglish;
  pronounceBtn.disabled = !showingEnglish;
});

rememberBtn.addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;
  setButtonsDisabled(true);
  if (navigator.vibrate) navigator.vibrate(50);

  card.classList.remove("flipped");
  showingEnglish = true;
  card.classList.add("card-remember");

  let timeoutId = setTimeout(() => {
    card.removeEventListener("transitionend", handleEnd);
    if (isAnimating) {
      words.splice(currentIndex, 1);
      if (currentIndex >= words.length) currentIndex = 0;
      card.classList.remove("card-remember");
      showCard();
    }
  }, 400);

  function handleEnd(e) {
    if (e.propertyName === "transform" && card.classList.contains("card-remember")) {
      clearTimeout(timeoutId);
      card.removeEventListener("transitionend", handleEnd);
      words.splice(currentIndex, 1);
      if (currentIndex >= words.length) currentIndex = 0;
      card.classList.remove("card-remember");
      showCard();
    }
  }

  card.addEventListener("transitionend", handleEnd);
});

dontRememberBtn.addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;
  setButtonsDisabled(true);
  if (navigator.vibrate) navigator.vibrate([100, 30, 100]);

  card.classList.remove("flipped");
  showingEnglish = true;
  card.classList.add("card-dont-remember");

  let timeoutId = setTimeout(() => {
    card.removeEventListener("transitionend", handleEnd);
    if (isAnimating) {
      const word = words[currentIndex];
      word.repeat += 1;
      shuffleWords();
      currentIndex = 0;
      card.classList.remove("card-dont-remember");
      showCard();
    }
  }, 400);

  function handleEnd(e) {
    if (e.propertyName === "transform" && card.classList.contains("card-dont-remember")) {
      clearTimeout(timeoutId);
      card.removeEventListener("transitionend", handleEnd);
      const word = words[currentIndex];
      word.repeat += 1;
      shuffleWords();
      currentIndex = 0;
      card.classList.remove("card-dont-remember");
      showCard();
    }
  }

  card.addEventListener("transitionend", handleEnd);
});

pronounceBtn.addEventListener("click", () => {
  if (showingEnglish && words[currentIndex]) {
    if (navigator.vibrate) navigator.vibrate(30);
    const word = words[currentIndex];
    const sentenceText = word.sentence || "";
    const utterance = new SpeechSynthesisUtterance(`${word.english}. ${sentenceText}`);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }
});

backToHomeBtn.addEventListener("click", () => {
  if (navigator.vibrate) navigator.vibrate(50);
  window.location.href = "index.html";
});
