'use strict';

const quizData = [
  { 
    question: 'When was snowboarding invented?',
    choices: [
      '60\'s',
      '90\'s',
      '50\'s',
      '80\'s',
    ],
    answer: '60\'s',
  },

  {
    question: 'When snowboarding what should you always wear?',
    choices: [
      'Sunscreen',
      'Coat',
      'Face Mask',
      'Helmet',
    ],
    answer: 'Helmet',
  },

  {
    question: 'Which of these locations has the longest snowboarding season?',
    choices: [
      'Timberline',
      'Ski Bowl',
      'Mt. Hood Meadows',
      'Cooper\'s Spur',
    ],
    answer: 'Timberline',
  },

  {
    question: 'What is the most common snowboarding injury?',
    choices: [
      'Broken Leg',
      'Broken Rib',
      'Sprained Ankle',
      'Sprained Wrist',
    ],
    answer: 'Sprained Wrist',
  },

  {
    question: 'What is “Jibbing”?',
    choices: [
      'Technical Riding On Non-Standard Surfaces',
      'Snowboard Race lingo',
      'Slang For Getting Off The Lift',
      'When Two Or More Snowboarders Get Into A Fight',
    ],
    answer: 'Technical riding on non-standard surfaces',
  },

  {
    question: 'Which of the following is most similar to snowboarding?',
    choices: [
      'Roller Blading',
      'Wakeboarding',
      'Mountain Biking',
      'Sledding',
    ],
    answer: 'Wakeboarding',
  },

  {
    question: 'What percentage of snowboarders also ski?',
    choices: [
      '75 %',
      '0 %',
      '20 %',
      '0 %',
    ],
    answer: '20 %',
  },

  {
    question: 'Which of these is a Front Hand Grab?',
    choices: [
      'Stalefish',
      'Tindy',
      'Chicken Salad',
      'Seatbelt',
    ],
    answer: 'Seatbelt',
  },
    
  {
    question: 'How often should you wax your board?',
    choices: [
      'Each Time You Go',
      'Once a Season',
      'Every Other Time You Go',
      'Never',
    ],
    answer: 'Each Time You Go',
  },

  {
    question: 'When a bunch of fresh pow has fallen what do you have to remember?',
    choices: [
      'Keep Your Tip Up',
      'No Friends On Pow Days',
      'Stay Home and Come Back On A Less Snowy Day',
      'Go Slow and Be Safe',
    ],
    answer: 'No Friends On Pow Days',
  }  
];

let currentQuestionNumber = 0;
let currentScore = 0;

//creates question HTML in DOM
function choiceForm() {
  if (currentQuestionNumber < quizData.length) {
    return (`<section class="question-${currentQuestionNumber}">
      <h2>${quizData[currentQuestionNumber].question}</h2>
      <form role="form" class='js-question-form'>
        <fieldset>
          <legend>Choices:</legend>
          <label class="js-option">
            <input type="radio" name="choices" required>
            <span>${quizData[currentQuestionNumber].choices[0]}</span>
          </label>
          <label class="js-option">
            <input type="radio" name="choices" required>
            <span>${quizData[currentQuestionNumber].choices[1]}</span>
          </label>
          <label class="js-option">
            <input type="radio" name="choices" required>
            <span>${quizData[currentQuestionNumber].choices[2]}</span>
          </label>
          <label class="js-option">
            <input type="radio"  name="choices" required>
            <span>${quizData[currentQuestionNumber].choices[3]}</span>
          </label> 
          <button type="submit" class="js-submit-button">Submit</button>
        </fieldset>
      </form>
    </section>`);
} else {
    resultsPage();
    startOver();
    $('.js-question-num').text(10)
  }
}

//starts quiz
function startQuiz(){
  $('.js-start').click('.js-start-button', function(event) {
    $('.js-start').remove()
    $('.js-question-num').text(1);
    loadQuestion();
 });
}

//loads next question
function loadQuestion() {
  $('.js-container').html(choiceForm());
}

//updates question count
function questionCount() {
  currentQuestionNumber++;
  $('.js-question-num').text(currentQuestionNumber+1);
}

//updates score
function updateScore() {
  currentScore++;
  $('.js-current-score').text(currentScore);
}

//handles submit button
function answerSubmission () {
  $('.js-container').on('submit', function (event) {
    event.preventDefault();
    if ($('input:checked').next().text() === quizData[currentQuestionNumber].answer) {
      correctAnswerSubmitted();
    } else {
      incorrectAnswerSubmitted();
    }
  });
}

//renders next question in DOM
function loadnextQuestion(){
  $('.js-container').on('click', '.js-next-button', function(event){
    event.preventDefault();
    questionCount();
    loadQuestion();
  });
}

function correctAnswerSubmitted() {
  correctAnswerFeedback();
  updateScore();
}

function incorrectAnswerSubmitted() {
  incorrectAnswerFeedback();
}

//feedback for incorrect answer
function incorrectAnswerFeedback(){
  let correctAnswer = quizData[currentQuestionNumber].answer;
  $('.js-container').html(
    `<section class="js-feedback">
      <h2>You got it wrong!<h2>
      <p>The correct answer was:  "${correctAnswer}"</p>
      <button class='js-next-button' type='button'>Next</button>
    </section>`);
}

//feedback for correct answer
function correctAnswerFeedback(){
  $('.js-container').html(
    `<section class="js-feedback"><h2>You got it right!</h2>
      <button class='js-next-button' type='button'>Next</button>
    </section>`);
}

//results page
function resultsPage(){
  $('.js-container').html(`
  <h1>Results</h1>
  <section class="js-results">
    <h2>Your Final Score Is: ${currentScore}/10</h2>
    <button class='js-restart-button' type='button'>Restart</button>
  </section>`)
};

//reloads quizData
function startOver(){
  $('.js-container').on('click', '.js-restart-button', function (event) {
    location.reload();
  });
}

//run all functions
function renderquizData() {
  startQuiz();
  answerSubmission();
  loadnextQuestion();
}

$(renderquizData);