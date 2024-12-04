document.addEventListener('DOMContentLoaded', function() {
    // Filtro de cursos
    document.getElementById('filtro-categoria').addEventListener('change', function() {
        const categoria = this.value.toLowerCase();
        const cursos = document.querySelectorAll('#cursos-body tr');

        cursos.forEach(curso => {
            const cursoCategoria = curso.children[2].textContent.toLowerCase();
            if (categoria === '' || cursoCategoria.includes(categoria)) {
                curso.style.display = '';
            } else {
                curso.style.display = 'none';
            }
        });
    });

    document.getElementById('filtro-edad').addEventListener('change', function() {
        const edad = this.value;
        const cursos = document.querySelectorAll('#cursos-body tr');

        cursos.forEach(curso => {
            const cursoEdad = curso.children[3].textContent;
            if (edad === '' || cursoEdad === edad) {
                curso.style.display = '';
            } else {
                curso.style.display = 'none';
            }
        });
    });

    // Barra de búsqueda
    document.getElementById('buscador-curso').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const cursos = document.querySelectorAll('#cursos-body tr');

        cursos.forEach(curso => {
            const cursoNombre = curso.children[0].textContent.toLowerCase(); // Nombre del curso
            if (cursoNombre.includes(searchTerm)) {
                curso.style.display = '';
            } else {
                curso.style.display = 'none';
            }
        });
    });

    // Mostrar el modal para agregar curso
    document.getElementById('agregar-curso-btn').addEventListener('click', () => {
        document.getElementById('modal-curso').classList.remove('oculto');
    });

    // Cerrar el modal de curso
    document.getElementById('close-modal-curso').addEventListener('click', () => {
        document.getElementById('modal-curso').classList.add('oculto');
    });

    // Mostrar el modal para agregar ruta
    document.getElementById('agregar-ruta-btn').addEventListener('click', () => {
        document.getElementById('modal-ruta').classList.remove('oculto');
    });

    // Cerrar el modal de ruta
    document.getElementById('close-modal-ruta').addEventListener('click', () => {
        document.getElementById('modal-ruta').classList.add('oculto');
    });

    // Cerrar el modal al hacer clic fuera del contenido
    window.addEventListener('click', (event) => {
        const modalCurso = document.getElementById('modal-curso');
        const modalRuta = document.getElementById('modal-ruta');
        if (event.target === modalCurso) {
            modalCurso.classList.add('oculto');
        }
        if (event.target === modalRuta) {
            modalRuta.classList.add('oculto');
        }
    });
});
