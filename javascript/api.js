// https://opentdb.com/api_config.php
let categoryOptionsContainer = document.querySelector(".category-options");
let categoryOpAnText = document.querySelector(".op");
let resultContaoner = document.querySelector(".result");
let dropdownS = document.querySelectorAll(".dropdown div");
let QContainer = document.querySelector(".section-container");
// Questions
let questionNumber = document.querySelector(".question-container .num");
let currentquestionNumber = document.querySelector(
  ".question-container .current-question"
);
let questionsTextOfNum = document.querySelector(".current-question .question");
let buttonsContainer = document.querySelectorAll(".buttons button");
let getquestionAnswerContainer = document.querySelectorAll(
  ".question-answer-container"
);
let corrects = document.querySelector(".corrects");
let incorrects = document.querySelector(".incorrects");
// buttons
let showResult = document.querySelector(".show-result");
let start = document.querySelector(".start");
let next = document.querySelector(".next");
// Vars
let questionsDivs;
let clickedChoice = [];
let selectedRadioInputs = [];
let currentIndex = 0;
let currentId = 0;
let correctAnswer = [];
let number=1;
let number2=1;
let numberOfQ = 10;
let selectedCategoryId;
let difficultyLevel;
let questionAnswerContainer;
let apiUrl = `https://opentdb.com/api.php?amount=${numberOfQ}`;
const apiUrlCategories = "https://opentdb.com/api_category.php";
let promises = [
  fetch(apiUrlCategories).then((response) => response.json()),
];
Promise.all(promises)
  .then((results) => {
    let categoriesData = results[0];
    // Loop through each element in the trivia_categories
    categoriesData.trivia_categories.forEach((element) => {
      // Create a new <div> element
      let option = document.createElement("div");
      // Set the text content of the <div> to the category name
      option.textContent = element.name;
      // Add  classes to the <div>
      option.classList.add("option");
      option.classList.add("category-option");
      let anOption = document.createElement("div");
      anOption.classList.add("op");
      anOption.textContent = element.name;
      // Add id to the <div>
      option.setAttribute("id", element.id);
      // Append the <div> to the target element
      if (categoryOptionsContainer) {
        categoryOptionsContainer.appendChild(option);
      }
    });
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.log("Fetch error", error);
  });

// Add a click event listener to the container
dropdownS.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    // Reset the application when any option is clicked
    resetApplication();
    // Check if the clicked element has the class "category-option"
    if (e.target.classList.contains("category-option")) {
      selectedCategoryId = e.target.id;
    }
    // If a questions option is clicked, update the number of questions based on the data attribute
    if (e.target.classList.contains("questions-option")) {
      numberOfQ = parseInt(e.target.dataset.numberq);
    }
    // If a difficulties option is clicked, update the difficulty level based on the data attribute
    if (e.target.classList.contains("difficulties-option")) {
      difficultyLevel = e.target.dataset.difficulty;
    }

    // Construct the apiUrl with updated parameters based on user selections
    apiUrl = `https://opentdb.com/api.php?amount=${numberOfQ}${
      selectedCategoryId ? `&category=${selectedCategoryId}` : ""
    }${difficultyLevel ? `&difficulty=${difficultyLevel}` : ""}`;
  });
});
// Function to fetch questions and initialize the program
start.addEventListener("click", () => {
  // Show Questions
  QContainer.classList.add("show");
  // QContainer.show();
  console.log(apiUrl, numberOfQ, difficultyLevel, selectedCategoryId);
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data:", data);
if(data.results){
  data.results.forEach((result) => {
    correctAnswer.push(result.correct_answer);
    questionNumber.textContent = numberOfQ;
    // Create a paragraph for the question text
    const questionText = document.createElement("p");
    questionText.classList.add("question-text");
    questionText.textContent = result.question;

    // Create a header for answer choices
    const answerHeader = document.createElement("h3");
    answerHeader.classList.add("answer-header");
    answerHeader.textContent = "Choose an answer:";

    // Create an unordered list for answer choices
    const answerList = document.createElement("ul");
    answerList.classList.add("answer-choices");
    answerList.id = "answer-choices";

    // Create list items for answer choices and add them to the list
    const choices = [result.correct_answer, ...result.incorrect_answers];
    choices.forEach((choiceText) => {
      const listItem = document.createElement("li");
      listItem.classList.add("answer-choice");
      // listItem.textContent = choiceText;
      answerList.appendChild(listItem);

      const input = document.createElement("input");
      input.type = "radio";
      input.classList.add("aaa");
      input.dataset.answer = choiceText;
      input.id = `choice-${currentId}`; // Use a unique ID for each choice
      const label = document.createElement("label");
      label.setAttribute("for", `choice-${currentId}`); // Set the 'for' attribute to match the 'id' of the associated input
      label.textContent = choiceText;
      listItem.appendChild(input);
      listItem.appendChild(label);
      //Increment current ID
      currentId++;
    });

    // Add the created elements to the DOM
    const questionContainer = document.querySelector(".question-container");
    questionAnswerContainer = document.createElement("div");
    questionAnswerContainer.classList.add("question-answer-container");
    questionAnswerContainer.appendChild(questionText);
    questionAnswerContainer.appendChild(answerHeader);
    questionAnswerContainer.appendChild(answerList);
    questionContainer.appendChild(questionAnswerContainer);
    //select question answer container
    questionsDivs = document.querySelectorAll(
      ".question-container .question-answer-container"
    );
    // Update the active question
    updateActiveQuestion();
    // Display  current question Number
    currentquestionNumber.textContent = `current question ${
      currentIndex + 1
    }`;
  });
  // scroll to Questions container
  QContainer.scrollIntoView({ behavior: "smooth" });
} 
else{
  // document.querySelector("spinner").style.display = "block";
  // let spinner =document.createElement("div");
  // spinner.classList.add("spinner");
  // QContainer.appendChild(spinner);
}
      

      //set input element names
      handleInputName();
    })
    .catch((error) => {
      console.error("Fetch error", error);
    });
});

// Add event listeners to the buttons for navigation
buttonsContainer.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Check if "next" button is clicked and currentIndex is within bounds
    if (e.target.classList.contains("next") && currentIndex < numberOfQ - 1) {
      currentIndex++;
    }
    // Check if "previous" button is clicked and currentIndex is within bounds
    else if (e.target.classList.contains("previous") && currentIndex > 0) {
      currentIndex--;
    }
    // set input element names
    handleInputName();
    // Display And update current question Number
    currentquestionNumber.textContent = `current question ${currentIndex + 1}`;
    //
    // Ensure currentIndex is not less than 0 &&  currentIndex is not greater than the number of questions
    currentIndex = Math.min(
      Math.max(currentIndex, 0),
      questionsDivs.length - 1
    );

    // Update the active question
    updateActiveQuestion();
    // Check  Answer
    if (currentIndex === numberOfQ - 1) {
      checkAnswer();
      next.classList.add("disabled");
    } else {
      next.classList.remove("disabled");
    }
  });
});

// Function to update the active question based on currentIndex
function updateActiveQuestion() {
  questionsDivs.forEach((div, index) => {
    // Remove "active" class from all question containers
    div.classList.remove("active");
    if (index === currentIndex) {
      // Add "active" class to the currently selected question container
      div.classList.add("active");
    }
  });
}
// function  to manage input element names.
function handleInputName() {
  let answerchoices = document.querySelectorAll(".answer-choices");
  let inputs = answerchoices[currentIndex].querySelectorAll(
    ".answer-choice input"
  );
  // Loop through each input element found.
  inputs.forEach((input) => {
    // Set the 'name' attribute of each input element to "question-[currentIndex]" for identification.
    input.name = `question-${currentIndex}`;
  });
}
// Function to check and display answers
function checkAnswer() {
  // Select all radio inputs of type 'radio'
  let radioInputs = document.querySelectorAll('input[type="radio"]');
  // Iterate over each selected radio input
  radioInputs.forEach((radioInput, index) => {
    // Check if the radio input is checked
    if (radioInput.checked) {
      // Check if the selected radio input is not already in the selectedRadioInputs array
      if (!selectedRadioInputs.includes(radioInput)) {
        // Add the selected radio input to the selectedRadioInputs array
        selectedRadioInputs.push(radioInput);
        // Create a div to display the correct selected input's value (answer)
        let selectedInputCorrect = document.createElement("div");
        // Create a div to display whether the answer is correct or incorrect
        let stute = document.createElement("div");
        // Create a div to display the Incorrect selected input's value (answer)
        let selectedInputIncorrect = document.createElement("div");
        // corrects.classList.add("corrects");
        if (radioInput.dataset.answer[index] === correctAnswer[index]) {
          stute.textContent = "correct";
          stute.classList.add("correct");
          selectedInputCorrect.textContent = `${number2++} - ${radioInput.dataset.answer}`;
          selectedInputCorrect.classList.add("selected_correct");
          corrects.appendChild(selectedInputCorrect);
        } else {
          stute.classList.add("incorrect");
          stute.textContent = "incorrect";
          selectedInputIncorrect.textContent =`${number++} - ${radioInput.dataset.answer}`;
          selectedInputIncorrect.classList.add("selected_incorrect");
          incorrects.appendChild(selectedInputIncorrect);
        }
      }
    }
  });
  //
  // Check if the current question is the last question
  if (currentIndex === numberOfQ - 1) {
    // show  button show Result
    showResult.classList.add("show");
  }

  // Select all question-answer-container elements
  const questionAnswerContainers = document.querySelectorAll(
    ".question-answer-container"
  );

  // Get the last question-answer-container
  const lastQuestionAnswerContainer =
    questionAnswerContainers[questionAnswerContainers.length - 1];

  if (lastQuestionAnswerContainer) {
    // Check if a specific radio input within the last container is checked
    const radioInput = lastQuestionAnswerContainer.querySelector(
      'input[type="radio"]:checked'
    );
    // show Result
    showResult.addEventListener("click", () => {
      // Show result
      resultContaoner.classList.add("show");
      resultContaoner.showModal();
      showResult.classList.remove("show");
      // Hidde Questions
      QContainer.close();
      // QContainer.classList.remove("show");
      // Create a div element to display the number of correct answers
      let correctQuestions = document.createElement("div");
      // Add  num-correct to the div
      correctQuestions.classList.add("num-correct");
      // Set the text content of the div
      if (selectedRadioInputs.length !== 0) {
        correctQuestions.textContent = `${selectedRadioInputs.length} from ${numberOfQ} answered `;
      } else {
        correctQuestions.textContent = "No questions have been answered yet";
      }
      // Append the div to the result container
      resultContaoner.appendChild(correctQuestions);
    });
    if (radioInput) {
      console.log(
        "The specific radio input in the last container is checked:",
        radioInput.value
      );
    } else {
      console.log("No radio input is checked in the last container.");
    }
  } else {
    console.log("No question-answer-container found.");
  }
}

// Function to reset the application
function resetApplication() {
  // Hidde  Questions
  QContainer.classList.remove("show");
  // Reset variables to their initial values
  selectedCategoryId = null;
  currentIndex = 0;
  difficultyLevel = null;
  apiUrl = `https://opentdb.com/api.php?amount=${numberOfQ}`;
  questionNumber.textContent = "";
  currentquestionNumber.textContent = "";

  // Select all elements to remove
  const questionTextElements = document.querySelectorAll(".question-text");
  const answerHeaderElements = document.querySelectorAll(".answer-header");
  const answerChoicesElements = document.querySelectorAll(".answer-choices");
  const contanierOfSelectedCorrect = document.querySelectorAll(
    ".contanier-Of-selected"
  );
  const numCorrect = document.querySelectorAll(".num-correct");

  // Loop through and remove each element individually
  questionTextElements.forEach((element) => {
    element.remove();
  });

  answerHeaderElements.forEach((element) => {
    element.remove();
  });

  answerChoicesElements.forEach((element) => {
    element.remove();
  });
  contanierOfSelectedCorrect.forEach((element) => {
    element.remove();
  });
  numCorrect.forEach((element) => {
    element.remove();
  });
  questionsDivs.forEach((element) => {
    element.remove();
  });
  //  Hidde  resultContaoner
  resultContaoner.classList.remove("show")
  // Clear the current question number display
  currentquestionNumber.textContent = "";
}
