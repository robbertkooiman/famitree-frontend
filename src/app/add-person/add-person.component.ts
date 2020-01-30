import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Status } from '../status';
import { firestore } from 'firebase';
import { Person } from '../person';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  add() {
    this.api.createPerson(new Person({
      firstName: 'Mister',
      lastName: 'Test',
      birthDate: firestore.Timestamp.now(),
      status: Status.ALIVE
    }));
  }

}
