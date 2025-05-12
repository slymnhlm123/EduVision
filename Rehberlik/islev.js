let questionStates = [
  { answer: null, subOption: null },
  { answer: null, subOption: null },
  { answer: null, subOption: null },
  { answer: null, subOption: null },
  { answer: null, subOption: null },
  { answer: null, subOption: null },
  { answer: null, subOption: null },
  { answer: null, subOption: null },
  { answer: null, subOption: null },
  { answer: null, subOption: null }
];
let currentQuestion = 0;
let developmentState = { choice: null };

function initializeSplash() {
  setTimeout(() => {
    document.getElementById("description").classList.remove("hidden");
    document.getElementById("startButton").classList.remove("hidden");
  }, 2000);
}

function startApp() {
  const splash = document.getElementById("splash");
  splash.style.animation = "slideUp 1s ease forwards";
  setTimeout(() => {
    window.location.href = "anamenu.html";
  }, 1000);
}

window.onload = function () {
  if (document.getElementById("splash")) {
    initializeSplash();
  } else if (document.getElementById("mainContent")) {
    document.getElementById("mainContent").classList.remove("hidden");
    document.getElementById("egitimselContent").classList.remove("hidden");
    const indicator = document.getElementById("tabIndicator");
    indicator.style.transform = "translateX(0%)";
  }

  // Arama çubuğu için olay dinleyici
  const searchBtn = document.getElementById("search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", function () {
      const searchInput = document.getElementById("search-input");
      searchInput.classList.toggle("active");
    });
  }
};

function chooseCategory(type) {
  const egitimselTab = document.getElementById("egitimselTab");
  const ogreticiTab = document.getElementById("ogreticiTab");
  const indicator = document.getElementById("tabIndicator");

  if (type === "ogretici") {
    egitimselTab.classList.remove("active");
    ogreticiTab.classList.add("active");
    document.getElementById("egitimselContent").classList.add("hidden");
    document.getElementById("ogreticiContent").classList.remove("hidden");
    indicator.style.transform = "translateX(100%)";
    currentQuestion = 0;
    document.getElementById("question0").classList.remove("hidden");
    for (let i = 1; i < 10; i++) {
      document.getElementById(`question${i}`).classList.add("hidden");
    }
    document.getElementById("back0").classList.remove("hidden");
    document.getElementById("next0").classList.remove("hidden");
  } else if (type === "egitimsel") {
    egitimselTab.classList.add("active");
    ogreticiTab.classList.remove("active");
    document.getElementById("ogreticiContent").classList.add("hidden");
    document.getElementById("egitimselContent").classList.remove("hidden");
    indicator.style.transform = "translateX(0%)";
  }
}

function answerQuestion(index, answer) {
  const question = questionStates[index];
  question.answer = answer;

  const evetBtn = document.getElementById(`question${index}`).getElementsByClassName("answer-btn")[0];
  const hayırBtn = document.getElementById(`question${index}`).getElementsByClassName("answer-btn")[1];
  const subQuestions = document.getElementById(`subQuestions${index}`);
  const suggestBtn = document.getElementById(`suggest${index}`);

  evetBtn.classList.remove("evet-selected", "hayır-selected");
  hayırBtn.classList.remove("evet-selected", "hayır-selected");

  if (answer === "evet") {
    evetBtn.classList.add("evet-selected");
    subQuestions.classList.remove("hidden");
    if (suggestBtn) suggestBtn.classList.remove("hidden");
  } else {
    hayırBtn.classList.add("hayır-selected");
    subQuestions.classList.add("hidden");
    question.subOption = null;
    if (suggestBtn) suggestBtn.classList.remove("hidden");
  }

  // Soru durumlarını localStorage'a kaydet
  localStorage.setItem("questionStates", JSON.stringify(questionStates));
}

function selectSubOption(questionIndex, optionIndex) {
  questionStates[questionIndex].subOption = optionIndex;

  const subOptions = document.getElementById(`subQuestions${questionIndex}`).getElementsByClassName("sub-option");
  for (let i = 0; i < subOptions.length; i++) {
    subOptions[i].classList.remove("selected");
  }
  subOptions[optionIndex].classList.add("selected");

  // Soru durumlarını localStorage'a kaydet
  localStorage.setItem("questionStates", JSON.stringify(questionStates));
}

function nextQuestion(currentIndex) {
  const currentQuestionCard = document.getElementById(`question${currentIndex}`);
  currentQuestionCard.classList.add("hidden");

  currentQuestion++;
  if (currentQuestion < 10) {
    const nextQuestionCard = document.getElementById(`question${currentQuestion}`);
    nextQuestionCard.classList.remove("hidden");
    const nextBtn = document.getElementById(`next${currentQuestion}`);
    if (nextBtn) nextBtn.classList.remove("hidden");
  }
}

function previousQuestion(currentIndex) {
  if (currentQuestion > 0) {
    const currentQuestionCard = document.getElementById(`question${currentIndex}`);
    currentQuestionCard.classList.add("hidden");

    currentQuestion--;
    const previousQuestionCard = document.getElementById(`question${currentQuestion}`);
    previousQuestionCard.classList.remove("hidden");
    const nextBtn = document.getElementById(`next${currentQuestion}`);
    if (nextBtn) nextBtn.classList.remove("hidden");
  }
}

function chooseDevelopment(choice) {
  developmentState.choice = choice;

  const kisiselBtn = document.getElementsByClassName("choice-btn")[0];
  const sosyalBtn = document.getElementsByClassName("choice-btn")[1];
  const suggestBtn = document.getElementById("suggestEgitimsel");

  kisiselBtn.classList.remove("selected");
  sosyalBtn.classList.remove("selected");

  if (choice === "kisisel") {
    kisiselBtn.classList.add("selected");
  } else if (choice === "sosyal") {
    sosyalBtn.classList.add("selected");
  }

  suggestBtn.classList.remove("hidden");
}

function goToVideoPage(type) {
  if (type === "egitimsel") {
    window.location.href = "egitimsel.html?category=" + developmentState.choice;
  } else if (type === "ogretici") {
    window.location.href = "ogretici.html";
  }
}