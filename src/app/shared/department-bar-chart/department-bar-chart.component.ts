import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';
interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-department-bar-chart',
  templateUrl: './department-bar-chart.component.html',
  standalone: true,
  styleUrls: ['./department-bar-chart.component.css'],
})
export class DepartmentBarChartComponent implements OnInit {
  @Input() title = 'Top selling products';
  @Input() color = '#50C878';
  @Input() data!: any[];
  @Input() brower_width = 300;
  @Input() browser_height = 190;
  // brower_width=500    //this is width of svg for the desktop screen
  barWidth = 0.7; // adjust this to handle the width of the bar
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;
  constructor() {}
  ngOnInit(): void {}

  ngOnChanges() {
    console.log(this.data);
    this.createChart();
  }

  private createChart(): void {
    if (this.title === 'Top selling products') {
      this.data.sort((a, b) => b.value - a.value);
    } else {
      this.data.sort((a, b) => a.value - b.value);
    }

    const element = this.chartContainer.nativeElement;
    const data = this.data;
    const margin = { top: 15, right: 10, bottom: 20, left: 81 }; // Reduced bottom margin
    const width = this.brower_width - margin.left - margin.right;
    const height = this.browser_height - margin.top - margin.bottom;
    d3.select(element).select('svg').remove();
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const tooltip = d3.select('#tooltip');

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) ?? 0])
      .range([0, width]);

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, height])
      .padding(0.2);

    svg
      .selectAll('.name')
      .data(data)
      .enter()
      .append('text')
      .attr('x', -80) // Position the names at the start of the x-axis
      .attr('y', (d) => y(d.name)! + y.bandwidth() / 3)
      .attr('alignment-baseline', 'middle')
      .text((d) => d.name)
      .attr('font-size', '15px')
      .attr('fill', '#666666');

    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 20)
      .attr('y', (d) => (y(d.name) ?? 0) + 5)
      .attr('width', 0) // Start with width 0 for animation
      .attr('height', y.bandwidth() - 15) // adjust for the bar height
      .attr('fill', this.color)
      .attr('rx', 5)
      .attr('ry', 5)
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
      .attr('width', (d) => (x(d.value) ?? 0) * this.barWidth); // Reduce width by 20%

    const labels = svg.selectAll('.bar-label').data(data).enter();

    labels
      .append('text')
      .attr('class', 'value-label')
      .attr('y', (d) => (y(d.name) ?? 0) + (y.bandwidth() / 2 - 2))
      .attr('x', (d) => (x(d.value) ?? 0) * this.barWidth + 25) // Adjust label position accordingly
      .attr('font-weight', 'lighter')
      .attr('fill', '#2222222')
      .text((d) => d.value)
      .attr('font-family', 'afacad')
      .attr('text-baseline', 'start')
      .attr('alignment-baseline', 'middle')
      .attr('font-size', '14px');
  }
}
