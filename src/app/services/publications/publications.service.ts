import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Publication, Comment } from '../../models/publication.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private firebaseUrl = 'https://firebasestorage.googleapis.com/v0/b/code-trail.appspot.com/o/publications.json?alt=media&token=440ba776-f65b-459e-8171-6e3f251ce9a1';
  private publicationsSubject: BehaviorSubject<Publication[]> = new BehaviorSubject<Publication[]>([]);
  publications$: Observable<Publication[]> = this.publicationsSubject.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {
    this.loadPublications();
  }

  getJsonData(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.firebaseUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  private loadPublications(): void {
    this.getJsonData().subscribe({
      next: (data) => {
        this.publicationsSubject.next(data);
        this.savePublications();
      },
      error: (error) => {
        console.error('Error fetching JSON data:', error);
        this.initializeDummyData();
      },
      complete: () => {
        console.log('Request completed.');
      }
    });
  }

  private initializeDummyData(): void {
    const dummyPublications = [
      {
        id: 1,
        username: 'admin',
        title: 'First Post',
        content: 'This is the content of the first post. It is quite long and should be truncated in the card view.',
        image: 'https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg',
        comments: [
          { username: 'user2', content: 'Nice post!', date: new Date().toLocaleString() },
          { username: 'user3', content: 'Thanks for sharing!', date: new Date().toLocaleString() }
        ],
        rating: 2
      },
      {
        id: 2,
        username: 'admin',
        title: 'Second Post',
        content: 'Content of the second post.',
        image: 'https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg',
        comments: [
          { username: 'admin@admin.com', content: 'hola mundo', date: new Date().toLocaleString() }
        ],
        rating: 1
      }
    ];
    this.publicationsSubject.next(dummyPublications);
    this.savePublications();
  }

  private savePublications(): void {
    localStorage.setItem('publications', JSON.stringify(this.publicationsSubject.value));
  }

  getPublications(): Publication[] {
    return this.publicationsSubject.value;
  }

  getPublicationsByUsername(username: string): Publication[] {
    return this.publicationsSubject.value.filter(pub => pub.username === username);
  }

  getPublicationById(id: number): Publication | undefined {
    return this.publicationsSubject.value.find(pub => pub.id === id);
  }

  addPublication(publication: Publication): void {
    const updatedPublications = [...this.publicationsSubject.value, publication];
    this.publicationsSubject.next(updatedPublications);
    this.savePublications();
    this.updatePublicationsInFirebase(updatedPublications);
  }

  addComment(publicationId: number, comment: Comment): void {
    const updatedPublications = this.publicationsSubject.value.map(pub => {
      if (pub.id === publicationId) {
        pub.comments.push(comment);
      }
      return pub;
    });
    this.publicationsSubject.next(updatedPublications);
    this.savePublications();
    this.updatePublicationsInFirebase(updatedPublications);
  }

  updateRating(publicationId: number, rating: number): void {
    const updatedPublications = this.publicationsSubject.value.map(pub => {
      if (pub.id === publicationId) {
        pub.rating = rating;
      }
      return pub;
    });
    this.publicationsSubject.next(updatedPublications);
    this.savePublications();
    this.updatePublicationsInFirebase(updatedPublications);
  }

  removeComment(publicationId: number, commentIndex: number): void {
    const updatedPublications = this.publicationsSubject.value.map(pub => {
      if (pub.id === publicationId && commentIndex > -1 && commentIndex < pub.comments.length) {
        pub.comments.splice(commentIndex, 1);
      }
      return pub;
    });
    this.publicationsSubject.next(updatedPublications);
    this.savePublications();
    this.updatePublicationsInFirebase(updatedPublications);
  }

  private updatePublicationsInFirebase(publications: Publication[]): void {
    this.http.post(this.firebaseUrl, publications, this.httpOptions).subscribe({
      next: (response) => {
        console.log('Archivo JSON sobrescrito con éxito:', response);
      },
      error: (error) => {
        console.error('Error al sobrescribir el archivo JSON:', error);
      }
    });
  }
}
