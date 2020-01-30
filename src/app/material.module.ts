import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material';


const IMPORTS = [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
];

@NgModule({
    imports: IMPORTS,
    exports: IMPORTS,
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class MaterialModule { }