//Seccion de
const menu= document.getElementById('menu');
const sidebar= document.getElementById('sidebar');

menu.addEventListener('click',()=> {
    sidebar.classList.toggle('menu-toggle');
    menu.classList.toggle('menu-toggle');
});

// Selección de elementos
const perfil = document.getElementById('perfile');
const profileMenu = document.getElementById('profile-menu');
const notificaciones = document.getElementById('notification-link');
const box = document.getElementById('box'); // Asegúrate de que este elemento exista en tu HTML

// Función para alternar la visibilidad del menú
function toggleMenu(menu) {
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

// Evento para abrir/cerrar el menú de perfil
perfil.addEventListener('click', (event) => {
    event.stopPropagation(); // Evita cerrar el menú al hacer clic dentro de él
    toggleMenu(profileMenu);
    if (box) {
        box.style.display = 'none'; // Oculta las notificaciones al abrir el menú de perfil
    }
});



// Evento global para cerrar menús al hacer clic fuera de ellos
document.addEventListener('click', (e) => {
    if (profileMenu && !profileMenu.contains(e.target) && !perfil.contains(e.target)) {
        profileMenu.style.display = 'none';
    }
    if (box && !box.contains(e.target) && !notificaciones.contains(e.target)) {
        box.style.opacity = '0';
        setTimeout(() => {
            box.style.display = 'none';
        }, 300); // Tiempo para transición suave
    }
});






// Cerrar el popup cuando se hace clic fuera de él
document.addEventListener('click', function(event) {
    var notificationPopup = document.getElementById('notification-popup');
    var notificationLink = document.getElementById('notification-link');

    // Verifica si el clic fue fuera del popup y del enlace de notificaciones
    if (!notificationPopup.contains(event.target) && !notificationLink.contains(event.target)) {
        notificationPopup.style.display = 'none';
        notificationLink.classList.remove('active');
    }
});













document.addEventListener('DOMContentLoaded', () => {
    // Obtén los contenedores de los carruseles
    const carruseles = document.querySelectorAll('.carrusel-list');
    
    carruseles.forEach((carrusel, index) => {
        // Asignar IDs únicos a cada track
        const track = carrusel.querySelector('.carrusel-track');
        track.id = `track-${index}`;
        
        // Configurar botones para cada carrusel
        const prevBtn = carrusel.querySelector('.carrusel-prev');
        const nextBtn = carrusel.querySelector('.carrusel-next');
        
        if (prevBtn && nextBtn) {
            prevBtn.onclick = (event) => moveCarrusel(event, track, 'prev');
            nextBtn.onclick = (event) => moveCarrusel(event, track, 'next');
        }
    });

    function moveCarrusel(event, track, direction) {
        event.preventDefault();
        const cards = track.querySelectorAll('.course-card');
        const cardWidth = cards[0].offsetWidth + 30; // Ancho + gap
        const trackWidth = track.scrollWidth;
        const listWidth = track.parentElement.offsetWidth;

        let position = track.style.transform ? 
            parseInt(track.style.transform.match(/-?\d+/)[0]) : 0;

        if (direction === 'prev' && position < 0) {
            position = Math.min(position + cardWidth, 0);
        } else if (direction === 'next' && Math.abs(position) < (trackWidth - listWidth)) {
            position = Math.max(position - cardWidth, -(trackWidth - listWidth));
        }

        track.style.transform = `translateX(${position}px)`;
    }

    // Funcionalidad de búsqueda
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.buscar-bar button');

    function searchCourses() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const sections = document.querySelectorAll('.categorias');

        sections.forEach(section => {
            const cards = section.querySelectorAll('.course-card');
            const carouselTrack = section.querySelector('.carrusel-track');
            const carouselButtons = section.querySelectorAll('.carrusel-arrow');
            let hasVisibleCards = false;

            // Si hay término de búsqueda, ajustar el estilo
            if (searchTerm !== '') {
                // Ocultar botones de navegación
                carouselButtons.forEach(button => button.style.display = 'none');
                
                // Ajustar el contenedor de tarjetas
                if (carouselTrack) {
                    carouselTrack.style.transform = 'translateX(0)';
                    carouselTrack.style.display = 'flex';
                    carouselTrack.style.flexWrap = 'wrap';
                    carouselTrack.style.gap = '20px';
                    carouselTrack.style.justifyContent = 'center';
                }
            } else {
                // Restaurar estilos originales
                carouselButtons.forEach(button => button.style.display = 'block');
                if (carouselTrack) {
                    carouselTrack.style.display = 'flex';
                    carouselTrack.style.flexWrap = 'nowrap';
                    carouselTrack.style.justifyContent = 'flex-start';
                }
            }

            cards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const author = card.querySelector('#autor').textContent.toLowerCase();

                const isMatch = title.includes(searchTerm) || 
                              description.includes(searchTerm) || 
                              author.includes(searchTerm);

                card.style.display = isMatch ? 'block' : 'none';
                if (isMatch) hasVisibleCards = true;
            });

            // Mostrar/ocultar sección completa
            section.style.display = hasVisibleCards || searchTerm === '' ? 'block' : 'none';
        });
    }

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchCourses();
        }
    });

    searchButton.addEventListener('click', searchCourses);
});







