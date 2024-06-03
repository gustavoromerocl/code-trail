document.addEventListener('DOMContentLoaded', function() {
  function getLoggedInUser() {
      return JSON.parse(localStorage.getItem('loggedInUser'));
  }

  function loadNavbar() {
      const navbarLinks = document.getElementById('navbarLinks');
      const loggedInUser = getLoggedInUser();

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

          loadCommentSection(loggedInUser.username);
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

  function getPostById(postId) {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      return posts.find(post => post.id === parseInt(postId));
  }

  function loadPostData(postId) {
      const post = getPostById(postId);
      if (!post) {
          alert('No se encontró la publicación.');
          window.close();
          return;
      }

      const postContent = document.getElementById('postContent');
      postContent.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <p class="text-muted"><small>Publicado el ${new Date(post.date).toLocaleString()}</small></p>
      `;
  }

  function loadComments(postId) {
      const comments = JSON.parse(localStorage.getItem('comments')) || [];
      const postComments = comments.filter(comment => comment.postId === parseInt(postId));

      const commentsList = document.getElementById('commentsList');
      commentsList.innerHTML = postComments.map(comment => `
          <li class="list-group-item">
              <p><strong>${comment.username}</strong>: ${comment.text}</p>
              <p class="text-muted"><small>${new Date(comment.date).toLocaleString()}</small></p>
          </li>
      `).join('');
  }

  function saveComment(event) {
      event.preventDefault();

      const commentText = document.getElementById('commentText').value;
      const postId = new URLSearchParams(window.location.search).get('id');
      const loggedInUser = getLoggedInUser();

      const comments = JSON.parse(localStorage.getItem('comments')) || [];
      comments.push({
          postId: parseInt(postId),
          username: loggedInUser.username,
          text: commentText,
          date: new Date()
      });
      localStorage.setItem('comments', JSON.stringify(comments));

      document.getElementById('commentForm').reset();
      loadComments(postId);
  }

  function loadCommentSection(username) {
      const commentSection = document.getElementById('commentSection');
      commentSection.innerHTML = `
          <h5>Agregar Comentario</h5>
          <form id="commentForm">
              <div class="mb-3">
                  <textarea class="form-control" id="commentText" rows="3" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Comentar</button>
          </form>
      `;
      document.getElementById('commentForm').addEventListener('submit', saveComment);
  }

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (postId) {
      loadNavbar();
      loadPostData(postId);
      loadComments(postId);
  } else {
      alert('No se encontró la publicación.');
      window.close();
  }
});
