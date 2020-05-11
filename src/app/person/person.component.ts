import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { Status } from '../status';
import { Relation } from '../relation';
import { RelationType } from '../relation-type.enum';
import { AddRelationDialogComponent } from '../add-relation-dialog/add-relation-dialog.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input('person') person: Person;
  @Input('plain') plain: boolean = false;

  constructor(private api: ApiService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  formatStatus(status: Status) {
    return status.substr(0, 1) + status.substr(1).toLowerCase();
  }

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

  addRelation() {
    this.dialog.open(AddRelationDialogComponent,
      { data: { person: this.person } }
    ).afterClosed().subscribe(relation => {
      if (relation) {
        this.api.createRelation(relation);
      }
    })
  }

  delete() {
    this.dialog.open(ConfirmDeleteDialogComponent,
      { data: { name: this.person.firstName + ' ' + this.person.lastName } }
    ).afterClosed().subscribe(result => {
      if (result) {
        this.api.deletePerson(this.person.id);
      }
    });
  }

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
