import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteProductoMesComponent } from './reporte-producto-mes.component';

describe('ReporteProductoMesComponent', () => {
  let component: ReporteProductoMesComponent;
  let fixture: ComponentFixture<ReporteProductoMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteProductoMesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteProductoMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
