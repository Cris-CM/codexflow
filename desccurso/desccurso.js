document.addEventListener('DOMContentLoaded', function() {
    // Ocultar todas las secciones inicialmente
    document.querySelectorAll('.curso-reseñas, .curso-instructores').forEach(section => {
        section.style.display = 'none'; // Ocultar secciones
    });

    // Mostrar la sección de "Reseñas" por defecto
    document.querySelector('.curso-reseñas').style.display = 'block';
    // Establecer la pestaña activa
    document.querySelector('.curso-nav a[href="#reseñas"]').classList.add('active');

    // Agregar evento a los enlaces de navegación
    document.querySelectorAll('.curso-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir el comportamiento por defecto

            // Quitar la clase activa de todos los enlaces
            document.querySelectorAll('.curso-nav a').forEach(link => {
                link.classList.remove('active');
            });

            // Agregar la clase activa al enlace clicado
            this.classList.add('active');

            const targetId = this.getAttribute('href'); // Obtener el ID del destino
            const targetElement = document.querySelector(targetId); // Seleccionar el elemento destino

            if (targetElement) {
                // Ocultar todas las secciones
                document.querySelectorAll('.curso-reseñas, .curso-instructores').forEach(section => {
                    section.style.display = 'none'; // Ocultar secciones
                });
                targetElement.style.display = 'block'; // Mostrar la sección seleccionada

                // Desplazamiento suave
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Desplazamiento suave
                });
            }
        });
    });

    
    // Function to add event listeners to comment actions
    function addCommentEventListeners(comment) {
        const likeBtn = comment.querySelector('.like-btn');
        const dislikeBtn = comment.querySelector('.dislike-btn');
        const replyBtn = comment.querySelector('.reply-btn');
        const toggleReplies = comment.querySelector('.toggle-replies');
        const replySection = comment.querySelector('.reply-section');

        likeBtn.addEventListener('click', function() {
            const likeCount = likeBtn.querySelector('.like-count');
            const dislikeCount = dislikeBtn.querySelector('.dislike-count');

            // Asegurarse de que solo se pueda dar "me gusta" o "no me gusta"
            if (dislikeCount.textContent > 0) {
                dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1; // Restar un "no me gusta"
            }
            likeCount.textContent = parseInt(likeCount.textContent) + 1; // Sumar un "me gusta"
        });

        dislikeBtn.addEventListener('click', function() {
            const dislikeCount = dislikeBtn.querySelector('.dislike-count');
            const likeCount = likeBtn.querySelector('.like-count');

            // Asegurarse de que solo se pueda dar "me gusta" o "no me gusta"
            if (likeCount.textContent > 0) {
                likeCount.textContent = parseInt(likeCount.textContent) - 1; // Restar un "me gusta"
            }
            dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1; // Sumar un "no me gusta"
        });

        replyBtn.addEventListener('click', function() {
            const replyInput = document.createElement('textarea');
            replyInput.classList.add('reply-input');
            replyInput.placeholder = 'Escribe tu respuesta...';

            const replyButton = document.createElement('button');
            replyButton.classList.add('reply-button');
            replyButton.textContent = 'Responder';

            replySection.innerHTML = '';
            replySection.appendChild(replyInput);
            replySection.appendChild(replyButton);

            replyButton.addEventListener('click', function() {
                const replyText = replyInput.value.trim();
                if (replyText) {
                    const reply = createCommentElement(replyText);
                    replySection.appendChild(reply);

                    // Agregar event listeners a los nuevos botones de respuesta
                    addCommentEventListeners(reply);

                    replyInput.value = '';
                }
            });
        });

        toggleReplies.addEventListener('click', function() {
            if (replySection.style.display === 'none') {
                replySection.style.display = 'block';
                toggleReplies.textContent = 'Ocultar respuestas';
            } else {
                replySection.style.display = 'none';
                toggleReplies.textContent = 'Ver respuestas';
            }
        });
    }



    // Inicializa el carrusel mostrando solo el primer curso
    moveSlide(0);
});

// Function to change video
function changeVideo(url) {
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = url;
}

// Evitar el desplazamiento al hacer clic en los enlaces de navegación
document.querySelectorAll('.no-scroll').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const userToggle = document.querySelector('.user-toggle');
    const subMenu = document.querySelector('.sub-menu');
    const arrow = document.querySelector('.arrow');

    userToggle.addEventListener('click', (e) => {
        e.preventDefault();
        subMenu.classList.toggle('active');
        arrow.classList.toggle('active');
    });
});




/*let currentIndex = 0;

function moveSlide(direction) {
    const track = document.querySelector('.carousel-track');
    const totalSlides = document.querySelectorAll('.curso').length;
    
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1; // Regresar al último
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0; // Regresar al primero
    }

    const slideWidth = document.querySelector('.curso').clientWidth;
    track.style.transform = 'translateX(' + (-slideWidth * currentIndex) + 'px)';
}


document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -300, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 300, behavior: 'smooth' });
    });
});*/

// Nuevo código para el carrusel (reemplazar solo la parte después de los comentarios)
document.addEventListener('DOMContentLoaded', function() {
    const courseGrid = document.querySelector('.learning-path .course-grid');
    const prevBtn = document.querySelector('.carousel .prev-btn');
    const nextBtn = document.querySelector('.carousel .next-btn');
    
    if (!courseGrid || !prevBtn || !nextBtn) {
        console.error('No se encontraron elementos del carrusel');
        return;
    }

    const cards = courseGrid.children;
    const cardWidth = 320; // Ancho de la tarjeta + gap
    let currentIndex = 0;
    const visibleCards = Math.floor(courseGrid.parentElement.offsetWidth / cardWidth);
    const maxIndex = Math.max(0, cards.length - visibleCards);

    function updateCarousel() {
        const offset = -currentIndex * cardWidth;
        courseGrid.style.transform = `translateX(${offset}px)`;
        
        // Actualizar estado de los botones
        prevBtn.disabled = currentIndex <= 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Inicializar carrusel
    updateCarousel();

    // Actualizar en cambio de tamaño de ventana
    window.addEventListener('resize', () => {
        const newVisibleCards = Math.floor(courseGrid.parentElement.offsetWidth / cardWidth);
        const newMaxIndex = Math.max(0, cards.length - newVisibleCards);
        currentIndex = Math.min(currentIndex, newMaxIndex);
        updateCarousel();
    });
});


