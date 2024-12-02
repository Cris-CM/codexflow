document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.querySelector('.play-button');
    const videoThumbnail = document.querySelector('.video-thumbnail');
    const commentBox = document.querySelector('.comment-box textarea');
    const postButton = document.querySelector('.comment-box button');
    const commentList = document.querySelector('.comment-list');

    playButton.addEventListener('click', () => {
        // In a real application, this would start the video
        alert('Video playback started');
    });

    postButton.addEventListener('click', () => {
        const commentText = commentBox.value.trim();
        if (commentText) {
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `
                <img src="/placeholder.svg?height=50&width=50" alt="User avatar" class="avatar">
                <div class="comment-content">
                    <h4>You</h4>
                    <p>${commentText}</p>
                </div>
            `;
            commentList.prepend(newComment);
            commentBox.value = '';
        }
    });
});