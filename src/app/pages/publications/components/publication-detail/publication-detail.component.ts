import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Comment, Publication } from '../../../../models/publication.model';
import { PublicationService } from '../../../../services/publications/publications.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-publication-detail',
  templateUrl: './publication-detail.component.html',
  styleUrls: ['./publication-detail.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
  ]
})
export class PublicationDetailComponent implements OnInit {
  publication: Publication | undefined;
  commentForm: FormGroup;
  rating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private publicationService: PublicationService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.publication = this.publicationService.getPublicationById(id);
    this.rating = this.publication?.rating || 0;
  }

  onSubmit(): void {
    if (this.commentForm.valid && this.publication) {
      const comment: Comment = {
        username: this.authService.getCurrentUser()!,
        content: this.commentForm.value.content,
        date: new Date().toLocaleString() // Añadir la fecha actual al comentario
      };
      this.publicationService.addComment(this.publication.id, comment);
      this.commentForm.reset();
    }
  }

  onRate(rating: number): void {
    if (this.publication) {
      this.publicationService.updateRating(this.publication.id, rating);
      this.rating = rating;
    }
  }
}
