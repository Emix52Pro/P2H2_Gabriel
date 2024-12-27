import { Persona } from './Persona';

export class Estudiante extends Persona {
  public P1: number;
  public P2: number;
  public CF: number; 
  public ER: number | null;
  public ND: number;
  public estadoAprobatorio: string;

  constructor(
    cedula: string,
    nombres: string,
    apellidos: string,
    sexo: string,
    fechaNacimiento: Date,
    public codigo: string,
    P1: number,
    P2: number,
    ER: number | null = null
  ) {
    super(cedula, nombres, apellidos, sexo, fechaNacimiento);
    this.P1 = P1;
    this.P2 = P2;
    this.ER = ER;

    this.CF = this.calcularCalificacionFinal();
    this.ND = this.calcularNotaDefinitiva();
    this.estadoAprobatorio = this.determinarEstado();
  }
  calcularCalificacionFinal(): number {
    return (this.P1 + this.P2) / 2;
  }

  calcularNotaDefinitiva(): number {
    if (this.CF >= 5.5 && this.CF < 7 && this.ER !== null) {
      return this.CF * 0.4 + this.ER * 0.6;
    }
    return this.CF;
  }

  determinarEstado(): string {
    return this.ND >= 7 ? 'Aprobado' : 'Reprobado';
  }
}
