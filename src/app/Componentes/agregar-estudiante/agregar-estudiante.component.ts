import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TLista } from '../Controlador/TLista';
import { Estudiante } from '../Clases/Estudiante';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-estudiante.component.html',
  styleUrls: ['./agregar-estudiante.component.css']
})
export class AgregarEstudianteComponent implements OnInit {
  private tLista = TLista.getInstance();
  estudiante: Estudiante | null = null;
  form: {
    codigo: string;
    cedula: string;
    nombres: string;
    apellidos: string;
    sexo: string;
    fechaNacimiento: string;
    P1: number;
    P2: number;
    ER: number | null;
  } = {
    codigo: '',
    cedula: '',
    nombres: '',
    apellidos: '',
    sexo: 'M',
    fechaNacimiento: '',
    P1: 0,
    P2: 0,
    ER: null
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.estudiante = this.tLista.getEstudianteEditar();
    if (this.estudiante) {
      // Cargar datos del estudiante si se está editando
      this.form = {
        codigo: this.estudiante.codigo,
        cedula: this.estudiante.cedula,
        nombres: this.estudiante.nombres,
        apellidos: this.estudiante.apellidos,
        sexo: this.estudiante.sexo,
        fechaNacimiento: this.estudiante.fechaNacimiento.toISOString().split('T')[0],
        P1: this.estudiante.P1,
        P2: this.estudiante.P2,
        ER: this.estudiante.ER || null
      };
      this.tLista.setEstudianteEditar(null); // Limpia el estado del estudiante en edición
    } else {
      // Si no se está editando, inicializar el formulario vacío
      const estudiantes = this.tLista.getEstudiantes();
      const lastCode = estudiantes.length > 0 ? Math.max(...estudiantes.map(e => +e.codigo.replace('EST', ''))) : 0;
      this.form = {
        codigo: `EST${(lastCode + 1).toString().padStart(3, '0')}`,
        cedula: '',
        nombres: '',
        apellidos: '',
        sexo: 'M',
        fechaNacimiento: '',
        P1: 0,
        P2: 0,
        ER: null
      };
    }
  }
  
  
  
  guardarEstudiante() {
    if (!this.validarFormulario()) return;

    const estudiante = new Estudiante(
      this.form.cedula,
      this.form.nombres,
      this.form.apellidos,
      this.form.sexo,
      new Date(this.form.fechaNacimiento),
      this.form.codigo,
      this.form.P1,
      this.form.P2,
      this.form.ER
    );

    if (this.estudiante) {
      this.tLista.actualizarEstudiante(estudiante);
      Swal.fire('Actualizado', 'El estudiante ha sido actualizado correctamente.', 'success');
    } else {
      this.tLista.agregarEstudiante(estudiante);
      Swal.fire('Guardado', 'El estudiante ha sido agregado correctamente.', 'success');
    }

    this.router.navigate(['/listar-estudiantes']);
  }

  cancelar() {
    Swal.fire({
      title: '¿Cancelar?',
      text: 'Los cambios no se guardarán',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Volver'
    }).then(result => {
      if (result.isConfirmed) {
        this.router.navigate(['/listar-estudiantes']);
      }
    });
  }

  private validarFormulario(): boolean {
    if (!this.form.cedula || !this.form.nombres || !this.form.apellidos || !this.form.fechaNacimiento) {
      Swal.fire('Error', 'Todos los campos obligatorios deben ser completados.', 'error');
      return false;
    }
    if (this.form.P1 < 0 || this.form.P2 < 0 || (this.form.ER !== null && this.form.ER < 0)) {
      Swal.fire('Error', 'Las notas no pueden ser negativas.', 'error');
      return false;
    }
    return true;
  }
}
