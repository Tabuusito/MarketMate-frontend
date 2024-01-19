import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaVentasComponent } from './fecha-ventas.component';

describe('FechaVentasComponent', () => {
  let component: FechaVentasComponent;
  let fixture: ComponentFixture<FechaVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FechaVentasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FechaVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
