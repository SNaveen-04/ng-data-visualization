import { Component, OnInit, ElementRef, ViewChild, Input, } from '@angular/core';
import * as d3 from 'd3';
interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  standalone:true,
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

var width = window.innerWidth;
var height = window.innerHeight;

console.log('Width: ' + width + 'px');
console.log('Height: ' + height + 'px');

  }
  

  private createChart(): void {
    if(this.title==='Top selling products') {
      this.data.sort((a, b) => b.value - a.value);
    } else {
      this.data.sort((a, b) => a.value - b.value);
    }
    const brower_width = 300, browser_height = 250;
    const element = this.chartContainer.nativeElement;
    const data = this.data;
    const margin = { top: 10, right: 0, bottom: 40, left: 150 };
    const width = brower_width - margin.left - margin.right;
    const height = browser_height - margin.top - margin.bottom;
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right + 100)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
      const tooltip = d3.select('#tooltip');

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) ?? 0])
      .range([0, width]);
  
    const y = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, height])
      .padding(0.2);
  
    const yAxis = svg.append('g')
      .call(d3.axisLeft(y));
    
    yAxis.selectAll('.domain, .tick line')
      .attr('display', 'none');
  
    yAxis.selectAll('.tick text')
      .attr('font-size', '14px')
      .attr('font-family', 'afacad')
      .attr('fill', 'grey')
      .attr('dy', '-0.1em');
  
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', d => (y(d.name) ?? 0) + 5)
      .attr('width', 0) // Start with width 0 for animation
      .attr('height', y.bandwidth() - 20)
      .attr('fill', this.color)
      .attr('rx', 5)
      .attr('ry', 5)
      .on('mouseover', function(event, d) {
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        tooltip.html(`${d.name}: ${d.value}`)
          .style('left', (event.pageX + 5) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      })
      .transition() // Add transition for animation
      .duration(800) // Duration of the animation in milliseconds
      .attr('width', d => x(d.value) ?? 0);

  
    const labels = svg.selectAll('.bar-label')
      .data(data)
      .enter();
  
    labels.append('text')
      .attr('class', 'value-label')
      .attr('y', d => (y(d.name) ?? 0) + (y.bandwidth() / 2 - 4))
      .attr('x', d => (x(d.value) ?? 0) + 10)
      .attr('font-weight', 'lighter')
      .attr('fill', 'black')
      .text(d => d.value)
      .attr('font-family', 'afacad')
      .attr('text-baseline', 'start')
      .attr('alignment-baseline', 'middle')
      .attr('font-size', '14px');
  }
  

}
