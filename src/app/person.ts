import { Status } from './status';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;
import { Relation } from './relation';

export class Person {
    id?: string
    firstName: string
    lastName: string
    birthDate: Timestamp
    deathDate: Timestamp
    status: Status
    relations?: Relation[]
    constructor(person) {
        return {
            firstName: person.firstName || '',
            lastName: person.lastName || '',
            birthDate: person.birthDate || null,
            deathDate: person.deathDate || null,
            status: person.status || Status.UNKNOWN,
        }
    }
}
