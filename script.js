document.addEventListener("scroll", () => {
  var elements = document.querySelectorAll(
    ".about, .highlights, .education, .skills, .explanation, .project, .footer"
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
    let replies = getBotReply(userMessage);
    appendBotReplies(replies);
  });
}

function appendMessage(message, sender) {
  const messagesDiv = document.querySelector(".messages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `${sender}-message`;
  messageDiv.innerText = message;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  scrollToBottom();
}

function getBotReply(userMessage) {
  switch (userMessage) {
    case "Just saying hi!":
      return [
        "Hello there!🤗",
        "Thanks for saying hi",
        "I hope you found my site fun😃",
        "How can I assist you further?",
      ];
    case "We'd like to hire you":
      return [
        "That's great!",
        "Thank you for considering me",
        "Please reach out to me via Email.",
        "The email is d.gasana@alustudent.com",
        "Anything else?",
      ];
    case "Where did you learn coding?":
      return [
        "I learned coding from various online platforms such as Coursera, Hackerrank, Codewars, and Youtube🤓.",
        "I also gained experience through continuous practice.",
        "Anything else?",
      ];
    case "Be my mentor":
      return [
        "Sure!",
        "I would be happy to help.",
        "Please contact me via my email address.",
        "The email is d.gasana@alustudent.com",
        "Can't wait 🔥",
      ];
    default:
      return ["Sorry, I don't understand that."];
  }
}

function appendQuestionButtons() {
  const messagesDiv = document.querySelector(".messages");

  const questions = [
    "Just saying hi!",
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

function appendBotReplies(replies, index = 0) {
  if (index < replies.length) {
    setTimeout(() => {
      appendMessage(replies[index], "bot");
      appendBotReplies(replies, index + 1);
    }, 1000); // 1 second delay
  } else {
    // After all bot replies, display the question buttons again.
    appendQuestionButtons();
  }
}

// close the modal
document.addEventListener("DOMContentLoaded", function () {
  const closeButton = document.querySelector(".close");
  const contactSection = document.querySelector(".contact");

  closeButton.addEventListener("click", function () {
    contactSection.style.display = "none";
  });
});

var nav = document.querySelector(".main");
document.addEventListener("scroll", () => {
  if (window.scrollY > 180) {
    nav.classList.add("nav-scroll");
  } else {
    nav.classList.remove("nav-scroll");
  }
});

const btn = document.getElementById("cont");
const contactSection = document.querySelector(".contact");
btn.addEventListener("click", () => {
  contactSection.style.display = "block";
});

const btn2 = document.getElementById("cont1");
btn2.addEventListener("click", () => {
  contactSection.style.display = "block";
});
