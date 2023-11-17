// JavaScript object to store quiz questions and answers

var quizQuestions = [
    {
      question: "What is the capital of France?",
      options: [
        { text: "Berlin", choice: false },
        { text: "Madrid", choice: false },
        { text: "Paris", choice: true },
        { text: "Rome", choice: false },
      ],
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: [
        { text: "Venus", choice: false },
        { text: "Mars", choice: true },
        { text: "Jupiter", choice: false },
        { text: "Saturn", choice: false },
      ],
    },
    {
      question: "The Eiffel Tower is located in which city?",
      options: [
        { text: "London", choice: false },
        { text: "Paris", choice: true },
        { text: "New York", choice: false },
        { text: "Tokyo", choice: false },
      ],
    },
    {
      question:
        "JavaScript is a programming Language commonly used for both front-end and back-end web development.",
      options: [
        { text: "True", choice: true },
        { text: "False", choice: false },
      ],
    },
    {
      question: "The currency of Japan is Yuan",
      options: [
        { text: "True", choice: false },
        { text: "False", choice: true },
      ],
    },
  ];
  
  const questionDiv = document.querySelector(".questions");
  const answers = document.querySelector("#answers");
  const nextBtn = document.querySelector("#next-btn");
  const pauseBtn = document.querySelector("#Pause-btn");
  const resumeBtn = document.querySelector("#Resume-btn");
  const prevBtn = document.getElementById("prev-btn");
  let restartBtn = document.getElementById('Restart-btn')
  
  //Testing to see if the data is accessible
  
  console.log("Question 1:", quizQuestions[0].question);
  console.log("Options for Question 1:", quizQuestions[0].options);
  console.log("Correct Answer for Question 1:", quizQuestions[0].correctAnswer);
  
  //start quiz a first question and points
  let startingIndex = 0;
  let points = 0;
  
  // starts the quiz
  function beginQuiz() {
    startingIndex = getCurIndex();
    points = 0;
    nextBtn.innerHTML = "Next";
    viewQuestion();
  }
  
  // saves the current index to localstorage
  function saveToLocalStorage(curIndex) {
    localStorage.setItem("cur_index", `${curIndex}`);
  }
  
  // saves selected answer to local storage
  function saveSelectedAnswer(choice, backgroundColor, isCorrect) {
    const selectedAnswer = { choice, backgroundColor, isCorrect };
    localStorage.setItem(
      `answer_${startingIndex}`,
      JSON.stringify(selectedAnswer)
    );
  }
  
  // gets the current question index
  function getCurIndex() {
    let tem = localStorage.getItem("cur_index");
    if (!tem) {
      return 0;
    }
  
    let curIndex = parseInt(tem);
  
    if (curIndex > quizQuestions.length - 1) {
      curIndex = 0;
    }
  
    return curIndex;
  }
  
  // loads the question
  function viewQuestion() {
    reset();
  
    //display the start of the quiz and loops thur the questions appending the qustion
    let currentQuestion = quizQuestions[startingIndex];
    let questionNo = startingIndex + 1;
    questionDiv.innerHTML = questionNo + ". " + currentQuestion.question;
    //display the answers on the buttons
    currentQuestion.options.forEach((option) => {
      const button = document.createElement("button");
      button.innerHTML = option.text;
      button.classList.add("btn");
      answers.appendChild(button);
      //adds the true or false on the buttons
      if (option.choice) {
        button.dataset.choice = option.choice;
      }
      //adds the ability to click the answer
      button.addEventListener("click", selectOption);
    });
  
    // Hide or show "Previous" and "Next" buttons based on the current question index
    if (startingIndex === 0) {
      prevBtn.style.display = "none"; // Hide "Previous" on the first question
    } else {
      prevBtn.style.display = "block"; // Show "Previous" for other questions
    }
  
    if (startingIndex === quizQuestions.length - 1) {
      nextBtn.style.display = "none"; // Hide "Next" on the last question
    } else {
      nextBtn.style.display = "block"; // Show "Next" for other questions
    }
    loadPreviousAnswer(); // Load previously selected answer
  }
  
  //Hides the button elements on the html
  function reset() {
    // nextBtn.style.display = "none";
    while (answers.firstChild) {
      answers.removeChild(answers.firstChild);
    }
  }
  
  // enables the buttons to select a choice
  function selectOption(e) {
    const selectbtn = e.target;
    const selectedChoice = selectbtn.textContent.trim(); // Get the text content of the button
  
    const isCorrect = selectbtn.dataset.choice === "true";
  
    console.log("Selected Answer:", selectedChoice);
    console.log("Is Correct:", isCorrect);
  
    if (isCorrect) {
      console.log("Correct");
      selectbtn.classList.add("right");
      points++;
    } else {
      console.log("Incorrect");
      selectbtn.classList.add("wrong");
    }
  
    // Save the selected answer's choice and background color to local storage
    saveSelectedAnswer(
      selectedChoice,
      selectbtn.style.backgroundColor,
      isCorrect
    );
  
    Array.from(answers.children).forEach((button) => {
      button.disabled = true;
    });
  
    // Hide or show "Previous" and "Next" buttons based on the current question index
    if (startingIndex === 0) {
      prevBtn.style.display = "none"; // Hide "Previous" on the first question
    } else {
      prevBtn.style.display = "block"; // Show "Previous" for other questions
    }
  
    if (startingIndex === quizQuestions.length - 1) {
      nextBtn.style.display = "none"; // Hide "Next" on the last question
    } else {
      nextBtn.style.display = "block"; // Show "Next" for other questions
    }
  }
  
  //gives the next button the ability to restart the quiz once answering last question
  function handlenextBtn() {
    if (startingIndex === quizQuestions.length - 1) {
      startingIndex = 0;
    } else {
      startingIndex++;
    }
  
    saveToLocalStorage(startingIndex);
    viewQuestion();
  
    // if(startingIndex < quizQuestions.length){
    //     viewQuestion()
    // }
  }
  //gives the next button the functionity to restart the quiz once answering last question
  nextBtn.addEventListener("click", () => {
    if (startingIndex < quizQuestions.length) {
      handlenextBtn();
    } else {
      beginQuiz();
    }
  });
  
  // calls the pause btn
  pauseBtn.addEventListener("click", () => {
    paused = true;
    pauseBtn.style.backgroundColor = "red";
    nextBtn.disabled = true;
    prevBtn.disabled = true;
    Array.from(answers.children).forEach((button) => {
      button.disabled = true;
    });
  });
  // calls the resume btn
  resumeBtn.addEventListener("click", () => {
    paused = false;
    pauseBtn.style.backgroundColor = "white";
    if (startingIndex < quizQuestions.length) {
      nextBtn.disabled = false;
      prevBtn.disabled = false;
    }
    Array.from(answers.children).forEach((button) => {
      button.disabled = false;
    });
  });
  
  // calls the prev btn
  prevBtn.addEventListener("click", handlePrevBtn);
  
  function handlePrevBtn() {
    // Decrease the index to go to the previous question
    startingIndex = Math.max(0, startingIndex - 1);
  
    // Load the previous question
    viewQuestion();
  }
  
  // loads the previously stored answers
  function loadPreviousAnswer() {
    // Load the previous selected answer's choice and background color
    const currentQuestion = quizQuestions[startingIndex];
    const savedAnswer = localStorage.getItem(`answer_${startingIndex}`);
  
    if (savedAnswer) {
      try {
        const selectedAnswer = JSON.parse(savedAnswer);
        console.log("Selected Answer from Storage:", selectedAnswer);
  
        if (selectedAnswer.choice) {
          const buttons = Array.from(answers.children);
  
          buttons.forEach((button, index) => {
            // Compare the stored answer with the current options by text content
            if (
              currentQuestion.options[index].text.trim() ===
              selectedAnswer.choice.trim()
            ) {
              // Set background color based on the selected answer
              button.style.backgroundColor = selectedAnswer.backgroundColor;
  
              // If the selected answer is correct, add "right" class
              if (currentQuestion.options[index].choice) {
                button.classList.add("right");
              } else {
                // If the selected answer is incorrect, add "wrong" class
                button.classList.add("wrong");
              }
  
              // Disable other buttons
              buttons.forEach((btn) => {
                btn.disabled = true;
              });
            }
          });
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }
  
  restartBtn.addEventListener('click',(e)=>{
    /*startingIndex = 0;
    points = 0;
    nextBtn.innerHTML = "Next";
    viewQuestion();*/
     window.localStorage.clear()
  })
  //calls the start of the quiz
  beginQuiz();
  