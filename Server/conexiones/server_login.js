const API_BASE_URL = "http://localhost:3000";

// Función para extraer el nombre del email
function getNameFromEmail(email) {
  return email.split("@")[0];
}

// Manejar el formulario de login
document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      console.log("Intentando login con:", { email }); // Debug

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Respuesta recibida:", response.status); // Debug

      // Manejar errores de respuesta
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Error en el inicio de sesión");
      }

      // Procesar respuesta exitosa
      const data = await response.json();
      console.log("Datos recibidos:", data); // Debug

      // Usar el nombre del servidor si está disponible, si no usar el que se guardó en el registro
      const userName = data.nombre || localStorage.getItem("userName") || getNameFromEmail(email);

      localStorage.setItem("userName", userName);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", data.role || "user");

      console.log("Datos guardados en localStorage:", {
        userName,
        email,
      }); // Debug

      // Simplificar la verificación
      if (!localStorage.getItem("userEmail")) {
        throw new Error("Error al guardar los datos del usuario");
      }

      // Si el servidor envía la fecha de nacimiento y el tema
      if (data.fechaNacimiento) {
        setUserTheme(data.fechaNacimiento);
      }

      // Aplicar el tema inmediatamente si estamos en la página correcta
      const userTheme = localStorage.getItem('userTheme');
      if (userTheme) {
        document.body.className = userTheme;
      }

      // Redirigir al home
      window.location.href = "/Client/pages/Home/home.html";
    } catch (error) {
      console.error("Error durante el login:", error);

      // Mostrar error al usuario
      const errorMessage = error.message || "Error durante el inicio de sesión";
      alert(errorMessage);

      // Limpiar campos en caso de error
      document.getElementById("password").value = "";
    }
  });

// Función para cerrar sesión (puede ser llamada desde cualquier parte)
function logout() {
  localStorage.clear();
  window.location.href = "/Client/pages/login.html";
}

// Exportar funciones si es necesario
window.logout = logout;
