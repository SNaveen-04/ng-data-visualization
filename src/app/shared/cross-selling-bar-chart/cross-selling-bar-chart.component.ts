import { Component, OnInit, ElementRef, ViewChild, Input, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

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
  @Input() browser_height = 150;
  @Input() data!: any[];
  barWidth = 0.8; // adjust this to handle the width of the bar
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;
  constructor() {}
  ngOnInit(): void {
    if(window.innerWidth>=1541) {
      this.brower_width=500;
    }
    this.createChart();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.createChart();
    }
  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('*').remove(); // Clear the previous chart

    const margin = { top: 0, right: 10, bottom: 0, left: 100 };
    const width = this.brower_width - margin.left - margin.right;
    const height = this.browser_height - margin.top - margin.bottom;
    const nameWidth = 0; // Width for name column
    const departmentWidth = 30; // Width for department column
    
    const tooltip = d3.select('#tooltip');
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (d) => d.value) ?? 0])
      .range([0, width-65]);

    const y = d3
      .scaleBand()
      .domain(this.data.map((d) => d.name))
      .range([0, height])
      .padding(0.1); // Adjust padding as needed

    const offset = 50; // Adjust this value to reduce the space between deptName labels vertically

    // Function to calculate y-coordinate
    const calculateY = (i: number) => i * offset + y.bandwidth() / 2;

    // Add department names (y-axis labels)
    svg
      .selectAll('.name')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'name')
      .attr('x', -70)
      .attr('y', (d, i) => calculateY(i))
      .attr('alignment-baseline', 'middle')
      .text((d) => d.name)
      .attr('font-size', '15px')
      .attr('fill', '#666666');

    // Create bars with constant height
    const barHeight = 10; // Set a constant height for the bars

    svg
      .selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', nameWidth + 20)
      .attr('y', (d, i) => calculateY(i) - barHeight / 2)
      .attr('width', 0)
      .attr('height', barHeight)
      .attr('fill', this.color)
      .attr('rx', 5) // Rounded corners
      .attr('ry', 5) // Rounded corners
      .on('mouseover', function (event, d) {
        tooltip.style('opacity', 0.9);
        tooltip
          .html(
            `<span style="display: inline-block; width:12px;height:12px; background-color:${'#50C878'}; margin-right: 5px"></span>
            ${d.name}
              ${d.value}`
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY + 10 + 'px');
      })
      .on('mouseout', function () {
        tooltip.style('opacity', 0);
      })
      .transition() // Add transition for animation
      .duration(800) // Duration of the animation in milliseconds
      .attr('width', (d) => x(d.value));

    // Add sales values (x-axis labels)
    svg
      .selectAll('.salesPercent')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'salesPercent')
      .attr('x', (d) => nameWidth + departmentWidth + x(d.value) + 10)
      .attr('y', (d, i) => calculateY(i))
      .attr('alignment-baseline', 'middle')
      .text((d) => {
        d.value = Math.floor(d.value);
        return d.value > 1000 ? Math.floor(d.value / 1000) + "k" : d.value;
      })
      .attr('font-size', '15px')
      .attr('fill', '#666666');
  }
}
