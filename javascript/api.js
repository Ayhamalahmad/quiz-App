// https://opentdb.com/api_config.php
let categoryOptionsContainer = document.querySelector(".category-options");
let dropdownS = document.querySelectorAll(".dropdown div");
// Questions
let questionNumber = document.querySelector(".question-container .num");
let buttonsContainer = document.querySelectorAll(".buttons button");
let getquestionAnswerContainer = document.querySelectorAll(
  ".question-answer-container"
);
console.log(getquestionAnswerContainer);

// Vars
let currentIndex = 0;
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
    let apiUrlData = results[1];

    // let apiUrlAllData = results[2];
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
       
        });
      })
      .catch((error) => {
        console.error("Fetch error", error);
      });
  });
});

// //
// buttonsContainer.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     console.log(e.target);
//     if (e.target.classList.contains("next")) {
//       currentIndex++;
//     } else if (e.target.classList.contains("previous")) {
//       currentIndex--;
//     }
//     console.log(currentIndex);
//   });
// });

// getquestionAnswerContainer.forEach((e, index) => {
//   e.classList.remove("active");
//   if (index === currentIndex) {
//     e.classList.add("active");
//   } else {
//     e.classList.remove("active");
//   }
// });
console.log(getquestionAnswerContainer);
