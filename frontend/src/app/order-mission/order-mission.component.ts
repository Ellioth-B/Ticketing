import { Component, inject, signal } from '@angular/core';
import { Mission } from '../model/mission';
import { MatCardModule } from '@angular/material/card';
import { form, FormField, required } from '@angular/forms/signals';

import { MissionService } from '../service/mission.service';
import { MatTable, MatTableModule } from "@angular/material/table";
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-order-mission',
  imports: [FormsModule, FormField, MatCardModule, MatTable, MatTableModule],
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
    durationDay: 0,
    description: ''
  });
  // Création du formulaire et validation si "type" est saisi
  missionForm = form(this.missionModel, (path) => {
    required(path.type);
  });
  displayedColumns = ['type', 'projet', 'durationDay', 'description'];

  // Service injected
  auth = inject(AuthService)

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

  //TODO : Ouverture d'une pop-up sur la page pour afficher le détail du ticket avec un bouton "Accepter la mission" qui ajoute la mission dans nos mission en cours.
  openDialog() {

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
