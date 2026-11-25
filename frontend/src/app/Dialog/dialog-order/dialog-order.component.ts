import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialog, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';
import { Mission } from '../../model/mission';

@Component({
  selector: 'app-dialog-order',
  imports: [MatButtonModule, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './dialog-order.component.html',
  styleUrl: './dialog-order.component.css',
})
export class DialogOrderComponent {
  readonly dialogRef = inject(MatDialogRef<DialogOrderComponent>);
  data = inject<{ mission: Mission }>(MAT_DIALOG_DATA);

  // private missionService = inject(MissionService);
  // additionalData: AdditionalMissionData | null = null;
  // ngOnInit() {
  //   this.missionService
  //     .getMissionsById(this.data.mission.id)
  //     .subscribe({
  //       next: (res) => {
  //         this.additionalData = res;
  //       },
  //       error: (err) => console.error(err)
  //     });
  // }
}
