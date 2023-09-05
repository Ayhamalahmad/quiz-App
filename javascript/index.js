// Select relevant elements
let welcomeMassege = document.querySelector(".welcome-massege");
// Set interval
//
let options = document.querySelectorAll(".op");
let currentIndex = 0;
// Function to update the active option
const updateActiveOption = () => {
  // Remove the "active" class from the current active option
  options[currentIndex].classList.remove("active");
  // Increment the index or reset it if it exceeds the number of options
  currentIndex = (currentIndex + 1) % options.length;
  // Add the "active" class to the new active option
  options[currentIndex].classList.add("active");
};
// Set an interval to change the active option every 2 seconds (2000 milliseconds)
setInterval(updateActiveOption, 2000);
