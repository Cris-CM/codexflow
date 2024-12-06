// Selección de elementos
const addUserBtn = document.getElementById('addUserBtn');
const userModal = document.getElementById('userModal');
const closeModal = document.querySelector('.close');
const addUserForm = document.getElementById('addUserForm');
const userTableBody = document.getElementById('userTableBody');
const searchInput = document.getElementById('searchInput');

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
    document.getElementById('rol').value = cells[4].textContent;
    
    // Convertir fecha del formato DD-MM-YYYY a YYYY-MM-DD para el input date
    const fechaNacimiento = cells[5].textContent.split('-').reverse().join('-');
    document.getElementById('f.nacimiento').value = fechaNacimiento;
    
    document.getElementById('plan').value = cells[6].textContent;
    document.getElementById('estado').value = cells[7].textContent;

    // Cambiar el texto del botón
    const submitButton = addUserForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Actualizar Alumno';

    // Mostrar el modal
    userModal.style.display = 'flex';
}

// Función para eliminar administrador
function eliminarAdministrador(row) {
    const adminId = row.cells[0].textContent;
    const adminNombre = row.cells[1].textContent;
    
    Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar al alumno ${adminNombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Animación de desvanecimiento
            row.style.transition = 'opacity 0.5s';
            row.style.opacity = '0';
            
            setTimeout(() => {
                row.remove();
                
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: `El alumno ${adminNombre} ha sido eliminado.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }, 500);
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
        rol: 'Estudiante',
        fnacimiento: document.getElementById('f.nacimiento').value,
        plan: document.getElementById('plan').value,
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
                fila.cells[4].textContent = adminData.rol;
                // Convertir fecha del formato YYYY-MM-DD a DD-MM-YYYY para mostrar
                const fechaFormateada = adminData.fnacimiento.split('-').reverse().join('-');
                fila.cells[5].textContent = fechaFormateada;
                fila.cells[6].textContent = adminData.plan;
                fila.cells[7].textContent = adminData.estado;
                break;
            }
        }

        Swal.fire({
            icon: 'success',
            title: 'Alumno actualizado',
            text: `Los datos de ${adminData.nombre} han sido actualizados.`,
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        adminData.id = generarNuevoId();
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${adminData.id}</td>
            <td>${adminData.nombre}</td>
            <td>${adminData.apellido}</td>
            <td>${adminData.email}</td>
            <td>${adminData.rol}</td>
            <td>${adminData.fnacimiento}</td>
            <td>${adminData.plan}</td>
            <td>${adminData.estado}</td>
            <td>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Eliminar</button>
            </td>
        `;
        userTableBody.appendChild(newRow);

        Swal.fire({
            icon: 'success',
            title: 'Alumno agregado',
            text: `${adminData.nombre} ha sido agregado como alumno.`,
            showConfirmButton: false,
            timer: 1500
        });
    }

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
    if (!ultimaFila) return 'ALM001';
    
    const ultimoId = ultimaFila.firstElementChild.textContent;
    const numeroActual = parseInt(ultimoId.replace('ALM', ''));
    return `ALM${String(numeroActual + 1).padStart(3, '0')}`;
}

// Agregar la función de búsqueda
function buscarAlumnos() {
    const searchTerm = searchInput.value.toLowerCase();
    const rows = userTableBody.getElementsByTagName('tr');

    for (let row of rows) {
        let found = false;
        const cells = row.getElementsByTagName('td');
        
        // Buscar en todas las columnas excepto en la última (botones)
        for (let i = 0; i < cells.length - 1; i++) {
            const cellText = cells[i].textContent.toLowerCase();
            if (cellText.includes(searchTerm)) {
                found = true;
                break;
            }
        }

        // Mostrar u ocultar la fila según el resultado
        if (found) {
            row.classList.remove('hidden-row');
        } else {
            row.classList.add('hidden-row');
        }
    }
}

// Agregar event listener para la búsqueda
searchInput.addEventListener('input', buscarAlumnos);

// Agregar event listener para limpiar la búsqueda cuando se agrega un nuevo alumno
addUserForm.addEventListener('submit', () => {
    searchInput.value = '';
    buscarAlumnos();
});

