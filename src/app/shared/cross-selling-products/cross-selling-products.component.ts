import { Component, ElementRef, input, ViewChild } from '@angular/core';
import * as d3 from 'd3';

interface Data {
  name: string;
  department: string;
  value: number;
}

@Component({
  selector: 'app-cross-selling-products',
  templateUrl: './cross-selling-products.component.html',
  styleUrls: ['./cross-selling-products.component.css'],
})
export class CrossSellingProductsComponent {
  crossSellingProductsData = input.required<Data[]>();
  // crossSellingProductsData: Data[] = crossSellingProducts;
  color = '#50C878';
  format: '' | '%' = '%';
  @ViewChild('barchart', { static: true })
  private readonly chartContainer!: ElementRef;
  @ViewChild('tooltip', { static: true }) private readonly tooltip!: ElementRef;

  private svg: any;
  private readonly width = 365;
  private readonly height = 200;

  constructor() {}

  ngOnChanges() {
    this.createSvg();
  }

  private createSvg(): void {
    this.crossSellingProductsData().sort((a, b) => b.value - a.value);
    d3.select(this.chartContainer.nativeElement).select('svg').remove();
    this.svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(70,30)`);

    const x = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.crossSellingProductsData(), (d) => d.value) as number,
      ])
      .range([0, 80]);

    const y = d3
      .scaleBand()
      .domain(this.crossSellingProductsData().map((d) => d.name))
      .range([0, 160])
      .padding(0.7);

    const nameWidth = 20; // Adjust the width for name column
    const departmentWidth = 60; // Adjust the width for department column

    this.svg
      .selectAll('rect')
      .data(this.crossSellingProductsData)
      .enter()
      .append('rect')
      .attr('x', nameWidth + departmentWidth + 35) // Move the bars to the right to create space
      .attr('y', (d: Data) => y(d.name)!)
      .attr('width', 0) // Start with width 0 for animation
      .attr('height', y.bandwidth())
      .attr('fill', '#4CAF50')
      .attr('rx', 5)
      .attr('ry', 5)
      .on('mouseover', (event: MouseEvent, d: any) => {
        const tooltip = d3.select(this.tooltip.nativeElement);
        tooltip
          .style('opacity', 1)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY + 10}px`)
          .html(
            `<span style="display: inline-block; width:12px;height:12px; background-color:${'#50C878'}; margin-right: 5px"></span>
           ${d.name}:
              ${d.value}`
          );
      })
      .on('mouseout', () => {
        const tooltip = d3.select(this.tooltip.nativeElement);
        tooltip.style('opacity', 0);
      })
      .transition() // Add transition for animation
      .duration(800) // Duration of the animation in milliseconds
      .attr('width', (d: Data) => x(d.value)) %
      this.svg
        .append('text')
        .attr('x', -70)
        .attr('y', 0) // Adjust the y position as needed
        .attr('font-size', '15px')
        .attr('fill', '#666666')
        .text('Name');

    this.svg
      .selectAll('.name')
      .data(this.crossSellingProductsData)
      .enter()
      .append('text')
      .attr('x', -70) // Position the names at the start of the x-axis
      .attr('y', (d: Data) => y(d.name)! + y.bandwidth() / 2)
      .attr('alignment-baseline', 'middle')
      .text((d: Data) => d.name)
      .attr('font-size', '15px')
      .attr('fill', '#222222');

    this.svg
      .append('text')
      .attr('x', 20)
      .attr('y', 0) // Adjust the y position as needed
      .attr('font-size', '15px')
      .attr('fill', '#666666')
      .text('Department');

    this.svg
      .selectAll('.department')
      .data(this.crossSellingProductsData)
      .enter()
      .append('text')
      .attr('x', nameWidth) // Position the department after the name
      .attr('y', (d: Data) => y(d.name)! + y.bandwidth() / 2)
      .attr('alignment-baseline', 'middle')
      .text((d: Data) => d.department)
      .attr('font-size', '15px')
      .attr('fill', '#222222');

    this.svg
      .append('text')
      .attr('x', nameWidth + departmentWidth + 35)
      .attr('y', 0) // Adjust the y position as needed
      .attr('font-size', '15px')
      .attr('fill', '#666666')
      .text(`Contribution ${this.format}`);

    this.svg
      .selectAll('.valuepercent')
      .data(this.crossSellingProductsData)
      .enter()
      .append('text')
      .attr('x', (d: Data) => nameWidth + departmentWidth + x(d.value) + 40) // Position the department after the name
      .attr('y', (d: Data) => y(d.name)! + y.bandwidth() / 2)
      .attr('alignment-baseline', 'middle')
      .text((d: Data) => `${Math.round(d.value)} ${this.format}`)
      .attr('font-size', '13px')
      .attr('fill', '#222222');
  }
}
