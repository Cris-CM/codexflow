// Client/Js/Auth/controllers/login/app.js

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

// Función para registrar un nuevo usuario
document
  .getElementById("registration-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const nombre = document.getElementById("nombre").value;
    const fechaNacimiento = document.getElementById("fecha-nacimiento").value;

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
        fechaNacimiento,
      });

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
    console.log("Usuario logueado:", userCredential.user);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
});
