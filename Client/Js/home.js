document.addEventListener("DOMContentLoaded", function () {
  // Configuración inicial y constantes
  const API_BASE_URL = "http://localhost:3000";
  const socket = io("http://localhost:3000", {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  // Verificar autenticación
  if (!userId || !userName) {
    console.warn("Datos de usuario no encontrados");
    window.location.href = "/Client/pages/login.html";
    return;
  }

  // Funciones de Navegación
  function setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const views = document.querySelectorAll(".view");

    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const viewId = this.getAttribute("data-view");

        navLinks.forEach((link) => link.classList.remove("active"));
        this.classList.add("active");

        views.forEach((view) => {
          view.classList.toggle("active", view.id === viewId);
        });

        if (window.innerWidth <= 768) {
          toggleSidebar();
        }
      });
    });
  }

  // Configuración del Perfil de Usuario
  function setupUserProfile() {
    const userNameElement = document.getElementById("userNameDisplay");
    const storedName = localStorage.getItem("userName");

    if (userNameElement && storedName) {
      userNameElement.textContent = storedName;
    } else {
      console.warn("Nombre de usuario no encontrado");
    }

    const logoutButton = document.querySelector(".home-logout");
    if (logoutButton) {
      logoutButton.addEventListener("click", logout);
    }
  }

  function logout() {
    if (confirm("¿Estás seguro que deseas cerrar sesión?")) {
      localStorage.clear();
      window.location.href = "/Client/pages/Auth/login.html";
    }
  }

  window.logout = logout;

  // Sistema de Chat
  function initializeUserChat() {
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", userId);
    }

    setupSocketEvents();
    setupChatInterface();
    socket.emit("getMessageHistory", userId);

    setInterval(checkConnection, 30000);
  }

  function checkConnection() {
    if (!socket.connected) {
      console.log("Intentando reconectar...");
      socket.connect();
    }
  }

  function setupSocketEvents() {
    socket.on("connect", () => {
      console.log("Conectado al servidor de chat");
      updateConnectionStatus(true);
    });

    socket.on("disconnect", () => {
      console.log("Desconectado del servidor de chat");
      updateConnectionStatus(false);
    });

    socket.on("connect_error", (error) => {
      console.error("Error de conexión:", error);
      updateConnectionStatus(false);
      alert("Error de conexión con el servidor");
    });

    socket.on(`message:${userId}`, (message) => {
      try {
        appendMessage(message);
        playNotificationSound();
      } catch (error) {
        console.error("Error al procesar mensaje:", error);
      }
    });

    socket.on("messageHistory", (messages) => {
      try {
        const chatMessages = document.getElementById("chatMessages");
        if (!chatMessages) return;

        chatMessages.innerHTML = "";
        messages.forEach((message) => appendMessage(message));
      } catch (error) {
        console.error("Error al cargar historial:", error);
      }
    });
  }

  function setupChatInterface() {
    const sendButton = document.getElementById("sendMessage");
    if (sendButton) {
      sendButton.addEventListener("click", sendUserMessage);
    }

    const messageInput = document.getElementById("messageInput");
    if (messageInput) {
      messageInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendUserMessage();
        }
      });
    }
  }

  function createMessage(text, sender, time, isSent) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isSent ? "sent" : "received"}`;

    const messageInfo = document.createElement("div");
    messageInfo.className = "message-info";
    messageInfo.textContent = `${sender} - ${time}`;

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.textContent = text;

    messageDiv.appendChild(messageInfo);
    messageDiv.appendChild(messageContent);

    return messageDiv;
  }

  function appendMessage(message) {
    const chatMessages = document.getElementById("chatMessages");
    if (!chatMessages) return;

    const messageElement = document.createElement("div");
    const isUser = message.from === userId;
    const displayName = isUser
      ? message.userName || localStorage.getItem("userName") || "Usuario"
      : "Admin";

    messageElement.classList.add("message", isUser ? "sent" : "received");

    messageElement.innerHTML = `
          <div class="message-content">
              <div class="message-bubble">
                  <p>${message.content}</p>
              </div>
              <span class="message-time">
                  ${displayName} - ${new Date(
      message.timestamp
    ).toLocaleTimeString()}
              </span>
          </div>
      `;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendUserMessage() {
    const input = document.getElementById("messageInput");
    if (!input) return;

    const content = input.value.trim();
    if (!content) return;

    const currentUserName = localStorage.getItem("userName");
    if (!currentUserName) {
      console.error("Nombre de usuario no encontrado");
      return;
    }

    const message = {
      from: userId,
      to: "admin",
      content: content,
      userName: currentUserName,
      timestamp: new Date(),
    };

    console.log("Enviando mensaje:", message);

    socket.emit("sendMessage", message);
    input.value = "";

    appendMessage({
      ...message,
      fromSelf: true,
    });
  }

  function updateConnectionStatus(isConnected) {
    const statusElement = document.getElementById("connectionStatus");
    if (statusElement) {
      statusElement.textContent = isConnected ? "Conectado" : "Desconectado";
      statusElement.className = isConnected
        ? "status-connected"
        : "status-disconnected";
    }
  }

  function playNotificationSound() {
    const audio = new Audio("/assets/notification.mp3");
    audio
      .play()
      .catch((err) => console.log("Error al reproducir sonido:", err));
  }

  // Sistema de Racha (Streak)
  function setupStreak() {
    let streakCount = parseInt(localStorage.getItem("streakCount") || "0");
    updateStreakDisplay(streakCount);

    const streakLogo = document.getElementById("streakLogo");
    const streakInfo = document.getElementById("streakInfo");

    if (streakLogo) {
      streakLogo.addEventListener("click", (event) => {
        event.stopPropagation();
        streakInfo.style.display =
          streakInfo.style.display === "none" ? "block" : "none";
      });
    }

    document.addEventListener("click", (event) => {
      if (
        streakInfo &&
        !streakLogo.contains(event.target) &&
        !streakInfo.contains(event.target)
      ) {
        streakInfo.style.display = "none";
      }
    });

    // Simulating streak increment (replace with actual logic)
    setInterval(() => {
      streakCount++;
      localStorage.setItem("streakCount", streakCount.toString());
      updateStreakDisplay(streakCount);
    }, 86400000); // 24 hours
  }

  function updateStreakDisplay(count) {
    const streakDays = document.getElementById("streakDays");
    const streakFire = document.getElementById("streakFire");

    if (streakDays && streakFire) {
      streakDays.textContent = count;
      streakFire.textContent =
        count < 5 ? "🔥" : count < 10 ? "🔥🔥" : "🔥🔥🔥";
    }
  }

  // Funcionalidad del sidebar
  function setupSidebar() {
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebarClose = document.getElementById("sidebarClose");
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.getElementById("main-content");

    function toggleSidebar() {
      sidebar.classList.toggle("collapsed");
      mainContent.classList.toggle("sidebar-collapsed");
    }

    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", toggleSidebar);
    }

    if (sidebarClose) {
      sidebarClose.addEventListener("click", toggleSidebar);
    }

    // Cerrar sidebar al hacer clic fuera de él en dispositivos móviles
    document.addEventListener("click", function (event) {
      const isMobile = window.innerWidth <= 768;
      const isClickInsideSidebar = sidebar.contains(event.target);
      const isClickOnToggleButton = sidebarToggle.contains(event.target);

      if (
        isMobile &&
        !isClickInsideSidebar &&
        !isClickOnToggleButton &&
        !sidebar.classList.contains("collapsed")
      ) {
        toggleSidebar();
      }
    });

    // Ajustar el sidebar al cambiar el tamaño de la ventana
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        sidebar.classList.remove("collapsed");
        mainContent.classList.remove("sidebar-collapsed");
      }
    });
  }

  // Inicialización de la Aplicación
  function initializeApp() {
    setupNavigation();
    setupUserProfile();
    initializeUserChat();
    setupStreak();
    setupSidebar();
  }

  // Iniciar la aplicación
  initializeApp();

  // New code for course filtering and searching
  const searchInput = document.getElementById("searchInput");
  const coursesGrid = document.getElementById("coursesGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const requestScholarshipButton =
    document.getElementById("requestScholarship");

  const courses = [
    {
      title: "Introducción a la Robótica",
      description:
        "Enfocado en introducir a los estudiantes en el mundo de la robótica básica para niños.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHdbZVfM9s4OYuAp0MQhIMWO9hWfofWO6hyQ&s",
      age: "kids",
      tags: ["robótica", "programación", "básico"],
    },
    {
      title: "Desarrollo Web Frontend",
      age: "teens",
      description:
        "Aprende a crear sitios web modernos y atractivos con HTML, CSS y JavaScript.",
      tags: ["web", "html", "css"],
    },
    {
      title: "JavaScript desde 0",
      age: "adults",
      description:
        "Aprende JavaScript desde 0 con este curso interactivo y conviertete en un desarrollador frontend.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFPCKrf1KLJ3hSGfhq7X731GBbRZVlFWuZWA&s",
      tags: ["javascript", "avanzado"],
    },
    {
      title: "Diseño de Videojuegos para Niños",
      description:
        "Aprende a crear videojuegos con este curso interactivo y conviertete en un desarrollador de videojuegos.",
        image: "https://i.ytimg.com/vi/JgSQE24gqVA/maxresdefault.jpg",
      age: "kids",
      tags: ["videojuegos", "diseño"],
    },
    {
      title: "Desarrollo de aplicaciones móviles",
      age: "teens",
      description: "Aprende a desarrollar aplicaciones móviles con Flutter y diseña tus propias aplicaciones.",
      image: "https://i.ytimg.com/vi/ylLPGBoz3Gw/maxresdefault.jpg",
      tags: ["movil", "flutter"],
    },
    {
      title: "Machine Learning y IA",
      age: "adults",
      description: "Aprende los conceptos básicos de la inteligencia artificial y cómo aplicarlos en tu trabajo.",
      image: "https://i.ytimg.com/vi/UKncFg0PyEk/maxresdefault.jpg",
      tags: ["ia", "machine learning"],
    },
  ];

  function renderCourses(filteredCourses) {
    coursesGrid.innerHTML = "";
    filteredCourses.forEach((course) => {
      const courseElement = document.createElement("div");
      courseElement.classList.add("course-card");

      courseElement.innerHTML = `
              <img src="${course.image || "/Client/Images/html.jpg"}" 
                   alt="${course.title}" 
                   class="course-image">
              <div class="course-content">
                  <h3 class="course-title">${course.title}</h3>
                  <p class="course-description">${
                    course.description ||
                    "Enfocado en introducir a los estudiantes en esta área de conocimiento."
                  }</p>
                  <div class="course-buttons">
                      <button class="course-btn course-btn-primary">Ver sesiones</button>
                      <button class="course-btn course-btn-secondary">Ir a Evaluación</button>
                  </div>
              </div>
          `;

      // Add click handlers for buttons
      const buttons = courseElement.querySelectorAll(".course-btn");
      buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const action = button.textContent;
          if (action === "Ver sesiones") {
            // Handle view sessions
            console.log("Ver sesiones para:", course.title);
          } else {
            // Handle evaluation
            console.log("Ir a evaluación para:", course.title);
          }
        });
      });

      coursesGrid.appendChild(courseElement);
    });
  }

  searchInput.addEventListener("input", function () {
    const query = this.value;
    const searchResults = searchCourses(query);
    renderCourses(searchResults);
  });

  requestScholarshipButton.addEventListener("click", function (e) {
    e.preventDefault();
    alert(
      "Funcionalidad de solicitud de beca en desarrollo. Pronto estará disponible."
    );
  });

  // Initialize with all courses
  renderCourses(courses);

  const schools = [
    {
      name: "Visual Studio Code",
      path: [
        {
          title: "Introducción a Visual Studio Code",
          description: "Aprende a usar el editor de código más popular.",
          image: "https://i.ytimg.com/vi/vcY5S5kV5jk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDpa52s75XponyaK6PLzYCmaDm-bA",
        },
        {
          title: "Extensiones que no pueden faltar en tu VSCode",
          description:
            "Descubre las extensiones que mejorarán tu productividad.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV9H_Z303mGKf6kQ186jynKu5KQJin-dlGNg&s",
        },
      ],
    },
    {
      name: "Inteligencia Artificial",
      path: [
        {
          title: "Fundamentos de IA",
          description:
            "Conoce los conceptos básicos de la inteligencia artificial.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMd0Qzk8o9fCKq-ueBOHAfELLHdm6FZdL3GA&s",
        },
        {
          title: "Redes Neuronales",
          description: "Explora cómo funcionan las redes neuronales y cómo aplicarlas en tu trabajo.",
        image: "https://i.ytimg.com/vi/jaEIv_E29sk/maxresdefault.jpg",
        },
      ],
    },
    {
      name: "Desarrollo Móvil",
      path: [
        {
          title: "Introducción a Flutter",
          description: "Comienza con el desarrollo móvil usando Flutter.",
          image: "https://i.ytimg.com/vi/jaEIv_E29sk/maxresdefault.jpg",
        },
        {
          title: "Widgets en Flutter",
          description: "Aprende sobre los widgets básicos en Flutter.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa62DQGO-UxlNUdVz-7uK7KFQwnNwSyoyl5w&s",
        },
      ],
    },
    // Add more schools and paths as needed
  ];

  function setupSchoolButtons() {
    const schoolButtons = document.querySelectorAll(".school-button");
    const coursesGrid = document.getElementById("coursesGrid");
    const learningPathContent = document.getElementById("learningPathContent");

    schoolButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const school = schools[index];
        renderLearningPath(school.path);

        // Add sliding effect to specific sections
        coursesGrid.classList.add("slide-left");
        learningPathContent.classList.add("slide-left");

        // Remove sliding effect after animation
        setTimeout(() => {
          coursesGrid.classList.remove("slide-left");
          learningPathContent.classList.remove("slide-left");
        }, 500);
      });
    });
  }

  function renderLearningPath(path) {
    const learningPathContent = document.getElementById("learningPathContent");
    const learningPathSection = document.getElementById("learningPath");

    learningPathContent.innerHTML = path
      .map(
        (item) => `
      <div class="course-card">
        <img src="${item.image}" alt="${item.title}" class="course-image">
        <div class="course-content">
          <h3 class="course-title">${item.title}</h3>
          <p class="course-description">${item.description}</p>
        </div>
      </div>
    `
      )
      .join("");

    learningPathSection.classList.add("active");
  }

  // Initialize school buttons
  setupSchoolButtons();
});
