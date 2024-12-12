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
<<<<<<< HEAD
      const formData = new FormData(this);
=======
      const data = {
        nombreCurso: this.nombreCurso.value,
        descripcionCurso: this.descripcionCurso.value,
        courseLevel: this.courseLevel.value,
        ageRange: this.ageRange.value,
        nombreDocente: this.nombreDocente.value,
        descripcionDocente: this.descripcionDocente.value,
        courseImage: this.courseImage.value, // Enlace de la imagen del curso
        docenteImage: this.docenteImage.value, // Enlace de la imagen del docente
        precioCurso: this.precioCurso.value,
        precioPersonalizado: this.precioPersonalizado.value,
      };
>>>>>>> 7536e7629006718798e1956f921c2815eb1713cb
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
          showSuccessAnimation("Curso registrado exitosamente");
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
          showSuccessAnimation("Ruta añadida exitosamente");
        })
        .catch((error) => console.error("Error al añadir la ruta:", error));
    });

  // Cargar cursos en el select de rutas y en la tabla
  function cargarCursos() {
    fetch("http://localhost:3000/courses/list")
      .then((response) => response.json())
      .then((cursos) => {
        const cursoSelect = document.getElementById("cursos-ruta");
        const tableBody = document.getElementById("cursos-body");
        cursoSelect.innerHTML = ""; // Limpiar opciones anteriores
        tableBody.innerHTML = ""; // Limpiar la tabla anterior

        cursos.forEach((curso) => {
          // Agregar opciones al select
          const option = document.createElement("option");
          option.value = curso.nombreCurso;
          option.textContent = curso.nombreCurso;
          cursoSelect.appendChild(option);

          // Agregar filas a la tabla
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${curso.nombreCurso}</td>
            <td>${curso.nombreDocente}</td>
            <td>${curso.descripcionCurso}</td>
            <td>${curso.courseLevel}</td>
            <td>${curso.ageRange}</td>
            <td>${curso.precioCurso}</td>
            <td>
              <button class="edit-btn">Editar</button>
              <button class="delete-btn">Eliminar</button>
            </td>
          `;
          tableBody.appendChild(row);
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

  // Función para mostrar la animación de éxito
  function showSuccessAnimation(message) {
    Swal.fire({
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
