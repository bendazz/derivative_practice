
async function loadQuestions() {
  const res = await fetch('questions.json');
  const questions = await res.json();
  const list = document.getElementById('questions-list');
  list.innerHTML = '';
  questions.forEach((q, i) => {
    const li = document.createElement('li');
    // Render question
    let questionText = q.question.replace(/\$(.+?)\$/g, "\\($1\\)");
    li.innerHTML = questionText;
    // Render answer below
    const answerDiv = document.createElement('div');
    answerDiv.className = 'answer';
    // Wrap answer in display math
    let answerText = q.answer.replace(/\$(.+?)\$/g, "\\[$1\\]");
    answerDiv.innerHTML = '<strong>Answer:</strong> ' + (answerText.startsWith('\\[') ? answerText : `\\(${q.answer}\\)`);
    li.appendChild(answerDiv);
    list.appendChild(li);
  });
  MathJax.typesetPromise();
}

window.onload = loadQuestions;
