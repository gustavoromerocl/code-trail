document.addEventListener('DOMContentLoaded', function() {
    function getLoggedInUser() {
        return JSON.parse(localStorage.getItem('loggedInUser'));
    }

    function loadUserPosts() {
        const user = getLoggedInUser();
        if (!user) {
            alert('Debe iniciar sesión para ver sus publicaciones.');
            window.location.href = 'login.html'; // Redireccionar a la página de inicio de sesión si no hay un usuario logueado
            return;
        }

        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const userPosts = posts.filter(post => post.userId === user.username);

        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = '';

        if (userPosts.length === 0) {
            postsContainer.innerHTML = '<p>No hay publicaciones para mostrar.</p>';
            return;
        }

        userPosts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('col-md-4', 'mb-3');
            postCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body d-flex flex-column">
                        <div>
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.content}</p>
                        </div>
                        <div class="mt-auto">
                            <p class="card-text"><small class="text-muted">Publicado el ${new Date(post.date).toLocaleString()}</small></p>
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-outline-danger btn-sm me-2" onclick="deletePost(${post.id})">
                                    <i class="bi bi-trash"></i> Eliminar
                                </button>
                                <a href="edit-post.html?id=${post.id}&from=my-posts" class="btn btn-outline-primary btn-sm">
                                    <i class="bi bi-pencil"></i> Editar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            postsContainer.appendChild(postCard);
        });
    }

    window.deletePost = function(postId) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedPosts = posts.filter(post => post.id !== postId);

        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        loadUserPosts();
    };

    loadUserPosts();
});
