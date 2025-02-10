import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';
interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
<<<<<<< HEAD
  styleUrls: ['./horizontal-bar-chart.component.css'],
})
export class HorizontalBarChartComponent implements OnInit {
=======
  standalone:true,
  styleUrls: ['./horizontal-bar-chart.component.css']
})
export class HorizontalBarChartComponent implements OnInit {

>>>>>>> fc665f2c5dc6c972265761322f70c8102afa1205
  data1: ChartData[] = [
    {
      name: 'Germany',
      value: 50000,
    },
    {
<<<<<<< HEAD
      name: 'United States',
      value: 40000,
    },
    {
      name: 'France',
      value: 30000,
    },
    {
      name: 'United Kingdom',
      value: 20000,
    },
    {
      name: 'Spain',
      value: 10000,
    },
  ];

  @Input() title = 'Top selling products';
  @Input() color = '#50C878';
  @Input() data: any[] = this.data1;
=======
      "name": "United States",
      "value": 30000,
    },
    {
      "name": "France",
      "value": 40000,
    },
    {
      "name": "Cheese Bread",
      "value": 10000,
    },
    {
      "name": "Spain",
      "value": 20000,
    }
  ];
  
  @Input() title="Top selling products";
  @Input() color='#50C878';
  @Input() data:any[]=this.data1;
  @Input() brower_width = 300;
  @Input() browser_height = 250;
  // brower_width=500    //this is width of svg for the desktop screen
   barWidth=0.8;   // adjust this to handle the width of the bar
>>>>>>> fc665f2c5dc6c972265761322f70c8102afa1205
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;
  constructor() {}
  ngOnInit(): void {
    this.createChart();
<<<<<<< HEAD

    var width = window.innerWidth;
    var height = window.innerHeight;

    console.log('Width: ' + width + 'px');
    console.log('Height: ' + height + 'px');
=======
>>>>>>> fc665f2c5dc6c972265761322f70c8102afa1205
  }

  private createChart(): void {
<<<<<<< HEAD
    if (this.title === 'Top selling products') {
=======
    if(this.title==='Top selling products') {
>>>>>>> fc665f2c5dc6c972265761322f70c8102afa1205
      this.data.sort((a, b) => b.value - a.value);
    } else {
      this.data.sort((a, b) => a.value - b.value);
    }
<<<<<<< HEAD
    const brower_width = 300,
      browser_height = 250;
    // const brower_width=500,browser_height=280;   //monitor

    const element = this.chartContainer.nativeElement;
    const data = this.data;
    const margin = { top: 10, right: 0, bottom: 40, left: 150 }; // Reduced top margin
    const width = brower_width - margin.left - margin.right; // Adjust width
    const height = browser_height - margin.top - margin.bottom; // Adjust height
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right + 100) // Adjust for additional space
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) ?? 0])
      .range([0, width]);

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, height])
      .padding(0.2); // Adjust padding to make use of all space

    const yAxis = svg.append('g').call(d3.axisLeft(y));

    yAxis.selectAll('.domain, .tick line').attr('display', 'none');
    // Add color to the country labels and move them up
    yAxis
      .selectAll('.tick text')
      .attr('font-size', '14px')
      .attr('font-family', 'afacad')
      .attr('fill', 'grey') // Replace 'yourColor' with the desired color (e.g., 'black', '#ff0000', etc.)
      .attr('dy', '-0.1em'); // Move the text up

    svg
      .selectAll('.bar')
=======

    const element = this.chartContainer.nativeElement;
    const data = this.data;
    const margin = { top: 10, right: 10, bottom: 40, left: 100 }; // Increased left margin to provide space for labels
    const width = this.brower_width - margin.left - margin.right;
    const height = this.browser_height - margin.top - margin.bottom;
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    const tooltip = d3.select('#tooltip');

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) ?? 0])
      .range([0, width-10]);
  
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
>>>>>>> fc665f2c5dc6c972265761322f70c8102afa1205
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
<<<<<<< HEAD
      .attr('y', (d) => (y(d.name) ?? 0) + 5) // Add padding to the top of each bar
      .attr('width', (d) => x(d.value) ?? 0)
      .attr('height', y.bandwidth() - 20) // Reduce height to add padding to the bottom of each bar
      .attr('fill', this.color)
      .attr('rx', 5) // Set x radius for rounded corners
      .attr('ry', 5); // Set y radius for rounded corners

    const labels = svg.selectAll('.bar-label').data(data).enter();
=======
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
      .attr('width', d => (x(d.value) ?? 0) * this.barWidth); // Reduce width by 20%
  
    const labels = svg.selectAll('.bar-label')
      .data(data)
      .enter();
  


>>>>>>> fc665f2c5dc6c972265761322f70c8102afa1205

    labels
      .append('text')
      .attr('class', 'value-label')
<<<<<<< HEAD
      .attr('y', (d) => (y(d.name) ?? 0) + (y.bandwidth() / 2 - 4)) // Bar value adjust
      .attr('x', (d) => (x(d.value) ?? 0) + 10) // Bar value space adjust
      .attr('font-weight', 'lighter') // Set font weight
      .attr('fill', 'black')
      .text((d) => d.value)
      .attr('font-family', 'afacad')
      .attr('text-baseline', 'start')
      .attr('alignment-baseline', 'middle') // Vertical alignment
      .attr('font-size', '14px'); // Consistent font size
=======
      .attr('y', d => (y(d.name) ?? 0) + (y.bandwidth() / 2 - 4))
      .attr('x', d => (x(d.value) ?? 0) * this.barWidth + 10) // Adjust label position accordingly
      .attr('font-weight', 'lighter')
      .attr('fill', 'black')
      .text(d => d.value)
      .attr('font-family', 'afacad')
      .attr('text-baseline', 'start')
      .attr('alignment-baseline', 'middle')
      .attr('font-size', '14px');
>>>>>>> fc665f2c5dc6c972265761322f70c8102afa1205
  }
}
