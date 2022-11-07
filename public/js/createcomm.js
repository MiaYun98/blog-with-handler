const createBlogFormHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment').value.trim();

    if (comment) {
        const response = await fetch ('/api/comments/create', {
            method: 'POST',
            body: JSON.stringify({comment: comment}),
            headers: { 'Content-Type': 'application/json' },
        }); 

        if (response.ok) {
        document.location.replace('/');
        } else {
            alert('You can not submit empty comment')
        }
    }
}

document.querySelector(".create-form").addEventListener('submit', createBlogFormHandler)