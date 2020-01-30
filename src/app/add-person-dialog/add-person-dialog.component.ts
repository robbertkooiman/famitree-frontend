import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '../person';

@Component({
  selector: 'app-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.scss']
})
export class AddPersonDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  person: Person = new Person({status: 'UNKNOWN'});
}
