import { Injectable } from '@angular/core';
import { Comment, Publication } from '../../models/publication.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private publications: Publication[] = [
    { id: 1, username: 'admin', title: 'First Post', content: 'This is the content of the first post. It is quite long and should be truncated in the card view.', image: 'https://via.placeholder.com/150', comments: [{ username: 'user2', content: 'Nice post!', date: new Date().toLocaleString() }, { username: 'user3', content: 'Thanks for sharing!', date: new Date().toLocaleString() }] },
    { id: 2, username: 'admin', title: 'Second Post', content: 'Content of the second post.', image: 'https://via.placeholder.com/150', comments: [] },
  ];

  getPublicationsByUsername(username: string): Publication[] {
    return this.publications.filter(pub => pub.username === username);
  }

  getPublicationById(id: number): Publication | undefined {
    return this.publications.find(pub => pub.id === id);
  }

  addPublication(publication: Publication): void {
    this.publications.push(publication);
  }

  addComment(publicationId: number, comment: Comment): void {
    const publication = this.getPublicationById(publicationId);
    if (publication) {
      publication.comments.push(comment);
    }
  }

  updateRating(publicationId: number, rating: number): void {
    const publication = this.getPublicationById(publicationId);
    if (publication) {
      publication.rating = rating;
    }
  }
}
