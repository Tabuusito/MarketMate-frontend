import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajasMesComponent } from './cajas-mes.component';

describe('CajasMesComponent', () => {
  let component: CajasMesComponent;
  let fixture: ComponentFixture<CajasMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CajasMesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CajasMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
