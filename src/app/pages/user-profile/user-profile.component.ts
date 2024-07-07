import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, AbstractControlOptions } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../models/user.model';
import { MessageDialogComponent } from '../../components/message-dialog/message-dialog.component';
import { AuthService } from '../../services/auth/auth.service';

/**
 * Componente de perfil de usuario.
 * Permite al usuario ver y editar su perfil.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User | null = null;

  /**
   * Constructor del componente UserProfileComponent.
   * @param {FormBuilder} fb - Constructor del formulario.
   * @param {AuthService} authService - Servicio de autenticación para gestionar usuarios.
   * @param {Router} router - Router para la navegación.
   * @param {MatDialog} dialog - Servicio de diálogo para mostrar mensajes.
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,18}$/)]],
      confirmPassword: ['', Validators.required],
      birthDate: ['', [Validators.required, this.ageValidator]]
    }, { validators: this.passwordsMatchValidator } as AbstractControlOptions);
  }

  /**
   * Método de inicialización del componente.
   * Carga el usuario actual y establece los valores del formulario.
   */
  ngOnInit(): void {
    const email = this.authService.getCurrentUser();
    if (email) {
      const user = this.authService.loadUsers().find(user => user.email === email);
      if (user) {
        this.currentUser = user;
        this.profileForm.patchValue({
          ...user,
          confirmPassword: user.password
        });
      } else {
        console.error('User not found');
      }
    } else {
      console.error('No current user');
    }
  }

  /**
   * Validador de edad.
   * Verifica si el usuario tiene al menos 13 años.
   * @param {AbstractControl} control - Control del formulario.
   * @returns {ValidationErrors | null} - Errores de validación o null si la validación es exitosa.
   */
  ageValidator(control: AbstractControl): ValidationErrors | null {
    const birthDate = new Date(control.value);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 13) {
      return { 'tooYoung': true };
    }
    return null;
  }

  /**
   * Validador de coincidencia de contraseñas.
   * Verifica si la contraseña y la confirmación de contraseña coinciden.
   * @param {FormGroup} group - Grupo de formulario.
   * @returns {ValidationErrors | null} - Errores de validación o null si la validación es exitosa.
   */
  passwordsMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    } else {
      group.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }

  /**
   * Maneja el envío del formulario de perfil.
   * Actualiza el perfil del usuario si el formulario es válido.
   */
  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedUser = { ...this.currentUser, ...this.profileForm.value };
      this.updateUser(updatedUser);
      this.dialog.open(MessageDialogComponent, {
        data: {
          title: 'Perfil Actualizado',
          message: 'Tu perfil ha sido actualizado exitosamente.'
        }
      });
    }
  }

  /**
   * Actualiza la información del usuario en el almacenamiento local.
   * @param {User} user - Usuario actualizado.
   */
  updateUser(user: User): void {
    const users = this.authService.loadUsers();
    const index = users.findIndex(u => u.email === user.email);
    if (index !== -1) {
      users[index] = user;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  /**
   * Maneja la acción de cerrar sesión.
   * Cierra la sesión del usuario y redirige a la página de inicio de sesión.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
