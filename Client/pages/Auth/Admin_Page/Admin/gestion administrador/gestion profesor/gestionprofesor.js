// Selección de elementos
const addUserBtn = document.getElementById('addUserBtn');
const userModal = document.getElementById('userModal');
const closeModal = document.querySelector('.close');
const addUserForm = document.getElementById('addUserForm');
const userTableBody = document.getElementById('userTableBody');

// Variables globales
let editandoId = null;
let modoEdicion = false;

// Abrir el modal al hacer clic en el botón "Agregar"
addUserBtn.addEventListener('click', () => {
    modoEdicion = false;
    userModal.style.display = 'flex';
});

// Cerrar el modal al hacer clic en "X"
closeModal.addEventListener('click', limpiarFormulario);

// Cerrar el modal al hacer clic fuera de la ventana modal
window.addEventListener('click', (event) => {
    if (event.target === userModal) {
        limpiarFormulario();
    }
});

// Event listener para los botones de editar y eliminar
document.querySelector('.contable').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        // Obtener la fila más cercana al botón presionado
        const row = e.target.closest('tr');
        eliminarAdministrador(row);
    } else if (e.target.classList.contains('edit-btn')) {
        const row = e.target.closest('tr');
        modoEdicion = true;
        editarAdministrador(row);
    }
});

// Función para editar administrador
function editarAdministrador(row) {
    const cells = row.cells;
    editandoId = cells[0].textContent;

    // Llenar el formulario con los datos existentes
    document.getElementById('id').value = cells[0].textContent;
    document.getElementById('nombre').value = cells[1].textContent;
    document.getElementById('apellido').value = cells[2].textContent;
    document.getElementById('email').value = cells[3].textContent;
    document.getElementById('dni').value = cells[4].textContent;
    document.getElementById('rol').value = 'Profesor';
    document.getElementById('especialidad').value = cells[6].textContent;
    document.getElementById('departamento').value = cells[7].textContent;
    document.getElementById('estado').value = cells[8].textContent;

    // Cambiar el texto del botón
    const submitButton = addUserForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Actualizar Profesor';

    // Mostrar el modal
    userModal.style.display = 'flex';
}

// Función para eliminar profesor (cambiar "administrador" por "profesor")
function eliminarAdministrador(row) {
    const profesorId = row.cells[0].textContent;
    const profesorNombre = row.cells[1].textContent;
    
    Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar al profesor ${profesorNombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            row.remove();
            
            Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: `El profesor ${profesorNombre} ha sido eliminado.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

// Event listener del formulario
addUserForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const adminData = {
        id: document.getElementById('id').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        dni: document.getElementById('dni').value,
        rol: 'Profesor',
        especialidad: document.getElementById('especialidad').value,
        departamento: document.getElementById('departamento').value,
        estado: document.getElementById('estado').value
    };

    if (modoEdicion) {
        // Actualizar fila existente
        const filas = userTableBody.getElementsByTagName('tr');
        for (let fila of filas) {
            if (fila.cells[0].textContent === editandoId) {
                fila.cells[0].textContent = adminData.id;
                fila.cells[1].textContent = adminData.nombre;
                fila.cells[2].textContent = adminData.apellido;
                fila.cells[3].textContent = adminData.email;
                fila.cells[4].textContent = adminData.dni;
                fila.cells[5].textContent = adminData.rol;
                fila.cells[6].textContent = adminData.especialidad;
                fila.cells[7].textContent = adminData.departamento;
                fila.cells[8].textContent = adminData.estado;
                break;
            }
        }

        Swal.fire({
            icon: 'success',
            title: 'Administrador actualizado',
            text: `Los datos de ${adminData.nombre} han sido actualizados.`,
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        // Crear nueva fila solo si no estamos en modo edición
        adminData.id = generarNuevoId(); // Generar nuevo ID solo para nuevos registros
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${adminData.id}</td>
            <td>${adminData.nombre}</td>
            <td>${adminData.apellido}</td>
            <td>${adminData.email}</td>
            <td>${adminData.dni}</td>
            <td>${adminData.rol}</td>
            <td>${adminData.especialidad}</td>
            <td>${adminData.departamento}</td>
            <td>${adminData.estado}</td>
            <td>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Eliminar</button>
            </td>
        `;
        userTableBody.appendChild(newRow);

        Swal.fire({
            icon: 'success',
            title: 'Administrador agregado',
            text: `${adminData.nombre} ha sido agregado como administrador.`,
            showConfirmButton: false,
            timer: 1500
        });
    }

    // Limpiar formulario y cerrar modal
    limpiarFormulario();
});

// Función para limpiar el formulario
function limpiarFormulario() {
    addUserForm.reset();
    document.getElementById('rol').value = 'Administrador';
    editandoId = null;
    modoEdicion = false;
    const submitButton = addUserForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Guardar Administrador';
    userModal.style.display = 'none';
}

// Función para generar nuevo ID (ejemplo simple)
function generarNuevoId() {
    const ultimaFila = userTableBody.lastElementChild;
    if (!ultimaFila) return 'PRF001';
    
    const ultimoId = ultimaFila.firstElementChild.textContent;
    const numeroActual = parseInt(ultimoId.replace('PRF', ''));
    return `PRF${String(numeroActual + 1).padStart(3, '0')}`;
}

// Agregar al archivo JS existente
document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        // Opcional: Guardar el estado de los checkboxes
        const tecnologiasSeleccionadas = Array.from(document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked'))
            .map(cb => cb.value);
        console.log('Tecnologías seleccionadas:', tecnologiasSeleccionadas);
    });
});
