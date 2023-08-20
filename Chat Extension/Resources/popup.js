// Function to add a chat bubble with an embedded message input and send button
function addChatBubbleWithInput() {
    const messageContent = document.getElementById("message-content");
    
    // Create the message input
//    const messageInput = document.createElement("textarea");
//    messageInput.className = "message-input";
//    messageInput.placeholder = "Type your message...";
//    chatBubble.appendChild(messageInput);
    
    const sendButton = document.getElementById("send-button");
    
    // Event listener for the send button
    sendButton.addEventListener("click", () => {
        const message = messageContent.value;
        if (message.trim() !== "") {
            addChatMessage(message, true) // Add user's message to the chat
        }
        messageContent.value = "";
    });
}

// Function to add a chat message to the chat container
function addChatMessage(message, isUser = false) {
    const chatContainer = document.getElementById("chat-container");
    
    // Create a chat bubble element
    const chatBubble = document.createElement("div");
    chatBubble.className = "chat-bubble";
    if (isUser) {
        chatBubble.className += " user-bubble";
        
    }
    chatBubble.textContent = message;

    // Append the chat bubble to the chat container
    chatContainer.appendChild(chatBubble);
}

 // Function to handle sending a message
function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    if (message.trim() !== "") {
        addChatMessage(message, true); // Add user's message to the chat
        messageInput.value = ""; // Clear the input field
        // You can add logic here to handle responses or further actions.
    }
}

// Example usage:
addChatMessage("Hello, how can I help you?");
addChatMessage("Sample user message", true);
addChatMessage("OpenAI reply");
addChatBubbleWithInput();
