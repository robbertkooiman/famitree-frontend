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
    this.api.getPersonsWithRelations().subscribe(persons => {
      this.persons = persons;
    })
  }

  ngOnInit() {

  }

}
