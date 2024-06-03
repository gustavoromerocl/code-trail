document.addEventListener('DOMContentLoaded', function () {
  var navbarLinks = document.getElementById('navbarLinks');
  var postsContainer = document.getElementById('postsContainer');

  // Crear el usuario administrador si no existe
  function createAdminUser() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const adminExists = users.some(user => user.email === 'admin@admin.com');

    if (!adminExists) {
      const adminUser = {
        fullName: 'Admin User',
        username: 'admin',
        email: 'admin@admin.com',
        password: 'Admin2024',
        birthdate: '1970-01-01',
        address: 'Admin Address',
        role: 'admin'
      };
      users.push(adminUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  createAdminUser();

  function getLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedInUser'));
  }

  function checkLoggedInUser() {
    var loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      navbarLinks.innerHTML = `
              <li class="nav-item">
                  <a class="nav-link" href="#">${loggedInUser.username}</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="create-post.html">Crear Publicación</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="my-posts.html">Mis Publicaciones</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="profile.html">Perfil</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#" id="logoutButton">Cerrar Sesión</a>
              </li>
          `;
      document.getElementById('logoutButton').addEventListener('click', function () {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
      });
    } else {
      navbarLinks.innerHTML = `
              <li class="nav-item">
                  <a class="nav-link" href="login.html">Iniciar Sesión</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="registration.html">Registrarse</a>
              </li>
          `;
    }
  }

  function loadPosts() {
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    var loggedInUser = getLoggedInUser();

    postsContainer.innerHTML = posts.map(function (post) {
      return `
              <div class="col-md-4">
                  <div class="card h-100">
                      <div class="card-body d-flex flex-column">
                          <div>
                              <h5 class="card-title">${post.title}</h5>
                              <p class="card-text">${post.content}</p>
                          </div>
                          <div class="mt-auto">
                              <p class="card-text"><small class="text-muted">Publicado el ${new Date(post.date).toLocaleString()}</small></p>
                              ${loggedInUser && loggedInUser.role === 'admin' ? `
                                  <div class="d-flex justify-content-end">
                                      <button class="btn btn-outline-danger btn-sm me-2" onclick="deletePost(${post.id})">
                                          <i class="bi bi-trash"></i> Eliminar
                                      </button>
                                      <a href="edit-post.html?id=${post.id}&from=index" class="btn btn-outline-primary btn-sm">
                                          <i class="bi bi-pencil"></i> Editar
                                      </a>
                                  </div>
                              ` : ''}
                          </div>
                      </div>
                  </div>
              </div>
          `;
    }).join('');
  }

  window.deletePost = function (postId) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = posts.filter(post => post.id !== postId);

    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    loadPosts();
  };

  checkLoggedInUser();
  loadPosts();
});
