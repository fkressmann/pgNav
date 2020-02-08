import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableViewListComponent } from './table-view-list.component';

describe('TableViewListComponent', () => {
  let component: TableViewListComponent;
  let fixture: ComponentFixture<TableViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
