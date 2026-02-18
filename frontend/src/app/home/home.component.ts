import { Component, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GenericTableComponent } from '../genericComponent/generic-table/generic-table.component';
import { UserStats } from '../model/user-stats';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, GenericTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userStats = signal<UserStats[]>([
    {
      id: 0,
      amountKill: 75418,
      age: 659,
      chapter: 'Space marine'
    }
  ]);

  // Signal de base
  counter = signal(0);
  max = 10;

  // Signal dérivé (computed)
  doubleCounter = computed(() => this.counter() * 2);

  // Méthodes
  increment() {
    this.counter.update(current => {
      return current < this.max ? current + 1 : current;
    });
  }

  reset() {
    this.counter.set(0);
  }
}
