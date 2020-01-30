import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { Status } from '../status';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input('person') person: Person;

  constructor(private api: ApiService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  formatStatus(status: Status) {
    return status.substr(0,1)+status.substr(1).toLowerCase();
  }

  delete() {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { name: this.person.firstName + ' ' + this.person.lastName }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.api.deletePerson(this.person.id);
      }
    });
  }

}
