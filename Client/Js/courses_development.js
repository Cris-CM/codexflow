document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('courseModal');
    const openBtn = document.getElementById('openModal');
    const closeBtn = document.getElementsByClassName('close')[0];

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
});

// Add a comment functionality
document.getElementById("post-comment").addEventListener("click", function () {
  const commentInput = document.getElementById("comment-input");
  const commentsContainer = document.getElementById("comments-container");

  if (commentInput.value.trim() !== "") {
    const comment = createCommentElement(commentInput.value);
    commentsContainer.appendChild(comment);
    commentInput.value = "";

    // Add event listeners to the new buttons
    addCommentEventListeners(comment);
  }
});

// Function to create a comment element
function createCommentElement(text) {
  const comment = document.createElement("div");
  comment.classList.add("comment");

  comment.innerHTML = `
    <p><strong>Usuario:</strong> ${text}</p>
    <div class="comment-actions">
      <span class="like-btn">👍 Like <span class="like-count">0</span></span>
      <span class="dislike-btn">👎 Dislike <span class="dislike-count">0</span></span>
      <span class="reply-btn">Responder</span>
    </div>
    <div class="reply-section"></div>
  `;

  return comment;
}

// Function to add event listeners to comment actions
function addCommentEventListeners(comment) {
  const likeBtn = comment.querySelector('.like-btn');
  const dislikeBtn = comment.querySelector('.dislike-btn');
  const replyBtn = comment.querySelector('.reply-btn');

  likeBtn.addEventListener('click', function() {
    const likeCount = likeBtn.querySelector('.like-count');
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
    console.log('Liked comment:', comment);
  });

  dislikeBtn.addEventListener('click', function() {
    const dislikeCount = dislikeBtn.querySelector('.dislike-count');
    dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
    console.log('Disliked comment:', comment);
  });

  replyBtn.addEventListener('click', function() {
    const replySection = comment.querySelector('.reply-section');
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
      if (replyInput.value.trim() !== "") {
        const reply = createCommentElement(replyInput.value);
        replySection.appendChild(reply);

        // Add event listeners to the new reply buttons
        addCommentEventListeners(reply);

        replyInput.value = '';
      }
    });
  });
}

// Add initial event listeners to existing comments
const existingComments = document.querySelectorAll('.comment');
existingComments.forEach(addCommentEventListeners);

// Function to change video
function changeVideo(url) {
  const videoPlayer = document.getElementById('videoPlayer');
  videoPlayer.src = url;
}
