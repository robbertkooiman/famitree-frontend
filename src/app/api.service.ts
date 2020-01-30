import { Injectable } from '@angular/core';
import { Person } from './person';
import { environment } from './../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

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
  public createPerson(person) {
    return this.db.collection('persons').add(person);
  }
  public deletePerson(personId) {
    return this.db.collection('persons').doc(personId).delete();
  }

}
