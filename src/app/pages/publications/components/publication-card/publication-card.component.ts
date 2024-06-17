import { Component, Input } from '@angular/core';
import { Publication } from '../../../../models/publication.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-publication-card',
  templateUrl: './publication-card.component.html',
  styleUrls: ['./publication-card.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
  ]
})
export class PublicationCardComponent {
  @Input() publication!: Publication;
}
