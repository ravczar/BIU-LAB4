import { Component, OnInit } from '@angular/core';
import { Person } from "app/models/person";
import { PersonService, PagingInfo } from "app/services/person-service";

@Component({
  selector: 'person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent implements OnInit {

  items: Person[] = [];
  public numbersTBDarray: Array<number> = [];

  private currentPage : number = 1;
  private showFilters :boolean = false;

  //sorting
  private idAsc: boolean = true;
  private nameAsc: boolean = true;
  private lastNameAsc: boolean = true;
  private genderAsc: boolean = true;
  private emailAsc: boolean = true;
  private ageASC: boolean = true;
  private birthdayAsc: boolean = true;
  private incomeASC: boolean = true;

  //filters
  private nameFilter: string;
  private surnameFilter: string;
  private maleFilter: boolean = true;
  private femaleFilter: boolean = true;
  private emailFilter: string;
  private ageFromFilter: string;
  private ageToFilter: string;
  private birthFromFilter: string;
  private birthToFilter: string;
  private incomeFromFilter: string;
  private incomeToFilter: string;

  public filter() {    
    var filteredItems = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
    
    if(this.nameFilter != null && this.nameFilter != '') {
      filteredItems = filteredItems.filter(item => item.firstname.toUpperCase() == this.nameFilter.toUpperCase())
    }

    if(this.surnameFilter != null && this.surnameFilter != '') {
      filteredItems = filteredItems.filter(item => item.lastname.toUpperCase() == this.surnameFilter.toUpperCase())
    }

    if(this.maleFilter == false) {
      filteredItems = filteredItems.filter(item => item.gender != "Male")
    }

    if(this.femaleFilter == false) {
      filteredItems = filteredItems.filter(item => item.gender != "Female")
    }

    if(this.emailFilter != null && this.emailFilter != '') {
      filteredItems = filteredItems.filter(item => item.email.toUpperCase() == this.emailFilter.toUpperCase())
    }

    if(this.ageFromFilter != null && this.ageFromFilter != '') {
      filteredItems = filteredItems.filter(item => item.age >= parseInt(this.ageFromFilter))
    }

    if(this.ageToFilter != null && this.ageToFilter != '') {
      filteredItems = filteredItems.filter(item => item.age <= parseInt(this.ageToFilter))
    }

    if(this.birthFromFilter != null && this.birthFromFilter != '') {
      filteredItems = filteredItems.filter(item => item.birthday >= new Date(this.birthFromFilter))
    }

    if(this.birthToFilter != null && this.birthToFilter != '') {
      filteredItems = filteredItems.filter(item => item.birthday <= new Date(this.birthToFilter))
    }

    if(this.incomeFromFilter != null && this.incomeFromFilter != '') {
      filteredItems = filteredItems.filter(item => item.income >= parseFloat(this.incomeFromFilter))
    }

    if(this.incomeToFilter != null && this.incomeToFilter != '') {
      filteredItems = filteredItems.filter(item => item.income <= parseFloat(this.incomeToFilter))      
    }

    this.items = filteredItems;
  }

  public getCurrentPage(){
    return this.currentPage;
  }
  public sortById(){ // podobne do income, age
    if (this.idAsc)
      this.items.sort((x, y) => x.id -y.id );
    else
      this.items.sort((x, y) => y.id - x.id);
    this.idAsc = !this.idAsc;
  }
  public sortByName() {
    if (this.nameAsc)
      this.items.sort((x, y) => x.firstname.localeCompare(y.firstname));
    else
      this.items.sort((x, y) => -x.firstname.localeCompare(y.firstname));
    this.nameAsc = !this.nameAsc;
  }
  public sortBySurname() {
    if (this.lastNameAsc)
      this.items.sort((x, y) => x.lastname.localeCompare(y.lastname));
    else
      this.items.sort((x, y) => -x.lastname.localeCompare(y.lastname));
    this.lastNameAsc = !this.lastNameAsc;
  }
  public sortByGender() {
    if (this.genderAsc)
      this.items.sort((x, y) => x.gender.localeCompare(y.gender));
    else
      this.items.sort((x, y) => -x.gender.localeCompare(y.gender));
    this.genderAsc = !this.genderAsc;
  }
  public sortByEmail() {
    if (this.emailAsc)
      this.items.sort((x, y) => x.email.localeCompare(y.email));
    else
      this.items.sort((x, y) => -x.email.localeCompare(y.email));
    this.emailAsc = !this.emailAsc;
  }
  public sortByAge() { // różni się od poprzednich!
    if (this.ageASC)
      this.items.sort((x, y) => x.age - y.age );
    else
      this.items.sort((x, y) => y.age -x.age);
    this.ageASC = !this.ageASC;
  }
  public sortByBirthday() { // różni się od poprzednich!
    if (this.birthdayAsc)
      this.items.sort((x, y) => new Date(x.birthday).valueOf() - new Date(y.birthday).valueOf() ); 
    else
      this.items.sort((x, y) => new Date(y.birthday).valueOf() - new Date(x.birthday).valueOf() ); 
    this.birthdayAsc = !this.birthdayAsc;
  }
  public sortByIncome() {
    if (this.incomeASC)
      this.items.sort((x, y) => x.income - y.income);
    else
      this.items.sort((x, y) => y.income -x.income);
    this.incomeASC = !this.incomeASC;
  }
public showFilterRow(){
  this.showFilters = !this.showFilters;
  console.log("Zmieniono showFilters na: " + this.showFilters);
}


  public next() {
    this.items = [];
    this.currentPage++;
    // this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
    this.filter();
  }

  public prev(): void {
    if (this.currentPage <= 1) return;
    this.items = [];
    this.currentPage--;
    // this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
    this.filter();
  }

  public refresh(peopleToBeNotShown :Array<number>): void {
    this.items = this.personService.getPeopleExceptSomeRecords(new PagingInfo(this.currentPage, 10), peopleToBeNotShown);
  }

  constructor(public personService: PersonService) { }

  ngOnInit() {
    this.items = this.personService.getPeople(new PagingInfo(1, 10));
  }

}
