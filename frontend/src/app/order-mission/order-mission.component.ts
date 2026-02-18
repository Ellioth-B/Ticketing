import { Component, inject, signal } from '@angular/core';
import { Mission } from '../model/mission';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MissionService } from '../service/mission.service';
import { MatTable, MatTableModule } from "@angular/material/table";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-order-mission',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatTable, MatTableModule],
  templateUrl: './order-mission.component.html',
  styleUrl: './order-mission.component.css'
})
export class OrderMissionComponent {
  // Signal pour incrémentation d'un compteur
  count = signal(0);
  // Signal pour contrôler la visibilité du formulaire
  showForm = signal(false);
  // Signal qui contient le tableau des missions
  missions = signal<Mission[]>([]);
  missionForm = this.formbuilder.group({
    type: ['', Validators.required],
    projet: [''],
    durationDay: [0],
    description: ['']
  });
  displayedColumns = ['type', 'projet', 'durationDay', 'description'];
  
  // Service injected
  auth = inject(AuthService)

  constructor(private formbuilder: FormBuilder, private missionService: MissionService) { }

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
    if (this.missionForm.valid) {
      const newMission = this.missionForm.value as Mission;

      this.missionService.postMission(newMission).subscribe({
        next: (res) => {
          this.missions.update(prev => [...prev, res]);
          this.missionForm.reset();
          console.log('✅ User saved:', res);
        },
        error: err => console.error('❌ Error:', err)
      })
    } else {
      console.log('❌ Erreur dans le formulaire')
      this.missionForm.markAllAsTouched();
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
