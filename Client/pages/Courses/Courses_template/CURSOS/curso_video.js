document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    const showMoreBtn = document.getElementById('showMoreBtn');
    const commentInput = document.getElementById('commentInput');
    const submitComment = document.getElementById('submitComment');
    const commentsList = document.getElementById('commentsList');
    const playlist = document.getElementById('playlist');

    const videos = [
        { id: 1, title: "Lección 1: Introducción a JavaScript", description: "Bienvenidos a nuestra primera lección de JavaScript para niños. Aquí aprenderemos los conceptos básicos de programación de una manera divertida y fácil de entender.", src: "https://example.com/video1.mp4", thumbnail: "/placeholder.svg?height=68&width=120" },
        { id: 2, title: "Lección 2: Variables y Tipos de Datos", description: "En esta lección, exploraremos qué son las variables y los diferentes tipos de datos en JavaScript.", src: "https://example.com/video2.mp4", thumbnail: "/placeholder.svg?height=68&width=120" },
        { id: 3, title: "Lección 3: Funciones", description: "Aprenderemos cómo crear y usar funciones en JavaScript para organizar nuestro código.", src: "https://example.com/video3.mp4", thumbnail: "/placeholder.svg?height=68&width=120" },
        { id: 4, title: "Lección 4: Estructuras de Control", description: "Descubriremos cómo usar if-else y bucles para controlar el flujo de nuestros programas.", src: "https://example.com/video4.mp4", thumbnail: "/placeholder.svg?height=68&width=120" },
        { id: 5, title: "Lección 5: Proyecto Final", description: "¡Vamos a crear un pequeño juego utilizando todo lo que hemos aprendido!", src: "https://example.com/video5.mp4", thumbnail: "/placeholder.svg?height=68&width=120" }
    ];

    let currentVideoIndex = 0;
    let unlockedVideos = 1;

    function renderPlaylist() {
        playlist.innerHTML = '';
        videos.forEach((video, index) => {
            const item = document.createElement('div');
            item.className = `playlist-item ${index === currentVideoIndex ? 'active' : ''} ${index >= unlockedVideos ? 'locked' : ''}`;
            item.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="playlist-item-info">
                    <h3>${video.title}</h3>
                    <p>${index >= unlockedVideos ? 'Bloqueado' : 'Disponible'}</p>
                </div>
            `;
            if (index < unlockedVideos) {
                item.addEventListener('click', () => changeVideo(index));
            }
            playlist.appendChild(item);
        });
    }

    function changeVideo(index) {
        if (index < unlockedVideos) {
            currentVideoIndex = index;
            videoPlayer.src = videos[index].src;
            videoTitle.textContent = videos[index].title;
            videoDescription.textContent = videos[index].description;
            renderPlaylist();
            videoPlayer.play();
        }
    }

    videoPlayer.addEventListener('ended', () => {
        if (currentVideoIndex < videos.length - 1) {
            unlockedVideos = Math.max(unlockedVideos, currentVideoIndex + 2);
            changeVideo(currentVideoIndex + 1);
        }
    });

    let isDescriptionExpanded = false;
    showMoreBtn.addEventListener('click', () => {
        if (isDescriptionExpanded) {
            videoDescription.style.maxHeight = '3em';
            showMoreBtn.textContent = 'Mostrar más';
        } else {
            videoDescription.style.maxHeight = 'none';
            showMoreBtn.textContent = 'Mostrar menos';
        }
        isDescriptionExpanded = !isDescriptionExpanded;
    });

    submitComment.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            addComment(commentText);
            commentInput.value = '';
        }
    });

    function addComment(text) {
        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.innerHTML = `
            <p><span class="comment-author">Usuario</span>: ${text}</p>
            <div class="comment-actions">
                <button class="reply-btn">Responder</button>
                <button class="like-btn">Me gusta</button>
            </div>
        `;
        commentsList.prepend(comment);

        const replyBtn = comment.querySelector('.reply-btn');
        replyBtn.addEventListener('click', () => {
            const replyInput = document.createElement('div');
            replyInput.className = 'comment-input';
            replyInput.innerHTML = `
                <textarea placeholder="Escribe tu respuesta..."></textarea>
                <button>Responder</button>
            `;
            comment.appendChild(replyInput);

            const replyTextarea = replyInput.querySelector('textarea');
            const replySubmitBtn = replyInput.querySelector('button');

            replySubmitBtn.addEventListener('click', () => {
                const replyText = replyTextarea.value.trim();
                if (replyText) {
                    const reply = document.createElement('div');
                    reply.className = 'comment';
                    reply.innerHTML = `
                        <p><span class="comment-author">Usuario</span>: ${replyText}</p>
                    `;
                    comment.insertBefore(reply, replyInput);
                    replyInput.remove();
                }
            });
        });
    }

    renderPlaylist();
});

