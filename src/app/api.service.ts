import { Injectable } from '@angular/core';
import { Person } from './person';
import { Relation } from './relation';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public db: AngularFirestore) {

  }

  public getPersons() {
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

}
