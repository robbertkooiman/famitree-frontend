import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { ApiService } from '../api.service';
import { Observable, combineLatest } from 'rxjs';
import { Relation } from '../relation';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  persons: Person[] = [];
  relations: Relation[] = [];

  constructor(private api: ApiService) {
    combineLatest(this.api.getPersons(), this.api.getRelations()).subscribe(([persons, relations]) => {
      this.persons = [].concat(persons);
      relations.forEach(relation => {
        this.persons.forEach(person => {
          if (person.id === relation.person1.id) {
            relation.person1 = person;
          } else if (person.id === relation.person2.id) {
            relation.person2 = person;
          }
        });
        this.persons.forEach(person => {
          if ((person.id === relation.person1.id || person.id === relation.person2.id)) {
            !person.relations ? person.relations = [relation] : !person.relations.find(find => find.id === relation.id) ? person.relations.push(relation) : null;
          }
        });
      });
    });
  }

  ngOnInit() {

  }

}
