// Obtener los botones y formularios
const agregarCursoBtn = document.getElementById('agregar-curso-btn');
const agregarModuloBtn = document.getElementById('agregar-modulo-btn');
const formularioCurso = document.getElementById('formulario-curso');
const formularioModulo = document.getElementById('formulario-modulo');

// Evento para mostrar el formulario de agregar curso
agregarCursoBtn.addEventListener('click', () => {
    formularioCurso.classList.toggle('oculto');
    formularioModulo.classList.add('oculto'); // Ocultar el formulario de módulo si está visible
});

// Evento para mostrar el formulario de agregar módulo
agregarModuloBtn.addEventListener('click', () => {
    formularioModulo.classList.toggle('oculto');
    formularioCurso.classList.add('oculto'); // Ocultar el formulario de curso si está visible
});
