import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

// The home component doesn't have any logic, but displays the landing page
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
