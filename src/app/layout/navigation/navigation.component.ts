import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * Componente de navegación.
 * Maneja la barra lateral de navegación y la barra de herramientas superior.
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule
  ]
})
export class NavigationComponent {
  /**
   * Observable que indica si la vista actual es en un dispositivo móvil.
   */
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  /**
   * Constructor del componente NavigationComponent.
   * @param breakpointObserver Observador de puntos de quiebre para determinar si la vista es en un dispositivo móvil.
   * @param authService Servicio de autenticación.
   */
  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {}

  /**
   * Verifica si el usuario actual es un administrador.
   * @returns Verdadero si el usuario es un administrador, falso en caso contrario.
   */
  isAdmin(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? this.authService.getUserRole(currentUser) === 'admin' : false;
  }
}
