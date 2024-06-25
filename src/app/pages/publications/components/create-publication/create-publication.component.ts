import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PublicationService } from '../../../../services/publications/publications.service';
import { Publication } from '../../../../models/publication.model';
import { AuthService } from '../../../../services/auth/auth.service';

/**
 * Componente para la creación de publicaciones.
 */
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

  /**
   * Constructor del componente CreatePublicationComponent.
   * @param authService Servicio de autenticación.
   * @param publicationService Servicio de gestión de publicaciones.
   * @param router Router para la navegación.
   */
  constructor(
    private authService: AuthService,
    private publicationService: PublicationService,
    private router: Router
  ) {}

  /**
   * Crea una nueva publicación y la añade al servicio de publicaciones.
   * Luego navega a la vista de publicaciones.
   */
  createPublication() {
    const username = this.authService.getCurrentUser();
    const newPublication: Publication = {
      id: Math.random(), // Generar un ID único
      username: username as string, // Reemplazar con el usuario actual
      title: this.title,
      content: this.content,
      image: 'https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg',
      comments: this.comments
    };

    this.publicationService.addPublication(newPublication);
    this.router.navigate(['/publications']);
  }
}
