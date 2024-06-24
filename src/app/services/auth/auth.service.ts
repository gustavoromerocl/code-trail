import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: string | null = null;

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
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
    users.push(user);
    this.saveUsers(users);
  }

  emailExists(email: string): boolean {
    const users = this.loadUsers();
    return users.some(user => user.email === email);
  }
}
