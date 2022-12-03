// Add interactivity to the website using JavaScript
var startButton = document.querySelector('#test-section button');
var textarea = document.querySelector('#test-section textarea');
var result = document.querySelector('#result');

// Set the paragraph that the user needs to type
var paragraph = "The hungry Stork was much displeased at the trick, but he was a calm, even-tempered fellow and saw no good in flying into a rage. Instead, not long afterward, he invited the Fox to dine with him in turn.";

startButton.addEventListener('click', function() {
  // Start a timer to track the time taken for the test
  var startTime = Date.now();

  // Clear the textarea and display the paragraph at the top of the screen
  textarea.value = '';
  var paragraphElement = document.createElement('p');
  paragraphElement.innerHTML = paragraph;
  paragraphElement.classList.add('paragraph');
  document.querySelector('#test-section').prepend(paragraphElement);

  // Create a timer element
  var timer = document.createElement('p');
  timer.innerHTML = 'Time remaining: 60 seconds';
  document.querySelector('#test-section').prepend(timer);

  // Update the timer element every second
  setInterval(function() {
    // Calculate the time remaining
    var timeRemaining = 60 - Math.round((Date.now() - startTime) / 1000);
    if (timeRemaining < 0) {
        // Stop updating the timer and the user's typing speed
        return;
      }

    // Update the timer element with the time remaining
    timer.innerHTML = 'Time remaining: ' + timeRemaining + ' seconds';
  }, 1000); // 1000 milliseconds = 1 second

  textarea.addEventListener('input', function() {
    // Calculate the time remaining
    var timeRemaining = 60 - Math.round((Date.now() - startTime) / 1000);
  
    // If the time remaining is less than or equal to 0, end the test
    if (timeRemaining <= 0) {
      return;
    }
  
    // Calculate the time taken for the test
    var timeTaken = Date.now() - startTime;
  
    // Split the user's input and the correct paragraph into words
    var inputWords = this.value.trim().split(/\s+/);
    var correctWords = paragraph.split(/\s+/);
  
    // Calculate the number of correct and incorrect words typed by the user
    var numCorrect = 0;
    for (var i = 0; i < inputWords.length; i++) {
      if (inputWords[i] === correctWords[i]) {
        numCorrect++;
      }
    }
    var numIncorrect = inputWords.length - numCorrect;
  
    // Calculate the user's typing speed in words per minute
    var wpm = Math.round((numCorrect - numIncorrect) / (timeTaken / 1000 / 60));
  
    // Display the user's typing speed in the result element
    result.innerHTML = 'Your typing speed is: ' + wpm + ' words per minute';
  
    // Highlight the current character in the paragraph
    var textareaValue = this.value;
    var paragraphText = paragraphElement.textContent;
    var highlightedParagraph = '';
    for (var i = 0; i < paragraphText.length; i++) {
      if (i < textareaValue.length) {
        // If the character matches the character typed by the user, highlight it green
        if (paragraphText[i] === textareaValue[i]) {
          highlightedParagraph += '<span class="correct">' + paragraphText[i] + '</span>';
        } else {
          // If the character does not match, highlight it red
          highlightedParagraph += '<span class="incorrect">'
    // If the character does not match, highlight it red
    highlightedParagraph += '<span class="incorrect">' + paragraphText[i] + '</span>';
    }
    } else {
    // If the user has not typed this character yet, just display it normally
    highlightedParagraph += paragraphText[i];
    }
    }
    // Update the paragraph with the highlighted characters
    paragraphElement.innerHTML = highlightedParagraph;
    })});