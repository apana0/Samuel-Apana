const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const timerElement = document.getElementById('timer');

let shuffledQuestions, currentQuestionIndex, timeLeft, timerIntervalId;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startQuiz() {
  startButton.textContent = "Next";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove('hide');
  timeLeft = 50; // Set the total time for the quiz (in seconds)
  timerIntervalId = setInterval(updateTimer, 1000); // Update the timer every second
  setNextQuestion();
}


function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
  
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('answer-button');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
  
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      startButton.innerText = 'Restart';
      startButton.classList.remove('hide');
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }

  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }

  function endQuiz() {
    clearInterval(timerIntervalId);
    // Display the final score or any other end-of-quiz information
  }

  function updateTimer() {
    timeLeft--;
    if (timeLeft < 0) {
      // If time is up, end the quiz
      clearInterval(timerIntervalId);
      endQuiz();
    } else {
      timerElement.innerText = `Time left: ${timeLeft}s`;
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }

  
  const questions = [  
    {    
      question: 'What divided by 8 will give you 4 ?',    
      answers: [      
        { text: '2', correct: true },      
        { text: '4', correct: false }    
      ]
    },
    {
      question: 'Who is the goat in the world of football?',
      answers: [
        { text: 'Lionel Messi', correct: true },
        { text: 'Cristiano Ronaldo', correct: false },
        { text: 'Neymar Jr.', correct: false },
        { text: 'Kylian Mbappé', correct: false }
      ]
    },
    {
      question: 'What is the capital city of Australia?',
      answers: [
        { text: 'Sydney', correct: false },
        { text: 'Melbourne', correct: false },
        { text: 'Brisbane', correct: false },
        { text: 'Canberra', correct: true }
      ]
    },
     {
      question: 'Who gained independence for Ghana ?',
      answers: [
        { text: 'Shatta Wale', correct: false },
        { text: 'Dr. Kwame Nkrumah', correct: true }
      ]
     },
     {
      question: 'What is the capital of Norway?',
      answers: [
        { text: 'Oslo', correct: true },
        { text: 'Stockholm', correct: false },
        { text: 'Copenhagen', correct: false },
        { text: 'Helsinki', correct: false }
      ]
    },
    {
      question: 'What is the smallest country in the world?',
      answers: [
        { text: 'Monaco', correct: false },
        { text: 'Vatican City', correct: true },
        { text: 'Maldives', correct: false },
        { text: 'San Marino', correct: false }
      ]
    },
    {
      question: 'Which planet in our solar system is known as the "Red Planet"?',
      answers: [
        { text: 'Mars', correct: true },
        { text: 'Venus', correct: false },
        { text: 'Jupiter', correct: false },
        { text: 'Saturn', correct: false }
      ]
    },
    {
      question: 'What is the largest mammal in the world?',
      answers: [
        { text: 'Elephant', correct: false },
        { text: 'Blue Whale', correct: true },
        { text: 'Giraffe', correct: false },
        { text: 'Hippopotamus', correct: false }
      ]
    },
    {
      question: 'What is the capital city of Brazil?',
      answers: [
        { text: 'São Paulo', correct: false },
        { text: 'Rio de Janeiro', correct: false },
        { text: 'Brasília', correct: true },
        { text: 'Salvador', correct: false }
      ]
    },
    {
      question: 'Which planet in our solar system is closest to the sun?',
      answers: [
        { text: 'Venus', correct: false },
        { text: 'Earth', correct: false },
        { text: 'Mercury', correct: true },
        { text: 'Mars', correct: false }
      ]
    }
 ];
  