import { Component } from '@angular/core';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import * as d3 from 'd3';
import { customerData } from '../../data';

interface Data {
  name: string;
  value: number;
}

@Component({
  selector: 'app-customer-insights',
  imports: [NgxChartsModule],
  templateUrl: './customer-insights.component.html',
  styleUrl: './customer-insights.component.css',
})
export class CustomerInsightsComponent {
  customerInsightsData = customerData;
  totalCustomer: number = 0;
  colors: string[] = ['#50C878', '#F4C542'];

  ngOnInit(): void {
    this.customerInsightsData.forEach((element) => {
      this.totalCustomer += element.value;
    });
    this.createDonutChart();
  }

  private createDonutChart() {
    const width = 350;
    const height = 145;
    const radius = Math.max(width, height) / 2 - 45;

    const color = d3
      .scaleOrdinal<string, string>()
      .domain(this.customerInsightsData.map((d) => d.name))
      .range(this.colors);

    const svg = d3
      .select('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(70, ${height / 2})`);

    const pie = d3
      .pie<Data>()
      .value((d) => d.value)
      .sort(null);

    const arc = d3
      .arc<d3.PieArcDatum<Data>>()
      .innerRadius(radius / 2.3)
      .outerRadius(radius / 2);

    const arcs = svg
      .selectAll('.arc')
      .data(pie(this.customerInsightsData))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('fill', '50C878');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', '50C878')
      .attr('fill', (d) => color(d.data.name));

    arcs
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.1em')
      .style('font-size', '15px')
      .attr('fill', '#666666')
      .text('Total customer');
    arcs
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.1em')
      .style('font-size', '20px')
      .text(this.totalCustomer);

    const legendGroup = svg
      .selectAll('.legend-group')
      .data(customerData)
      .enter()
      .append('g')
      .attr('class', 'legend-group')
      .attr('transform', (d, i) => `translate(100, ${i * 85 - height / 3})`);

    legendGroup
      .append('rect')
      .attr('width', 5)
      .attr('height', 30)
      .attr('x', -10)
      .attr('y', -10)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('fill', (d) => color(d.name));

    legendGroup
      .append('text')
      .attr('text-anchor', 'start')
      .attr('fill', '#666666')
      .style('font-size', '15px')
      .each(function (d, i) {
        const lines = [`${d.value}`, `${d.name}`];
        d3.select(this)
          .selectAll('tspan')
          .data(lines)
          .enter()
          .append('tspan')
          .attr('x', 10)
          .attr('dy', (line, index) => (index ? '1.3em' : 0))
          .text((line) => line)
          .attr('fill', (line, index) => (index === 0 ? '#000000' : '#666666'));
      });
  }
}
