const emotions = ["happy", "angry", "sad", "surprised", "freak"];

const imageMap = {
  happy: ["happy1.jpg","happy2.jpg","happy3.jpg","happy4.jpg","happy5.jpg","happy6.jpg"],
  angry: ["angry1.jpg","angry2.jpg","angry3.jpg","angry4.jpg","angry5.jpg","angry6.jpg"],
  sad: ["sad1.jpg","sad2.jpg","sad3.jpg","sad4.jpg","sad5.jpg","sad6.jpg"],
  surprised: ["surprised1.jpg","surprised2.jpg","surprised3.jpg","surprised4.jpg","surprised5.jpg","surprised6.jpg"],
  freak: ["freak1.jpg","freak2.jpg","freak3.jpg","freak4.jpg","freak5.jpg","freak6.jpg"]
};

let targetEmotion;
let timer;
let countdown;

function startCaptcha() {
  generateTarget();
  generateGrid();
  startTimer();
}

function generateTarget() {
  targetEmotion = emotions[Math.floor(Math.random() * emotions.length)];
  document.getElementById("prompt").innerText = `Select all: ${targetEmotion}`;
}

function generateGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  let allImages = [];

  emotions.forEach(emotion => {
    imageMap[emotion].forEach(img => {
      allImages.push({ emotion, src: `img/${img}` });
    });
  });

  // shuffle
  allImages.sort(() => Math.random() - 0.5);

  const selected = allImages.slice(0, 16);

  selected.forEach(item => {
    const img = document.createElement("img");
    img.src = item.src;
    img.dataset.emotion = item.emotion;

    img.onclick = () => {
      img.classList.toggle("selected");
    };

    grid.appendChild(img);
  });
}

function startTimer() {
  let timeLeft = 5;
  document.getElementById("timer").innerText = `Time: ${timeLeft}`;

  countdown = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      checkAnswer();
    }
  }, 1000);
}

function checkAnswer() {
  const selected = document.querySelectorAll(".selected");
  let correct = true;

  selected.forEach(img => {
    if (img.dataset.emotion !== targetEmotion) {
      correct = false;
    }
  });

  const allCorrect = document.querySelectorAll(`img[data-emotion="${targetEmotion}"]`);
  allCorrect.forEach(img => {
    if (!img.classList.contains("selected")) {
      correct = false;
    }
  });

  if (correct) {
    alert("✅ Passed - Human");
  } else {
    alert("❌ Failed - Try again");
  }
}