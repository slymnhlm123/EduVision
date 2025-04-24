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
let developmentState = { choice: null, subOption: null };

window.onload = function () {
  setTimeout(() => {
    document.getElementById("description").classList.remove("hidden");
    document.getElementById("startButton").classList.remove("hidden");
  }, 2000);
};

function startApp() {
  const splash = document.getElementById("splash");
  const headerSection = document.getElementById("headerSection");
  const mainContent = document.getElementById("mainContent");
  const klasikContent = document.getElementById("klasikContent");

  splash.style.transform = "translateY(-100vh)";
  splash.style.opacity = "0";

  setTimeout(() => {
    splash.style.display = "none";
    headerSection.classList.remove("hidden");
    mainContent.classList.remove("hidden");
    klasikContent.classList.remove("hidden");
  }, 1000);
}

function answerQuestion(index, answer) {
  const question = questionStates[index];
  question.answer = answer;

  const evetBtn = document.getElementById(`question${index}`).getElementsByClassName("answer-btn")[0];
  const hayırBtn = document.getElementById(`question${index}`).getElementsByClassName("answer-btn")[1];
  const subQuestions = document.getElementById(`subQuestions${index}`);
  const nextBtn = document.getElementById(`next${index}`);
  const suggestBtn = document.getElementById(`suggest${index}`);

  evetBtn.classList.remove("evet-selected", "hayır-selected");
  hayırBtn.classList.remove("evet-selected", "hayır-selected");

  if (answer === "evet") {
    evetBtn.classList.add("evet-selected");
    subQuestions.classList.remove("hidden");
    if (nextBtn) nextBtn.classList.remove("hidden");
    if (suggestBtn) suggestBtn.classList.remove("hidden");
  } else {
    hayırBtn.classList.add("hayır-selected");
    subQuestions.classList.add("hidden");
    question.subOption = null;
    if (nextBtn) nextBtn.classList.remove("hidden");
    if (suggestBtn) suggestBtn.classList.remove("hidden");
  }
}

function selectSubOption(questionIndex, optionIndex) {
  questionStates[questionIndex].subOption = optionIndex;

  const subOptions = document.getElementById(`subQuestions${questionIndex}`).getElementsByClassName("sub-option");
  for (let i = 0; i < subOptions.length; i++) {
    subOptions[i].classList.remove("selected");
  }
  subOptions[optionIndex].classList.add("selected");
}

function nextQuestion(currentIndex) {
  const currentQuestionCard = document.getElementById(`question${currentIndex}`);
  currentQuestionCard.classList.add("hidden");

  currentQuestion++;
  if (currentQuestion < 10) {
    const nextQuestionCard = document.getElementById(`question${currentQuestion}`);
    nextQuestionCard.classList.remove("hidden");
  }
}

function previousQuestion(currentIndex) {
  if (currentQuestion > 0) {
    const currentQuestionCard = document.getElementById(`question${currentIndex}`);
    currentQuestionCard.classList.add("hidden");

    currentQuestion--;
    const previousQuestionCard = document.getElementById(`question${currentQuestion}`);
    previousQuestionCard.classList.remove("hidden");
  }
}

function suggestVideo(type) {
  const videoDiv = document.getElementById("videoSuggestion");
  const selected = questionStates[9]; // 10. sorunun cevabı

  if (!selected || selected.answer === null) {
    videoDiv.innerHTML = "<p>Lütfen 10. soruya cevap verin.</p>";
    return;
  }

  const videos = {
    evet: '<video controls preload="metadata"><source src="eğitimsel/video1.mp4" type="video/mp4">Tarayıcınız video oynatmayı desteklemiyor.</video>',
    hayır: '<video controls preload="metadata"><source src="eğitimsel/video2.mp4" type="video/mp4">Tarayıcınız video oynatmayı desteklemiyor.</video>'
  };

  videoDiv.innerHTML = selected.answer === "evet" ? videos.evet : videos.hayır;
}

function chooseCategory(type) {
  const klasikTab = document.getElementById("klasikTab");
  const egitimselTab = document.getElementById("egitimselTab");
  const indicator = document.getElementById("tabIndicator");

  if (type === "egitimsel") {
    klasikTab.classList.remove("active");
    egitimselTab.classList.add("active");
    document.getElementById("klasikContent").classList.add("hidden");
    document.getElementById("egitimselContent").classList.remove("hidden");
    indicator.style.transform = "translateX(100%)";
  } else if (type === "klasik") {
    klasikTab.classList.add("active");
    egitimselTab.classList.remove("active");
    document.getElementById("egitimselContent").classList.add("hidden");
    document.getElementById("klasikContent").classList.remove("hidden");
    indicator.style.transform = "translateX(0%)";
    currentQuestion = 0;
    document.getElementById("question0").classList.remove("hidden");
    for (let i = 1; i < 10; i++) {
      document.getElementById(`question${i}`).classList.add("hidden");
    }
  }
}

function chooseDevelopment(choice) {
  developmentState.choice = choice;

  const kişiselBtn = document.getElementsByClassName("choice-btn")[0];
  const sosyalBtn = document.getElementsByClassName("choice-btn")[1];
  const subChoiceKişisel = document.getElementById("subChoiceKişisel");
  const subChoiceSosyal = document.getElementById("subChoiceSosyal");

  kişiselBtn.classList.remove("selected");
  sosyalBtn.classList.remove("selected");

  if (choice === "kişisel") {
    kişiselBtn.classList.add("selected");
    subChoiceKişisel.classList.remove("hidden");
    subChoiceSosyal.classList.add("hidden");
  } else if (choice === "sosyal") {
    sosyalBtn.classList.add("selected");
    subChoiceSosyal.classList.remove("hidden");
    subChoiceKişisel.classList.add("hidden");
  }

  developmentState.subOption = null;
  document.getElementById("devVideo").innerHTML = "<p>Henüz video önerilmedi.</p>";
}

function selectDevelopmentSubOption(choice, optionIndex) {
  developmentState.subOption = optionIndex;

  const subOptions = document.getElementById(`subChoice${choice.charAt(0).toUpperCase() + choice.slice(1)}`).getElementsByClassName("sub-option");
  for (let i = 0; i < subOptions.length; i++) {
    subOptions[i].classList.remove("selected");
  }
  subOptions[optionIndex].classList.add("selected");
}

function suggestDevelopmentVideo(choice) {
  const videoDiv = document.getElementById("devVideo");

  if (!developmentState.choice || developmentState.subOption === null) {
    videoDiv.innerHTML = "<p>Lütfen bir alt seçenek seçin.</p>";
    return;
  }

  const videos = {
    kişisel: [
      '<video controls preload="metadata"><source src="klasik/video1.mp4" type="video/mp4">Tarayıcınız video oynatmayı desteklemiyor.</video>',
      '<video controls preload="metadata"><source src="klasik/video2.mp4" type="video/mp4">Tarayıcınız video oynatmayı desteklemiyor.</video>',
      '<video controls preload="metadata"><source src="klasik/video3.mp4" type="video/mp4">Tarayıcınız video oynatmayı desteklemiyor.</video>'
    ],
    sosyal: [
      '<video controls preload="metadata"><source src="klasik/video4.mp4" type="video/mp4">Tarayıcınız video oynatmayı desteklemiyor.</video>',
      '<video controls preload="metadata"><source src="klasik/video5.mp4" type="video/mp4">Tarayıcınız video oynatmayı desteklemiyor.</video>',
      '<video controls preload="metadata"><source src="klasik/video6.mp4" type="video/mp4">Tarayıcınız video oynatmayı desteklemiyor.</video>'
    ]
  };

  videoDiv.innerHTML = videos[choice][developmentState.subOption];
}