import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRelacionComponent } from './crear-relacion.component';

describe('CrearRelacionComponent', () => {
  let component: CrearRelacionComponent;
  let fixture: ComponentFixture<CrearRelacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearRelacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
