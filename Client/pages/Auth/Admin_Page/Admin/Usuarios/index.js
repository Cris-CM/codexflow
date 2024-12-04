

// Obtener las referencias de las tarjetas
document.getElementById('alumnos-card').addEventListener('click', function() {
    showOptions('Alumnos', ['Programación', 'Arte', 'Matemáticas', 'Ciencias']);
});

document.getElementById('docentes-card').addEventListener('click', function() {
    showOptions('Docentes', ['Programación', 'Arte', 'Matemáticas', 'Ciencias']);
});

document.getElementById('administradores-card').addEventListener('click', function() {
    showOptions('Administradores', ['Programación', 'Arte', 'Matemáticas', 'Ciencias']);
});

// Función para mostrar las opciones según la tarjeta seleccionada
function showOptions(userType, options) {
    // Cambiar el título de la sección dinámicamente
    document.getElementById('section-title').textContent = `Gestión de ${userType}`;
    
    // Obtener el contenedor de las opciones
    const optionsContainer = document.getElementById('options-container');
    
    // Limpiar el contenido previo
    optionsContainer.innerHTML = '';
    
    // Recorrer las opciones y crear un div por cada opción
    options.forEach(option => {
        const div = document.createElement('div');
        div.classList.add('option');
        div.textContent = option;
        
        // Agregar un evento de click a cada opción
        div.addEventListener('click', function() {
            alert(`Mostrando ${userType} en la categoría: ${option}`);
        });
        
        // Añadir el div de opción al contenedor
        optionsContainer.appendChild(div);
    });

    // Mostrar el contenedor de opciones
    optionsContainer.style.display = 'flex';
}

// Datos simulados para usuarios
const users = [
    { nombre: 'Juan', apellido: 'Pérez', telefono: '987654321', fechaNacimiento: '2000-05-10' },
    { nombre: 'Ana', apellido: 'García', telefono: '987654322', fechaNacimiento: '1995-07-22' },
    { nombre: 'Carlos', apellido: 'Ramírez', telefono: '987654323', fechaNacimiento: '2001-01-30' },
    { nombre: 'Luis', apellido: 'Martínez', telefono: '987654324', fechaNacimiento: '1993-03-18' },
    // Más usuarios...
];

// Función para mostrar los usuarios en la tabla
function displayUsers(usersToShow) {
    const tbody = document.querySelector('#users-table tbody');
    tbody.innerHTML = '';

    usersToShow.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.nombre}</td>
            <td>${user.apellido}</td>
            <td>${user.telefono}</td>
            <td>${user.fechaNacimiento}</td>
        `;
        tr.addEventListener('click', function() {
            alert(`Mostrando detalles de ${user.nombre} ${user.apellido}`);
        });
        tbody.appendChild(tr);
    });
}

// Mostrar usuarios al hacer clic en una categoría
document.getElementById('alumnos-card').addEventListener('click', function() {
    document.getElementById('section-title').textContent = 'Gestión de Alumnos';
    displayUsers(users); // Mostrar todos los alumnos (puedes filtrar por categoría si deseas)
});

// Filtros y búsqueda
document.getElementById('filter-age').addEventListener('click', function() {
    const filteredUsers = users.sort((a, b) => new Date(a.fechaNacimiento) - new Date(b.fechaNacimiento));
    displayUsers(filteredUsers);
});

document.getElementById('sort-alphabet').addEventListener('click', function() {
    const sortedUsers = users.sort((a, b) => a.nombre.localeCompare(b.nombre));
    displayUsers(sortedUsers);
});

document.getElementById('search-input').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    const filteredUsers = users.filter(user => user.nombre.toLowerCase().includes(searchQuery));
    displayUsers(filteredUsers);
});

// Inicializar mostrando todos los usuarios
displayUsers(users);
