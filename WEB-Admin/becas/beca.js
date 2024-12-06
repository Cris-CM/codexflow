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
    const filtroTexto = document.querySelector('#search-input').value.toLowerCase();
    const filtroCategoria = document.querySelector('#category-filter').value.toLowerCase();
    const filas = document.querySelectorAll('.table-solicitudes tbody tr');

    filas.forEach((fila) => {
        const contenidoTexto = fila.textContent.toLowerCase();
        const categoria = fila.cells[5].textContent.toLowerCase();

        const coincideTexto = contenidoTexto.includes(filtroTexto);
        const coincideCategoria = filtroCategoria === '' || categoria === filtroCategoria;

        if (coincideTexto && coincideCategoria) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
}

// Asigna evento al campo de búsqueda
const campoBusqueda = document.querySelector('#search-input');
if (campoBusqueda) {
    campoBusqueda.addEventListener('input', filtrarSolicitudes);
}

// Asigna evento al selector de filtro
const selectorFiltro = document.querySelector('#category-filter');
if (selectorFiltro) {
    selectorFiltro.addEventListener('change', filtrarSolicitudes);
}

// Función para mostrar notificaciones con SweetAlert2
function mostrarNotificacion(mensaje, tipo) {
    Swal.fire({
        icon: tipo === 'success' ? 'success' : 'error',
        title: tipo === 'success' ? 'Éxito' : 'Error',
        text: mensaje,
        confirmButtonText: 'Aceptar'
    });
}

// Simula la aprobación de solicitudes
const botonesAceptar = document.querySelectorAll('.btn-aceptar');
botonesAceptar.forEach((boton, index) => {
    boton.addEventListener('click', () => {
        const fila = boton.closest('tr'); // Obtiene la fila correspondiente
        fila.cells[4].textContent = 'Aprobada'; // Cambia el estado a "Aprobada"
        mostrarNotificacion('Solicitud aprobada correctamente', 'success');
    });
});

// Simula la denegación de solicitudes
const botonesDenegar = document.querySelectorAll('.btn-denegar');
botonesDenegar.forEach((boton, index) => {
    boton.addEventListener('click', () => {
        const fila = boton.closest('tr'); // Obtiene la fila correspondiente
        fila.cells[4].textContent = 'Denegada'; // Cambia el estado a "Denegada"
        mostrarNotificacion('Solicitud denegada', 'error');
    });
});