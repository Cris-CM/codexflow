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

    setInterval(() => {
      streakCount++;
      localStorage.setItem("streakCount", streakCount.toString());
      updateStreakDisplay(streakCount);
    }, 86400000);
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
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.getElementById("main-content");

    function toggleSidebar() {
      sidebar.classList.toggle("collapsed");
      sidebar.classList.toggle("open");
      mainContent.classList.toggle("sidebar-collapsed");
    }

    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", toggleSidebar);
    }

    document.addEventListener("click", function (event) {
      const isMobile = window.innerWidth <= 768;
      const isClickInsideSidebar = sidebar.contains(event.target);
      const isClickOnToggleButton = sidebarToggle.contains(event.target);

      if (
        isMobile &&
        !isClickInsideSidebar &&
        !isClickOnToggleButton &&
        sidebar.classList.contains("open")
      ) {
        toggleSidebar();
      }
    });

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

  // Código para el manejo de cursos y búsqueda
  const searchInput = document.getElementById("searchInput");
  const coursesGrid = document.getElementById("coursesGrid");
  const requestScholarshipButton =
    document.getElementById("requestScholarship");

  function searchCourses(query) {
    // Buscar en los cursos que están actualmente en el DOM
    const currentCourses = Array.from(
      coursesGrid.getElementsByClassName("course-card")
    ).map((card) => ({
      title: card.querySelector(".course-title").textContent,
      description: card.querySelector(".course-description").textContent,
      image: card.querySelector(".course-image").src,
    }));

    return currentCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  searchInput.addEventListener("input", function () {
    const query = this.value;
    if (!query) {
      // Si no hay búsqueda, mostrar todos los cursos
      Array.from(coursesGrid.getElementsByClassName("course-card")).forEach(
        (card) => {
          card.style.display = "block";
        }
      );
    } else {
      // Si hay búsqueda, filtrar los cursos
      const searchResults = searchCourses(query);
      Array.from(coursesGrid.getElementsByClassName("course-card")).forEach(
        (card) => {
          const title = card.querySelector(".course-title").textContent;
          const description = card.querySelector(
            ".course-description"
          ).textContent;
          if (
            title.toLowerCase().includes(query.toLowerCase()) ||
            description.toLowerCase().includes(query.toLowerCase())
          ) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        }
      );
    }
  });

  requestScholarshipButton.addEventListener("click", function (e) {
    e.preventDefault();
    alert(
      "Funcionalidad de solicitud de beca en desarrollo. Pronto estará disponible."
    );
  });

  // Configuración de los botones de escuela
  const schools = [
    {
      name: "Visual Studio Code",
      path: [
        {
          title: "Introducción a Visual Studio Code",
          description: "Aprende a usar el editor de código más popular.",
          image:
            "https://i.ytimg.com/vi/vcY5S5kV5jk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDpa52s75XponyaK6PLzYCmaDm-bA",
        },
        {
          title: "Extensiones que no pueden faltar en tu VSCode",
          description:
            "Descubre las extensiones que mejorarán tu productividad.",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV9H_Z303mGKf6kQ186jynKu5KQJin-dlGNg&s",
        },
      ],
    },
    // ... resto de las escuelas ...
  ];

  function setupSchoolButtons() {
    const schoolButtons = document.querySelectorAll(".school-button");
    const learningPathContent = document.getElementById("learningPathContent");

    schoolButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const school = schools[index];
        if (school) {
          renderLearningPath(school.path);
          coursesGrid.classList.add("slide-left");
          learningPathContent.classList.add("slide-left");

          setTimeout(() => {
            coursesGrid.classList.remove("slide-left");
            learningPathContent.classList.remove("slide-left");
          }, 500);
        }
      });
    });
  }

  function renderLearningPath(path) {
    const learningPathContent = document.getElementById("learningPathContent");
    const learningPathSection = document.getElementById("learningPath");

    if (learningPathContent && path) {
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

      if (learningPathSection) {
        learningPathSection.classList.add("active");
      }
    }
  }

  // Inicializar botones de escuela
  setupSchoolButtons();

  // Filtros de cursos en rutas
  const filterButtons = document.querySelectorAll(".filter-button");
  const courseItems = document.querySelectorAll(".course-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      courseItems.forEach((item) => {
        if (filter === "todos") {
          item.style.display = "flex";
        } else if (filter === "en-progreso") {
          const progress = parseInt(
            item.querySelector(".progress").style.width
          );
          item.style.display = progress < 100 ? "flex" : "none";
        } else if (filter === "completados") {
          const progress = parseInt(
            item.querySelector(".progress").style.width
          );
          item.style.display = progress === 100 ? "flex" : "none";
        }
      });
    });
  });
});
