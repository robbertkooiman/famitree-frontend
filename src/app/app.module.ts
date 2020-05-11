import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonsComponent } from './persons/persons.component';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { PersonComponent } from './person/person.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { AddPersonDialogComponent } from './add-person-dialog/add-person-dialog.component';
import { AddRelationDialogComponent } from './add-relation-dialog/add-relation-dialog.component';
import { HomeComponent } from './home/home.component';
import { FamilyTreeComponent } from './family-tree/family-tree.component';
import { FamilyTreePersonComponent } from './family-tree-person/family-tree-person.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PersonsComponent,
    PersonComponent,
    AddPersonComponent,
    ConfirmDeleteDialogComponent,
    AddPersonDialogComponent,
    AddRelationDialogComponent,
    HomeComponent,
    FamilyTreeComponent,
    FamilyTreePersonComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDeleteDialogComponent,
    AddPersonDialogComponent,
    AddRelationDialogComponent,
  ]
})
export class AppModule { }
