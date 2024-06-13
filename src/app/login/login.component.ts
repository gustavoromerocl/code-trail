import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/home']);
    } else  {
      this.dialog.open(MessageDialogComponent, {
        data: {
          title: 'Error',
          message: 'Credenciales incorrectas'
        }
      });
    }
  }
}
