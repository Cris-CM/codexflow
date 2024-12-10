document.addEventListener("DOMContentLoaded", function () {
  // Mostrar el modal para agregar curso
  document.getElementById("agregar-curso-btn").addEventListener("click", () => {
    document.getElementById("modal-curso").classList.remove("oculto");
  });

  // Cerrar el modal de curso
  document.getElementById("close-modal-curso").addEventListener("click", () => {
    document.getElementById("modal-curso").classList.add("oculto");
  });

  // Mostrar el modal para agregar ruta
  document.getElementById("agregar-ruta-btn").addEventListener("click", () => {
    document.getElementById("modal-ruta").classList.remove("oculto");
  });

  // Cerrar el modal de ruta
  document.getElementById("close-modal-ruta").addEventListener("click", () => {
    document.getElementById("modal-ruta").classList.add("oculto");
  });

  // Enviar datos del formulario de curso
  document
    .getElementById("form-curso")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(this);
      fetch("http://localhost:3000/courses/create", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("Curso creado:", data);
          this.reset();
          document.getElementById("modal-curso").classList.add("oculto");
          cargarCursos(); // Recargar cursos después de crear uno nuevo
        })
        .catch((error) => console.error("Error al crear el curso:", error));
    });

  // Enviar datos del formulario de ruta
  document
    .getElementById("form-ruta")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(this);
      fetch("http://localhost:3000/courses/add-route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("Ruta añadida:", data);
          this.reset();
          document.getElementById("modal-ruta").classList.add("oculto");
        })
        .catch((error) => console.error("Error al añadir la ruta:", error));
    });

  // Cargar cursos en el select de rutas
  function cargarCursos() {
    fetch("http://localhost:3000/courses/list")
      .then((response) => response.json())
      .then((cursos) => {
        const cursoSelect = document.getElementById("cursos-ruta");
        cursoSelect.innerHTML = ""; // Limpiar opciones anteriores
        cursos.forEach((curso) => {
          const option = document.createElement("option");
          option.value = curso.nombreCurso;
          option.textContent = curso.nombreCurso;
          cursoSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error al cargar cursos:", error));
  }

  cargarCursos(); // Llamar a la función para cargar cursos

  // Manejar el cambio en el select de precio
  const precioCursoSelect = document.getElementById("precio-curso");
  const precioPersonalizadoInput = document.getElementById(
    "precio-personalizado"
  );
  precioCursoSelect.addEventListener("change", function () {
    if (this.value === "personalizado") {
      precioPersonalizadoInput.style.display = "block";
      precioPersonalizadoInput.required = true;
    } else {
      precioPersonalizadoInput.style.display = "none";
      precioPersonalizadoInput.required = false;
      precioPersonalizadoInput.value = "";
    }
  });
});
