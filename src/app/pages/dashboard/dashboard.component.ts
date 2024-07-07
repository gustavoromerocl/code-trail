import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../../services/publications/publications.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatButtonModule
  ]
})
export class DashboardComponent implements OnInit {
  publications: Publication[] = [];

  constructor(private publicationService: PublicationService) {}

  ngOnInit(): void {
    this.publicationService.publications$.subscribe({
      next: (data) => {
        this.publications = data;
        console.log('Publications:', this.publications);
      },
      error: (error) => {
        console.error('Error fetching publications:', error);
      }
    });
  }
}
