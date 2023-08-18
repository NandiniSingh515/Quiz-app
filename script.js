const questions=[
    {
        question: "Who is the father of Computer science?",
        answers:[
                { text: "Edward Robert", correct: false },
                { text: "Charles Babbage", correct: true },
                { text: "J.V. Atansoff", correct: false },
                { text: "Thomas J. Watson", correct: false },
        ]
    },
    {
        question: "What converts an entire program into machine language?",
        answers:[
                { text: "File Transfer", correct: false },
                { text: "Interpreter", correct: false },
                { text: "Compiler", correct: true },
                { text: "Processor", correct: false },
        ]
    },
    {
        question: "First page of Website is termed as _______?",
        answers:[
                { text: "Homepage", correct: true },
                { text: "Reverse Video", correct: false },
                { text: "Computer Gaming", correct: false },
                { text: "File Transfer", correct: false },
        ]
    },
    {
        question: "What is correcting errors in a program called?",
        answers:[
                { text: "Shift", correct: false },
                { text: "Processor", correct: false },
                { text: "Application", correct: false },
                { text: "Debugging", correct: true },
        ]
    }
];
const questionElement = document.getElementById("question");
const answerbutton = document.getElementById("answer-button");
const nextbutton = document.getElementById("next-btn");

let questionIndex = 0;
let score = 0;

function startquiz(){
    questionIndex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetstate();
    let currentQuestion = questions[questionIndex];
    let questionNo = questionIndex+1;
    questionElement.innerHTML = questionNo +"."+" " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if (answers.correct){
            button.dataset.correct = answers.correct;
        }
        answerbutton.addEventListener("click",selectAnswer);
    });
}

function resetstate(){
    nextbutton.style.display = "none";
    while (answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button=> {
        if (button.dataset.correct=="true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    })
    nextbutton.style.display= "block";
}

function showScore(){
    resetstate();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
}

function handleNextButton(){
    questionIndex++;
    if(questionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextbutton.addEventListener('click',()=>{
    if(questionIndex < questions.length){
        handleNextButton();
    }else{
        startquiz();
    }
})


startquiz()