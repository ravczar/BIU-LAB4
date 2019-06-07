import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PersonTableComponent } from './person-table/person-table.component';
import { PersonTableRowComponent } from './person-table-row/person-table-row.component';
import { PersonTableRowSortComponent } from './person-table-row-sort/person-table-row-sort.component';
import { PersonService } from "app/services/person-service";
import { PersonTablePagingComponent } from './person-table-paging/person-table-paging.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonTableComponent,
    PersonTableRowComponent,
    PersonTableRowSortComponent,
    PersonTablePagingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [PersonService], //<-- o tutaj !!
  bootstrap: [AppComponent]
})
export class AppModule { }
