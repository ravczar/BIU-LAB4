import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from "app/models/person";
import { PersonTableComponent } from '../person-table/person-table.component'
import { PersonService } from "app/services/person-service";


@Component({
  selector: '[person-table-row]', // <-- o tutaj
  templateUrl: './person-table-row.component.html',
  styleUrls: ['./person-table-row.component.css']
})
export class PersonTableRowComponent implements OnInit {

  @Input() model:Person;
  @Input() tableParent: PersonTableComponent;
  @Input() ngStyle: { [klass: string]: any; } 
  
  @Output() stateChange = new EventEmitter();

  private editColor : string = "#007bff";
  private deleteColor : string = "#dc3545";

  firstNameInput: string;
  lastNameInput: string;
  genderInput: string;
  emailInput: string;
  ageInput: string;
  birthdayInput: string;
  incomeInput: string;

  isBeingEdited: boolean = false;
  isBeingDeleted: boolean = false;

  constructor() { }

  ngOnInit() {
    this.setInputElementsValuesFromModel()
    this.stateChange.emit("normal")
  }

  private setInputElementsValuesFromModel(): void {
    this.firstNameInput = this.model.firstname;
    this.lastNameInput = this.model.lastname;
    this.genderInput = this.model.gender;
    this.emailInput = this.model.email;
    this.ageInput = this.model.age.toString();
    this.birthdayInput = this.model.birthday.toString();
    this.incomeInput = this.model.income.toString();
  }

  private updateModelFromInputElements(): void {
    this.model.firstname = this.firstNameInput;
    this.model.lastname = this.lastNameInput;
    this.model.gender = this.genderInput;
    this.model.email = this.emailInput;
    this.model.age = parseInt(this.ageInput);
    this.model.birthday = new Date(this.birthdayInput);
    this.model.income = parseFloat(this.incomeInput);
  }

  private toggleDeletionState(isCanceled: boolean): void {
    if(isCanceled === undefined) isCanceled = false;

    this.isBeingDeleted = !this.isBeingDeleted;

    if(this.isBeingDeleted) {
      this.stateChange.emit("delete");
    } else if (!isCanceled) {
      this.tableParent.numbersTBDarray.push(this.model.id);
      this.tableParent.refresh(this.tableParent.numbersTBDarray);
    } else {
      this.stateChange.emit("normal");
    }
  }

  private toggleEditState(isCanceled: boolean): void {
    //this.tableParent.removeItemsTBD();
    //console.log("To są komponenty w komponencie person-table.items: "+ "ID osoby:" + this.tableParent.items[0].id+ "  imie: " + this.tableParent.items[0].firstname ); // do skasowania
    if(isCanceled === undefined) isCanceled = false;
    
    this.isBeingEdited = !this.isBeingEdited;

    if(!this.isBeingEdited) {
      if(isCanceled) {
        this.setInputElementsValuesFromModel()
      } else {
        this.updateModelFromInputElements()
      }
      this.stateChange.emit("normal")
    } else {
      this.stateChange.emit("edit")
    }
  }

}
