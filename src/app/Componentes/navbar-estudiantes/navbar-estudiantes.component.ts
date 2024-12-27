import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TLista } from '../Controlador/TLista'; // Importar el controlador

@Component({
  selector: 'app-navbar-estudiantes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar-estudiantes.component.html',
  styleUrls: ['./navbar-estudiantes.component.css']
})
export class NavbarEstudiantesComponent implements OnInit {
  isOpen: boolean = true;
  isMobile: boolean = false;
  private tLista = TLista.getInstance(); // Instancia del controlador

  @Output() sidebarToggle = new EventEmitter<boolean>();

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    this.isOpen = !this.isMobile;
    this.sidebarToggle.emit(this.isOpen);
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.sidebarToggle.emit(this.isOpen);
  }

  navigate() {
    if (this.isMobile) {
      this.isOpen = false;
      this.sidebarToggle.emit(this.isOpen);
    }
  }

  navigateAndReset() {
    this.tLista.setEstudianteEditar(null); // Limpia el estudiante en edición
    this.navigate(); // Llama al método de navegación
  }
}
