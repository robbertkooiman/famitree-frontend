import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

// The navigation component doesn't have any logic, but displays links to the other pages
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
