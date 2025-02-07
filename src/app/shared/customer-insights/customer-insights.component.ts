import { Component, ElementRef, inject } from '@angular/core';
import * as d3 from 'd3';
import { customerData } from '../../../data';

interface Data {
  name: string;
  value: number;
}

@Component({
  selector: 'app-customer-insights',
  imports: [],
  templateUrl: './customer-insights.component.html',
  styleUrl: './customer-insights.component.css',
})
export class CustomerInsightsComponent {
  customerInsightsData = customerData;
  totalCustomer: number = 0;
  colors: string[] = ['#50C878', '#F4C542'];
  tooltip: any;
  textSvg: any;
  private el = inject(ElementRef);

  ngOnInit(): void {
    this.customerInsightsData.forEach((element) => {
      this.totalCustomer += element.value;
    });
    this.createDonutChart();
  }

  private createDonutChart() {
    const element = this.el.nativeElement;
    const width = 350;
    const height = 200;
    const radius = Math.max(width, height) / 2 - 45;

    const color = d3
      .scaleOrdinal<string, string>()
      .domain(this.customerInsightsData.map((d) => d.name))
      .range(this.colors);

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(70, 110)`);

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
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.name))
      .each(function (d) {
        (this as any)._current = d;
      })
      .transition()
      .duration(1000)
      .attrTween('d', function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(interpolate(t)) as string;
        };
      });

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
      .attr('transform', (d, i) => `translate(100, ${i * 85 - height / 4})`);

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
