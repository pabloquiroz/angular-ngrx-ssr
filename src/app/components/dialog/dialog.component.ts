import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions,MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  template: `
    <h1 mat-dialog-title>{{ title }}</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Name of Wallets</mat-label>
        <input matInput [(ngModel)]="data.name">
      </mat-form-field>
    </div>
    <div mat-dialog-actions style="padding-bottom: 20px">
      <button mat-button color="primary" [mat-dialog-close]="data.name" cdkFocusInitial>Ok</button>
      <button mat-button (click)="onCancel()">Cancel</button>
    </div>
  `,
  styles: `
    .form-field {
      width: 100%;
    }

    mat-form-field {
      width: 100%;
    }

    mat-dialog-content {
      margin: 20px 0;
    }

    mat-dialog-actions {
      justify-content: flex-end;
    }

    button {
      margin-left: 8px;
    }
    .mat-mdc-dialog-actions mdc-dialog__actions {
      padding-bottom: 20px;
    }
  `,
})
export class DialogComponent {
  title = 'Create Wallet';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
