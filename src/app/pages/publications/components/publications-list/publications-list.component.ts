import { Component, OnInit } from '@angular/core';
import { Publication } from '../../../../models/publication.model';
import { PublicationService } from '../../../../services/publications/publications.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PublicationCardComponent } from '../publication-card/publication-card.component';

/**
 * Componente que muestra una lista de publicaciones del usuario autenticado.
 */
@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    PublicationCardComponent
  ]
})
export class PublicationsListComponent implements OnInit {
  /**
   * Lista de publicaciones del usuario autenticado.
   * @type {Publication[]}
   */
  publications: Publication[] = [];

  /**
   * Constructor del componente.
   * @param {PublicationService} publicationService - Servicio de publicaciones.
   * @param {AuthService} authService - Servicio de autenticación.
   */
  constructor(
    private publicationService: PublicationService,
    private authService: AuthService
  ) { }

  /**
   * Método de ciclo de vida de Angular. Se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    const username = this.authService.getCurrentUser();
    if (username) {
      this.publications = this.publicationService.getPublicationsByUsername(username);
    }
  }
}
