import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../components/message-dialog/message-dialog.component';

/**
 * Componente de recuperación de contraseña.
 * Permite a los usuarios solicitar un correo para recuperar su contraseña.
 */
@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule
  ]
})
export class RecoverPasswordComponent {
  /**
   * Formulario de recuperación de contraseña.
   */
  recoverPasswordForm: FormGroup;

  /**
   * Indicador de si el formulario ha sido enviado.
   */
  submitted = false;

  /**
   * Constructor del componente RecoverPasswordComponent.
   * @param fb FormBuilder para construir el formulario.
   * @param router Router para la navegación.
   * @param dialog MatDialog para abrir diálogos.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.recoverPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Maneja el envío del formulario de recuperación de contraseña.
   * Si el formulario es válido, se simula el envío de un correo de recuperación.
   */
  onSubmit(): void {
    this.submitted = true;
    if (this.recoverPasswordForm.valid) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          title: 'Aviso',
          message: 'Si está registrado recibirá un correo de recuperación en el siguiente correo: ' + this.recoverPasswordForm.value.email
        }
      }).afterClosed().subscribe(() => {
        this.router.navigate(['/login']);
      });
    }
  }

  /**
   * Maneja el reinicio del formulario de recuperación de contraseña.
   */
  onReset(): void {
    this.recoverPasswordForm.reset();
    this.submitted = false;
  }
}
