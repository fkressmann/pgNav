import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSearchComponent } from './table-search.component';

describe('TableSearchComponent', () => {
  let component: TableSearchComponent;
  let fixture: ComponentFixture<TableSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
