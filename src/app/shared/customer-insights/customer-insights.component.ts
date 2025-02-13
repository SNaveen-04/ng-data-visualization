import {
  Component,
  ElementRef,
  input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';

import { customerInsightsData } from '../../type';

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
export class CustomerInsightsComponent implements OnChanges {
  customerInsightsData = input.required<customerInsightsData>();
  filter = input.required<string>();
  totalCustomer: number = 0;
  colors: string[] = ['#50C878', '#F4C542'];

  @ViewChild('chart', { static: true })
  private readonly chartContainer!: ElementRef;
  @ViewChild('tooltip', { static: true }) private readonly tooltip!: ElementRef;

  ngOnChanges() {
    this.createDonutChart();
  }
  private createDonutChart() {
    this.totalCustomer = 0;
    this.customerInsightsData().forEach((element) => {
      if (element.name.startsWith('N')) {
        element.name = 'New Customer';
      } else {
        element.name = 'Repeated Customer';
      }
      this.totalCustomer += element.value;
    });
    if (this.filter() === 'sales') {
      this.customerInsightsData().forEach((d) => {
        d.value = Math.round((d.value / this.totalCustomer) * 100);
      });
    }

    const width = 350;
    const height = 200;
    const radius = Math.max(width, height) / 2 - 45;
    d3.select(this.chartContainer.nativeElement).selectAll('svg').remove();

    const color = d3
      .scaleOrdinal<string, string>()
      .domain(this.customerInsightsData().map((d) => d.name))
      .range(this.colors);

    const svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(70, 90)`);

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
      .data(pie(this.customerInsightsData()))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.name))
      .on('mouseover', (event: MouseEvent, d: any) => {
        const tooltip = d3.select(this.tooltip.nativeElement);
        tooltip
          .style('opacity', 1)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY + 10}px`)
          .html(
            `<span style="display: inline-block; width:12px;height:12px; background-color:${color(
              d.data.name
            )}; margin-right: 5px"></span>
           ${d.data.name}
              ${d.data.value}%`
          );
      })
      .on('mouseout', () => {
        const tooltip = d3.select(this.tooltip.nativeElement);
        tooltip.style('opacity', 0);
      })
      .each(function (d) {
        (this as any)._current = d;
      })
      .transition()
      .duration(1000)
      .attrTween('d', function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return (t) => arc(interpolate(t)) as string;
      });

    if (this.filter() === 'quantity') {
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
        .data(this.customerInsightsData())
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
            .attr('fill', (line, index) =>
              index === 0 ? '#000000' : '#666666'
            );
        });
    } else {
      arcs
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '1.1em')
        .style('font-size', '15px')
        .attr('fill', '#666666')
        .text('Total Revenue');
      arcs
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.1em')
        .style('font-size', '20px')
        .text(this.totalCustomer);

      const legendGroup = svg
        .selectAll('.legend-group')
        .data(this.customerInsightsData())
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
          const lines = [`${d.value}%`, `${d.name}`];
          d3.select(this)
            .selectAll('tspan')
            .data(lines)
            .enter()
            .append('tspan')
            .attr('x', 10)
            .attr('dy', (line, index) => (index ? '1.3em' : 0))
            .text((line) => line)
            .attr('fill', (line, index) =>
              index === 0 ? '#000000' : '#666666'
            );
        });
    }
  }

  formatValue(num: number) {
    return (num / this.totalCustomer) * 100;
  }
}
