document.addEventListener('DOMContentLoaded', function () {
  var navbarLinks = document.getElementById('navbarLinks');
  var postsContainer = document.getElementById('postsContainer');

  // Para fines de prueba, descomentar las siguientes líneas para añadir publicaciones iniciales
  /*
  localStorage.setItem('posts', JSON.stringify([
    { title: 'Primera Publicación', content: 'Este es el contenido de la primera publicación.' },
    { title: 'Segunda Publicación', content: 'Este es el contenido de la segunda publicación.' }
  ]));
  */

  function checkLoggedInUser() {
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
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
      `;
    }
  }

  function loadPosts() {
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    postsContainer.innerHTML = posts.map(function (post) {
      return `
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.content}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  checkLoggedInUser();
  loadPosts();
});
