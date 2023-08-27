// Function to add a chat message to the chat container
function addChatMessage(message, isUser = false) {
    const chatContainer = document.getElementById("chat-output");
    
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
        addChatMessage(message, true); // add user's message to the chat
        messageInput.value = ""; // clear the input field
    }
}

function start() {
    const chatContainer = document.getElementById("chat-container");
    
    // main
    const chatOutput = document.createElement("div");
    chatOutput.className = "chat-output";
    chatOutput.id = "chat-output"
    chatContainer.appendChild(chatOutput);
    
    // add initial message
    addChatMessage("Hello, how can I help you?");
    
    // input section
    const chatInput = document.createElement("div");
    chatInput.className = "chat-input";
    const chatMessage = document.createElement("textarea");
    chatMessage.className = "chat-message";
    chatMessage.rows = 1;
    chatMessage.placeholder = "What are you thinking about?";
    chatMessage.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") { // only handle the enter/return key
            return;
        }
        
        if (event.target.value.trim() === "") { // only handle non-whitespace content
            return;
        }
        
        addChatMessage(event.target.value, true);
        createChatCompletion(event.target.value).then(data => {
           addChatMessage(data.choices[0].message.content);
        });
        event.target.value = ""; // Clear the input field
        event.preventDefault();
    });
//    const sendButton = document.createElement("button");
//    sendButton.className = "send-button"
//    sendButton.textContent = "Send";
//    sendButton.addEventListener("click", () => {
//        const message = chatMessage.value;
//        if (message.trim() !== "") {
//            addChatMessage(message, true); // Add user's message to the chat
//            createChatCompletion(message).then(data => {
//                addChatMessage(data.choices[0].message.content);
//            });
//        }
//        message = "";
//    });
    chatInput.appendChild(chatMessage);
//    chatInput.appendChild(sendButton);
    
    chatContainer.appendChild(chatInput);
}

async function createChatCompletion(message) {
    const chatCompletetionEndpoint = "https://api.openai.com/v1/chat/completions";
    const openAIKey = null;
    const payload = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: message,
            }
        ],
    }
    const response = await fetch(chatCompletetionEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openAIKey}`,
        },
        body: JSON.stringify(payload),
    });
    return response.json();
}

start();
