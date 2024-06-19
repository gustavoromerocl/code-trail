import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        BrowserAnimationsModule,
        RegisterComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when form is empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should be valid when form is correctly filled', () => {
    component.registerForm.controls['name'].setValue('Test User');
    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('Password1');
    component.registerForm.controls['confirmPassword'].setValue('Password1');
    component.registerForm.controls['birthDate'].setValue('2000-01-01');
    expect(component.registerForm.valid).toBeTruthy();
  });
});
