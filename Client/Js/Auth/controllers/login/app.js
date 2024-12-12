// Client/Js/Auth/controllers/login/app.js

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Función para registrar un nuevo usuario
document
  .getElementById("registration-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const nombre = document.getElementById("nombre").value;

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      // Guardar datos adicionales en Firestore
      await db.collection("Users").doc(user.uid).set({
        nombre,
        email,
      });

      // Guardar datos en el almacenamiento local
      localStorage.setItem("userName", nombre);
      localStorage.setItem("userEmail", email);

      console.log("Usuario registrado y datos guardados en Firestore:", user);
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  });

// Función para iniciar sesión
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;

    // Recuperar datos del usuario desde Firestore
    const userDoc = await db.collection("Users").doc(user.uid).get();
    const userData = userDoc.data();

    if (userData) {
      // Guardar datos en el almacenamiento local
      localStorage.setItem("userName", userData.nombre);
      localStorage.setItem("userEmail", userData.email);
      console.log("Usuario logueado:", user);
    } else {
      console.error("No se encontraron datos de usuario en Firestore");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
});

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
      throw new Error("Error al iniciar sesión");
    }

    const data = await response.json();
    console.log("Usuario logueado:", data);

    // Almacenar datos del usuario en localStorage
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("userName", data.userName);

    // Redirigir a la página principal después de iniciar sesión
    window.location.href = "/Client/pages/Home/home.html";
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
});
