import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasEstudiantesComponent } from './consultas-estudiantes.component';

describe('ConsultasEstudiantesComponent', () => {
  let component: ConsultasEstudiantesComponent;
  let fixture: ComponentFixture<ConsultasEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultasEstudiantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultasEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
