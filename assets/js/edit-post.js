document.addEventListener('DOMContentLoaded', function () {
  function getLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedInUser'));
  }

  function getPostById(postId) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    return posts.find(post => post.id === parseInt(postId));
  }

  function loadPostData(postId) {
    const post = getPostById(postId);
    if (!post) {
      alert('No se encontró la publicación.');
      window.location.href = 'my-posts.html';
      return;
    }

    const user = getLoggedInUser();
    if (user.username !== post.userId) {
      alert('No tienes permiso para editar esta publicación.');
      window.location.href = 'my-posts.html';
      return;
    }

    document.getElementById('postId').value = post.id;
    document.getElementById('title').value = post.title;
    document.getElementById('content').value = post.content;
  }

  function savePost(event) {
    event.preventDefault();

    const postId = document.getElementById('postId').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postIndex = posts.findIndex(post => post.id === parseInt(postId));

    if (postIndex !== -1) {
      posts[postIndex].title = title;
      posts[postIndex].content = content;
      localStorage.setItem('posts', JSON.stringify(posts));
      alert('Publicación actualizada exitosamente.');
      window.location.href = 'my-posts.html';
    } else {
      alert('Error al actualizar la publicación.');
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (postId) {
    loadPostData(postId);
  }

  document.getElementById('editPostForm').addEventListener('submit', savePost);
});
