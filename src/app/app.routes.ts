import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { authGuard } from './auth.guard';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotesComponent } from './pages/notes/notes.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { PublicationsComponent } from './pages/publications/publications.component';
import { PublicationsListComponent } from './pages/publications/components/publications-list/publications-list.component';
import { PublicationDetailComponent } from './pages/publications/components/publication-detail/publication-detail.component';
import { CreatePublicationComponent } from './pages/publications/components/create-publication/create-publication.component';

export const routes: Routes = [
  { 
    path: '', 
    component: NavigationComponent, 
    canActivate: [authGuard], 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { 
        path: 'publications', 
        component: PublicationsComponent, 
        children: [
          { path: '', component: PublicationsListComponent },
          { path: 'create', component: CreatePublicationComponent },
          { path: ':id', component: PublicationDetailComponent },
        ]
      },
      // { path: 'notes', component: NotesComponent },
      // { path: 'portfolio', component: PortfolioComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' }
];
