let certificados = [
    { id: 'CERT-001', nombre: 'Juan Perez', curso: 'Curso de Programación', fechaEmision: '2024-01-01', estado: 'Válido', url: '/certificados/CERT-001.pdf' },
    { id: 'CERT-002', nombre: 'Maria Lopez', curso: 'Curso de Diseño Gráfico', fechaEmision: '2024-02-14', estado: 'Válido', url: '/certificados/CERT-002.pdf' },
    { id: 'CERT-003', nombre: 'Carlos Diaz', curso: 'Curso de Marketing Digital', fechaEmision: '2024-03-03', estado: 'Válido', url: '/certificados/CERT-003.pdf' },
    { id: 'CERT-004', nombre: 'Ana Gutierrez', curso: 'Curso de Inteligencia Artificial', fechaEmision: '2024-04-05', estado: 'Revocado', url: '/certificados/CERT-004.pdf' },
    { id: 'CERT-005', nombre: 'Luis Ramírez', curso: 'Curso de Seguridad Informática', fechaEmision: '2024-05-10', estado: 'Válido', url: '/certificados/CERT-005.pdf' },
    { id: 'CERT-006', nombre: 'Elena Torres', curso: 'Curso de Análisis de Datos', fechaEmision: '2024-06-15', estado: 'Válido', url: '/certificados/CERT-006.pdf' },
    { id: 'CERT-007', nombre: 'Diego Fuentes', curso: 'Curso de Desarrollo Web', fechaEmision: '2024-07-01', estado: 'Válido', url: '/certificados/CERT-007.pdf' },
    { id: 'CERT-008', nombre: 'Sofia Calderón', curso: 'Curso de Machine Learning', fechaEmision: '2024-08-20', estado: 'Revocado', url: '/certificados/CERT-008.pdf' },
    { id: 'CERT-009', nombre: 'Manuel Vargas', curso: 'Curso de Arquitectura de Software', fechaEmision: '2024-09-30', estado: 'Válido', url: '/certificados/CERT-009.pdf' },
    { id: 'CERT-010', nombre: 'Lucía Méndez', curso: 'Curso de Big Data', fechaEmision: '2024-10-05', estado: 'Válido', url: '/certificados/CERT-010.pdf' },
    { id: 'CERT-011', nombre: 'Fernando Reyes', curso: 'Curso de Marketing Avanzado', fechaEmision: '2024-10-18', estado: 'Válido', url: '/certificados/CERT-011.pdf' },
    { id: 'CERT-012', nombre: 'Andrea Paredes', curso: 'Curso de Inteligencia de Negocios', fechaEmision: '2024-11-03', estado: 'Válido', url: '/certificados/CERT-012.pdf' },
    { id: 'CERT-013', nombre: 'Mario Navarro', curso: 'Curso de Cloud Computing', fechaEmision: '2024-11-20', estado: 'Revocado', url: '/certificados/CERT-013.pdf' },
    { id: 'CERT-014', nombre: 'Patricia Rojas', curso: 'Curso de Python', fechaEmision: '2024-12-01', estado: 'Válido', url: '/certificados/CERT-014.pdf' },
    { id: 'CERT-015', nombre: 'Sebastián Cáceres', curso: 'Curso de Data Science', fechaEmision: '2024-12-20', estado: 'Válido', url: '/certificados/CERT-015.pdf' }
];


// Mostrar los certificados en la tabla
function mostrarCertificados(certificadosFiltrados = certificados) {
    const tableBody = document.getElementById('certificadosTable');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla

    certificadosFiltrados.forEach(certificado => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${certificado.id}</td>
            <td>${certificado.nombre}</td>
            <td>${certificado.curso}</td>
            <td>${certificado.fechaEmision}</td>
            <td>${certificado.estado}</td>
            <td><button onclick="validarCertificado('${certificado.id}')">Validar</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para buscar un certificado por su código de certificado
function buscarCertificado() {
    const searchCode = document.getElementById('search-code').value.toLowerCase();
    const certificadosFiltrados = certificados.filter(c => 
        c.id.toLowerCase().includes(searchCode)
    );
    mostrarCertificados(certificadosFiltrados);
}

// Función para filtrar certificados por la fecha seleccionada
function filtrarPorFecha() {
    const fechaSeleccionada = document.getElementById('filter-date').value;
    if (fechaSeleccionada) {
        const certificadosFiltrados = certificados.filter(certificado => 
            certificado.fechaEmision === fechaSeleccionada
        );
        mostrarCertificados(certificadosFiltrados);
    } else {
        mostrarCertificados(); // Si no hay fecha seleccionada, mostrar todos los certificados
    }
}

// Función para validar un certificado
function validarCertificado(certificadoId) {
    const resultadoDiv = document.getElementById('resultadoValidacion');
    const certificado = certificados.find(c => c.id === certificadoId);

    if (certificado) {
        resultadoDiv.innerHTML = `
            <p><strong>Certificado encontrado:</strong></p>
            <p><strong>Nombre:</strong> ${certificado.nombre}</p>
            <p><strong>Curso:</strong> ${certificado.curso}</p>
            <p><strong>Fecha de Emisión:</strong> ${certificado.fechaEmision}</p>
            <p><strong>Estado:</strong> ${certificado.estado}</p>
            ${certificado.estado === 'Válido' ? `<div class="visualizar-certificado"><a href="${certificado.url}" target="_blank">Visualizar Certificado</a></div>` : ''}
        `;
        resultadoDiv.style.display = 'block'; // Mostrar el resultado de la validación
    } else {
        resultadoDiv.innerHTML = `<p>Certificado no encontrado.</p>`;
    }
}

// Inicializar mostrando todos los certificados
mostrarCertificados();

// Asignar eventos a los botones de búsqueda y filtro por fecha
document.getElementById('search-code').addEventListener('input', buscarCertificado);
document.getElementById('filter-date-btn').addEventListener('click', filtrarPorFecha);