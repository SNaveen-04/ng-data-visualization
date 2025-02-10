import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomLinerChartService {
  /**
   * custom: override SVG to have the dots display all the time over the line chart
   * since it's not supported anymore from ngx chart
   */

  showDots(chart: any) {
    let index = 0;
    const paths =
      chart.chartElement.nativeElement.getElementsByClassName('line-series');
    const colors =
      chart.chartElement.nativeElement.getElementsByClassName('line-highlight');

    for (let path of paths) {
      const chrtColor = colors[index].getAttribute('ng-reflect-fill');
      const pathElement = path.getElementsByTagName('path')[0];
      const pathAttributes = {
        'marker-start': `url(#dot${index})`,
        'marker-mid': `url(#dot${index})`,
        'marker-end': `url(#dot${index})`,
      };
      this.createMarker(chart, chrtColor, index);
      this.setAttributes(pathElement, pathAttributes);
      index += 1;
    }
  }

  /**
   * create marker
   *
   */

  createMarker(chart: any, color: any, index: any) {
    const svg = chart.chartElement.nativeElement.getElementsByTagName('svg')[0];
    const defs = svg.getElementsByTagName('defs')[0];

    var marker = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'marker'
    );
    var circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );

    const markerAttributes = {
      id: `dot${index}`,
      viewBox: '0 0 10 10',
      refX: 5,
      refY: 5,
      markerWidth: 5,
      markerHeight: 5,
    };

    const circleAttributes = {
      cx: 5,
      cy: 5,
      r: 4, // Adjust the radius as needed
      fill: color,
    };

    this.setAttributes(marker, markerAttributes);
    this.setAttributes(circle, circleAttributes);

    marker.appendChild(circle);
    defs.appendChild(marker);
  }

  /**
   * set multiple attributes
   */
  setAttributes(element: any, attributes: any) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }
}
