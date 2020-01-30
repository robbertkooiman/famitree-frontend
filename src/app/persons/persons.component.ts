import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  persons: Person[] = [];

  constructor(private api: ApiService) {
    api.getPersons().subscribe(response => {
      this.persons = response;
    });
  }

  ngOnInit() {

  }

}
