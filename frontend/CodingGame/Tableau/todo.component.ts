// Exo demandé via Arche mc2

import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Task {
  libelle: string;
  estTraitee: '1' | '0';
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html'
})

export class TodoComponent {

  newTask = ' ';

  // Préchargement (bonus)
  tasks = signal<Task[]>([
    { libelle: 'Travailler avec Arche-mc2', estTraitee: '0' },
    { libelle: 'Faire le test technique', estTraitee: '1' }
  ]);

  //Permet d'ajouter une nouvelle task dans la liste "tasks"
  addTask() {
    this.tasks.update(listOfTasks => [ // "listOfTasks" vaut toute les valeurs de tasks qui existe déjà (par défaut les 2 dans le Préchargement)
      ...listOfTasks,
      { libelle: this.newTask, estTraitee: '0' } // "this.newTask" vaut ce qu'on met dans l'input grace a "[(ngModel)]="newTask"" coté HTML
    ]);

    // Clear de la variable pour être prêt a ré-utiliser la fnct.
    this.newTask = '';
  }

  //Permet de changé la property "estTraitee" quand on clique dessus.
  toggleTask(index: number) {
    this.tasks.update(list =>
      list.map((OnetaskOfList, i) =>
        i === index ? { ...OnetaskOfList, estTraitee: OnetaskOfList.estTraitee === '1' ? '0' : '1' } : OnetaskOfList 
        // "...OnetaskOfList" on copie l'objet, meilleur detection des changement
        // "{ ...OnetaskOfList, estTraitee", on ne change que la property "estTraitee"
        // "OnetaskOfList.estTraitee === '1' ? '0' : '1' }" condtion, si "estTraitee" vaut 1 alors vaut 0, sinon vaut 1
        // "i === index ? { ...OnetaskOfList, estTraitee: OnetaskOfList.estTraitee === '1' ? '0' : '1' } : OnetaskOfList" si l'index sur lequel on a cliqué n'est pas le même que celui dans la list alors on change rien.
      )
    );
  }

  deleteTask(index: number) {
    this.tasks.update(listOfTasks =>   // "listOfTasks" vaut la liste de tasks qui existe déjà (par défaut les 2 dans le Préchargement)
      listOfTasks.filter((_, i) => i !== index) // filter permet de garder TOUTE les task SAUF celle où l'index correspond où on a cliquer 
      // listOfTasks.filter((task, i) => i !== index)
        // "_" vaut la valeur du tableau mais veux dire "c'est la valeur du tableau mais je m'en sert pas" (convention nommage). (Ex : "_" vaut "libelle: 'Travailler avec Arche-mc2'")
    );
  }
}
