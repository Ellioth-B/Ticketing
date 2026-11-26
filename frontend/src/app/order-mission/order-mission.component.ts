import { Component, inject, signal } from '@angular/core';
import { Mission } from '../model/mission';
import { MatCardModule } from '@angular/material/card';
import { form, FormField, required } from '@angular/forms/signals';

import { MissionService } from '../service/mission.service';
import { MatTable, MatTableModule } from "@angular/material/table";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon'
import { DialogOrderComponent } from '../Dialog/dialog-order/dialog-order.component';
import { SlicePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-order-mission',
  imports: [FormsModule, FormField, MatCardModule, MatTable, MatTableModule, MatIcon, MatButtonModule, SlicePipe],
  templateUrl: './order-mission.component.html',
  styleUrl: './order-mission.component.css',
})
export class OrderMissionComponent {
  // Signal pour incrémentation d'un compteur
  count = signal(0);
  // Signal pour contrôler la visibilité du formulaire
  showForm = signal(false);
  // Signal qui contient le tableau des missions
  missions = signal<Mission[]>([]);
  missionModel = signal({
    type: '',
    projet: '',
    durationday: 0,
    description: ''
  });
  // Création du formulaire et validation si "type" est saisi
  missionForm = form(this.missionModel, (path) => {
    required(path.type);
  });
  displayedColumns = ['type', 'projet', 'durationday', 'description', 'actions'];

  // Service injected
  auth = inject(AuthService)

  //Ouverture d'une pop-up sur la page pour afficher le détail du ticket avec un bouton
  readonly dialog = inject(MatDialog);
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, mission: Mission): void {
    this.dialog.open(DialogOrderComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        mission: mission
      }
    });
  }

  constructor(private missionService: MissionService) { }

  ngOnInit() {
    // Charger toutes les missions au démarrage
    this.missionService.getMissions().subscribe(data => {
      this.missions.set(data); // on remplit le signal avec la BDD
    });
  }

  // Permet d'ouvrir ou fermer, de caché ou montrer le formulaire
  toggleForm() {
    this.showForm.update(state => !state);
  }

  onSubmit() {
    if (this.missionForm().valid()) {
      const newMission = this.missionModel() as Mission;

      this.missionService.postMission(newMission).subscribe({
        next: (res) => {
          this.missions.update(prev => [...prev, res]);
          this.missionForm().reset();
          console.log('✅ User saved:', res);
        },
        error: err => console.error('❌ Error:', err)
      })
    } else {
      console.log('❌ Erreur dans le formulaire')
      this.missionForm().markAsTouched();
    }
  }

  // Supprime une mission et update le Signal
  deleteMission(id: number) {
    this.missionService.deleteMission(id).subscribe(() => {
      this.missions.update(missions => missions.filter(m => m.id !== id)) // On garde toutes les missions où l’id est différent de celui que j'ai supprimer
    });
  }



  // Entrainement Signal
  //   inc() {
  //     this.count.set(this.count() + 1);
  //   }

  //   items = signal<number[]>([]);
  //   total = computed(() => this.items().reduce((a, b) => a + b, 0));

  //   logEffect = effect(() => {
  //   console.log('Total:', this.total());
  // });

  // addItem(price: number) {
  //   this.items.update(items => [...items, price]);
  // }

  // clear() {
  //   this.items.set([]);
  // }
}
