# Quiz App

This is a web-based quiz application that allows users to select quiz categories, difficulties, and the number of questions. It also features a welcoming text animation, question and answer handling, as well as a result display.

## Demo

You can check out the live demo of this quiz app [here](https://ayhamalahmad.github.io/quiz-App/).

## Features

- **Welcome Message Animation:**  it displays a welcoming message with a text animation effect.

- **Quiz Configuration:** Users can select the following quiz parameters:
  - **Category:** Choose a quiz category from the dropdown menu.
  - **Difficulty:** Select a quiz difficulty level.
  - **Number of Questions:** Choose the number of questions for the quiz.

- **Dynamic Dropdowns:** The app uses dynamic dropdown menus to select categories, difficulties, and questions. The selected options are displayed in the respective dropdown buttons.

- **Active Option Updates:** The app automatically updates the active options in the category and difficulty dropdowns at a regular interval.

- **Fetching Questions:** Upon clicking the "Start Quiz" button, the app fetches quiz questions from the [Open Trivia Database](https://opentdb.com/api_config.php) based on user selections.

- **Question Handling:** The app presents questions one by one, allowing users to select their answers using radio buttons.

- **Result Display:** After answering all questions, users can click the "Show Result" button to see the number of correct answers out of the total questions.

- **Error Handling:** The app handles errors that may occur during the fetching of questions.

## Usage

1. Open the [live demo](https://ayhamalahmad.github.io/quiz-App/) in your web browser.

2. Wait for the welcoming message animation to complete.

3. Select your preferred quiz category, difficulty, and the number of questions.

4. Click on the "Start Quiz" button to fetch questions and begin the quiz.

5. Answer the quiz questions one by one using the radio buttons.

6. Use the "Next" button to navigate through the questions.

7. After answering all questions, click the "Show Result" button to see your score.

## Technologies Used

- HTML
- CSS (SCSS)
- JavaScript

## Credits

This project fetches quiz questions from the [Open Trivia Database](https://opentdb.com/api_config.php).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

[Ayham Alahmad]

Feel free to contact me if you have any questions or suggestions!
