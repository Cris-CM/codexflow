document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('courseModal');
    const openBtn = document.getElementById('openModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const sessionBtns = document.getElementsByClassName('session-btn');
    const videoPlayer = document.getElementById('videoPlayer');
    const commentInput = document.getElementById('commentInput');
    const submitComment = document.getElementById('submitComment');

    const videoUrls = {
        1: 'https://www.youtube.com/embed/example1',
        2: 'https://www.youtube.com/embed/example2',
        3: 'https://www.youtube.com/embed/example3',
        4: 'https://www.youtube.com/embed/example4'
    };

    openBtn.onclick = function() {
        modal.style.display = 'block';
    }

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    for (let btn of sessionBtns) {
        btn.addEventListener('click', function() {
            const sessionId = this.getAttribute('data-session');
            videoPlayer.src = videoUrls[sessionId];
            
            // Remove active class from all buttons
            for (let b of sessionBtns) {
                b.classList.remove('active');
            }
            // Add active class to clicked button
            this.classList.add('active');
        });
    }

    submitComment.onclick = function() {
        const comment = commentInput.value;
        if (comment) {
            console.log('Comment submitted:', comment);
            // Here you would typically send the comment to a server
            commentInput.value = ''; // Clear the input after submitting
        }
    }
});