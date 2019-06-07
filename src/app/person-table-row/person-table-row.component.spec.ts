import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTableRowComponent } from './person-table-row.component';

describe('PersonTableRowComponent', () => {
  let component: PersonTableRowComponent;
  let fixture: ComponentFixture<PersonTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
