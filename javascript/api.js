// https://opentdb.com/api_config.php
let categoryOptionsContainer = document.querySelector(".category-options");
let dropdownS = document.querySelectorAll(".dropdown div");
// Questions
let questionNumber = document.querySelector(".question-container .num");
let buttonsContainer = document.querySelectorAll(".buttons button");
let getquestionAnswerContainer = document.querySelectorAll(
  ".question-answer-container"
);
let questionsDivs;

console.log(getquestionAnswerContainer);

// Vars
let clickedChoice = null;
let currentIndex = 0;
let correctAnswer;
let numberOfQ = 10;
let selectedCategoryId;
let difficultyLevel;
let questionAnswerContainer;
let apiUrl = `https://opentdb.com/api.php?amount=${numberOfQ}`;
const apiUrlCategories = "https://opentdb.com/api_category.php";
let promises = [
  fetch(apiUrlCategories).then((response) => response.json()),
  // fetch(apiUrl).then((response) => response.json()),
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

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data:", data);

        data.results.forEach((result) => {
          correctAnswer = result.correct_answer;
          console.log(correctAnswer);
          // console.log(result.question);
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

          // Create list items for answer choices and add them to the list
          const choices = [result.correct_answer, ...result.incorrect_answers];
          choices.forEach((choiceText) => {
            const listItem = document.createElement("li");
            listItem.classList.add("answer-choice");
            listItem.textContent = choiceText;
            answerList.appendChild(listItem);
            //
            let answerChoices = document.querySelectorAll(
              ".question-answer-container.active  .answer-choice"
            );
            answerChoices.forEach((choice) => {
              choice.addEventListener("click", (e) => {
                console.log(e.target);
                if (clickedChoice) {
                  clickedChoice.classList.remove("clicked");
                }
                choice.classList.remove("clicked");
                e.target.classList.add("clicked");
                clickedChoice = choice;
              });
            });
            //
          });

          // Add the created elements to the DOM
          const questionContainer = document.querySelector(
            ".question-container"
          );
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
        });
      })

      .catch((error) => {
        console.error("Fetch error", error);
      });
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
    // Ensure currentIndex is not less than 0 &&  currentIndex is not greater than the number of questions
    currentIndex = Math.min(
      Math.max(currentIndex, 0),
      questionsDivs.length - 1
    );
    // Update the active question
    updateActiveQuestion();
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
