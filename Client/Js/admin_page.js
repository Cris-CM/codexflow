document.addEventListener("DOMContentLoaded", () => {
  // Configuración de socket.io
  console.log("Iniciando aplicación...");
  const socket = io("http://localhost:3000");
  let selectedUserId = null;

  // Configuración de gráficos
  const plans = [
    { name: "Básico", price: 200, students: 1, color: "rgb(255, 99, 132)" },
    { name: "Duo", price: 350, students: 2, color: "rgb(54, 162, 235)" },
    { name: "Expert", price: 500, students: 4, color: "rgb(255, 206, 86)" },
  ];

  const initialStats = {
    users: [500, 300, 200],
    revenue: [100000, 105000, 100000],
    retention: [85, 90, 95],
    courses: [50, 75, 100],
  };

  let selectedPlans = ["Básico", "Duo", "Expert"];
  let currentTab = "users";
  let charts = {};

  // Funciones de gráficos
  function initCharts() {
    console.log("Inicializando gráficos...");
    const ctx = {
      users: document.getElementById("usersChart")?.getContext("2d"),
      revenue: document.getElementById("revenueChart")?.getContext("2d"),
      retention: document.getElementById("retentionChart")?.getContext("2d"),
      courses: document.getElementById("coursesChart")?.getContext("2d"),
    };

    Object.keys(ctx).forEach((key) => {
      if (ctx[key]) {
        charts[key] = new Chart(ctx[key], {
          type: "bar",
          data: {
            labels: [""],
            datasets: plans.map((plan, index) => ({
              label: plan.name,
              data: [initialStats[key][index]],
              backgroundColor: plan.color,
            })),
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    });
  }

  function updateCharts() {
    Object.keys(charts).forEach((key) => {
      charts[key].data.datasets = plans
        .filter((plan) => selectedPlans.includes(plan.name))
        .map((plan, index) => ({
          label: plan.name,
          data: [
            initialStats[key][plans.findIndex((p) => p.name === plan.name)],
          ],
          backgroundColor: plan.color,
        }));
      charts[key].update();
    });
  }

  // Navegación
  function setupNavigation() {
    console.log("Configurando navegación...");
    const navLinks = document.querySelectorAll(".sidebar .nav-link");
    const contentSections = document.querySelectorAll(".content-section");

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        console.log("Navegando a:", targetId);

        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");

        contentSections.forEach((section) => {
          if (section.id === targetId) {
            section.style.display = "block";
          } else {
            section.style.display = "none";
          }
        });
      });
    });
  }

  // Funciones de eventos
  function setupEventListeners() {
    console.log("Configurando event listeners...");

    // Filtros de planes
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const planName = e.target.id.replace("filter-", "");
        if (e.target.checked) {
          selectedPlans.push(planName);
        } else {
          selectedPlans = selectedPlans.filter((name) => name !== planName);
        }
        updateCharts();
      });
    });

    // Tabs de estadísticas
    document.querySelectorAll(".tab-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        document
          .querySelectorAll(".tab-button")
          .forEach((btn) => btn.classList.remove("active"));
        e.target.classList.add("active");

        document
          .querySelectorAll(".tab-content")
          .forEach((content) => content.classList.remove("active"));

        document
          .getElementById(`${e.target.dataset.tab}-chart`)
          ?.classList.add("active");

        currentTab = e.target.dataset.tab;
      });
    });

    // Formularios
    setupForms();
  }

  function setupForms() {
    // Formulario de cursos
    const courseForm = document.getElementById("courseForm");
    if (courseForm) {
      courseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Curso registrado exitosamente!");
        courseForm.reset();
      });
    }

    // Formulario de videos
    const videoForm = document.getElementById("videoForm");
    if (videoForm) {
      videoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Video subido exitosamente!");
        videoForm.reset();
      });
    }

    // Botones de detalles de usuario
    document.querySelectorAll(".user-table .btn").forEach((button) => {
      button.addEventListener("click", () => {
        alert("Detalles del usuario: Esta funcionalidad está en desarrollo.");
      });
    });
  }

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
