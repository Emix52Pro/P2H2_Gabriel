import { BehaviorSubject } from 'rxjs';
import { Estudiante } from '../Clases/Estudiante';

export class TLista {
  [x: string]: any;
    private static instance: TLista;
    private estudiantes: Estudiante[] = [];
    private estudianteEditar: Estudiante | null = null;
    private estudiantesSubject = new BehaviorSubject<Estudiante[]>([]);
    estudiantes$ = this.estudiantesSubject.asObservable();

  private constructor() {
    this.inicializarDatos();
  }

  static getInstance(): TLista {
    if (!TLista.instance) {
      TLista.instance = new TLista();
    }
    return TLista.instance;
  }

  private inicializarDatos() {
    const estudiantesIniciales: Estudiante[] = [
      new Estudiante('1234567890', 'Juan', 'Pérez', 'M', new Date('1995-05-15'), 'EST001', 8, 5, 8),
      new Estudiante('2345678901', 'María', 'González', 'F', new Date('1996-03-20'), 'EST002', 7, 7),
      new Estudiante('3456789012', 'Carlos', 'Rodríguez', 'M', new Date('1994-11-10'), 'EST003', 6, 6, 4),
      new Estudiante('4567890123', 'Ana', 'Martínez', 'F', new Date('1995-07-25'), 'EST004', 10, 9.5),
      new Estudiante('5678901234', 'Luis', 'García', 'M', new Date('1997-01-12'), 'EST005', 8, 8.5, 7),
      new Estudiante('6789012345', 'Claudia', 'López', 'F', new Date('1998-02-28'), 'EST006', 5, 4, 6),
      new Estudiante('7890123456', 'Mario', 'Hernández', 'M', new Date('1995-08-30'), 'EST007', 9, 8.5),
      new Estudiante('8901234567', 'Laura', 'Morales', 'F', new Date('1996-04-18'), 'EST008', 8.5, 8.75),
      new Estudiante('9012345678', 'Jorge', 'Jiménez', 'M', new Date('1993-12-05'), 'EST009', 6, 6, 7),
      new Estudiante('0123456789', 'Paula', 'Cruz', 'F', new Date('1995-09-15'), 'EST010', 3, 3.5),
      new Estudiante('1123456789', 'Daniel', 'Castro', 'M', new Date('1994-06-12'), 'EST011', 7, 7),
      new Estudiante('1223456789', 'Sofía', 'Ortiz', 'F', new Date('1997-03-22'), 'EST012', 8, 9),
      new Estudiante('1323456789', 'Andrés', 'Vega', 'M', new Date('1995-05-20'), 'EST013', 6, 5, 7),
      new Estudiante('1423456789', 'Fernanda', 'Navarro', 'F', new Date('1996-07-30'), 'EST014', 7, 8.5),
      new Estudiante('1523456789', 'Héctor', 'Ramírez', 'M', new Date('1993-10-10'), 'EST015', 8, 8),
      new Estudiante('1623456789', 'Carmen', 'Fuentes', 'F', new Date('1995-02-14'), 'EST016', 9.5, 9),
      new Estudiante('1723456789', 'Ricardo', 'Paredes', 'M', new Date('1994-01-19'), 'EST017', 4, 4.5, 6),
      new Estudiante('1823456789', 'Valeria', 'Mejía', 'F', new Date('1997-12-25'), 'EST018', 7.5, 8.5),
      new Estudiante('1923456789', 'José', 'Salazar', 'M', new Date('1996-05-05'), 'EST019', 5.5, 5, 6),
      new Estudiante('2023456789', 'Elena', 'Quintero', 'F', new Date('1995-10-12'), 'EST020', 10, 9.5)
    ];
  
    this.estudiantesSubject.next(estudiantesIniciales);
  }
  

  agregarEstudiante(estudiante: Estudiante) {
    const estudiantesActuales = this.estudiantesSubject.value;
    this.estudiantesSubject.next([...estudiantesActuales, estudiante]);
  }

  eliminarEstudiante(codigo: string) {
    const estudiantesActuales = this.estudiantesSubject.value;
    const estudiantesActualizados = estudiantesActuales.filter(estudiante => estudiante.codigo !== codigo);
    this.estudiantesSubject.next(estudiantesActualizados);
  }

  setEstudianteEditar(estudiante: Estudiante | null) {
    this.estudianteEditar = estudiante;
  }

  getEstudiantes(): Estudiante[] {
    return this.estudiantesSubject.getValue();
  }
  
  
  getEstudianteEditar(): Estudiante | null {
    return this.estudianteEditar;
  }
  
  actualizarEstudiante(estudiante: Estudiante) {
    const estudiantesActuales = this.estudiantesSubject.getValue();
    const index = estudiantesActuales.findIndex(e => e.codigo === estudiante.codigo);
  
    if (index !== -1) {
      estudiantesActuales[index] = estudiante; // Actualiza el estudiante en el array
      this.estudiantesSubject.next([...estudiantesActuales]); // Emite el nuevo array actualizado
    }
  }
  
}
