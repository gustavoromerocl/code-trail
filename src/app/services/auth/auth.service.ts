import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private currentUser: string | null = null;

  private loadUsers(): User[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  login(username: string, password: string): boolean {
    const users = this.loadUsers();
    const user = users.find(u => u.email === username && u.password === password);
    if (user) {
      this.isLoggedIn = true;
      this.currentUser = username;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getCurrentUser(): string | null {
    return this.currentUser;
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
