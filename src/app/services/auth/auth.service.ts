import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly DEFAULT_ROLE = 'user';

  constructor() {
    this.initializeDefaultAdmin();
  }

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  private initializeDefaultAdmin(): void {
    const users = this.loadUsers();
    if (users.length === 0) {
      const defaultAdmin: User = {
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'Admin123',
        birthDate: '2000-01-01',
        role: 'admin'
      };
      users.push(defaultAdmin);
      this.saveUsers(users);
    }
  }

  public loadUsers(): User[] {
    if (this.isLocalStorageAvailable()) {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : [];
    }
    return [];
  }

  private saveUsers(users: User[]): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  login(email: string, password: string): boolean {
    const users = this.loadUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      this.setCurrentUser(email);
      return true;
    }
    return false;
  }

  logout(): void {
    this.clearCurrentUser();
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  getCurrentUser(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('currentUser');
    }
    return null;
  }

  private setCurrentUser(email: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('currentUser', email);
    }
  }

  private clearCurrentUser(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('currentUser');
    }
  }

  register(user: User): void {
    const users = this.loadUsers();
    if (!user.role) {
      user.role = this.DEFAULT_ROLE;
    }
    users.push(user);
    this.saveUsers(users);
  }

  emailExists(email: string): boolean {
    const users = this.loadUsers();
    return users.some(user => user.email === email);
  }

  getUserRole(email: string): string | null {
    const users = this.loadUsers();
    const user = users.find(u => u.email === email);
    return user ? user.role : null;
  }
}
