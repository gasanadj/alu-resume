document.addEventListener("scroll", () => {
  var elements = document.querySelectorAll(
    ".header, .about, .highlights, .education, .skills, .explanation, .project"
  );
  var windowHeight = window.innerHeight;
  elements.forEach((element) => {
    var elementPosition = element.getBoundingClientRect();
    if (elementPosition.top < windowHeight) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
});

let buttons = document.querySelectorAll(".bq > button");

buttons.forEach(addButtonListener);

function addButtonListener(button) {
  button.addEventListener("click", function () {
    const userMessage = this.innerText;

    // Append user message to chat
    appendMessage(userMessage, "user");

    // Generate and append bot's reply
    let reply = getBotReply(userMessage);
    appendMessage(reply, "bot");

    // Display the question buttons below the messages
    appendQuestionButtons();
  });
}

function appendMessage(message, sender) {
  const messagesDiv = document.querySelector(".messages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `${sender}-message`;
  messageDiv.innerText = message;
  messagesDiv.appendChild(messageDiv);

  scrollToBottom();
}

function getBotReply(userMessage) {
  switch (userMessage) {
    case "Just saying hello!":
      return "Hello there!";
    case "We'd like to hire you":
      return "That's great! Please reach out to Junior directly.";
    case "Where did you learn coding?":
      return "Junior learned coding from various online platforms and practice.";
    case "Be my mentor":
      return "Sure! Junior would be happy to help. Please contact him.";
    default:
      return "Sorry, I don't understand that.";
  }
}

function appendQuestionButtons() {
  const messagesDiv = document.querySelector(".messages");

  const questions = [
    "Just saying hello!",
    "We'd like to hire you",
    "Where did you learn coding?",
    "Be my mentor",
  ];

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button-holder-group";

  questions.forEach((question) => {
    const buttonHolder = document.createElement("div");
    buttonHolder.className = "button-holder bq";

    const button = document.createElement("button");
    button.className = "bq";
    button.innerText = question;

    buttonHolder.appendChild(button);
    buttonGroup.appendChild(buttonHolder);

    // Add the click event listener to the newly created button
    addButtonListener(button);
  });

  messagesDiv.appendChild(buttonGroup);

  scrollToBottom();
}

// Append the initial set of question buttons when the chatbot loads
appendQuestionButtons();

function scrollToBottom() {
  const messagesDiv = document.querySelector(".messages");
  const lastChild = messagesDiv.lastChild;
  lastChild.scrollIntoView({ behavior: "smooth" });
}
