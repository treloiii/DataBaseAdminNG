import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddRowsTableComponent } from './modal-add-rows-table.component';

describe('ModalAddRowsTableComponent', () => {
  let component: ModalAddRowsTableComponent;
  let fixture: ComponentFixture<ModalAddRowsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddRowsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddRowsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
