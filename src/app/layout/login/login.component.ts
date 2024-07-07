import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../components/message-dialog/message-dialog.component';

/**
 * Componente de login.
 * Permite a los usuarios ingresar sus credenciales para iniciar sesión en la aplicación.
 */
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
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  /** El nombre de usuario ingresado por el usuario */
  username: string = '';
  /** La contraseña ingresada por el usuario */
  password: string = '';

  /**
   * Constructor del componente LoginComponent.
   * @param authService Servicio de autenticación
   * @param router Servicio de enrutamiento
   * @param dialog Servicio de diálogo
   */
  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  /**
   * Método de inicio de sesión.
   * Verifica las credenciales del usuario y redirige al dashboard si son correctas,
   * de lo contrario, muestra un mensaje de error.
   */
  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.dialog.open(MessageDialogComponent, {
        data: {
          title: 'Error',
          message: 'Credenciales incorrectas'
        }
      });
    }
  }
}
