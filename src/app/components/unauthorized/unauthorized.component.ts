import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-unauthorized',
  template: `
    <div class="unauthorized-container">
      <mat-card class="unauthorized-card">
        <mat-card-title>
          <span>Acceso No Autorizado</span>
        </mat-card-title>
        <mat-card-content>
          <p>No tienes permiso para acceder a esta página.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" routerLink="/dashboard">Volver al Dashboard</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .unauthorized-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f5f5f5;
      }
      .unauthorized-card {
        max-width: 400px;
        text-align: center;
        padding: 20px;
        background-color: #fff;
        color: #333;
      }
      .unauthorized-card mat-card-title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }
      .unauthorized-card .icon {
        font-size: 40px;
        vertical-align: middle;
        line-height: 1;
      }
      .unauthorized-card mat-card-content p {
        margin: 0;
        color: #666;
      }
    `
  ],
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule, MatCardModule]
})
export class UnauthorizedComponent {}
