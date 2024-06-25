import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';

/**
 * Componente para la gestión de usuarios.
 * Muestra una tabla con los usuarios y permite activar o desactivar sus cuentas.
 */
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'role', 'isActive', 'actions'];
  users: User[] = [];

  /**
   * Constructor del componente UserManagementComponent.
   * @param {AuthService} authService - Servicio de autenticación para gestionar usuarios.
   */
  constructor(private authService: AuthService) {}

  /**
   * Método de inicialización del componente.
   * Carga todos los usuarios al inicializar el componente.
   */
  ngOnInit(): void {
    this.users = this.authService.getAllUsers();
  }

  /**
   * Alterna el estado de activación de un usuario.
   * @param {User} user - Usuario cuyo estado de activación se va a alternar.
   */
  toggleUserStatus(user: User): void {
    const isActive = !user.isActive;
    this.authService.updateUserStatus(user.email, isActive);
    user.isActive = isActive;
  }
}
