// Add event listeners to all of svgs to like user posts
document.addEventListener('DOMContentLoaded', function() {
    // Like button event listeners
    const likeButtons = document.querySelectorAll('.like-post');
    likeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const messageId = event.target.getAttribute('data-id');
            button.classList.toggle('animated');
            setTimeout(() => {
                button.classList.toggle('animated');
            }, 1000);
            fetch('/messages/likeMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({messageId: messageId})
            })
            .then((response) => response.json())
            .then((data) => {
                button.parentNode.children[1].childNodes[0].innerText = data.messageLikes;
                console.log(data);
            })
            .catch((err) => {
                console.log(err)
            });
        });
        
    });

    // view comments button onclick 
    const viewCommentsButtons = document.querySelectorAll('.view-comments');

    viewCommentsButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const commentsSection = event.target.parentNode.parentElement.parentElement.children[4];
            commentsSection.classList.toggle('hidden');
        })
    })

    // Comment form advent listeners
    const commentForms = document.querySelectorAll('.comment-form');

    commentForms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            const messageId = event.target.getAttribute('data-id');
            event.preventDefault();
            fetch('/messages/addComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messageId: messageId,
                    comment: event.target.children[0].value
                })
            })
            .then((response) => response.json())
            .then((data) => {
                const commentsContainer = document.querySelector('.old-comments');
                const newComment = document.createElement('div');
                newComment.classList.add('comment')
                const commentUser = document.createElement('p');
                commentUser.classList.add('user');
                commentUser.innerText = data.user;

                const commentContent = document.createElement('p');
                commentContent.classList.add('comment-content');
                commentContent.innerText = data.comment;

                newComment.appendChild(commentUser);
                newComment.appendChild(commentContent);

                commentsContainer.appendChild(newComment);
                
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
            form.reset();
        })
    })
})

