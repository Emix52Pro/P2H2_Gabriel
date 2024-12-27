import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarEstudiantesComponent } from './navbar-estudiantes.component';

describe('NavbarEstudiantesComponent', () => {
  let component: NavbarEstudiantesComponent;
  let fixture: ComponentFixture<NavbarEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarEstudiantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
