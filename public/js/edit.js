const editBlogFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    const response = await fetch ('/api/blogs/edit', {
        method: 'PUT',
        body: JSON.stringify({title: title, 
            content: content}),
        headers: { 'Content-Type': 'application/json' },
    }); 
    document.location.replace('/dashboard');
}

const deleteBlogFormHandler = async (event) => {
    event.preventDefault();
    const response = await fetch ('/api/blogs/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }); 
    document.location.replace('/dashboard');
}

document.querySelector(".create-form").addEventListener('submit', editBlogFormHandler)
document.querySelector("#delete").addEventListener('click', deleteBlogFormHandler)