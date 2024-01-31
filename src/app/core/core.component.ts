import { Component, inject } from '@angular/core';
import { WalletsComponent } from './views/wallets.component';
import { Store } from '@ngrx/store';
import { COUNTER } from './constant/features-keys';
import { Observable } from 'rxjs';
import { decrement, increment, reset } from './actions/counter.actions';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
@Component({
  selector: 'app-core',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    WalletsComponent,
  ],
  template: `
    <app-toolbar></app-toolbar>
    <div class="core">
      <app-wallets></app-wallets>
    </div>
  `,
  styles: `
    .core {
      min-height: cal(100%, 73px);
      padding: 20px;
    }
  `
})
export class CoreComponent {}
