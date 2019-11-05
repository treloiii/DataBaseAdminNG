import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateTableComponent } from './modal-create-table.component';

describe('ModalCreateTableComponent', () => {
  let component: ModalCreateTableComponent;
  let fixture: ComponentFixture<ModalCreateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
