import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { MatButton, MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  template: `
    <table 
      mat-table 
      [dataSource]="dataSource" multiTemplateDataRows
      class="{{ tableClass }}"
      >

      @for (column of columnsToDisplay; track column) {
        <ng-container matColumnDef="{{column}}">
          <th mat-header-cell *matHeaderCellDef> {{column | titlecase }} </th>
          <td mat-cell *matCellDef="let element"> {{element[column]}} </td>
        </ng-container>
      }


      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef aria-label="row actions">&nbsp;</th>
        <td mat-cell *matCellDef="let element" class="actions-column">
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>more_vert</mat-icon>
          </button>

          <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="optionSelected(0, element)">Edit</button>
            <button mat-menu-item (click)="optionSelected(1, element)">Delete</button>
          </mat-menu>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columnsToDisplayWithMenu "></tr>
      <tr mat-row *matRowDef="let element; columns: columnsToDisplayWithMenu;"></tr>
    </table>
  `,
  styles: `
    :host {
      display: block;
    }
    .actions-column {
      width: 50px;
    }
  `,
})
export class TableComponent {
  @Input() columnsToDisplay!: string[];
  @Input() columnsToDisplayWithMenu!: string[];
  @Input() data!: any[];
  @Input() tableClass = '';
  @Output() selectedRowsChange = new EventEmitter<any>();
  @ViewChild(MatMenuTrigger) menu!: MatMenuTrigger;
  dataSource = new MatTableDataSource();
  contextMenu = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.dataSource.data = changes?.['data'].currentValue;
    }
  }

  optionSelected(option: number, row: any) {
    this.selectedRowsChange.emit({option, row});
  }
}
