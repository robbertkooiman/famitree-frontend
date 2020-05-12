import { Component, OnInit } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { ApiService } from '../api.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { Person } from '../person';
import { ActivatedRoute, Router } from '@angular/router';
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
  siblings: Person[] = [];
  centerPerson: Person = null;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Set up query Subject, and id Subject from browser URL, and persons Subject from API
    this.q$.pipe(switchMap(q => this.api.getPersons(q))).subscribe(results => {
      this.persons = results;
    });

    const id$ = this.activatedRoute.paramMap.pipe(map(params => params.get('id')), tap(id => this.id = id));
    const persons$ = id$.pipe(switchMap(() => this.api.getPersonsWithRelations()));

    // Combine them all to get the person that's selected with their family tree
    combineLatest(id$, persons$).subscribe(([id, persons]) => {
      this.centerPerson = persons.find(person => id === person.id);
      this.parents = this.getParents(this.centerPerson);
      this.children = this.getChildren(this.centerPerson);
      this.siblings = this.getSiblings(this.centerPerson);
    });
  }

  getParents(person: Person) {
    if (person && person.relations) {
      const persons: Person[] = [];
      person.relations.forEach(relation => {
        if (relation.type === RelationType.PARENT_CHILD && relation.person2.id === person.id) {
          if (!relation.person1._key) persons.push(relation.person1);
        }
      });
      return persons;
    }
    return [];
  }

  getSiblings(person: Person) {
    if (person && person.relations) {
      const persons: Person[] = [];
      person.relations.forEach(relation => {
        if (relation.type === RelationType.SIBLING && (relation.person2.id === person.id)) {
          if (!relation.person1._key) persons.push(relation.person1);
        } else if (relation.type === RelationType.SIBLING && (relation.person1.id === person.id)) {
          if (!relation.person2._key) persons.push(relation.person2);

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
          if (!relation.person2._key) persons.push(relation.person2);
        }
      });
      return persons;
    }
    return [];
  }

  goto(personId: string) {
    this.router.navigate(['family-tree', personId])
  }

  makeParent(personId: string) {
    this.api.createRelation({
      person1: personId,
      person2: this.centerPerson.id,
      type: RelationType.PARENT_CHILD
    });
  }

  makeSibling(personId: string) {
    this.api.createRelation({
      person1: personId,
      person2: this.centerPerson.id,
      type: RelationType.SIBLING
    });
  }

  makeChild(personId: string) {
    this.api.createRelation({
      person1: this.centerPerson.id,
      person2: personId,
      type: RelationType.PARENT_CHILD
    });
  }

  search(event) {
    this.q$.next(event);
  }

}
