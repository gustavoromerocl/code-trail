import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

/**
 * Servicio de autenticación para manejar usuarios y sus sesiones.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly DEFAULT_ROLE = 'user';

  constructor() {
    this.initializeDefaultAdmin();
  }

  /**
   * Verifica si localStorage está disponible.
   * @returns {boolean} True si localStorage está disponible, de lo contrario false.
   */
  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  /**
   * Inicializa un usuario administrador por defecto si no hay usuarios en localStorage.
   */
  private initializeDefaultAdmin(): void {
    const users = this.loadUsers();
    if (users.length === 0) {
      const defaultAdmin: User = {
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'Admin123',
        birthDate: '2000-01-01',
        role: 'admin',
        isActive: true
      };
      users.push(defaultAdmin);
      this.saveUsers(users);
    }
  }

  /**
   * Carga los usuarios desde localStorage.
   * @returns {User[]} Lista de usuarios.
   */
  public loadUsers(): User[] {
    if (this.isLocalStorageAvailable()) {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : [];
    }
    return [];
  }

  /**
   * Guarda la lista de usuarios en localStorage.
   * @param {User[]} users - Lista de usuarios a guardar.
   */
  private saveUsers(users: User[]): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  /**
   * Inicia sesión de un usuario.
   * @param {string} email - Correo electrónico del usuario.
   * @param {string} password - Contraseña del usuario.
   * @returns {boolean} True si las credenciales son correctas y el usuario está activo, de lo contrario false.
   */
  login(email: string, password: string): boolean {
    const users = this.loadUsers();
    const user = users.find(u => u.email === email && u.password === password && u.isActive);
    if (user) {
      this.setCurrentUser(email);
      return true;
    }
    return false;
  }

  /**
   * Cierra la sesión del usuario actual.
   */
  logout(): void {
    this.clearCurrentUser();
  }

  /**
   * Verifica si un usuario está autenticado.
   * @returns {boolean} True si hay un usuario autenticado, de lo contrario false.
   */
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  /**
   * Obtiene el usuario actual autenticado.
   * @returns {string | null} Correo electrónico del usuario actual si está autenticado, de lo contrario null.
   */
  getCurrentUser(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('currentUser');
    }
    return null;
  }

  /**
   * Establece el usuario actual en localStorage.
   * @param {string} email - Correo electrónico del usuario a establecer.
   */
  private setCurrentUser(email: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('currentUser', email);
    }
  }

  /**
   * Elimina el usuario actual de localStorage.
   */
  private clearCurrentUser(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('currentUser');
    }
  }

  /**
   * Registra un nuevo usuario.
   * @param {User} user - Usuario a registrar.
   */
  register(user: User): void {
    const users = this.loadUsers();
    if (!user.role) {
      user.role = this.DEFAULT_ROLE;
    }
    if (user.isActive === undefined) {
      user.isActive = true;
    }
    users.push(user);
    this.saveUsers(users);
  }

  /**
   * Verifica si un correo electrónico ya está registrado.
   * @param {string} email - Correo electrónico a verificar.
   * @returns {boolean} True si el correo electrónico ya está registrado, de lo contrario false.
   */
  emailExists(email: string): boolean {
    const users = this.loadUsers();
    return users.some(user => user.email === email);
  }

  /**
   * Obtiene el rol de un usuario por su correo electrónico.
   * @param {string} email - Correo electrónico del usuario.
   * @returns {string | null} Rol del usuario si se encuentra, de lo contrario null.
   */
  getUserRole(email: string): string | null {
    const users = this.loadUsers();
    const user = users.find(u => u.email === email);
    return user ? user.role : null;
  }

  /**
   * Obtiene la lista de todos los usuarios.
   * @returns {User[]} Lista de todos los usuarios.
   */
  getAllUsers(): User[] {
    return this.loadUsers();
  }

  /**
   * Actualiza el estado de activación de un usuario.
   * @param {string} email - Correo electrónico del usuario.
   * @param {boolean} isActive - Nuevo estado de activación.
   */
  updateUserStatus(email: string, isActive: boolean): void {
    const users = this.loadUsers();
    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex > -1) {
      users[userIndex].isActive = isActive;
      this.saveUsers(users);
    }
  }
}
