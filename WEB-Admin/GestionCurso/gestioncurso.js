document.addEventListener("DOMContentLoaded", function () {
  const cursosBody = document.getElementById("cursos-body");
  const cursosRutaSelect = document.getElementById("cursos-ruta");

  function fillCourseSelect() {
    if (cursosRutaSelect && cursosBody) {
      cursosRutaSelect.innerHTML = ""; // Limpiar opciones existentes
      const cursos = cursosBody.querySelectorAll("tr");
      cursos.forEach((curso) => {
        const cursoNombre = curso.querySelector("td").textContent;
        const option = document.createElement("option");
        option.value = cursoNombre;
        option.textContent = cursoNombre;
        cursosRutaSelect.appendChild(option);
      });
    } else {
      console.error(
        "No se encontraron los elementos necesarios para llenar el select de cursos."
      );
    }
  }

  const formCurso = document.getElementById("form-curso");
  if (formCurso) {
    formCurso.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(formCurso);
      fetch(formCurso.action, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
          }
          return response.text();
        })
        .then((data) => {
          console.log(data);
          Swal.fire(
            "Éxito",
            `Curso "${formData.get("nombreCurso")}" añadido exitosamente`,
            "success"
          );
          document.getElementById("modal-curso").classList.add("oculto");
          const nuevoCurso = document.createElement("tr");
          nuevoCurso.innerHTML = `
              <td>${formData.get("nombreCurso")}</td>
              <td>${formData.get("descripcionCurso")}</td>
              <td>${formData.get("courseLevel")}</td>
              <td>${formData.get("ageRange")}</td>
              <td>
                <button class="edit-btn">
                  <span class="material-icons-sharp">edit</span>
                </button>
                <button class="delete-btn">
                  <span class="material-icons-sharp">delete</span>
                </button>
                <a href="/Client/pages/Courses/Courses_template/${formData
                  .get("nombreCurso")
                  .replace(/\s+/g, "_")}.html" class="view-modules-btn">
                  <span class="material-icons-sharp">visibility</span>
                </a>
              </td>
            `;
          cursosBody.appendChild(nuevoCurso);
          fillCourseSelect(); // Actualizar el select de cursos
        })
        .catch((error) => {
          console.error("Error al añadir el curso:", error);
          Swal.fire("Error", "Hubo un error al añadir el curso", "error");
        });
    });
  }

  const formRuta = document.getElementById("form-ruta");
  if (formRuta) {
    formRuta.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(this);
      const entries = Object.fromEntries(formData.entries());

      // Validación simple
      if (
        !entries.nombreRuta ||
        !entries.descripcionRuta ||
        !entries.nivelRuta ||
        !entries.duracionRuta ||
        !entries.nombreCurso
      ) {
        Swal.fire("Error", "Todos los campos son requeridos", "error");
        return;
      }

      console.log("Datos enviados:", entries); // Verifica los datos antes de enviarlos

      fetch(this.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entries),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
          }
          return response.text();
        })
        .then((data) => {
          console.log(data);
          Swal.fire("Éxito", "Ruta añadida exitosamente", "success");
          document.getElementById("modal-ruta").classList.add("oculto");
        })
        .catch((error) => {
          console.error("Error al añadir la ruta:", error);
          Swal.fire("Error", "Hubo un error al añadir la ruta", "error");
        });
    });
  }

  const agregarCursoBtn = document.getElementById("agregar-curso-btn");
  const closeModalCurso = document.getElementById("close-modal-curso");
  const agregarRutaBtn = document.getElementById("agregar-ruta-btn");
  const closeModalRuta = document.getElementById("close-modal-ruta");

  if (agregarCursoBtn) {
    agregarCursoBtn.addEventListener("click", () => {
      document.getElementById("modal-curso").classList.remove("oculto");
    });
  }

  if (closeModalCurso) {
    closeModalCurso.addEventListener("click", () => {
      document.getElementById("modal-curso").classList.add("oculto");
    });
  }

  if (agregarRutaBtn) {
    agregarRutaBtn.addEventListener("click", () => {
      document.getElementById("modal-ruta").classList.remove("oculto");
    });
  }

  if (closeModalRuta) {
    closeModalRuta.addEventListener("click", () => {
      document.getElementById("modal-ruta").classList.add("oculto");
    });
  }

  window.addEventListener("click", (event) => {
    const modalCurso = document.getElementById("modal-curso");
    const modalRuta = document.getElementById("modal-ruta");
    if (event.target === modalCurso) {
      modalCurso.classList.add("oculto");
    }
    if (event.target === modalRuta) {
      modalRuta.classList.add("oculto");
    }
  });
});
