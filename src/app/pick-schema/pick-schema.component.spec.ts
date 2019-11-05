import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickSchemaComponent } from './pick-schema.component';

describe('PickSchemaComponent', () => {
  let component: PickSchemaComponent;
  let fixture: ComponentFixture<PickSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
