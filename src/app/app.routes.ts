import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotesComponent } from './pages/notes/notes.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { PublicationsComponent } from './pages/publications/publications.component';
import { PublicationsListComponent } from './pages/publications/components/publications-list/publications-list.component';
import { PublicationDetailComponent } from './pages/publications/components/publication-detail/publication-detail.component';
import { CreatePublicationComponent } from './pages/publications/components/create-publication/create-publication.component';
import { RegisterComponent } from './layout/register/register.component';
import { authGuard } from './services/auth/auth.guard';
import { RecoverPasswordComponent } from './layout/recover-password/recover-password.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { UserManagementComponent } from './pages/user/user-management.component';

export const routes: Routes = [
  { 
    path: '', 
    component: NavigationComponent, 
    canActivateChild: [authGuard], 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { 
        path: 'publications', 
        component: PublicationsComponent,
        children: [
          { path: '', component: PublicationsListComponent, data: { roles: ['admin', 'user'] } },
          { path: 'create', component: CreatePublicationComponent, data: { roles: ['admin', 'user'] } },
          { path: ':id', component: PublicationDetailComponent, data: { roles: ['admin', 'user'] } },
        ]
      },
      // { path: 'notes', component: NotesComponent },
      // { path: 'portfolio', component: PortfolioComponent },
      { path: 'profile', component: UserProfileComponent, data: { roles: ['admin', 'user'] } },
      { path: 'user-management', component: UserManagementComponent, data: { roles: ['admin'] } }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: 'home' }
];
