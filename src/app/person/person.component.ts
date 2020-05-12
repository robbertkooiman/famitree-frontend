import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { Status } from '../status';
import { Relation } from '../relation';
import { RelationType } from '../relation-type.enum';
import { AddRelationDialogComponent } from '../add-relation-dialog/add-relation-dialog.component';
import { AddPersonDialogComponent } from '../add-person-dialog/add-person-dialog.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})

// This component displays one person object
export class PersonComponent implements OnInit {

  @Input('person') person: Person;
  @Input('plain') plain: boolean = false;

  constructor(private api: ApiService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  // Format the status as normally capitalized text
  formatStatus(status: Status) {
    return status.substr(0, 1) + status.substr(1).toLowerCase();
  }

  // Format the relation in readable text
  formatRelation(relation: Relation) {
    switch (relation.type) {
      case RelationType.PARENT_CHILD:
        return relation.person1.id === this.person.id ? "Parent of " + relation.person2.firstName : "Child of " + relation.person1.firstName;
      case RelationType.SIBLING:
        return relation.person1.id === this.person.id ? "Sibling of " + relation.person2.firstName : "Sibling of " + relation.person1.firstName;
      case RelationType.PARTNER:
        return relation.person1.id === this.person.id ? "Partner of " + relation.person2.firstName : "Partner of " + relation.person1.firstName;
    }
  }

  // Add a relation to this person
  addRelation() {
    this.dialog.open(AddRelationDialogComponent,
      { data: { person: this.person } }
    ).afterClosed().subscribe(relation => {
      if (relation) {
        this.api.createRelation(relation);
      }
    })
  }

  // Edit this person via a dialog
  editPerson() {
    this.dialog.open(AddPersonDialogComponent,
      { data: { person: this.person } }
    ).afterClosed().subscribe(person => {
      if (person) {
        this.api.editPerson(person);
      }
    })
  }

  // Delete this person, but confirm with dialog first
  delete() {
    this.dialog.open(ConfirmDeleteDialogComponent,
      { data: { name: this.person.firstName + ' ' + this.person.lastName } }
    ).afterClosed().subscribe(result => {
      if (result) {
        this.api.deletePerson(this.person.id);
      }
    });
  }

  // Delete a relation of this person, confirm with dialog first
  deleteRelation(relationId) {
    this.dialog.open(ConfirmDeleteDialogComponent,
      { data: { name: this.person.firstName + '\'s relation' } }
    ).afterClosed().subscribe(result => {
      if (result) {
        this.api.deleteRelation(relationId);
      }
    });
  }

}
