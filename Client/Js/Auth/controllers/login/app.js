// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBW6eeHtxDaaN4gEO34dfao39ppU_Nc6YM",
  authDomain: "codexflow-ae4fb.firebaseapp.com",
  projectId: "codexflow-ae4fb",
  storageBucket: "codexflow-ae4fb.firebasestorage.app",
  messagingSenderId: "49650120730",
  appId: "1:49650120730:web:d50102f2ef63bd1847b9a3",
  measurementId: "G-LEDQHMKJBP",
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Verificar inicialización
console.log("Firebase inicializado:", !!firebase);

// Manejo de la UI
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Registro de usuario
document
  .getElementById("registration-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const nombre = document.getElementById("nombre").value;
    const fechaNacimiento = document.getElementById("fecha-nacimiento").value;

    try {
      // Registrar en el backend
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          nombre,
          fechaNacimiento,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar usuario");
      }

      const data = await response.json();
      console.log("Usuario registrado exitosamente:", data);

      alert("¡Registro exitoso! Por favor, inicia sesión.");
      container.classList.remove("sign-up-mode");

      // Limpiar el formulario
      document.getElementById("registration-form").reset();
    } catch (error) {
      alert(error.message || "Error al registrar usuario");
      console.error("Error al registrar:", error);
    }
  });

// Login de usuario
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al iniciar sesión");
    }

    const data = await response.json();
    console.log("Login exitoso:", data);

    // Guardar datos en localStorage
    localStorage.setItem("userName", data.nombre);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userId", data.id);
    localStorage.setItem("userToken", data.token);

    // Redirigir a la página principal
    window.location.href = "/Client/pages/Home/home.html";
  } catch (error) {
    alert(error.message || "Error al iniciar sesión");
    console.error("Error al iniciar sesión:", error);
  }
});

// Observador del estado de autenticación
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Usuario está logueado:", user.email);
  } else {
    console.log("Usuario no está logueado");
  }
});
