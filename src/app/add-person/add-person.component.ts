import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() added = new EventEmitter();

  constructor(private api: ApiService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  add() {
    // To add a new person, open a dialog to define the properties and then send to API
    this.dialog.open(AddPersonDialogComponent).afterClosed().subscribe(person => {
      if (person) {
        this.api.createPerson(person).then(person => {
          this.added.emit(person.id);
        });
      }
    });
  }

}
