import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ActionsCrud, Wallet } from '../interfaces/wallet.interface';
import { CommonModule } from '@angular/common';
import { WALLETS } from '../constant/features-keys';
import { create, loadData, loadDataSuccess, remove, update } from '../actions/wallet-action';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../components/table/table.component';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { generateRandomId } from '../utils/random-id';
import { COLUMNS, COLUMNS_ACTIONS } from '../constant/columns';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-wallets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    TableComponent,
    DialogComponent,
  ],
  template: `
    <div class="buttons-action">
      <button
        mat-raised-button
        color="primary"
        [ngStyle]="{'padding': '0 1.6rem', 'border-radius': '3rem'}"
        (click)="openDialog()"
        >
        Add Wallet
      </button>
      <button
        mat-raised-button
        [ngStyle]="{'padding': '0 1.6rem', 'border-radius': '3rem'}"
        (click)="reset()"
        >
        Reset Wallet
      </button>
    </div>
    <app-table
      [data]="dataSource"
      [columnsToDisplay]="columnsToDisplay"
      [columnsToDisplayWithMenu]="columnsToDisplayWithMenu "
      (selectedRowsChange)="onSelect($event)"
    >  
    </app-table>
    <div class="spinner-container" *ngIf="isLoading; else content">
      <mat-spinner
      diameter="60"
      ></mat-spinner>
    </div>
    <ng-template #content></ng-template>
    
  `,
  styles: `
    .buttons-action {
      margin-bottom: 16px;
      display: flex; 
      gap: 10px;
    }
    .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    .dialog-container {

    }
  `
})
export class WalletsComponent {
  columnsToDisplay: string[] = COLUMNS;
  columnsToDisplayWithMenu = COLUMNS_ACTIONS;

  dataSource: any;
  isLoading = false;

  private store = inject(Store);
  wallets$!: Observable<Wallet[]>;

  constructor(public dialog: MatDialog) {
    this.getWallets();
  }

  private getWallets() {
    this.isLoading = true;
    this.store.dispatch(loadData());    
    this.wallets$ = this.store.select(WALLETS).pipe(map(data => data.wallets));
    this.wallets$.subscribe(data => {
      this.dataSource = data
      this.isLoading = false;
    });
  }

  addWallet(wallet: Wallet) {
    this.store.dispatch(create({ payload: wallet }));
  }

  deleteWallet(wallet: Wallet) {
    this.store.dispatch(remove({ id: wallet.id }));
  }

  updateWallet(wallet: Wallet) {
    this.store.dispatch(update({ id: wallet.id, payload: wallet }));
  }

  reset() {
    this.getWallets();
  }

  onSelect(event: ActionsCrud) {
    const row = event?.row;
    event.option === 1 ? this.deleteWallet(row) : this.openDialog(event);
  }

  openDialog(event?: ActionsCrud): void {
    let dialogData = {id: '', name: ''};
    let option = event?.option;

    if (event && event.row) {
      dialogData = {
        id: event.row.id,
        name: event.row.name
      };
    }
    
    const dialogRef = this.dialog.open(DialogComponent, {
      data: dialogData,
      maxWidth: '100vw',
      maxHeight: '30vh',
      height: '30%',
      width: '50%',
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      option === 0 ? this.updateDialog(result, dialogData) : this.createDialog(result);
    });
  }

  createDialog(result: string) {
    if (result) {
      const id = generateRandomId();
      const name = result;
      const wallet: Wallet = { id, name };
      this.addWallet(wallet);
    }
  }

  updateDialog(result: string, dialogData: Wallet) {
    if (result) {
      const updatedWallet: Wallet = {
        id: dialogData.id,
        name: result
      };

      this.updateWallet(updatedWallet);
    }
  }
}
