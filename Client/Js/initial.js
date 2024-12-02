function verificarRespuesta(button) {
  // Obtener todas las opciones
  const botones = document.querySelectorAll("button[name='q1']");

  // Limpiar todos los botones antes de aplicar estilos
  botones.forEach((btn) => {
    btn.classList.remove("correcto", "incorrecto");
  });

  // Verificar si la respuesta es correcta o incorrecta
  if (button.value === "correcto") {
    button.classList.add("correcto");
    document.getElementById("texto-mensaje").textContent =
      "¡La respuesta es correcta!";
    document.getElementById("continuar").style.display = "inline-block";
  } else {
    button.classList.add("incorrecto");
    document.getElementById("texto-mensaje").textContent =
      "La respuesta es incorrecta.";
    document.getElementById("continuar").style.display = "none";
  }
}
const paises = [
  { codigo: "AR", nombre: "Argentina" },
  { codigo: "BO", nombre: "Bolivia" },
  { codigo: "CL", nombre: "Perú" },
  // añadimos el resto de los países aquí
];
