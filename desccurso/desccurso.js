document.addEventListener('DOMContentLoaded', function() {
    // Ocultar todas las secciones inicialmente
    document.querySelectorAll('.curso-contenido, .curso-reseñas, .curso-instructores').forEach(section => {
        section.style.display = 'none'; // Ocultar secciones
    });

    // Mostrar la sección de "Lo que aprenderás" por defecto
    document.querySelector('.curso-aprendizaje').style.display = 'block';
    // Establecer la pestaña activa
    document.querySelector('.curso-nav a[href="#lo-que-aprenderas"]').classList.add('active');

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
                document.querySelectorAll('.curso-aprendizaje, .curso-contenido, .curso-reseñas, .curso-instructores').forEach(section => {
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

    // Funcionalidad para agregar comentarios
    const commentBox = document.querySelector('.comment-box textarea');
    const commentList = document.querySelector('.comment-list');
    const postButton = document.querySelector('.comment-box button');

    postButton.addEventListener('click', function() {
        const commentText = commentBox.value.trim();
        if (commentText) {
            const comment = createCommentElement(commentText);
            commentList.appendChild(comment);
            commentBox.value = ''; // Limpiar el textarea

            // Agregar event listeners a los nuevos botones
            addCommentEventListeners(comment);
        }
    });

    // Function to create a comment element
    function createCommentElement(text) {
        const comment = document.createElement("div");
        comment.classList.add("comment");

        comment.innerHTML = `
            <img src="./img/perfil.png" alt="Avatar de usuario" class="avatar">
            <div class="comment-content">
                <p><strong>Usuario:</strong> ${text}</p>
                <div class="comment-actions">
                    <span class="like-btn">👍 Like <span class="like-count">0</span></span>
                    <span class="dislike-btn">👎 Dislike <span class="dislike-count">0</span></span>
                    <span class="reply-btn">Responder</span>
                </div>
                <div class="reply-section" style="display: none;"></div>
                <span class="toggle-replies" style="color: blue; cursor: pointer;">Ver respuestas</span>
            </div>
        `;

        return comment;
    }

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

    // Agregar event listeners a los comentarios existentes
    const existingComments = document.querySelectorAll('.comment');
    existingComments.forEach(addCommentEventListeners);

    let currentIndex = 0;

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
});