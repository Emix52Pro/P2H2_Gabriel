import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Estudiante } from '../Clases/Estudiante';
import { TLista } from '../Controlador/TLista';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-estudiantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-estudiantes.component.html',
  styleUrl: './listar-estudiantes.component.css'
})
export class ListarEstudiantesComponent {
  private tLista = TLista.getInstance();
  estudiantes$ = this.tLista.estudiantes$;

  constructor(private router: Router) {}

  eliminarEstudiante(codigo: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tLista.eliminarEstudiante(codigo);
        Swal.fire(
          '¡Eliminado!',
          'El estudiante ha sido eliminado.',
          'success'
        );
      }
    });
  }

  editarEstudiante(estudiante: Estudiante) {
    this.tLista.setEstudianteEditar(estudiante);
    this.router.navigate(['/agregar-estudiante']);
  }
}
