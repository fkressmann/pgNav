import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableViewCardsComponent } from './table-view-cards.component';

describe('TableViewCardsComponent', () => {
  let component: TableViewCardsComponent;
  let fixture: ComponentFixture<TableViewCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableViewCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableViewCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
