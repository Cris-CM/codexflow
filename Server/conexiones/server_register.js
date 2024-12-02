const API_BASE_URL = "http://localhost:3000";

// Importar la función de registro de Firebase
import { registerUser } from '../FIrebase/firebae_confing.js';

// Función para calcular la edad
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

// Función para determinar y guardar el tema
function setUserTheme(birthDate) {
  const age = calculateAge(birthDate);
  let theme = 'theme-default';
  
  if (age >= 0 && age <= 12) {
    theme = 'theme-kids';
  } else if (age >= 13 && age <= 17) {
    theme = 'theme-teen';
  } else {
    theme = 'theme-adult';
  }
  
  localStorage.setItem('userTheme', theme);
  localStorage.setItem('userAge', age);
  return theme;
}

// Formulario de registro
document
  .getElementById("registration-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fechaNacimiento = document.getElementById("fecha-nacimiento").value;

    // Determinar el tema basado en la edad
    const theme = setUserTheme(fechaNacimiento);

    try {
      // Llamar a la función de registro de Firebase
      const result = await registerUser(email, password, nombre, fechaNacimiento);

      if (!result.success) {
        throw new Error(result.message);
      }

      // Guardar el nombre y el email en localStorage antes de redirigir
      localStorage.setItem("userName", nombre);
      localStorage.setItem("userEmail", email);

      // Enviar datos al servidor Nest.js
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          nombre, 
          email, 
          password, 
          fechaNacimiento,
          theme // Enviamos el tema al servidor si es necesario
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(`Error: ${errorData.message || "Error desconocido"}`);
        } else {
          const errorText = await response.text();
          throw new Error(`Error: ${errorText}`);
        }
      }

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        
        // Guardar el nombre y el email en localStorage
        localStorage.setItem("userName", nombre);
        localStorage.setItem("userEmail", email);

        alert(data.message);
        // Redirigir a la página de inicio
        window.location.href = "/Client/pages/Auth/login.html";
      } else {
        const textData = await response.text();
        alert(`Respuesta no JSON: ${textData}`);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.message.includes("auth/email-already-in-use")) {
        alert("El correo electrónico ya está en uso. Por favor, utiliza otro correo.");
      } else {
        alert("Hubo un problema con la solicitud: " + error.message);
      }
    }
  });
