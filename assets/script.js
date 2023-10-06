document.addEventListener("DOMContentLoaded", () => {
  const questionBank = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Markup Language",
        "Hyperlink and Text Markup Language",
        "Home Tool Markup Language",
      ],
      correct: "Hyper Text Markup Language",
    },
    {
      question:
        "Which programming language is known as the 'mother of all languages'?",
      options: ["Java", "C", "Python", "Assembly"],
      correct: "C",
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Counter Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets",
        "Cascading Style Sheets",
      ],
      correct: "Cascading Style Sheets",
    },
    {
      question: "In JavaScript, what is a closure?",
      options: [
        "A new way to define functions",
        "A way to protect variables",
        "A combination of a function and the lexical environment within which that function was declared",
        "A type of loop",
      ],
      correct:
        "A combination of a function and the lexical environment within which that function was declared",
    },
    {
      question: "Which company developed the Python programming language?",
      options: ["Microsoft", "Google", "Facebook", "Dropbox"],
      correct: "Dropbox",
    },
    {
      question: "What is the purpose of the 'git clone' command?",
      options: [
        "To create a new branch",
        "To copy a repository from one location to another",
        "To merge branches",
        "To delete a repository",
      ],
      correct: "To copy a repository from one location to another",
    },
    {
      question: "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Advanced Programming Interface",
        "Automated Programming Interface",
        "Application Process Integration",
      ],
      correct: "Application Programming Interface",
    },
    {
      question: "What is the main purpose of the 'npm' package manager?",
      options: [
        "Networking Package Manager",
        "Node Project Manager",
        "New Package Manager",
        "Node Package Manager",
      ],
      correct: "Node Package Manager",
    },
    {
      question: "Which data type is not primitive in JavaScript?",
      options: ["Number", "String", "Boolean", "Object"],
      correct: "Object",
    },
    {
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "Sequential Query Language",
        "Structured Question Language",
      ],
      correct: "Structured Query Language",
    },
  ];

  let index = 0;
  const answerObject = {};
  const questionElement = document.getElementById("question");
  const optionsElements = document.querySelectorAll(".form-check-label");
  const userInputs = document.querySelectorAll(".form-check-input");
  const previous = document.querySelector("#previous");
  const next = document.querySelector("#next");

  // Function to load a question into the DOM
  const loadQuestion = () => {
    const data = questionBank[index];
    questionElement.innerHTML = `${index + 1}. ${data.question}`;
    optionsElements.forEach((option, i) => {
      option.innerText = data.options[i];
    });
    previous.style.visibility = index === 0 ? "hidden" : "visible";
    if (index === questionBank.length - 1) {
      next.innerHTML = "Submit";
    }
  };
  // Function to get the selected answer
  const getAnswer = () => {
    for (const input of userInputs) {
      if (input.checked) {
        return input.nextElementSibling.innerText;
      }
    }
  };
  // Function to set the selected answer when loading a question
  const setAnswer = () => {
    if (answerObject[index]) {
      userInputs.forEach((input) => {
        if (input.nextElementSibling.innerText === answerObject[index]) {
          input.checked = true;
        }
      });
    } else {
      userInputs.forEach((input) => {
        input.checked = false;
      });
    }
  };
  // Function to show the quiz result
  const showResult = () => {
    const container = document.getElementById("container");
    const box = document.createElement("div");
    box.classList.add("box");
    let total = questionBank.length;
    let correctAnswers = 0;

    questionBank.forEach((question, index) => {
      const isCorrect = question.correct === answerObject[index];
      if (isCorrect) {
        correctAnswers++;
      }
    });
    correctAnswers = correctAnswers + 1;
    const percentage = (correctAnswers / total) * 100;
    let message = "";
    let visibility = "visible";
    if (percentage === 100) {
      message = "Perfect score! 🎉";
      visibility = "hidden";
    } else if (percentage >= 80) {
      message = "Great job! 👏";
    } else if (percentage >= 60) {
      message = "Good effort! 🌟";
    } else {
      message = "Keep trying! 💪";
    }

    box.innerHTML = `
     <div class='text-center mt-4'>
      <h3 class="animated fadeInUp">You got ${correctAnswers} out of ${total}. ${message}</h3>
      </div>
      <div id="resetButton">
            <a href="index.html" class="btn btn-danger" id="reset" style="visibility: ${visibility};">Try Again</a>
      </div>
      `;
    container.innerHTML = `
  <div class="d-flex justify-content-center gap-3 "  >
          <div  div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
               <span class="visually-hidden">Loading...</span>
          </div>
          <div className="">
             <h3>Please Wait...</h3> 
          </div>
    </div>
     `;

    setTimeout(() => {
      container.innerHTML = "";
      container.appendChild(box);
    }, 3000);
  };

  // Initial load of the first question
  loadQuestion();

  // Event listener for the "Next" button
  next.addEventListener("click", () => {
    answerObject[index] = getAnswer();
    if (index < questionBank.length - 1) {
      index++;
      loadQuestion();
      setAnswer();
    } else {
      showResult();
    }
  });

  // Event listener for the previous button
  previous.addEventListener("click", () => {
    if (index > 0) {
      index--;
      loadQuestion();
      setAnswer();
    }
  });
});
