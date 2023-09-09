// https://opentdb.com/api_config.php
let categoryOptions = document.querySelector(".category-options");
let numberOfQ = 10;
let selectedCategoryId = 9;
const apiUrlCategories = "https://opentdb.com/api_category.php";
const apiUrl = `https://opentdb.com/api.php?amount=${numberOfQ}&category=${selectedCategoryId}`;
const apiUrlAll = `https://opentdb.com/api.php?amount=${numberOfQ}`;
let categoriesNames = [];
let apiUrlDataNmae = [];
let apiUrlAllDataNmae = [];
let promises = [
  fetch(apiUrlCategories).then((response) => response.json()),
  fetch(apiUrl).then((response) => response.json()),
  fetch(apiUrlAll).then((response) => response.json()),
];
Promise.all(promises)
  .then((results) => {
    let categoriesData = results[0];
    let apiUrlData = results[1];
    let apiUrlAllData = results[2];
    console.log(categoriesData.trivia_categories);
    console.log(apiUrlData);
    console.log(apiUrlAllData);

    // Loop through each element in the trivia_categories
    categoriesData.trivia_categories.forEach((element) => {
      console.log(element.name);
      // Create a new <div> element
      let option = document.createElement("div");
      // Set the text content of the <div> to the category name
      option.textContent = element.name;
      // Add  classes to the <div>
      option.classList.add("option");
      option.classList.add("category-option");
      // Add id to the <div>
      option.setAttribute("id",element.id)
      // Append the <div> to the target element
      if (categoryOptions) {
        categoryOptions.appendChild(option);
      }

    });
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.log("Fetch error", error);
  });
