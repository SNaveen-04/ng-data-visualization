import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
interface ChartData {
  name: string;
  value: number;
}
@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.css']
})
export class HorizontalBarChartComponent implements OnInit {
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;

 data1:ChartData[]=[
 {       name: "2025-01-26",       value: 202409.59     },
 {       name: "2025-01-27",       value: 148498.63     },
 {       name: "2025-01-28",       value: 189548.09     },
 {       name: "2025-01-29",       value: 194534.33     },
 {       name: "2025-01-30",       value: 131327.66     }   ];



data:ChartData[]=[ {
  "name": "Germany",
  "value": 50000,

},
{
  "name": "United States",
  "value": 40000,

},
{
  "name": "France",
  "value": 30000,

},
{
  "name": "United Kingdom",
  "value": 20000,

},
{
  "name": "Spain",
  "value": 10000,
}
];

  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement;
    const data = this.data;

    const margin = { top: 20, right: 30, bottom: 40, left: 90 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right+100)  // Adjust for additional space
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) ?? 0])
      .range([0, width]);

    const y = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, height])
      .padding(0.6);         // bar height adjustment

    svg.append('g')
      .call(d3.axisLeft(y))
      .selectAll('.domain, .tick line')
      .attr('display', 'none');

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', d => y(d.name) ?? 0)
      .attr('width', d => x(d.value) ?? 0)
      .attr('height', y.bandwidth()-10)
      .attr('fill', '#50C878')
      .attr('rx', 5) // Set x radius for rounded corners
      .attr('ry', 5); // Set y radius for rounded corners
      

    const labels = svg.selectAll('.bar-label')
      .data(data)
      .enter();

    labels.append('text')
      .attr('class', 'value-label')
      .attr('y', d => (y(d.name) ?? 0) + y.bandwidth() / 2 + 2)  // Bar value adjust
      .attr('x', d => (x(d.value) ?? 0) + 10)  // Bar value space adjust
      .text(d => d.value)
      .attr('text-baseline', 'start')
      .attr('font-size', '12px');  // Consistent font size
      

  }
}
