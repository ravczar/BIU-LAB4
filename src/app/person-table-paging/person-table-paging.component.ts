import { Component, OnInit, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'person-table-paging',
  templateUrl: './person-table-paging.component.html',
  styleUrls: ['./person-table-paging.component.css']
})
export class PersonTablePagingComponent implements OnInit {

  //pod te pola inne komponenty będą mogły podpinac swoje metody
  @Output() next: EventEmitter<any> = new EventEmitter();  
  @Output() prev: EventEmitter<any> = new EventEmitter();
  
  //te metody są użyte w definicji szablonu
  clickOnNext(){
    this.next.emit(null);//wywołanie zdarzenia
  }

  clickOnPrev(){
    this.prev.emit(null);
  }

  constructor() { }

  ngOnInit() {
  }

}
