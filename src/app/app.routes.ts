import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { authGuard } from './auth.guard';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotesComponent } from './notes/notes.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PublicationsComponent } from './publications/publications.component';

export const routes: Routes = [
  { 
    path: '', 
    component: NavigationComponent, 
    canActivate: [authGuard], 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'publications', component: PublicationsComponent },
      { path: 'notes', component: NotesComponent },
      { path: 'portfolio', component: PortfolioComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' }
];
