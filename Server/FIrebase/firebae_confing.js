import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA8FwymxPjB6gpeQp3OfC-8ao0S3mZ7sZI",
  authDomain: "shinkamirai-ccf1c.firebaseapp.com",
  projectId: "shinkamirai-ccf1c",
  storageBucket: "shinkamirai-ccf1c.appspot.com",
  messagingSenderId: "1010509690356",
  appId: "1:1010509690356:web:2303d1fe2ee7fbfc7135a1",
  measurementId: "G-VPRPQV1TST",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Función para registrar un nuevo usuario
export async function registerUser(email, password, nombre, fechaNacimiento) {
  try {
    // Validar el formato del correo electrónico
    if (!isValidEmail(email)) {
      throw new Error("Correo electrónico no válido");
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    const user = userCredential.user;

    // Guardar datos adicionales en Firestore
    await setDoc(doc(db, 'users', user.uid), {
      nombre: nombre.trim(),
      email: email.trim(),
      fechaNacimiento: new Date(fechaNacimiento),
      createdAt: serverTimestamp()
    });

    console.log('Usuario registrado y datos guardados en Firestore');
    return { success: true, message: 'Usuario registrado exitosamente' };
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return { success: false, message: error.message };
  }
}

// Función para validar el formato del correo electrónico
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}