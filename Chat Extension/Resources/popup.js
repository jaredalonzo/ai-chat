//function openTab(event) {
//    let i, tabContents, tabLinks;
//
//    console.log(event);
//
//    // Get all tab elements and hide them from page
//    tabContents = document.querySelectorAll(".tab-content");
//    for (i=0; i < tabContents.length; i++) {
//        tabContents[i].style.display = "none";
//    }
//
//    // Get all tab links and remove active state
//    tabLinks = document.querySelectorAll(".tab-link");
//    for (i=0; i < tabLinks.length; i++) {
//        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
//    }
//
//    // Show the current tab, and add an "active" class to the button that opened the tab
//    let j = document.querySelector(`#tab-${CSS.escape(event.target.innerHTML)}`).style.display = "block";
//    console.log(`j ${j}`);
//    event.currentTarget.className += " active";
//}
//
//function closeTab(event) {
//    console.log(event);
//}
//
//const x = document.querySelectorAll('button.tab-link');
//for (let i=0; i < x.length; i++) {
//    x[i].addEventListener('click', openTab);
//}
//
//const y = document.querySelectorAll('span.tab-close');
//for (let i=0; i < y.length; i++) {
//    y[i].addEventListener('click', closeTab);
//}
//const button = document.querySelector(".send-button")

// Function to add a chat bubble with an embedded message input and send button
function addChatBubbleWithInput() {
    const chatContainer = document.getElementById("chat-container");
    
    // Create a chat bubble element
    const chatBubble = document.createElement("div");
    chatBubble.className = "chat-bubble user-bubble"; // Style as user bubble
    chatContainer.appendChild(chatBubble);
    
    // Create the message input
    const messageInput = document.createElement("textarea");
    messageInput.className = "message-input";
    messageInput.placeholder = "Type your message...";
    chatBubble.appendChild(messageInput);
    
    // Create the send button
    const sendButton = document.createElement("button");
    sendButton.className = "send-button";
    sendButton.textContent = "Send";
    chatBubble.appendChild(sendButton);
    
    // Event listener for the send button
    sendButton.addEventListener("click", () => {
        const message = messageInput.value;
        if (message.trim() !== "") {
            addChatMessage(message, true) // Add user's message to the chat
            chatBubble.remove(); // Remove the chat bubble with input and button
        }
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
addChatBubbleWithInput();
