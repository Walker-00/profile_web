function countLetters(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i].match(/[a-zA-Z]/)) {
      count++;
    }
  }
  return count;
}

function countWords(s) {
  let count = 1;
  for (let i = 0; i < s.length; i++) {
    if (s[i].match(/\s/)) {
      count++;
    }
  }
  return count;
}

function countSentences(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i].match(/[.!?]/)) {
      count++;
    }
  }
  return count;
}

function calculateIndex(text) {
  const letters = countLetters(text);
  const words = countWords(text);
  const sentences = countSentences(text);
  const L = (letters / words) * 100;
  const S = (sentences / words) * 100;
  const index = Math.round(0.0588 * L - 0.296 * S - 15.8);
  return index;
}

function showGrade() {
  const text = document.getElementById("input-text").value;
  const index = calculateIndex(text);
  let grade = "";
  if (index < 1) {
    grade = "Before Grade 1";
  } else if (index >= 16) {
    grade = "Grade 16+";
  } else {
    grade = "Grade " + index;
  }
  document.getElementById("results").style.backgroundColor = "#fff";
  document.getElementById("results").style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
  document.getElementById("results").textContent = grade;
}

const button = document.getElementById("calculate-button");
button.addEventListener("click", showGrade);

