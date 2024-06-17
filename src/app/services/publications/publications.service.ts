import { Injectable } from '@angular/core';
import { Publication } from '../../models/publication.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private publications: Publication[] = [
    {
      id: 1,
      username: 'user1',
      title: 'First Post',
      content: 'This is the content of the first post. It is quite long and should be truncated in the card view.',
      image: 'https://via.placeholder.com/150',
      comments: [
        { username: 'user2', content: 'Nice post!' },
        { username: 'user3', content: 'Thanks for sharing!' }
      ]
    },
    {
      id: 2,
      username: 'user1',
      title: 'Second Post',
      content: 'Content of the second post.',
      image: 'https://via.placeholder.com/150',
      comments: []
    }
  ];

  getPublicationsByUsername(username: string): Publication[] {
    return this.publications.filter(pub => pub.username === username);
  }

  getPublicationById(id: number): Publication | undefined {
    return this.publications.find(pub => pub.id === id);
  }
}
