import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Status } from '../status';
import { firestore } from 'firebase';
import { Person } from '../person';
import { MatDialog } from '@angular/material/dialog';
import { AddPersonDialogComponent } from '../add-person-dialog/add-person-dialog.component';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {

  @Input() buttonText = "Add person";

  constructor(private api: ApiService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  add() {
    this.dialog.open(AddPersonDialogComponent).afterClosed().subscribe(person => {
      if (person) {
        this.api.createPerson(person);
      }
    });
  }

}
