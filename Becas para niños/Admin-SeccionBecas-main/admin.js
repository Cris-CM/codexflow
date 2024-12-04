// Selecciona elementos clave de la interfaz
const detallesSolicitud = document.querySelector('.detalles-solicitud');
const btnCerrar = document.querySelector('.btn-cerrar');
const botonesVer = document.querySelectorAll('.btn-ver');
const modalDetalles = document.getElementById('modal-detalles');
const btnCerrarModal = document.querySelector('.btn-cerrar-modal');
const modalCuerpo = document.getElementById('modal-cuerpo');

// Muestra los detalles de una solicitud en el modal
function mostrarDetalles(id) {
    // Aquí puedes agregar lógica para obtener los detalles de la solicitud según el ID
    // Por ejemplo, puedes usar un array de objetos o una llamada a la API para obtener los detalles

    // Ejemplo de contenido de detalles
    modalCuerpo.innerHTML = `
        <p><strong>Motivo:</strong> Solicito beca por razones económicas para completar mi formación.</p>
        <p><strong>Documentación Adjunta:</strong></p>
        <ul>
            <li><a href="docs/comprobante_ingresos.pdf" target="_blank">Comprobante de Ingresos</a></li>
            <li><a href="docs/constancia_estudios.pdf" target="_blank">Constancia de Estudios</a></li>
        </ul>
    `;

    modalDetalles.style.display = 'block'; // Muestra el modal
}

// Oculta el modal
function cerrarModal() {
    modalDetalles.style.display = 'none';
}

// Asigna eventos a los botones de "Ver"
botonesVer.forEach((boton, index) => {
    boton.addEventListener('click', () => mostrarDetalles(index + 1)); // Pasa el ID correspondiente
});

// Asigna evento al botón de "Cerrar" del modal
btnCerrarModal.addEventListener('click', cerrarModal);

// Cierra el modal si se hace clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === modalDetalles) {
        cerrarModal();
    }
});

// Función para filtrar solicitudes según tipo o fecha
function filtrarSolicitudes() {
    const filtro = document.querySelector('#filtro-solicitudes').value.toLowerCase();
    const filas = document.querySelectorAll('.table-solicitudes tbody tr');

    filas.forEach((fila) => {
        const contenido = fila.textContent.toLowerCase();
        if (contenido.includes(filtro)) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
}

// Asigna evento al selector de filtro
const selectorFiltro = document.querySelector('#filtro-solicitudes');
if (selectorFiltro) {
    selectorFiltro.addEventListener('input', filtrarSolicitudes);
}

// Agrega interacciones para notificar acciones
function mostrarNotificacion(mensaje, tipo) {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// Simula la aprobación de solicitudes
const botonesAceptar = document.querySelectorAll('.btn-aceptar');
botonesAceptar.forEach((boton) => {
    boton.addEventListener('click', () => {
        mostrarNotificacion('Solicitud aprobada correctamente', 'success');
    });
});

// Simula la denegación de solicitudes
const botonesDenegar = document.querySelectorAll('.btn-denegar');
botonesDenegar.forEach((boton) => {
    boton.addEventListener('click', () => {
        mostrarNotificacion('Solicitud denegada', 'error');
    });
});
