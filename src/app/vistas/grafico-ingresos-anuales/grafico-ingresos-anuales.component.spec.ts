import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoIngresosAnualesComponent } from './grafico-ingresos-anuales.component';

describe('GraficoIngresosAnualesComponent', () => {
  let component: GraficoIngresosAnualesComponent;
  let fixture: ComponentFixture<GraficoIngresosAnualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoIngresosAnualesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficoIngresosAnualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
