import { Component, OnInit } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { ApiService } from '../api.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { Person } from '../person';
import { ActivatedRoute } from '@angular/router';
import { RelationType } from '../relation-type.enum';

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.scss']
})
export class FamilyTreeComponent implements OnInit {

  id = null;
  q$ = new Subject<string>();
  persons: Person[] = [];
  parents: Person[] = [];
  children: Person[] = [];
  centerPerson: Person = null;

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.q$.pipe(switchMap(q => this.api.getPersons(q))).subscribe(results => {
      this.persons = results;
    });

    const id$ = this.activatedRoute.paramMap.pipe(map(params => params.get('id')), tap(id => this.id = id));
    const persons$ = id$.pipe(switchMap(() => this.api.getPersonsWithRelations()));

    combineLatest(id$, persons$).subscribe(([id, persons]) => {
      console.log(persons);
      this.centerPerson = persons.find(person => id === person.id);
      this.parents = this.getParents(this.centerPerson);
      this.children = this.getChildren(this.centerPerson);
    });
  }

  getParents(person: Person) {
    if (person && person.relations) {
      const persons: Person[] = [];
      person.relations.forEach(relation => {
        if (relation.type === RelationType.PARENT_CHILD && relation.person2.id === person.id) {
          persons.push(relation.person1);
        }
      });
      return persons;
    }
    return [];
  }

  getChildren(person: Person) {
    if (person && person.relations) {
      const persons: Person[] = [];
      person.relations.forEach(relation => {
        if (relation.type === RelationType.PARENT_CHILD && relation.person1.id === person.id) {
          persons.push(relation.person2);
        }
      });
      return persons;
    }
    return [];
  }

  search(event) {
    this.q$.next(event);
  }

}
