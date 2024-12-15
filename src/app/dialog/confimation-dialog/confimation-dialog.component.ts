import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confimation-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confimation-dialog.component.html',
  styleUrl: './confimation-dialog.component.css'
})
export class ConfimationDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<ConfimationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }


}
