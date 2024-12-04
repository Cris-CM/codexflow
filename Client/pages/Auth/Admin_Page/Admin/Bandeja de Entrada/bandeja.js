document.addEventListener("DOMContentLoaded", () => {
// Configuración de socket.io
console.log("Iniciando aplicación...");
const socket = io("http://localhost:3000");
let selectedUserId = null;
 // ... (mantener todo el código hasta las funciones de chat igual)

 function initializeChat() {
    console.log("Inicializando chat...");

    socket.on("connect", () => {
      console.log("Conectado al servidor de Socket.IO");
      socket.emit("getAdminChats");
    });

    socket.on("disconnect", () => {
      console.log("Desconectado del servidor de Socket.IO");
    });

    socket.on("updateAdminChats", (chats) => {
      console.log("Chats recibidos:", chats);
      updateChatsList(chats);
    });

    socket.on("message:admin", (message) => {
      console.log("Mensaje recibido:", message);
      if (selectedUserId === message.from) {
        appendMessage(message);
      }
      socket.emit("getAdminChats");
    });

    socket.on("messageHistory", (messages) => {
      console.log("Historial de mensajes recibido:", messages);
      displayMessageHistory(messages);
    });

    setupChatInterface();
  }

  function setupChatInterface() {
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");

    if (messageInput) {
      messageInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
    }

    if (sendButton) {
      sendButton.addEventListener("click", () => {
        sendMessage();
      });
    }
  }

  function updateChatsList(chats) {
    const chatsList = document.getElementById("chatsList");
    if (!chatsList) return;

    chatsList.innerHTML = chats
      .map(
        (chat) => `
            <div class="chat-item ${
              selectedUserId === chat.userId ? "active" : ""
            }" 
                 onclick="selectChat('${chat.userId}')">
                <div class="chat-item-header">
                    <h4>${chat.userName || "Usuario " + chat.userId}</h4>
                    <span>${new Date(
                      chat.lastMessage.timestamp
                    ).toLocaleTimeString()}</span>
                </div>
                <p class="last-message">${chat.lastMessage.content}</p>
            </div>
        `
      )
      .join("");
  }

  function selectChat(userId) {
    console.log("Seleccionando chat:", userId);
    selectedUserId = userId;

    const chatHeader = document.querySelector(".chat-header h4");
    if (chatHeader) {
      const userElement = document.querySelector(
        `[onclick="selectChat('${userId}')"] h4`
      );
      const userName = userElement
        ? userElement.textContent
        : `Usuario ${userId}`;
      chatHeader.textContent = `Chat con ${userName}`;
    }

    const messageHistory = document.getElementById("messageHistory");
    if (messageHistory) {
      messageHistory.innerHTML = "";
    }

    socket.emit("getMessageHistory", userId);

    document.querySelectorAll(".chat-item").forEach((item) => {
      item.classList.remove("active");
    });
    document
      .querySelector(`[onclick="selectChat('${userId}')']`)
      ?.classList.add("active");
  }

  function displayMessageHistory(messages) {
    const messageHistory = document.getElementById("messageHistory");
    if (!messageHistory) return;

    messageHistory.innerHTML = "";
    messages.forEach((message) => appendMessage(message));
    messageHistory.scrollTop = messageHistory.scrollHeight;
  }

  function appendMessage(message) {
    const messageHistory = document.getElementById("messageHistory");
    if (!messageHistory) return;

    const messageElement = document.createElement("div");
    const isAdmin = message.from === "admin";

    messageElement.classList.add("message", isAdmin ? "sent" : "received");
    messageElement.innerHTML = `
        <div class="message-content">
            <div class="message-bubble">
                <p>${message.content}</p>
            </div>
            <span class="message-time">
                ${isAdmin ? "Tú" : message.userName || "Usuario"} - ${new Date(
      message.timestamp
    ).toLocaleTimeString()}
            </span>
        </div>
    `;
    messageHistory.appendChild(messageElement);
    messageHistory.scrollTop = messageHistory.scrollHeight;
  }

  function sendMessage() {
    if (!selectedUserId) {
      console.log("No hay usuario seleccionado");
      return;
    }

    const input = document.getElementById("messageInput");
    if (!input) {
      console.log("No se encontró el input de mensaje");
      return;
    }

    const content = input.value.trim();
    if (content) {
      const message = {
        from: "admin",
        to: selectedUserId,
        content,
        timestamp: new Date(),
      };

      console.log("Enviando mensaje:", message);
      socket.emit("sendMessage", message);

      // Agregar el mensaje inmediatamente a la interfaz
      appendMessage({
        ...message,
        userName: "Administrador",
      });

      input.value = "";
    }
  }

  // Hacer global la función selectChat
  window.selectChat = selectChat;

  // Inicializar todas las funcionalidades
  setupNavigation();
  initCharts();
  setupEventListeners();
  initializeChat();

  document.getElementById('learningPathForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('learningPathTitle').value;
    const description = document.getElementById('learningPathDescription').value;
    const imageFile = document.getElementById('learningPathImage').files[0];

    // Aquí puedes enviar los datos al servidor para crear la nueva ruta
    // Por ejemplo, usando fetch o XMLHttpRequest

    // Simulación de creación de una nueva vista
    createLearningPathView(title, description, imageFile);
  });

  function createLearningPathView(title, description, imageFile) {
    // Lógica para crear una nueva vista de ruta de aprendizaje
    // Esto podría incluir la creación de un nuevo archivo HTML
    // y la actualización de la base de datos o el servidor

    console.log('Nueva ruta de aprendizaje creada:', title, description, imageFile);
  }
});
