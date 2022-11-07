const createBlogFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title && content) {
        const response = await fetch ('/api/blogs/create', {
            method: 'POST',
            body: JSON.stringify({title: title, 
                content: content}),
            headers: { 'Content-Type': 'application/json' },
        }); 

        if (response.ok) {
        document.location.replace('/dashboard');
        } else {
            alert('should write both title and content')
        }
    }
}

document.querySelector(".create-form").addEventListener('submit', createBlogFormHandler)