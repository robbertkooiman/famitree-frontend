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
  ) {
    // If the person is filled in, we want to edit the person instead of adding a new one
    if (data && data.person) {
      this.person = { id: data.person.id, firstName: data.person.firstName, lastName: data.person.lastName, birthDate: data.person.birthDate, deathDate: data.person.deathDate, status: data.person.status };
    }
  }

  person: Person = new Person({ status: 'UNKNOWN' });
}
