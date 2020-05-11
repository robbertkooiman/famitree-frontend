import { Injectable } from '@angular/core';
import { Person } from './person';
import { Relation } from './relation';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public db: AngularFirestore) {

  }

  public getPersons(q?: string) {
    if (q) {
      const start = q;
      const end = q + "\uf8ff";
      return this.db.collection('persons', ref => ref.orderBy('firstName').startAt(start).endAt(end)).snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Object;
          const id = a.payload.doc.id;
          return { id, ...data } as Person;
        });
      }));
    }
    return this.db.collection('persons').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Object;
        const id = a.payload.doc.id;
        return { id, ...data } as Person;
      });
    }));
  }
  public getRelations() {
    return this.db.collection('relations').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Object;
        const id = a.payload.doc.id;
        return { id, ...data } as Relation;
      });
    }));
  }
  public createPerson(person) {
    return this.db.collection('persons').add(person);
  }
  public createRelation(relation) {
    relation.person1 = this.db.doc('persons/' + relation.person1).ref;
    relation.person2 = this.db.doc('persons/' + relation.person2).ref;
    return this.db.collection('relations').add(relation);
  }
  public deletePerson(personId) {
    return this.db.collection('persons').doc(personId).delete();
  }
  public deleteRelation(relationId) {
    return this.db.collection('relations').doc(relationId).delete();
  }

  public getPersonsWithRelations() {
    return combineLatest(this.getPersons(), this.getRelations()).pipe(map(([persons, relations]) => {
      relations.forEach(relation => {
        persons.forEach(person => {
          if (person.id === relation.person1.id) {
            relation.person1 = person;
          } else if (person.id === relation.person2.id) {
            relation.person2 = person;
          }
        });
        persons.forEach(person => {
          if ((person.id === relation.person1.id || person.id === relation.person2.id)) {
            !person.relations ? person.relations = [relation] : !person.relations.find(find => find.id === relation.id) ? person.relations.push(relation) : null;
          }
        });
      });
      return persons;
    }));
  }

}
