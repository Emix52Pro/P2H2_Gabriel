import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarEstudiantesComponent } from "./Componentes/navbar-estudiantes/navbar-estudiantes.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarEstudiantesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'P2H2_Gabriel';
  isOpen = true;

  toggleSidebar(open: boolean) {
    this.isOpen = open;
  }
}
