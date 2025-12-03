document.addEventListener("DOMContentLoaded", function () {
  const chatbotContainer = document.getElementById("chatbot-container");
  const closeBtn = document.getElementById("close-btn");
  const sendBtn = document.getElementById("send-btn"); // FIXED
  const chatBotInput = document.getElementById("chatbot-input");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotIcon = document.getElementById("chatbot-icon");

  // Open chatbot
  chatbotIcon.addEventListener("click", function () {
    chatbotContainer.classList.remove("hidden"); //hides chatbot container when icon is pressed
    chatbotIcon.style.display = "none";
  });

  // Close chatbot
  closeBtn.addEventListener("click", function () {
    chatbotContainer.classList.add("hidden"); //hides chatbot when close button (X) is clicked
    chatbotIcon.style.display = "flex";
  });

  sendBtn.addEventListener("click", sendMessage);
  chatBotInput.addEventListener("keypress", function (a) {
    if (a.key === "Enter") {
      sendMessage(); //calls the send message function if condition above is met
    }
  });
});

function sendMessage() {
  const userMessage = chatbotInput.value.trim(); //retrieves the text that the user has typed
  if (userMessage) {
    //this will only run of the user has actually typed something
    appendMessage("user", userMessage); //adds the users chat to the chat window
    chatBotInput.value = "";
    getBotResponse(userMessage); //gets the openAPIs response to the user inputed message
  }
}

function appendMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);
  messageElement.textContent = message;
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

async function getBotResponse(userMessage) {
  const apiKey =''
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  try{
    const response = await fetch(apiUrl,{
        method:"POST",
        headers:{

        }
    })
  }
}
