import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PublicationService } from '../../../../services/publications/publications.service';
import { Publication } from '../../../../models/publication.model';
import { AuthService } from '../../../../auth.service';

@Component({
  selector: 'app-create-publication',
  templateUrl: './create-publication.component.html',
  styleUrls: ['./create-publication.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ]
})
export class CreatePublicationComponent {
  title = '';
  content = '';
  image = '';
  comments = [];

  constructor(
    private authService: AuthService,
    private publicationService: PublicationService,
    private router: Router
  ) {}

  createPublication() {
    const username = this.authService.getCurrentUser();
    const newPublication: Publication = {
      id: Math.random(), // Generar un ID único
      username: username as string, // Reemplazar con el usuario actual
      title: this.title,
      content: this.content,
      image: this.image,
      comments: this.comments
    };

    this.publicationService.addPublication(newPublication);
    this.router.navigate(['/publications']);
  }
}
