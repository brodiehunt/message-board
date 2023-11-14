// Add event listeners to all of svgs to like user posts
document.addEventListener('DOMContentLoaded', function() {
    const likeButtons = document.querySelectorAll('.like-post');

    likeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const messageId = event.target.getAttribute('data-id');
            fetch('/messages/likeMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({messageId: messageId})
            })
            .then((response) => response.json())
            .then((data) => {
                button.parentNode.children[0].childNodes[0].innerText = data.messageLikes
                console.log(data);
            })
            .catch((err) => {
                console.log(err)
            })
        })
        
    })
})