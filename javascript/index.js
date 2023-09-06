// https://www.codu.co/articles/5-free-trivia-api-s-to-create-your-own-quiz-app-eoui-a7i
// https://quizapi.io/
// Select relevant elements
let welcomeMassege = document.querySelector(".welcome-massege");
//
let dropdownOneBtn = document.querySelector(".dropdown-one-btn");
let dropdownOneP = document.querySelector(".dropdown-one-btn p");
let dropdownOtsOne = document.querySelector(".dropdown-options-container");
let dropdownIcon = document.querySelector(".dropdown-icon");
let dropdownOneDivs = document.querySelectorAll(
  ".dropdown-options-container div"
);

// Set interval
// Animate Text
let i = 0;
let milliseconds = 100;
let welcomeMassegeText = "Welcome to the Quiz App!";
function startTextAnimation() {
  let textInterval = setInterval(() => {
    welcomeMassege.textContent += welcomeMassegeText[i];
    i++;
    if (i === welcomeMassegeText.length) {
      i = 0;
      clearInterval(textInterval);
      setTimeout(() => {
        welcomeMassege.textContent = "";
        startTextAnimation();
      }, 2000);
    }
  }, milliseconds);
}
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
// Toggle the "active" class on Dropdown One and its icon when Dropdown One Button is clicked
dropdownOneBtn.addEventListener("click", () => {
  toggleClass(dropdownOtsOne, "active");
  toggleClass(dropdownIcon, "active");
});
//
dropdownOneDivs.forEach((div) => {
  div.addEventListener("click", (e) => {
    if (dropdownOneDivs) {
      dropdownOneP.textContent = "";
      let text = document.createTextNode(e.target.textContent);
      dropdownOneP.appendChild(text);
      if (
        dropdownOtsOne.classList.contains("active") &&
        dropdownIcon.classList.contains("active")
      ) {
        dropdownOtsOne.classList.remove("active");
        dropdownIcon.classList.remove("active");
      }
    }
  });
});
