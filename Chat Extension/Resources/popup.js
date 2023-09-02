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
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
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

// Ideally just render the dom elements here and set event listeners - TODO: move adding inital chat message somewhere else
function start(date, sessionHistory) {
    const chatContainer = document.getElementById("chat-container");
    let session = [];
    
    // main
    const chatOutput = document.createElement("div");
    chatOutput.className = "chat-output";
    chatOutput.id = "chat-output"
    chatContainer.appendChild(chatOutput);
    
    if (!sessionHistory.hasOwnProperty(date)) { // if new session, add initial message
        session.push({
            "role": "system",
            "content": "Hello, how can I help you today?"
        });
        browser.storage.sync.set({[date]: session}).then(() => {
            addChatMessage("Hello, how can I help you?");
        }, (error) => {
            console.error(error);
        });
    } else { // if not, loop over previous chats and render
        console.log(sessionHistory[date].length);
        sessionHistory[date].forEach(item => {
            session.push(item);
            console.log(item);
            if (item.role === "system") {
                addChatMessage(item.content);
            } else {
                addChatMessage(item.content, true);
            }
        });
    }
    
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
        
        function setItem() {
            console.log("success");
        }
        
        session.push({
            "role": "user",
            "content": event.target.value
        });
        addChatMessage(event.target.value, true);
        createChatCompletion(event.target.value).then(data => {
            const message = event.target.value;
            session.push({
                "role": "system",
                "content": data.choices[0].message.content
                
            });
            browser.storage.sync.set({[date]: session}).then(setItem, onError).then(() => {
                addChatMessage(data.choices[0].message.content);
            });
        });
        event.target.value = ""; // Clear the input field
        event.preventDefault();
    });
    
    chatInput.appendChild(chatMessage);
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

function gotHistory(item) {
    start(today.toDateString(), item);
}

function onError(error) {
    console.error(error);
}

const today = new Date(Date.now());
browser.storage.sync.get(today.toDateString()).then(gotHistory, onError);
