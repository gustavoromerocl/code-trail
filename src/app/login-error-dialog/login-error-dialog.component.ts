import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-error-dialog',
  standalone: true,
  imports: [],
  templateUrl: './login-error-dialog.component.html',
  styleUrl: './login-error-dialog.component.css'
})
export class LoginErrorDialogComponent {
  constructor(private dialogRef: MatDialogRef<LoginErrorDialogComponent>) { }

  close(): void {
    this.dialogRef.close();
  }
}
