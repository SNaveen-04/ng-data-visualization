import { Component, OnInit, ElementRef, ViewChild, Input, } from '@angular/core';
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
  data1: ChartData[] = [
    {
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
  
  @Input() title="Top selling products";
  @Input() color='#50C878';
  @Input() data:any[]=this.data1;
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;
  constructor() {}
  ngOnInit(): void {
    this.createChart();
  }
  private createChart(): void {
    if(this.title==='Top selling products')
    {
       this.data.sort((a,b)=>b.value-a.value);
    }
    else{
       this.data.sort((a,b)=>a.value-b.value);
    }

    const element = this.chartContainer.nativeElement;
    const data = this.data;
    const margin = { top: 10, right: 0, bottom: 40, left: 150 }; // Reduced top margin
    const width = 500 - margin.left - margin.right; // Adjust width
    const height = 280 - margin.top - margin.bottom; // Adjust height

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right + 100)  // Adjust for additional space
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
 
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) ?? 0])
      .range([0, width]);

    const y = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, height])
      .padding(0.2); // Adjust padding to make use of all space

    const yAxis = svg.append('g')
      .call(d3.axisLeft(y));
    
    yAxis.selectAll('.domain, .tick line')
      .attr('display', 'none');
    // Add color to the country labels and move them up
    yAxis.selectAll('.tick text')
      .attr('font-size', '14px')
      .attr('fill', 'grey') // Replace 'yourColor' with the desired color (e.g., 'black', '#ff0000', etc.)
      .attr('dy', '-0.1em'); // Move the text up

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', d => (y(d.name) ?? 0) + 5) // Add padding to the top of each bar
      .attr('width', d => x(d.value) ?? 0)
      .attr('height', y.bandwidth() - 20) // Reduce height to add padding to the bottom of each bar
      .attr('fill', this.color)
      .attr('rx', 5) // Set x radius for rounded corners
      .attr('ry', 5); // Set y radius for rounded corners

    const labels = svg.selectAll('.bar-label')
      .data(data)
      .enter();

    labels.append('text')
      .attr('class', 'value-label')
      .attr('y', d => (y(d.name) ?? 0) + (y.bandwidth() / 2-4))  // Bar value adjust
      .attr('x', d => (x(d.value) ?? 0) + 10)  // Bar value space adjust
      .attr('font-weight', 'lighter') // Set font weight
      .attr('fill', 'black')
      .text(d => d.value)
      .attr('text-baseline', 'start')
      .attr('alignment-baseline', 'middle') // Vertical alignment
      .attr('font-size', '14px');  // Consistent font size
  }
}
