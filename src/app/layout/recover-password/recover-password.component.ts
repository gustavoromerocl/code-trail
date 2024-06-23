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
  recoverPasswordForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.recoverPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.recoverPasswordForm.valid) {
      // Simulación de envío de correo de recuperación
      this.dialog.open(MessageDialogComponent, {
        data: {
          title: 'Aviso',
          message: 'Se está registrado recibirá un correo de recuperación en el siguiente correo: ' + this.recoverPasswordForm.value.email
        }
      });
      
      this.router.navigate(['/login']);
    }
  }

  onReset(): void {
    this.recoverPasswordForm.reset();
    this.submitted = false;
  }
}
