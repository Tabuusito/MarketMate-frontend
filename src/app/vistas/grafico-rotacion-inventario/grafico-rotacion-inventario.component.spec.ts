import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoRotacionInventarioComponent } from './grafico-rotacion-inventario.component';

describe('GraficoRotacionInventarioComponent', () => {
  let component: GraficoRotacionInventarioComponent;
  let fixture: ComponentFixture<GraficoRotacionInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoRotacionInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficoRotacionInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
