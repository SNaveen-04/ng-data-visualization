import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';
interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-cross-selling-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  standalone: true,
  styleUrls: ['./horizontal-bar-chart.component.css'],
})
export class CrossSellingBarChartComponent implements OnInit {
  data1: ChartData[] = [
    {
      name: 'Germany',
      value: 50000,
    },
    {
      name: 'United States',
      value: 30000,
    },
    {
      name: 'France',
      value: 40000,
    },
  ];

  @Input() title = 'Top selling products';
  @Input() color = '#50C878';
  @Input() data: any[] = this.data1;
  @Input() brower_width = 300;
  @Input() browser_height = 190;
  // brower_width=500    //this is width of svg for the desktop screen
  barWidth = 0.8; // adjust this to handle the width of the bar
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;
  constructor() {}
  ngOnInit(): void {
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
    const margin = { top: 10, right: 10, bottom: 20, left: 100 }; // Reduced bottom margin
    const width = this.brower_width - margin.left - margin.right;
    const height = this.browser_height - margin.top - margin.bottom;
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
      .padding(0.3);

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
      .attr('x', 10)
      .attr('y', (d) => (y(d.name) ?? 0) + 5)
      .attr('width', 0) // Start with width 0 for animation
      .attr('height', y.bandwidth() - 23) // adjust for the bar height
      .attr('fill', this.color)
      .attr('rx', 5)
      .attr('ry', 5)
      .on('mouseover', function (event, d) {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(`${d.name}: ${d.value}`)
          .style('left', event.pageX + 5 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function () {
        tooltip.transition().duration(500).style('opacity', 0);
      })
      .transition() // Add transition for animation
      .duration(800) // Duration of the animation in milliseconds
      .attr('width', (d) => (x(d.value) ?? 0) * this.barWidth); // Reduce width by 20%

    const labels = svg.selectAll('.bar-label').data(data).enter();

    labels
      .append('text')
      .attr('class', 'value-label')
      .attr('y', (d) => (y(d.name) ?? 0) + (y.bandwidth() / 2 - 4))
      .attr('x', (d) => (x(d.value) ?? 0) * this.barWidth + 18) // Adjust label position accordingly
      .attr('font-weight', 'lighter')
      .attr('fill', 'black')
      .text((d) => d.value)
      .attr('font-family', 'afacad')
      .attr('text-baseline', 'start')
      .attr('alignment-baseline', 'middle')
      .attr('font-size', '14px');
  }
}
