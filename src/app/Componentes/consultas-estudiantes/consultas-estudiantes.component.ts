import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TLista } from '../Controlador/TLista';
import * as d3 from 'd3';

@Component({
  selector: 'app-consultas-estudiantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultas-estudiantes.component.html',
  styleUrls: ['./consultas-estudiantes.component.css']
})
export class ConsultasEstudiantesComponent implements OnInit, AfterViewInit {
  @ViewChild('aprobadosChart') aprobadosChart!: ElementRef;
  @ViewChild('generoChart') generoChart!: ElementRef;
  @ViewChild('promedioChart') promedioChart!: ElementRef;
  @ViewChild('promedioScatterChart') promedioScatterChart!: ElementRef;

  private tLista = TLista.getInstance();
  private estudiantes$ = this.tLista.estudiantes$;

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.estudiantes$.subscribe(estudiantes => {
        this.renderizarGraficos(estudiantes);
      });
    });
  }

  private renderizarGraficos(estudiantes: any[]) {
    d3.select(this.aprobadosChart.nativeElement).selectAll('*').remove();
    d3.select(this.generoChart.nativeElement).selectAll('*').remove();
    d3.select(this.promedioChart.nativeElement).selectAll('*').remove();
    d3.select(this.promedioScatterChart.nativeElement).selectAll('*').remove();

    const totalEstudiantes = estudiantes.length;
    const aprobados = estudiantes.filter(e => e.estadoAprobatorio === 'Aprobado').length;
    const reprobados = totalEstudiantes - aprobados;

    const estudiantesPorGenero = {
      M: estudiantes.filter(e => e.sexo === 'M' && e.estadoAprobatorio === 'Aprobado').length,
      F: estudiantes.filter(e => e.sexo === 'F' && e.estadoAprobatorio === 'Aprobado').length
    };

    const promedioGeneral = d3.mean(estudiantes, e => e.ND) || 0;

    this.crearGraficoAprobados(aprobados, reprobados);
    this.crearGraficoGenero(estudiantesPorGenero);
    this.crearGraficoScatterPromedio(estudiantes, promedioGeneral);
    this.crearGraficoMejoresEstudiantes(estudiantes, promedioGeneral);
  }

  private crearGraficoAprobados(aprobados: number, reprobados: number) {
    const container = this.aprobadosChart.nativeElement;
    const width = container.offsetWidth || 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(container)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const data = [
      { label: 'Aprobados', value: aprobados },
      { label: 'Reprobados', value: reprobados }
    ];

    const color = d3.scaleOrdinal()
      .domain(['Aprobados', 'Reprobados'])
      .range(['#4CAF50', '#F44336']);

    const pie = d3.pie<any>().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .append('path')
      .attr('d', arc as any)
      .attr('fill', d => color(d.data.label) as string);

    svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d as any)})`)
      .text(d => `${d.data.label}: ${(d.data.value / (aprobados + reprobados) * 100).toFixed(1)}%`)
      .style('text-anchor', 'middle')
      .style('fill', '#fff');
  }

  private crearGraficoGenero(datos: { M: number; F: number }) {
    const container = this.generoChart.nativeElement;
    const width = container.offsetWidth || 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(container)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const data = [
      { genero: 'Masculino', value: datos.M },
      { genero: 'Femenino', value: datos.F }
    ];

    const color = d3.scaleOrdinal()
      .domain(['Masculino', 'Femenino'])
      .range(['#2196F3', '#E91E63']);

    const pie = d3.pie<any>().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .append('path')
      .attr('d', arc as any)
      .attr('fill', d => color(d.data.genero) as string);

    svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d as any)})`)
      .text(d => `${d.data.genero}: ${(d.data.value / (datos.M + datos.F) * 100).toFixed(1)}%`)
      .style('text-anchor', 'middle');
  }

  private crearGraficoScatterPromedio(estudiantes: any[], promedioGeneral: number) {
    const container = this.promedioScatterChart.nativeElement;
    const width = container.offsetWidth || 300;
    const height = 300;
    const margin = { top: 50, right: 20, bottom: 50, left: 50 }; // Márgenes ajustados
  
    const svg = d3.select(container)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    const x = d3.scaleLinear()
      .domain([0, estudiantes.length]) // Basado en la cantidad de estudiantes
      .range([0, width - margin.left - margin.right]);
  
    const y = d3.scaleLinear()
      .domain([0, 10]) // Notas entre 0 y 10
      .range([height - margin.top - margin.bottom, 0]);
  
    // Ejes X e Y
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5))
      .attr('class', 'axis');
  
    svg.append('g')
      .call(d3.axisLeft(y))
      .attr('class', 'axis');
  
    // Puntos de dispersión
    svg.selectAll('circle')
      .data(estudiantes)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => x(i))
      .attr('cy', d => y(d.ND))
      .attr('r', 5)
      .attr('fill', d => d.ND >= promedioGeneral ? '#4CAF50' : '#F44336')
      .attr('opacity', 0.7)
      .attr('class', 'scatter-dot');
  
    // Línea de promedio
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', width - margin.left - margin.right)
      .attr('y1', y(promedioGeneral))
      .attr('y2', y(promedioGeneral))
      .style('stroke', '#2196F3')
      .style('stroke-dasharray', '5,5');
  
    // Texto del promedio
    svg.append('text')
      .attr('x', (width - margin.left - margin.right) / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text(`Promedio General: ${promedioGeneral.toFixed(2)}`);
  }
  
  private crearGraficoMejoresEstudiantes(estudiantes: any[], promedioGeneral: number) {
    const container = this.promedioChart.nativeElement;
    const width = container.offsetWidth || 300;
    const height = 300;
    const margin = { top: 50, right: 20, bottom: 50, left: 40 };

    const svg = d3.select(container)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const mejoresEstudiantes = estudiantes.sort((a, b) => b.ND - a.ND).slice(0, 5);

    const x = d3.scaleBand().range([0, width - margin.left - margin.right]).domain(mejoresEstudiantes.map(d => d.nombres)).padding(0.3);
    const y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]).domain([0, d3.max(mejoresEstudiantes, d => d.ND) || 10]);

    svg.selectAll('.bar')
      .data(mejoresEstudiantes)
      .enter()
      .append('rect')
      .attr('x', d => x(d.nombres) || 0)
      .attr('y', d => y(d.ND))
      .attr('width', x.bandwidth())
      .attr('height', d => (height - margin.top - margin.bottom) - y(d.ND))
      .attr('fill', (d, i) => i === 0 ? '#ff5722' : d.ND > promedioGeneral ? '#4CAF50' : '#2196F3');

    svg.selectAll('.label')
      .data(mejoresEstudiantes)
      .enter()
      .append('text')
      .attr('x', d => (x(d.nombres) || 0) + x.bandwidth() / 2)
      .attr('y', d => y(d.ND) - 5)
      .attr('text-anchor', 'middle')
      .text(d => d.ND.toFixed(2));

    svg.append('line')
      .attr('x1', 0)
      .attr('x2', width - margin.left - margin.right)
      .attr('y1', y(promedioGeneral))
      .attr('y2', y(promedioGeneral))
      .style('stroke', 'red')
      .style('stroke-dasharray', '4,4');

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));
  }
}
