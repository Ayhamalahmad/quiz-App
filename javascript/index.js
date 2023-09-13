// https://www.codu.co/articles/5-free-trivia-api-s-to-create-your-own-quiz-app-eoui-a7i
// https://quizapi.io/
// Select  elements
// Welcome Massege
let welcomeMassege = document.querySelector(".welcome-massege");
//  Questions Dropdown
let questionsDropdownDivs = document.querySelectorAll(
  ".questions-dropdown div"
);
let questionsP = document.querySelector(
  ".questions-dropdown .dropdown-button p"
);
let questionsOption = document.querySelector(
  ".questions-dropdown .questions-options"
);
let questionsIcon = document.querySelector(
  ".questions-dropdown .dropdown-icon"
);
// Category Dropdown
let categoryDropdown = document.querySelector(".category-dropdown");
let categoryDropdownDivs = document.querySelectorAll(".category-dropdown div");
let categoryP = document.querySelector(".category-dropdown .dropdown-button p");
let categoryIcon = document.querySelector(
  ".category-dropdown .dropdown-button .dropdown-icon"
);
let categoryOption = document.querySelector(
  ".category-dropdown  .category-options"
);
// difficulties Dropdown
let difficultiesDropdownDivs = document.querySelectorAll(
  ".difficulties-dropdown div"
);
let difficultiesP = document.querySelector(
  ".difficulties-dropdown .dropdown-button p"
);
let difficultiesIcon = document.querySelector(
  ".difficulties-dropdown .dropdown-button .dropdown-icon"
);
// Select all the dropdown buttons, options, and icons
let dropdownButtons = document.querySelectorAll(".dropdown-button");
let dropdownOptions = document.querySelectorAll(".dropdown-options");
let dropdownIcons = document.querySelectorAll(".dropdown-icon");
// neede Attention 
let dropdownOneBtn = document.querySelector(".dropdown-one-btn");
let dropdownIcon = document.querySelector(".dropdown-icon");
//
let dropdownOneDivs = document.querySelectorAll(".dropdown-options .option");
let dropdownOneP = document.querySelectorAll(".dropdown-button p");
// neede Attention 
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
// Add a click event listener to each dropdown button
dropdownButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Toggle the 'active' class for the corresponding dropdown options
    toggleClass(dropdownOptions[index], "active");
    // Toggle the 'active' class for the corresponding dropdown icons
    toggleClass(dropdownIcons[index], "active");
  });
});
// Function to handle the click event for a dropdown
function handleDropdownClick(options, buttonText, icon) {
  options.forEach((option, index) => {
    option.addEventListener("click", (e) => {
      handleText(buttonText, e.target.textContent);
      handleClass(options[index], icon);
    });
  });
}
// Function to handle adding/removing a class to an element
const handleClass = (element, targetElement) => {
  if (
    element.classList.contains("active") &&
    targetElement.classList.contains("active")
  ) {
    element.classList.remove("active");
    targetElement.classList.remove("active");
  }
};
// Function to update text content of an element
const handleText = (element, newText) => {
  element.textContent = "";
  let text = document.createTextNode(newText);
  element.appendChild(text);
};
// Category Dropdown
handleDropdownClick(categoryDropdownDivs, categoryP, categoryIcon);
//  Questions Dropdown
handleDropdownClick(questionsDropdownDivs, questionsP, questionsIcon);
//  difficulties Dropdown
handleDropdownClick(difficultiesDropdownDivs, difficultiesP, difficultiesIcon);