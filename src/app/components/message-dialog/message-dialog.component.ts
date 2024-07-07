import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Componente de diálogo de mensaje.
 * Este componente muestra un mensaje en un cuadro de diálogo modal.
 */
@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [],
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent {
  /**
   * Constructor del componente.
   * @param {MatDialogRef<MessageDialogComponent>} dialogRef - Referencia al cuadro de diálogo.
   * @param {{ title: string; message: string }} data - Datos inyectados en el cuadro de diálogo, que incluyen el título y el mensaje.
   */
  constructor(
    private dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  /**
   * Cierra el cuadro de diálogo.
   */
  close(): void {
    this.dialogRef.close();
  }
}
