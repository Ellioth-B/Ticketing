import { Component, Input, Signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent<T extends Record<string, any>> {
  @Input() data!: Signal<T[]>; // Signal des données à afficher
  @Input() columns!: { key: keyof T; label: string }[]; // Colonnes affichable

  get displayedColumns(): string[] {
    return this.columns.map(c => c.key as string); // c = column
  }

  getKeyAsString(key: keyof T): string {
  return key as string;
}
}
