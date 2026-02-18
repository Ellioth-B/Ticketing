import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}

//TODO List : 
//- Créer un git et push dessus le front et le back
//- Page login = Cacher le mdp quand on le saisit
//- Back-end NodeJS = Rangé les controller et les routes
//- Ouverture d'une pop-up sur la page Mission pour afficher le détail du ticket avec un bouton "Accepter la mission" qui ajoute la mission dans nos mission en cours. 
//    (User les prend et elle s'ajout dans notre résumé des missions en cours.)
//- Ajouter btn indiquant qu'une mission est finit, coté BDD un boolean true/fasle (fait/pas fait).
//- Ajouter un compteur de mission réalisé chez l'user
//- Toute les X missions réalisés, passage de grade pour l'user (dans son profil un résumé des mission réalisé avec son grade affiché) + ? nb de ticket a faire pour prochain grade ?
//- Ré-écrire app-table-generic format mat-table ?

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/