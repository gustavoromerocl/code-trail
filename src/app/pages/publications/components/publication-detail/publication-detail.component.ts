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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../../../components/message-dialog/message-dialog.component';
import { Router } from 'express';

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
  currentUser: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private publicationService: PublicationService,
    private fb: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {
    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.publication = this.publicationService.getPublicationById(id);
    this.rating = this.publication?.rating || 0;
    this.currentUser = this.authService.getCurrentUser();
  }

  onSubmit(): void {
    if (this.commentForm.valid && this.publication) {
      const comment: Comment = {
        username: this.authService.getCurrentUser()!,
        content: this.commentForm.value.content,
        date: new Date().toLocaleString()
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

  onDeleteComment(index: number): void {
    if (this.publication) {
      this.publicationService.removeComment(this.publication.id, index);
      this.dialog.open(MessageDialogComponent, {
        data: {
          title: 'Aviso',
          message: 'Se ha eliminado el comentario'
        }
      })
    }
  }
}
