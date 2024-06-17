import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publication } from '../../../../models/publication.model';
import { PublicationService } from '../../../../services/publications/publications.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publication-detail',
  templateUrl: './publication-detail.component.html',
  styleUrls: ['./publication-detail.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    CommonModule
  ]
})
export class PublicationDetailComponent implements OnInit {
  publication: Publication | undefined;

  constructor(
    private route: ActivatedRoute,
    private publicationService: PublicationService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.publication = this.publicationService.getPublicationById(id);
  }
}
