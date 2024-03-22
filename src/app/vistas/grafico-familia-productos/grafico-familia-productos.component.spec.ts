import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoFamiliaProductosComponent } from './grafico-familia-productos.component';

describe('GraficoFamiliaProductosComponent', () => {
  let component: GraficoFamiliaProductosComponent;
  let fixture: ComponentFixture<GraficoFamiliaProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoFamiliaProductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficoFamiliaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
