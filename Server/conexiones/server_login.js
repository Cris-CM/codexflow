const API_BASE_URL = "http://localhost:3000";

// Función para extraer el nombre del email
function getNameFromEmail(email) {
  return email.split("@")[0];
}

// Función para validar el formato del correo electrónico
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Manejar el formulario de login
document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validar el formato del correo electrónico
    if (!isValidEmail(email)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Error en el inicio de sesión");
      }

      const data = await response.json();

      const userName = data.nombre || localStorage.getItem("userName") || getNameFromEmail(email);

      localStorage.setItem("userName", userName);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", data.role || "user");

      if (data.fechaNacimiento) {
        setUserTheme(data.fechaNacimiento);
      }

      const userTheme = localStorage.getItem('userTheme');
      if (userTheme) {
        document.body.className = userTheme;
      }

      window.location.href = "/Client/pages/Home/home.html";
    } catch (error) {
      console.error("Error durante el login:", error);
      alert(error.message || "Error durante el inicio de sesión");
      document.getElementById("password").value = "";
    }
  });

function logout() {
  localStorage.clear();
  window.location.href = "/Client/pages/login.html";
}

window.logout = logout;
