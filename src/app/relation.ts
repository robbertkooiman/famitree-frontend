import { RelationType } from './relation-type.enum';

// The relation class describes what data to expect
export class Relation {
    id?: string;
    type: RelationType;
    person1: any;
    person2: any;
    constructor(relation) {
        return {
            type: relation.type,
            person1: relation.person1,
            person2: relation.person2,
        }
    }
}
