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

  // Mostrar el modal para agregar video
  document.getElementById("agregar-video-btn").addEventListener("click", () => {
    document.getElementById("modal-video").classList.remove("oculto");
  });

  // Cerrar el modal de video
  document.getElementById("close-modal-video").addEventListener("click", () => {
    document.getElementById("modal-video").classList.add("oculto");
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

  // Enviar datos del formulario de video
  document
    .getElementById("form-video")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());

      fetch("http://localhost:3000/courses/create-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Video creado:", data);
          this.reset();
          document.getElementById("modal-video").classList.add("oculto");
          showSuccessAnimation("Video agregado exitosamente");
        })
        .catch((error) => {
          console.error("Error al crear el video:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al crear el video",
          });
        });
    });

  // Función unificada para cargar cursos
  function cargarCursos() {
    fetch("http://localhost:3000/courses/list")
      .then((response) => response.json())
      .then((cursos) => {
        const cursoSelect = document.getElementById("cursos-ruta");
        const videoCursoSelect = document.getElementById("curso-select");
        const tableBody = document.getElementById("cursos-body");

        // Limpiar elementos
        cursoSelect.innerHTML = "";
        videoCursoSelect.innerHTML = "";
        tableBody.innerHTML = "";

        cursos.forEach((curso) => {
          // Agregar opciones al select de rutas
          const option = document.createElement("option");
          option.value = curso.nombreCurso;
          option.textContent = curso.nombreCurso;
          cursoSelect.appendChild(option);

          // Agregar opciones al select de videos
          const videoOption = option.cloneNode(true);
          videoCursoSelect.appendChild(videoOption);

          // Agregar filas a la tabla
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${curso.nombreCurso}</td>
            <td>${curso.nombreDocente}</td>
            <td>${curso.descripcionCurso}</td>
            <td>${curso.courseLevel}</td>
            <td>${curso.ageRange}</td>
            <td>${curso.precioCurso || "Gratis"}</td>
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

  // Llamar a cargarCursos al inicio
  cargarCursos();

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

  // Manejar clics en botones de editar y eliminar
  document
    .getElementById("cursos-body")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("edit-btn")) {
        const row = e.target.closest("tr");
        // Implementar lógica de edición aquí
        console.log("Editar curso:", row.cells[0].textContent);
      } else if (e.target.classList.contains("delete-btn")) {
        const row = e.target.closest("tr");
        // Implementar lógica de eliminación aquí
        console.log("Eliminar curso:", row.cells[0].textContent);
      }
    });

  // Implementar búsqueda y filtrado
  document
    .getElementById("buscador-curso")
    .addEventListener("input", function (e) {
      const searchTerm = e.target.value.toLowerCase();
      const rows = document.querySelectorAll("#cursos-body tr");

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? "" : "none";
      });
    });

  // Filtros de categoría y edad
  document
    .getElementById("filtro-categoria")
    .addEventListener("change", aplicarFiltros);
  document
    .getElementById("filtro-edad")
    .addEventListener("change", aplicarFiltros);

  function aplicarFiltros() {
    const categoria = document
      .getElementById("filtro-categoria")
      .value.toLowerCase();
    const edad = document.getElementById("filtro-edad").value;
    const rows = document.querySelectorAll("#cursos-body tr");

    rows.forEach((row) => {
      const categoriaRow = row.cells[3].textContent.toLowerCase();
      const edadRow = row.cells[4].textContent;

      const matchCategoria = !categoria || categoriaRow.includes(categoria);
      const matchEdad = !edad || edadRow === edad;

      row.style.display = matchCategoria && matchEdad ? "" : "none";
    });
  }
});
