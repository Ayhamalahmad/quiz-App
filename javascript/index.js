// https://www.codu.co/articles/5-free-trivia-api-s-to-create-your-own-quiz-app-eoui-a7i
// https://quizapi.io/
// Select  elements
// Welcome Massege
let welcomeMassege = document.querySelector(".welcome-massege");
//
let dropdownOneBtn = document.querySelector(".dropdown-one-btn");
let dropdownIcon = document.querySelector(".dropdown-icon");
// Initialize variables
let i = 0; // Index to track the current character
let milliseconds = 100; // Time delay between adding characters
let welcomeMassegeText = "Welcome to the Quiz App!"; // Text to be animated

// Function to start the text animation
function startTextAnimation() {
  let textInterval = setInterval(() => {
    // Append the current character to the welcome message
    welcomeMassege.textContent += welcomeMassegeText[i];
    i++; // Move to the next character

    // Check if we've reached the end of the text
    if (i === welcomeMassegeText.length) {
      i = 0; // Reset the index to start from the beginning
      clearInterval(textInterval); // Clear the animation interval

      // After a delay, clear the text and start the animation again
      setTimeout(() => {
        welcomeMassege.textContent = "";
        startTextAnimation();
      }, 2000); // Delay in milliseconds before restarting the animation
    }
  }, milliseconds); // Set the interval for adding characters
}

// Call the function to start the text animation
startTextAnimation();

// // options
// let options = document.querySelectorAll(".op");
// let difficultys = document.querySelectorAll(".di");
// let currentIndex = 0;
// // Function to update the active option
// const updateActiveOption = (section) => {
//   // Remove the "active" class from the current active option
//   section[currentIndex].classList.remove("active");
//   // Increment the index or reset it if it exceeds the number of options
//   currentIndex = (currentIndex + 1) % section.length;
//   // Add the "active" class to the new active option
//   section[currentIndex].classList.add("active");
// };
// // Set an interval to change the active option every 2 seconds (2000 milliseconds)
// setInterval(() => {
//   updateActiveOption(options);
// }, 2000);
// setInterval(() => {
//   updateActiveOption(difficultys);
// }, 2000);

// Function to update the active option for both category and difficulty
const updateActiveOptions = () => {
  // Find the currently active category and difficulty options
  const activeCategory = document.querySelector(".op.active");
  const activeDifficulty = document.querySelector(".di.active");

  // Remove the "active" class from the current active category and difficulty options
  activeCategory.classList.remove("active");
  activeDifficulty.classList.remove("active");

  // Find the next category and difficulty options
  const nextCategory =
    activeCategory.nextElementSibling || document.querySelector(".op");
  const nextDifficulty =
    activeDifficulty.nextElementSibling || document.querySelector(".di");

  // Add the "active" class to the new active category and difficulty options
  nextCategory.classList.add("active");
  nextDifficulty.classList.add("active");
};

// Set an interval to update both category and difficulty options every 2 seconds (2000 milliseconds)
setInterval(updateActiveOptions, 2000);

// Function To Toggle class
const toggleClass = (element, className) => {
  element.classList.toggle(className);
};
// Function To Add class
const addClass = (element, className) => {
  element.classList.add(className);
};
// Select all the dropdown buttons, options, and icons
let dropdownButtons = document.querySelectorAll(".dropdown-button");
let dropdownOptions = document.querySelectorAll(".dropdown-options");
let dropdownIcons = document.querySelectorAll(".dropdown-icon");

// Add a click event listener to each dropdown button
dropdownButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Toggle the 'active' class for the corresponding dropdown options
    toggleClass(dropdownOptions[index], "active");
    // Toggle the 'active' class for the corresponding dropdown icons
    toggleClass(dropdownIcons[index], "active");
  });
});
//
let dropdownOneDivs = document.querySelectorAll(".dropdown-options .option");
let dropdownOneP = document.querySelectorAll(".dropdown-button p");

//category-options
let categoryDropdown = document.querySelector(".category-dropdown");
let categoryDropdownDivs = document.querySelectorAll(".category-dropdown div");
let categoryP = document.querySelector(".category-dropdown .dropdown-button p");
let categoryIcon = document.querySelector(
  ".category-dropdown .dropdown-button .dropdown-icon"
);
let categoryOption = document.querySelector(
  ".category-dropdown  .category-options"
);

categoryDropdownDivs.forEach((div, index) => {
  div.addEventListener("click", (e) => {
    handleText(categoryP, e.target.textContent);
    handleClass(categoryOption, categoryIcon);
  });
});
// questions-dropdown
let questionsDropdownDivs =document.querySelectorAll('.questions-dropdown div');
let questionsP=document.querySelector('.questions-dropdown .dropdown-button p');
let questionsOption=document.querySelector('.questions-dropdown .questions-options');
let questionsIcon=document.querySelector('.questions-dropdown .dropdown-icon');

questionsDropdownDivs.forEach((div, index) => {
  div.addEventListener("click", (e) => {
    handleText(questionsP, e.target.textContent);
    handleClass(questionsOption, questionsIcon);
  });
});


const handleClass = (paraOne, paraTow) => {
  if (
    paraOne.classList.contains("active") &&
    paraTow.classList.contains("active")
  ) {
    paraOne.classList.remove("active");
    paraTow.classList.remove("active");
  }
};
// function text
const handleText = (element, newText) => {
  element.textContent = "";
  let text = document.createTextNode(newText);
  element.appendChild(text);
};