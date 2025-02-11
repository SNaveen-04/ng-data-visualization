import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';
import { CrossSellingDepartments } from '../../../data';
interface Data {
  deptName: string;
  sales: number;
}

@Component({
  selector: 'app-cross-selling-bar-chart',
  templateUrl: './cross-selling-bar-chart.component.html',
  standalone: true,
  styleUrls: ['./cross-selling-bar-chart.component.css'],
})
export class CrossSellingBarChartComponent implements OnInit {
  @Input() title = 'Top selling products';
  @Input() color = '#50C878';
  @Input() brower_width = 300;
  @Input() browser_height = 190;
  @Input() data!: Data[];
  // brower_width=500    //this is width of svg for the desktop screen
  barWidth = 0.8; // adjust this to handle the width of the bar
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;
  constructor() {}
  ngOnInit(): void {
    this.createChart();
  }

  private createChart(): void {
    // Sort data based on sales value
    this.data.sort((a, b) => b.sales - a.sales);
    console.log('data : ', this.data);

    const element = this.chartContainer.nativeElement;
    const margin = { top: -10, right: 10, bottom: 20, left: 100 };
    const width = this.brower_width - margin.left - margin.right;
    const height = this.browser_height - margin.top - margin.bottom;
    const nameWidth = 0; // Width for name column
    const departmentWidth = 30; // Width for department column

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (d) => d.sales) ?? 0])
      .range([0, 130]);

    const y = d3
      .scaleBand()
      .domain(this.data.map((d: Data) => d.deptName))
      .range([0, height])
      .padding(0.1); // Adjust padding as needed

    // Add department names (y-axis labels)
    svg
      .selectAll('.name')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'name')
      .attr('x', -70)
      .attr('y', (d) => y(d.deptName)! + y.bandwidth() / 2)
      .attr('alignment-baseline', 'middle')
      .text((d) => d.deptName)
      .attr('font-size', '15px')
      .attr('fill', '#666666');

    // Create bars
    svg
      .selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', nameWidth + 20)
      .attr('y', (d) => y(d.deptName)! + y.bandwidth() - 33)
      .attr('width', (d) => x(d.sales))
      .attr('height', y.bandwidth() / 4)
      .attr('fill', this.color)
      .attr('rx', 5) // Rounded corners
      .attr('ry', 5); // Rounded corners

    // Add sales values (x-axis labels)
    svg
      .selectAll('.salesPercent')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'salesPercent')
      .attr('x', (d) => nameWidth + departmentWidth + x(d.sales) + 10)
      .attr('y', (d) => y(d.deptName)! + y.bandwidth() / 2)
      .attr('alignment-baseline', 'middle')
      .text((d) => d.sales.toString())
      .attr('font-size', '15px')
      .attr('fill', '#666666');
  }
}
