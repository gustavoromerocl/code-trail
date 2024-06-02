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
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.content}</p>
                        <p class="card-text"><small class="text-muted">Publicado el ${new Date(post.date).toLocaleString()}</small></p>
                        <a href="edit-post.html?id=${post.id}" class="btn btn-outline-primary btn-sm float-start">
                            <i class="bi bi-pencil"></i> Editar
                        </a>
                    </div>
                </div>
            `;
            postsContainer.appendChild(postCard);
        });
    }

    loadUserPosts();
});
