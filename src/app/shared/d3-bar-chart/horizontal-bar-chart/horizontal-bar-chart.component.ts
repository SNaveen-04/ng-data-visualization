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

    const margin = { top: 30, right: 30, bottom: 40, left: 100 };
    const width = 300 - margin.left - margin.right;
    const height = 300- margin.top - margin.bottom;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right+100)  // Adjust for additional space
      .attr('height', height + margin.top + margin.bottom-100)
      .append('g')
      .attr('margin',0)
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) ?? 0])
      .range([0, width]);

    const y = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, height-50])
      .padding(0);         // bar height adjustment
      const yAxis = svg.append('g')
      .call(d3.axisLeft(y));
    
    yAxis.selectAll('.domain, .tick line')
      .attr('display', 'none');
    
    // Add color to the country labels
    yAxis.selectAll('.tick text')
      .attr('y', -12)  // adjust the y axis label vertically
      .attr('fill', 'grey'); // Replace 'yourColor' with the desired color (e.g., 'black', '#ff0000', etc.)

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', d => y(d.name) ?? 0)
      .attr('width', d => x(d.value) ?? 0)
      .attr('height', y.bandwidth()-25)
      .attr('fill', this.color)
      .attr('rx', 5) // Set x radius for rounded corners
      .attr('ry', 5); // Set y radius for rounded corners
      

    const labels = svg.selectAll('.bar-label')
      .data(data)
      .enter();

    labels.append('text')
      .attr('class', 'value-label')
      .attr('y', d => (y(d.name) ?? 0) + (y.bandwidth() / 2) -10)  // Bar value adjust
      .attr('x', d => (x(d.value) ?? 0) + 10)  // Bar value space adjust
      .attr('font-weight', 'lighter') // Set font weight
      .attr('fill','black')
      .text(d => d.value)
      .attr('text-baseline', 'start')
      .attr('alignment-baseline', 'middle') // Vertical alignment
      .attr('font-size', '12px');  // Consistent font size
    
      

  }
}
