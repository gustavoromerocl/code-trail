import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'role', 'isActive', 'actions'];
  users: User[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.users = this.authService.getAllUsers();
  }

  toggleUserStatus(user: User): void {
    const isActive = !user.isActive;
    this.authService.updateUserStatus(user.email, isActive);
    user.isActive = isActive;
  }
}
