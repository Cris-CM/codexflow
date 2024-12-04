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

document
  .getElementById("registration-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const nombre = document.getElementById("nombre").value;
    const fechaNacimiento = document.getElementById("fecha-nacimiento").value;

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, nombre, fechaNacimiento }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar");
      }

      const data = await response.json();
      console.log("Usuario registrado:", data);

      // Almacenar datos del usuario en localStorage
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userName", nombre);

      // Redirigir a la página principal después de registrarse
      window.location.href = "/Client/pages/Home/home.html";
    } catch (error) {
      console.error("Error al registrar:", error);
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
