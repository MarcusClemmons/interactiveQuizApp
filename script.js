// JavaScript object to store quiz questions and answers

var quizQuestions = [
    {
        question: "What is the capital of France?",
        options: [
            {text:"Berlin", choice: false}, 
            {text:"Madrid", choice: false}, 
            {text:"Paris", choice: true}, 
            {text:"Rome", choice: false},
        ]
        
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: [
            {text:"Venus", choice: false}, 
            {text:"Mars", choice: true}, 
            {text:"Jupiter", choice: false}, 
            {text:"Saturn", choice: false},
        ]
    },
    {
        question: "The Eiffel Tower is located in which city?",
        options: [
            {text:"London", choice: false},  
            {text:"Paris", choice: true},  
            {text:"New York",  choice: false},  
            {text:"Tokyo", choice: false}, 
        ]
    },
    {
        question: "JavaScript is a programming Language commonly used for both front-end and back-end web development.",
        options: [
            {text:"True", choice: true},  
            {text:"False", choice: false}, 
        ]
       
    },
    {
        question: "The currency of Japan is Yuan",
        options: [
            {text:"True", choice: false},  
            {text:"False", choice: true}, 
        ]
      
    },
];

const questionDiv = document.querySelector('.questions')
const answers = document.querySelector('#answers');
const nextBtn = document.querySelector('#next-btn');

//Testing to see if the data is accessible

console.log("Question 1:", quizQuestions[0].question);
console.log("Options for Question 1:", quizQuestions[0].options);
console.log("Correct Answer for Question 1:",quizQuestions[0].correctAnswer);

//start quiz a first question and points
let startingIndex = 0;
let points = 0;


function beginQuiz(){
    startingIndex = 0;
    points = 0;
    nextBtn.innerHTML = "Next";
    viewQuestion();
}


function viewQuestion(){
    
    reset()
    //display the start of the quiz and loops thur the questions appending the qustion
    let currentQuestion = quizQuestions[startingIndex];
    let questionNo = startingIndex + 1;
    questionDiv.innerHTML = questionNo + ". " + currentQuestion.question
    //display the answers on the buttons
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerHTML = option.text;
        button.classList.add('btn');
        answers.appendChild(button)
        //adds the true or false on the buttons
        if(option.choice){
            button.dataset.choice = option.choice
        }
        //adds the ability to click the answer
        button.addEventListener('click', selectOption)
    })

}

//Hides the button elements on the html
function reset(){
    nextBtn.style.display = "none";
    while(answers.firstChild){
        answers.removeChild(answers.firstChild);
    }
}

function selectOption(e){
//creates the ability to selct right and wrong answer if right green if wrong red

    const selectbtn = e.target;
    const isCorrect = selectbtn.dataset.choice === 'true';
    if(isCorrect){
        selectbtn .classList.add("right");
        points++; 
    }else{
        selectbtn .classList.add("wrong");
    }
   
    //disables the clicking of a second choice wheather right or wrorng answer 
   //user must click next button to go to next question
    Array.from(answers.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add('right')
        }
        button.disabled = true;
    })
    nextBtn.style.display = 'block'
    
}

//gives the next button the ability to restart the quiz once answering last question
function handlenextBtn(){
    startingIndex++
    if(startingIndex < quizQuestions.length){
        viewQuestion()
    }
}
//gives the next button the functionity to restart the quiz once answering last question
nextBtn.addEventListener("click", ()=>{
    if(startingIndex < quizQuestions.length){
        handlenextBtn();
    }else{
        beginQuiz();
    }
})

//calls the start of the quiz
beginQuiz()