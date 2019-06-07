import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTablePagingComponent } from './person-table-paging.component';

describe('PersonTablePagingComponent', () => {
  let component: PersonTablePagingComponent;
  let fixture: ComponentFixture<PersonTablePagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonTablePagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTablePagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
