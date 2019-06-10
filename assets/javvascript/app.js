const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
// laying out the questions
const myQuestions = [
    {
        question: "Who is the strongest?",
        answers: {
            a: "Superman",
            b: "The Terminator",
            c: "Waluigi, obviously"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the best site ever created?",
        answers: {
            a: "SitePoint",
            b: "Simple Steps Code",
            c: "Trick question; they're both the best"
        },
        correctAnswer: "c"
    },
    {
        question: "Where is Waldo really?",
        answers: {
            a: "Antarctica",
            b: "Exploring the Pacific Ocean",
            c: "Sitting in a tree",
            d: "Minding his own business, so stop asking"
        },
        correctAnswer: "d"
    }
];

function buildQuiz() {
    //STEP 1
    // this stores the HTML outputs
    const output = [];
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            // store the list of answers choices
            const answers = [];
            // and for each answer
            for (letter in currentQuestion.answers) {
                answers.push(
                    // backticks allow us to create "stronger", multi line strings
                    //this is adding our HTML radio buttons
                    `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
                );
            };
            // add this question and its answers to the output
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
             <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );
    // combining output list into one string of HTML and displaying it on the page
    //Because this is in a forEach loop, we get the current value, the index (the position number of the current item in the array), and the array itself as parameters. 
    quizContainer.innerHTML = output.join('');
};

// display the quiz immediately
buildQuiz();

//Step 2
function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of student's answers
    let inputCorrect = 0;

    // forEach loop for every question
    myQuestions.forEach((currentQuestion, questionNumber) => {

        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = 'input[name=question' + questionNumber + ']:checked';
        //finding the answers checked radio button
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        //EVALUATING THE ANSWER AND DISPLAYING THE RESULT
        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            // add to the number of correct answers
            inputCorrect++;
            answerContainers[questionNumber].style.color = 'black';
        }
        // if answer is incorrect (including blanks)
        else {
            // mark incorrect answers red for some SWAG points
            answerContainers[questionNumber].style.color = 'red';
        }
    });
    console.log(answerContainers);

    // show grade (number of correct answers out of total)
    resultsContainer.innerHTML = inputCorrect + ' out of ' + myQuestions.length;
};




// show results on submission
submitButton.addEventListener('click', showResults);

