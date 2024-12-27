import { Routes } from '@angular/router';
import { InicioEstudiantesComponent } from './Componentes/inicio-estudiantes/inicio-estudiantes.component';
import { ListarEstudiantesComponent } from './Componentes/listar-estudiantes/listar-estudiantes.component';
import { ConsultasEstudiantesComponent } from './Componentes/consultas-estudiantes/consultas-estudiantes.component';
import { AgregarEstudianteComponent } from './Componentes/agregar-estudiante/agregar-estudiante.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioEstudiantesComponent },
  { path: 'listar-estudiantes', component: ListarEstudiantesComponent },
  { path: 'consultas-estudiantes', component: ConsultasEstudiantesComponent },
  { path: 'agregar-estudiante', component: AgregarEstudianteComponent },
];
