// https://opentdb.com/api_config.php
let categoryOptionsContainer = document.querySelector(".category-options");
let numberOfQ = 10;
let selectedCategoryId;
let apiUrl = `https://opentdb.com/api.php?amount=${numberOfQ}&category=${selectedCategoryId}`;
const apiUrlAll = `https://opentdb.com/api.php?amount=${numberOfQ}`;
const apiUrlCategories = "https://opentdb.com/api_category.php";
let categoriesNames = [];
let apiUrlDataNmae = [];
let apiUrlAllDataNmae = [];
let promises = [
  fetch(apiUrlCategories).then((response) => response.json()),
  fetch(apiUrl).then((response) => response.json()),
  // fetch(apiUrlAll).then((response) => response.json()),
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
// Add a click event listener to the  category Options container
categoryOptionsContainer.addEventListener("click", (e) => {
  // Check if the clicked element has the class "category-option"
  if (e.target.classList.contains("category-option")) {
    // Log the ID of the clicked element
    console.log(e.target.id);
    selectedCategoryId = e.target.id;
    apiUrl = `https://opentdb.com/api.php?amount=${numberOfQ}&category=${selectedCategoryId}`;
    if(e.target.classList.contains("category-option-all")){
      apiUrl = `https://opentdb.com/api.php?amount=${numberOfQ}`;
    }
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data:", data);
      })
      .catch((error) => {
        console.error("Fetch error", error);
      });
  }
});
