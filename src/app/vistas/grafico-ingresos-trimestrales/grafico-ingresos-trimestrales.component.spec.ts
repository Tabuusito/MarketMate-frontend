import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoIngresosTrimestralesComponent } from './grafico-ingresos-trimestrales.component';

describe('GraficoIngresosTrimestralesComponent', () => {
  let component: GraficoIngresosTrimestralesComponent;
  let fixture: ComponentFixture<GraficoIngresosTrimestralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoIngresosTrimestralesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficoIngresosTrimestralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
