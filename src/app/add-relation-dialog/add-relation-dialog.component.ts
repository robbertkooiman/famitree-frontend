import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../api.service';
import { RelationType } from '../relation-type.enum';
import { Relation } from '../relation';

@Component({
  selector: 'app-add-relation-dialog',
  templateUrl: './add-relation-dialog.component.html',
  styleUrls: ['./add-relation-dialog.component.scss']
})
export class AddRelationDialogComponent implements OnInit {
  relationships = ["Parent", "Child", "Sibling", "Partner"];
  persons = [];
  selectedRelation = null;
  selectedPerson = null;

  constructor(
    public dialogRef: MatDialogRef<AddRelationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.getPersons().subscribe(persons => {
      this.persons = persons;
    })
  }

  add() {
    let relation: Relation = null;
    if (this.selectedRelation && this.selectedPerson) {
      switch (this.selectedRelation) {
        case OneWayRelationTypes.PARENT:
          relation = new Relation({
            type: RelationType.PARENT_CHILD,
            person1: this.data.person.id,
            person2: this.selectedPerson
          });
          break;
        case OneWayRelationTypes.CHILD:
          relation = new Relation({
            type: RelationType.PARENT_CHILD,
            person1: this.selectedPerson,
            person2: this.data.person.id,
          });
          break;
        case OneWayRelationTypes.SIBLING:
          relation = new Relation({
            type: RelationType.SIBLING,
            person1: this.data.person.id,
            person2: this.selectedPerson
          });
          break;
        case OneWayRelationTypes.PARTNER:
          relation = new Relation({
            type: RelationType.PARTNER,
            person1: this.data.person.id,
            person2: this.selectedPerson
          });
          break;
      }
    }
    this.dialogRef.close(relation);
  }
}

enum OneWayRelationTypes {
  PARENT = 'Parent',
  CHILD = 'Child',
  SIBLING = 'Sibling',
  PARTNER = 'Partner'
}