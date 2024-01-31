import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule, MatButtonModule, MatIconModule
  ],
  template: `
    <mat-toolbar>
      <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Credit Bank Wallets Department</span>
      <span class="spacer"></span>
    </mat-toolbar>
  `,
  styles: `
    .spacer {
      flex: 1 1 auto;
    }
  `,
})
export class ToolbarComponent { }
