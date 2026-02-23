const chatToggle = document.getElementById("chat-toggle");
const chatbot = document.getElementById("chatbot");
const closeChat = document.getElementById("close-chat");

const chatBody = document.getElementById("chat-body");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Toggle open/close
chatToggle.onclick = () => chatbot.style.display = "flex";
closeChat.onclick = () => chatbot.style.display = "none";

// Send message
sendBtn.onclick = sendMessage;
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  setTimeout(() => {
    const reply = getBotReply(text);
    addMessage(reply, "bot");
  }, 500);
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.innerText = text;

  msg.appendChild(bubble);
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotReply(input) {
  input = input.toLowerCase();
  if (input.includes("what is your name")) return "i can not provide you with such answer's";
  if (input.includes("where are you located")) return "We are located at No 10, Kunle adeyemi bustop";
  if (input.includes("can i ask you something")) return "Sure! anything";
  if (input.includes("hello")) return "Hello! How can I assist you?";
  if (input.includes("help")) return "Sure! What do you need help with?";
  if (input.includes("bye")) return "Goodbye!";
  if (input.includes("hi")) return "Hello! How can I assist you?";
  if (input.includes("what is the time in uk")) return "10:32 am";
  if (input.includes("can i speak to customer support")) return "Sure! Whatsapp +234 *** **** **";
  return"There is an error in your question" 
}
/* ---------- Contact form (simulated) ---------- */
function initContact(){
  const form = el('#contactForm');
  if(!form) return;
  const status = el('#contactStatus');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const data = new FormData(form);
    // For demo: save to localStorage and show message
    const note = {
      time: new Date().toISOString(),
      company: data.get('company'),
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      message: data.get('message')
    };
    const out = JSON.parse(localStorage.getItem('prime_contacts') || '[]');
    out.push(note);
    localStorage.setItem('prime_contacts', JSON.stringify(out));
    status.textContent = 'Message saved locally (demo). To receive emails, use "Send by Email" or configure a backend.';
    form.reset();
  });

  const emailBtn = el('#emailSend');
  emailBtn && emailBtn.addEventListener('click', () => {
    const formData = new FormData(form);
    // build mailto with body
    const subject = encodeURIComponent('Contact from website: ' + (formData.get('company') || formData.get('name') || ''));
    let body = '';
    for(const [k,v] of formData.entries()){
      body += `${k}: ${v}\n`;
    }
    const mailto = `mailto:raymond@gmail.com=${subject}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}