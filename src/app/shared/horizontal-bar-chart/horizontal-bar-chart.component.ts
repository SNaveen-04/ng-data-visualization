import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  standalone: true,
  styleUrls: ['./horizontal-bar-chart.component.css'],
})
export class HorizontalBarChartComponent implements OnInit, OnChanges {
 
  @Input() title = 'Top selling products';
  @Input() color: string = '#50C878';
  @Input() data: any[] = [];
  @Input() brower_width = 300;
  @Input() browser_height = 250;
  barWidth = 0.8; // adjust this to handle the width of the bar
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;

  constructor() {}
  ngOnInit(): void {
    if(window.innerWidth>=1541) {
      this.brower_width = 500;
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
    if (this.title === 'Top selling products') {
      this.data.sort((a, b) => b.value - a.value);
      console.log("This is from Top selling  hori-chart",this.data);
    } else {
      this.data.sort((a, b) => a.value - b.value);
      console.log("This is from least selling hori-chart",this.data);
    }
    const margin = { top: 10, right: 10, bottom: 40, left: 100 }; // Increased left margin to provide space for labels
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
      .domain([0, d3.max(this.data, (d) => d.value) ?? 0])
      .range([0, width + 10]);

    const y = d3
      .scaleBand()
      .domain(this.data.map((d) => d.name))
      .range([0, height])
      .padding(0.2);

    const calculateY = (d: ChartData) => (y(d.name) ?? 0) + y.bandwidth() / 2;

    svg
      .selectAll('.name')
      .data(this.data)
      .enter()
      .append('text')
      .attr('x', -100) // Align with bar and label
      .attr('y', (d) => calculateY(d))
      .attr('alignment-baseline', 'middle')
      .text((d) => d.name)
      .attr('font-size', '15px')
      .attr('fill', '#666666');

    if(this.title=='Top selling products')
    {
    svg
      .selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0) // Align with name
      .attr('y', (d) => calculateY(d) - 10 / 2) // Subtract half of bar height to center
      .attr('width', 0) // Start with width 0 for animation
      .attr('height', 10) // Keep bar height constant
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
      .attr('width', (d) => (x(d.value) ?? 0) * this.barWidth); // Adjust width with animation
    }
    else{
      svg
      .selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0) // Align with name
      .attr('y', (d) => calculateY(d) - 10 / 2) // Subtract half of bar height to center
      .attr('width', 0) // Start with width 0 for animation
      .attr('height', 10) // Keep bar height constant
      .attr('fill', this.color)
      .attr('rx', 5)
      .attr('ry', 5)
      .on('mouseover', function (event, d) {
        tooltip.style('opacity', 0.9);
        tooltip
          .html(
            `<span style="display: inline-block; width:12px;height:12px; background-color:${'#E74C3C'}; margin-right: 5px"></span>
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
      .attr('width', (d) => (x(d.value) ?? 0) * this.barWidth); // Adjust width with animation
    }
      svg
      .selectAll('.value-label')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'value-label')
      .attr('x', (d) => (x(d.value) ?? 0) * this.barWidth + 10) // Adjust label position accordingly
      .attr('y', (d) => calculateY(d))
      .attr('font-weight', 'lighter')
      .attr('fill', '#222222')
      .text((d) => d.value)
      .attr('font-family', 'afacad')
      .attr('text-baseline', 'start')
      .attr('alignment-baseline', 'middle')
      .attr('font-size', '14px');
  }
    }
