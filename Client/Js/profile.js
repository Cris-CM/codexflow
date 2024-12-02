document.addEventListener("DOMContentLoaded", function () {
  // Simulación de carga de datos del usuario
  const userData = {
    name: localStorage.getItem("userName") || "Nombre no disponible",
    email: localStorage.getItem("userEmail") || "Correo no disponible",
    // no tocar parte donde saldra el nombre y el correo con el cual se registrara
    birthDate: localStorage.getItem("userBirthDate") || "2000-01-01",
    courses: [
      { name: "Desarrollo Web", status: "completed" },
      { name: "Desarrollo Móvil", status: "in-progress" },
      { name: "Inteligencia Artificial", status: "in-progress" },
    ],
    certificates: [
      {
        name: "Certificado de Programación Web",
        image: "/Client/Images/certificadoprueba.png",
      },
      {
        name: "Logro: Completar 3 Cursos",
        image:
          "https://img.wattpad.com/861d6e8845d47d6781e1ee09f1a1cea98a1ca97b/68747470733a2f2f73332   e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f79795f7742545a62625f657342673d3d2d313338313137393031322e313739363161353361626438643762653134353631393139383331342e706e67",
      },
    ],
  };

  // Función para calcular la edad
  function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  }

  // Función para aplicar el tema basado en la edad
  function applyThemeBasedOnAge() {
    const age = calculateAge(userData.birthDate);
    let themeClass = "theme-adult"; // Default theme

    if (age >= 0 && age <= 12) {
      themeClass = "theme-kids";
    } else if (age >= 13 && age <= 17) {
      themeClass = "theme-teen";
    }

    console.log(`Applying theme: ${themeClass}`);
    document.body.classList.add(themeClass);
  }

  function updateUserInfo() {
    document.getElementById("userName").textContent = userData.name;
    document.getElementById("userEmail").textContent = userData.email;
    document.querySelector(".user-name").textContent = userData.name;
  }

  function loadCourses() {
    const courseList = document.getElementById("courseList");
    courseList.innerHTML = ""; 
    userData.courses.forEach((course) => {
      const li = document.createElement("li");
      li.innerHTML = `
                ${course.name}
                <span class="course-status ${course.status}">${
        course.status === "completed" ? "Completado" : "En progreso"
      }</span>
            `;
      courseList.appendChild(li);
    });
  }

  function loadCertificates() {
    const certificateGrid = document.getElementById("certificateGrid");
    certificateGrid.innerHTML = "";
    userData.certificates.forEach((cert) => {
      const div = document.createElement("div");
      div.className = "certificate-card";
      div.innerHTML = `
                <img src="${cert.image}" alt="${cert.name}">
                <p>${cert.name}</p>
            `;
      certificateGrid.appendChild(div);
    });
  }

  function logout() {
    if (confirm("¿Estás seguro que deseas cerrar sesión?")) {
      localStorage.clear();
      window.location.href = "/Client/pages/Auth/login.html";
    }
  }

  updateUserInfo();
  applyThemeBasedOnAge();
  loadCourses();
  loadCertificates();

  const logoutLink = document.querySelector(".dropdown-menu a.logout");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      logout();
    });
  }

  const modal = document.getElementById("passwordModal");
  const changePasswordBtn = document.getElementById("changePasswordBtn");
  const closeModal = document.querySelector(".close-modal");
  const passwordForm = document.getElementById("passwordForm");

  changePasswordBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas nuevas no coinciden");
      return;
    }

    // Simulación de cambio de contraseña
    console.log("Contraseña cambiada:", newPassword);
    alert("Contraseña cambiada exitosamente");
    modal.style.display = "none";
    passwordForm.reset();
  });

  const changePhotoBtn = document.getElementById("changePhotoBtn");
  const profilePicture = document.getElementById("profilePicture");

  changePhotoBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          profilePicture.src = e.target.result;
          // Aquí se simularía el envío de la nueva imagen al servidor
          console.log("Nueva foto de perfil cargada");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  });

  const editInfoBtn = document.getElementById("editInfoBtn");
  editInfoBtn.addEventListener("click", () => {
    const newName = prompt("Ingrese su nuevo nombre:", userData.name);
    const newEmail = prompt("Ingrese su nuevo email:", userData.email);

    if (newName && newEmail) {
      userData.name = newName;
      userData.email = newEmail;
      updateUserInfo();
      alert("Información personal actualizada exitosamente");
    }
  });

  const userMenu = document.querySelector(".user-menu");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  userMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", () => {
    dropdownMenu.style.display = "none";
  });

  dropdownMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  dropdownMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const action = e.target.textContent;
      console.log(`Acción seleccionada: ${action}`);
      if (action === "Cerrar sesión") {
        alert("Cerrando sesión...");
      }
      dropdownMenu.style.display = "none";
    });
  });

  // Simulación de carga de datos adicionales (podría ser una llamada a API en un caso real)
  setTimeout(() => {
    console.log("Datos adicionales cargados");
    }, 2000);
});
