// Obtener el ID del curso de la URL
const urlParams = new URLSearchParams(window.location.search);
const cursoId = urlParams.get('cursoId');

// Estructura de datos para módulos
let modulosActuales = [];

// Cargar datos del curso y sus módulos
async function cargarDatosCurso() {
    const curso = cursos.find(c => c.id === parseInt(cursoId));
    if (curso) {
        document.getElementById('curso-nombre').textContent = curso.nombre;
        modulosActuales = curso.modulos;
        mostrarModulos();
    }
}

// Mostrar los módulos en la interfaz
function mostrarModulos() {
    const modulosGrid = document.querySelector('.modulos-grid');
    modulosGrid.innerHTML = modulosActuales.map(modulo => `
        <div class="modulo-card" data-id="${modulo.id}">
            <div class="modulo-card-header">
                <h3>${modulo.nombre}</h3>
                <div class="modulo-actions">
                    <button class="edit-btn" onclick="editarModulo(${modulo.id})">
                        <i class='bx bx-edit'></i>
                    </button>
                    <button class="delete-btn" onclick="eliminarModulo(${modulo.id})">
                        <i class='bx bx-trash'></i>
                    </button>
                </div>
            </div>
            <p class="modulo-descripcion">${modulo.descripcion}</p>
            <div class="modulo-links">
                <a href="${modulo.videoUrl}" target="_blank" class="video-link">
                    <i class='bx bx-play-circle'></i> Ver Video
                </a>
                ${modulo.archivos.length ? 
                    `<div class="archivo-info"><i class='bx bx-file'></i> Archivos: ${modulo.archivos.map(file => `<span>${file.name}</span>`).join(', ')}</div>` 
                    : ''}
            </div>
        </div>
    `).join('');
}

// Eventos y funciones para el modal
const moduloModal = document.getElementById('modulo-modal');
const moduloForm = document.getElementById('modulo-form');

document.getElementById('agregar-modulo-btn').addEventListener('click', () => {
    moduloModal.classList.remove('oculto');
});

document.querySelector('.cancel-btn').addEventListener('click', () => {
    moduloModal.classList.add('oculto');
    moduloForm.reset();
});

let moduloEditando = null; // Variable para almacenar el módulo que se está editando

function editarModulo(id) {
    moduloEditando = modulosActuales.find(m => m.id === id);
    if (moduloEditando) {
        document.getElementById('modulo-nombre').value = moduloEditando.nombre;
        document.getElementById('modulo-descripcion').value = moduloEditando.descripcion;
        document.getElementById('modulo-video').value = moduloEditando.videoUrl;
        // Mostrar el modal
        moduloModal.classList.remove('oculto');
    }
}

moduloForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    
    if (moduloEditando) {
        // Actualizar el módulo existente
        moduloEditando.nombre = document.getElementById('modulo-nombre').value;
        moduloEditando.descripcion = document.getElementById('modulo-descripcion').value;
        moduloEditando.videoUrl = document.getElementById('modulo-video').value;

        // Mensaje de éxito al editar
        Swal.fire({
            icon: 'success',
            title: 'Cambios guardados',
            text: 'Los cambios se han guardado exitosamente.',
            timer: 1500,
            showConfirmButton: false
        });
    } else {
        // Agregar un nuevo módulo
        const nuevoModulo = {
            id: Date.now(), // Generador simple de ID
            nombre: document.getElementById('modulo-nombre').value,
            descripcion: document.getElementById('modulo-descripcion').value,
            videoUrl: document.getElementById('modulo-video').value,
            archivos: [] // Aquí manejarías la subida de archivos
        };
        modulosActuales.push(nuevoModulo);

        // Mensaje de éxito al agregar
        Swal.fire({
            icon: 'success',
            title: 'Módulo agregado',
            text: 'El módulo se ha agregado correctamente.',
            timer: 1500,
            showConfirmButton: false
        });
    }

    mostrarModulos();
    moduloModal.classList.add('oculto');
    moduloForm.reset();
    moduloEditando = null; // Reiniciar la variable de edición
});

function eliminarModulo(id) {
    // Lógica para eliminar el módulo
    modulosActuales = modulosActuales.filter(m => m.id !== id);
    mostrarModulos();
    Swal.fire({
        icon: 'success',
        title: 'Módulo eliminado',
        text: 'El módulo se ha eliminado correctamente',
        timer: 1500,
        showConfirmButton: false
    });
}

// Inicializar la página
cargarDatosCurso();