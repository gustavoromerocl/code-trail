document.addEventListener('DOMContentLoaded', function() {
  function getLoggedInUser() {
      return JSON.parse(localStorage.getItem('loggedInUser'));
  }

  function savePost(event) {
      event.preventDefault();

      const user = getLoggedInUser();
      if (!user) {
          alert('Debe iniciar sesión para crear una publicación.');
          return;
      }

      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      const post = {
          id: Date.now(), // ID único para la publicación
          userId: user.username,
          title,
          content,
          date: new Date().toISOString()
      };

      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.push(post);
      localStorage.setItem('posts', JSON.stringify(posts));

      alert('Publicación creada exitosamente');
      window.location.href = 'index.html'; // Redireccionar a la página principal después de crear la publicación
  }

  document.getElementById('postForm').addEventListener('submit', savePost);
});
