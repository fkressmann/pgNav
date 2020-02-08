import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDetailsAddDialogComponent } from './table-details-add-dialog.component';

describe('TableDetailsAddDialogComponent', () => {
  let component: TableDetailsAddDialogComponent;
  let fixture: ComponentFixture<TableDetailsAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDetailsAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDetailsAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
