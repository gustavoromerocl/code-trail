import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { NavigationComponent } from './navigation/navigation.component';

export const routes: Routes = [
  { path: 'home', component: NavigationComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' }
];
