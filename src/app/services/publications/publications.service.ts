import { Injectable } from '@angular/core';
import { Comment, Publication } from '../../models/publication.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private publications: Publication[] = [];

  constructor() {
    this.loadPublications();
  }

  /**
   * Carga las publicaciones desde el localStorage.
   * Si no hay publicaciones, inicializa con algunas publicaciones de prueba.
   */
  private loadPublications(): void {
    const publications = localStorage.getItem('publications');
    if (publications) {
      this.publications = JSON.parse(publications);
    } else {
      // Si no hay publicaciones en localStorage, inicializar con algunas publicaciones de prueba
      this.publications = [
        { id: 1, username: 'admin', title: 'First Post', content: 'This is the content of the first post. It is quite long and should be truncated in the card view.', image: 'https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg', comments: [{ username: 'user2', content: 'Nice post!', date: new Date().toLocaleString() }, { username: 'user3', content: 'Thanks for sharing!', date: new Date().toLocaleString() }] },
        { id: 2, username: 'admin', title: 'Second Post', content: 'Content of the second post.', image: 'https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg', comments: [] },
      ];
      this.savePublications();
    }
  }

  /**
   * Guarda las publicaciones en el localStorage.
   */
  private savePublications(): void {
    localStorage.setItem('publications', JSON.stringify(this.publications));
  }

  /**
   * Obtiene todas las publicaciones.
   * @returns {Publication[]} Un arreglo con todas las publicaciones.
   */
  getPublications(): Publication[] {
    return this.publications;
  }

  /**
   * Obtiene las publicaciones de un usuario específico.
   * @param {string} username - El nombre de usuario del autor de las publicaciones.
   * @returns {Publication[]} Un arreglo con las publicaciones del usuario especificado.
   */
  getPublicationsByUsername(username: string): Publication[] {
    return this.publications.filter(pub => pub.username === username);
  }

  /**
   * Obtiene una publicación por su ID.
   * @param {number} id - El ID de la publicación.
   * @returns {Publication | undefined} La publicación con el ID especificado, o `undefined` si no se encuentra.
   */
  getPublicationById(id: number): Publication | undefined {
    return this.publications.find(pub => pub.id === id);
  }

  /**
   * Agrega una nueva publicación.
   * @param {Publication} publication - La publicación a agregar.
   */
  addPublication(publication: Publication): void {
    this.publications.push(publication);
    this.savePublications();
  }

  /**
   * Agrega un comentario a una publicación específica.
   * @param {number} publicationId - El ID de la publicación a la que se agregará el comentario.
   * @param {Comment} comment - El comentario a agregar.
   */
  addComment(publicationId: number, comment: Comment): void {
    const publication = this.getPublicationById(publicationId);
    if (publication) {
      publication.comments.push(comment);
      this.savePublications();
    }
  }

  /**
   * Actualiza la calificación de una publicación específica.
   * @param {number} publicationId - El ID de la publicación cuya calificación se actualizará.
   * @param {number} rating - La nueva calificación.
   */
  updateRating(publicationId: number, rating: number): void {
    const publication = this.getPublicationById(publicationId);
    if (publication) {
      publication.rating = rating;
      this.savePublications();
    }
  }
}
