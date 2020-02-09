import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignKeyRefsComponent } from './foreign-key-refs.component';

describe('ForeignKeyRefsComponent', () => {
  let component: ForeignKeyRefsComponent;
  let fixture: ComponentFixture<ForeignKeyRefsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeignKeyRefsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignKeyRefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
