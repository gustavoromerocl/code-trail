import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { User } from '../../models/user.model';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear();
    service = new AuthService();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with a default admin user if no users are present', () => {
    service = new AuthService();
    const users = service.loadUsers();
    expect(users.length).toBe(1);
    expect(users[0].email).toBe('admin@admin.com');
    expect(users[0].role).toBe('admin');
  });

  it('should add a new user with default role as user', () => {
    const newUser: User = {
      name: 'Test User',
      email: 'test@user.com',
      password: 'Test123',
      birthDate: '1990-01-01',
      role: 'user',
      isActive: true
    };

    service.register(newUser);
    const users = service.loadUsers();
    expect(users.length).toBe(2);
    expect(users[1].email).toBe('test@user.com');
    expect(users[1].role).toBe('user');
  });

  it('should login a user with correct credentials and set the current user', () => {
    service = new AuthService();
    const loginSuccess = service.login('admin@admin.com', 'Admin123');
    expect(loginSuccess).toBeTrue();
    expect(service.getCurrentUser()).toBe('admin@admin.com');
  });

  it('should not login a user with incorrect credentials', () => {
    service = new AuthService();
    const loginSuccess = service.login('admin@admin.com', 'WrongPassword');
    expect(loginSuccess).toBeFalse();
    expect(service.getCurrentUser()).toBeNull();
  });

  it('should not login an inactive user', () => {
    const newUser: User = {
      name: 'Inactive User',
      email: 'inactive@user.com',
      password: 'Test123',
      birthDate: '1990-01-01',
      role: 'user',
      isActive: false
    };

    service.register(newUser);
    const loginSuccess = service.login('inactive@user.com', 'Test123');
    expect(loginSuccess).toBeFalse();
    expect(service.getCurrentUser()).toBeNull();
  });

  it('should logout the current user', () => {
    service = new AuthService();
    service.login('admin@admin.com', 'Admin123');
    service.logout();
    expect(service.getCurrentUser()).toBeNull();
  });

  it('should return true if a user is authenticated', () => {
    service = new AuthService();
    service.login('admin@admin.com', 'Admin123');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false if a user is not authenticated', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should check if an email exists', () => {
    service = new AuthService();
    expect(service.emailExists('admin@admin.com')).toBeTrue();
    expect(service.emailExists('nonexistent@user.com')).toBeFalse();
  });

  it('should get the role of a user by email', () => {
    service = new AuthService();
    const role = service.getUserRole('admin@admin.com');
    expect(role).toBe('admin');
  });

  it('should return null if trying to get the role of a non-existent user', () => {
    const role = service.getUserRole('nonexistent@user.com');
    expect(role).toBeNull();
  });

  it('should get all users', () => {
    const users = service.getAllUsers();
    expect(users.length).toBe(1); // Since we have the default admin user
  });

  it('should update the status of a user', () => {
    service = new AuthService();
    service.updateUserStatus('admin@admin.com', false);
    const user = service.loadUsers().find(u => u.email === 'admin@admin.com');
    expect(user?.isActive).toBeFalse();
  });
});
