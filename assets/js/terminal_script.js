document.addEventListener('DOMContentLoaded', function() {

  document.getElementsByTagName('form')[0].onsubmit = function(evt) {
    evt.preventDefault(); // Preventing the form from submitting
    checkWord();
    window.scrollTo(0, 150);
  }

  // Get the focus to the text input to enter a word right away.
  document.getElementById('terminalTextInput').focus();

  // Getting the text from the input
  var InputValue = document.getElementById('terminalTextInput').value.trim();

  // Clear text input
  var clearInput = function() {
    document.getElementById('terminalTextInput').value = "";
  }

  // Clear Terminal Result
  var clearTerminal = function() {
    document.getElementById('terminalReslutsCont').innerHTML = "<p></p>";
    scrollToBottomOfResults();
  }

  // Shortcut to clean terminal screen
  document.addEventListener("keydown", e => {
    if (e.key.toLowerCase() === "c" && e.ctrlKey || e.key.toLowerCase() === "l" && e.ctrlKey) {
      clearTerminal();
    }
  });

  // Scrtoll to the bottom of the results div
  var scrollToBottomOfResults = function() {
    var terminalResultsDiv = document.getElementById('terminalReslutsCont');
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  }

  // Scroll to the bottom of the results
  scrollToBottomOfResults();

  // Add text to the results div
  var AddToResults = function(textToAdd) {
    document.getElementById('terminalReslutsCont').innerHTML += "<p>" + textToAdd + "</p>";
    scrollToBottomOfResults();
  }

  // Add text to the results div but with color
  var ColorResults = function(color, textToAdd) {
    document.getElementById('terminalReslutsCont').innerHTML += "<p style=\"color:" + color + "\">" + textToAdd + "</p>";
    scrollToBottomOfResults();
  }

  // Getting the list of keywords for help & posting it to the screen
  var postHelpList = function() {
    // Array of all the help keywords
    var helpKeyWords = [
      "Commands You Can Use:",
      "- Facebook: Linus Walker's Facebook Account.",
      "- Github: Linus Walker's Github Account.",
      "- Clear: Clean the Terminal.",
      "- Mail: Send an email to Linus Walker.",
      "- Time: Show the current time.",
      "- Date: Show the current date.",
      "- Exec: Execute Binary Executable File.",
      "* There are more keywords that you have to discover by yourself."
    ].join('<br>');
    AddToResults(helpKeyWords);
  }

  // Getting the time and date and post it depending on what you request for
  var getTimeAndDate = function(postTimeDay) {
    var timeAndDate = new Date();
    var timeHours = timeAndDate.getHours();
    var timeMinutes = timeAndDate.getMinutes();
    var dateDay = timeAndDate.getDate();
    console.log(dateDay);
    var dateMonth = timeAndDate.getMonth() + 1; // Because JS starts counting months from 0
    var dateYear = timeAndDate.getFullYear(); // Otherwise we'll get the count like 98,99,100,101...etc.

    if (timeHours < 10) { // if 1 number display 0 before it.
      timeHours = "0" + timeHours;
    }

    if (timeMinutes < 10) { // if 1 number display 0 before it.
      timeMinutes = "0" + timeMinutes;
    }

    var currentTime = timeHours + ":" + timeMinutes;
    var currentDate = dateDay + "/" + dateMonth + "/" + dateYear;

    if (postTimeDay == "time") {
      AddToResults(currentTime);
    }
    if (postTimeDay == "date") {
      AddToResults(currentDate);
    }
  }

  // Opening links in a new window
  var OpenLink = function(linkToOpen) {
    window.open(linkToOpen, '_blank');
    clearInput();
  }

  // Having a specific text reply to specific strings
  var textReplies = function() {
    switch (InputValueLowerCase) {
      case "i love you":
      case "love you":
      case "love":
        clearInput();
        AddToResults("Bruh!");
        break;

      case "github":
        clearInput();
        AddToResults('Let\'s Go to Github!');
        OpenLink('https://github.com/Walker-00');
        break;

      case "hello":
      case "hi":
      case "hola":
        clearInput();
        AddToResults("Yo, Type help for commands!");
        break;

      case "ls":
        clearInput();
        ColorResults("cyan", "profile\ttrivia\tskills\treadability");
        break;

      case "facebook":
        clearInput();
        OpenLink('https://facebook.com/walker.fbi');
        break;

      case "mail":
        clearInput();
        AddToResults("Send An Email To Me!");
        OpenLink('mailto:w000alker@gmail.com');
        break;

      case "time":
        clearInput();
        getTimeAndDate("time");
        break;

      case "date":
        clearInput();
        getTimeAndDate("date");
        break;

      case "help":
      case "?":
        clearInput();
        postHelpList();
        break;

      case "clear":
        clearTerminal();
        clearInput();
        break;

      default:
        clearInput();
        AddToResults("<p><i>" + "<b>" + InputValue + "</b>" + ": Command not found. Type <b>Help</b> to see all commands.</i></p>");
        break;
    }
  }

  // Main function to check the entered text and assign it to the correct function
  var checkWord = function() {
    InputValue = document.getElementById('terminalTextInput').value.trim(); //get the text from the text input to a variable
    InputValueLowerCase = InputValue.toLowerCase(); //get the lower case of the string

    if (InputValue != "") { //checking if text was entered
      AddToResults("<p class='userEnteredText'>walker@cs50 ~> " + InputValue + "</p>");
      if (InputValueLowerCase.substr(0, 5) == "exec ") { //if the first 5 characters is exec and space
        let exists;
        let profile;
        var file_name = InputValueLowerCase.substr(5);
        switch (file_name) {
          case "profile":
            clearInput();
            exists = true;
            profile = true;
            break;

          case "trivia":
            clearInput();
            exists = true;
            break;

          case "skills":
            clearInput();
            exists = true;
            break;

          case "readability":
            clearInput();
            exists = true;
            break;

          default:
            clearInput();
            exists = false;
            AddToResults(InputValue.substr(5) + ": No such File or Directory!")
        }
        if (exists && !profile) {
          OpenLink("./" + file_name + ".html");
        } else {
          OpenLink("./index.html");
        }
      } else {
        textReplies();
      }
    }
  };

});
