// Simulación de ventas
let ventas = [
    { producto: 'Curso de Programación', precio: 100, fecha: '2024-01-01', id: generarCodigoUnico(), usuario: 'Juan Perez' },
    { producto: 'Curso de Diseño Gráfico', precio: 120, fecha: '2024-02-14', id: generarCodigoUnico(), usuario: 'Maria Lopez' },
    { producto: 'Curso de Marketing Digital', precio: 95, fecha: '2024-03-03', id: generarCodigoUnico(), usuario: 'Carlos Diaz' },
    { producto: 'Curso de Inteligencia Artificial', precio: 150, fecha: '2024-04-05', id: generarCodigoUnico(), usuario: 'Ana Gutierrez' },
    { producto: 'Curso de Data Science', precio: 180, fecha: '2024-05-10', id: generarCodigoUnico(), usuario: 'Luis Fernandez' },
    { producto: 'Curso de Desarrollo Web', precio: 110, fecha: '2024-06-20', id: generarCodigoUnico(), usuario: 'Carmen Vega' },
    { producto: 'Curso de Machine Learning', precio: 170, fecha: '2024-07-15', id: generarCodigoUnico(), usuario: 'Jose Morales' },
    { producto: 'Curso de UX/UI Design', precio: 130, fecha: '2024-08-08', id: generarCodigoUnico(), usuario: 'Laura Garcia' },
    { producto: 'Curso de Finanzas para Startups', precio: 90, fecha: '2024-09-18', id: generarCodigoUnico(), usuario: 'Roberto Castillo' },
    { producto: 'Curso de Desarrollo de Videojuegos', precio: 200, fecha: '2024-10-01', id: generarCodigoUnico(), usuario: 'David Suarez' },
    { producto: 'Curso de Redes y Seguridad', precio: 160, fecha: '2024-10-11', id: generarCodigoUnico(), usuario: 'Alberto Peña' },
    { producto: 'Curso de Cloud Computing', precio: 140, fecha: '2024-10-12', id: generarCodigoUnico(), usuario: 'Javier Diaz' },
    { producto: 'Curso de DevOps', precio: 175, fecha: '2024-10-13', id: generarCodigoUnico(), usuario: 'Sofia Mendoza' },
    { producto: 'Curso de Gestión de Proyectos Ágiles', precio: 100, fecha: '2024-10-14', id: generarCodigoUnico(), usuario: 'Nicolas Romero' },
    { producto: 'Curso de SEO Avanzado', precio: 90, fecha: '2024-10-14', id: generarCodigoUnico(), usuario: 'Camila Ortiz' },
    { producto: 'Curso de Front-End con React', precio: 130, fecha: '2024-10-15', id: generarCodigoUnico(), usuario: 'Eduardo Santos' },
    { producto: 'Curso de Back-End con Node.js', precio: 150, fecha: '2024-10-15', id: generarCodigoUnico(), usuario: 'Monica Herrera' },
    { producto: 'Curso de Full-Stack Developer', precio: 250, fecha: '2024-10-16', id: generarCodigoUnico(), usuario: 'Fernando Paredes' },
    { producto: 'Curso de Inteligencia Artificial para Negocios', precio: 180, fecha: '2024-10-16', id: generarCodigoUnico(), usuario: 'Silvia Torres' },
    { producto: 'Curso de Bases de Datos SQL', precio: 100, fecha: '2024-10-17', id: generarCodigoUnico(), usuario: 'Pedro Mendoza' },
    { producto: 'Curso de Python para Ciencia de Datos', precio: 140, fecha: '2024-10-17', id: generarCodigoUnico(), usuario: 'Julia Ramirez' },
    { producto: 'Curso de Ciberseguridad', precio: 175, fecha: '2024-10-18', id: generarCodigoUnico(), usuario: 'Andres Carrasco' },
    { producto: 'Curso de Blockchain y Criptomonedas', precio: 190, fecha: '2024-10-18', id: generarCodigoUnico(), usuario: 'Paula Vargas' },
    { producto: 'Curso de Transformación Digital', precio: 160, fecha: '2024-10-19', id: generarCodigoUnico(), usuario: 'Raul Gonzales' },
    { producto: 'Curso de Estrategia Digital', precio: 130, fecha: '2024-10-20', id: generarCodigoUnico(), usuario: 'Miguel Salazar' },
    { producto: 'Curso de Innovación Empresarial', precio: 180, fecha: '2024-10-20', id: generarCodigoUnico(), usuario: 'Patricia Arce' }
];

// Función para generar código único
function generarCodigoUnico() {
    return 'C-' + Math.floor(Math.random() * 1000000);
}

// Función para mostrar ventas en la tabla
function displaySales(salesToShow) {
    const tbody = document.querySelector('#sales-table tbody');
    tbody.innerHTML = '';

    salesToShow.forEach(sale => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${sale.producto}</td>
            <td>${sale.id}</td>
            <td>S/.${sale.precio.toFixed(2)}</td>
            <td>${sale.fecha}</td>
            <td><button class="details-button" onclick="mostrarRecibo('${sale.producto}', ${sale.precio}, '${sale.fecha}', '${sale.id}', '${sale.usuario}')">Ver detalles</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// Mostrar ventas al cargar la página
displaySales(ventas);

// Filtrar ventas por código de compra
document.getElementById('search-code').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    const filteredSales = ventas.filter(sale => sale.id.toLowerCase().includes(searchQuery));
    displaySales(filteredSales);
});

// Ordenar ventas por fecha
document.getElementById('filter-date').addEventListener('click', function() {
    ventas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    displaySales(ventas);
});

// Ordenar ventas por monto total
document.getElementById('sort-amount').addEventListener('click', function() {
    ventas.sort((a, b) => b.precio - a.precio);
    displaySales(ventas);
});

// Cambiar el orden ascendente/descendente
document.getElementById('sort-toggle').addEventListener('click', function() {
    ventas.reverse();
    displaySales(ventas);
});

// Función para mostrar el recibo en una nueva ventana
function mostrarRecibo(producto, precio, fecha, id, usuario) {
    const reciboHTML = `
        <html>
            <head>
                <title>Recibo de Compra</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .header h1 { font-size: 22px; margin: 0; }
                    .details { margin-top: 20px; }
                    .details p { margin: 5px 0; }
                    .table { width: 100%; margin-top: 20px; border-collapse: collapse; }
                    .table th, .table td { border: 1px solid #ddd; padding: 8px; }
                    .table th { background-color: #f2f2f2; }
                    .totals { margin-top: 20px; text-align: right; }
                    .signature { margin-top: 50px; text-align: right; }
                    .footer { text-align: center; margin-top: 40px; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>RECIBO DE COMPRA</h1>
                    <p>GuimarBot</p>
                    <p>Mz. K 15 Lt. 22, Urb. Mariscal Caceres, S.J.L.</p>
                </div>

                <div class="details">
                    <p><strong>Cliente:</strong> ${usuario}</p>
                    <p><strong>Fecha:</strong> ${fecha}</p>
                    <p><strong>N° Operación:</strong> ${id}</p>
                    <p><strong>Monto:</strong> S/.${precio.toFixed(2)}</p>
                </div>

                <table class="table">
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>Precio Unitario</th>
                            <th>Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${producto}</td>
                            <td>S/.${precio.toFixed(2)}</td>
                            <td>S/.${precio.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="totals">
                    <p><strong>Saldo Contable:</strong> S/.${precio.toFixed(2)}</p>
                    <p><strong>Saldo Disponible:</strong> S/.${precio.toFixed(2)}</p>
                </div>

                <div class="signature">
                    <p><strong>Firma:</strong> ________________________</p>
                </div>

                <div class="footer">
                    <p>GuimarFone: 921 297 778</p>
                    <p>www.guimarbot.com</p>
                </div>

                <script>
                    window.print();
                </script>
            </body>
        </html>
    `;

    const ventana = window.open('', '_blank');
    ventana.document.write(reciboHTML);
    ventana.document.close();
}