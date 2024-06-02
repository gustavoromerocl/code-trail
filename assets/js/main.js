document.addEventListener('DOMContentLoaded', function () {
  var navbarLinks = document.getElementById('navbarLinks');
  var postsContainer = document.getElementById('postsContainer');

  function checkLoggedInUser() {
      var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (loggedInUser) {
          navbarLinks.innerHTML = `
              <li class="nav-item">
                  <a class="nav-link" href="#">${loggedInUser.username}</a>
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
              window.location.reload();
          });
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
