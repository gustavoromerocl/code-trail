import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private currentUser: string | null = null;

  login(username: string, password: string): boolean {
    // Aquí va la lógica de autenticación (ejemplo simple)
    if (username === 'admin' && password === 'admin') {
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
}
