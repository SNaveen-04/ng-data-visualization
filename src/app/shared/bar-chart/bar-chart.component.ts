import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-bar-chart',
  imports: [NgxChartsModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {
 @Input() barChartName!:string;
  data=[
    {
      "name": "Germany",
      "value": 40632,
      "extra": {
        "code": "de"
      }
    },
    {
      "name": "United States",
      "value": 50000,
      "extra": {
        "code": "us"
      }
    },
    {
      "name": "France",
      "value": 36745,
      "extra": {
        "code": "fr"
      }
    },
    {
      "name": "United Kingdom",
      "value": 36240,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "Spain",
      "value": 33000,
      "extra": {
        "code": "es"
      }
    },
    {
      "name": "Italy",
      "value": 35800,
      "extra": {
        "code": "it"
      }
    }
  ]
  customColors = () => {
    return '#50C878'; // Set all bars to green color
  };

  axisFormat=(val:any)=>{
       return '$'+val;
  }
  xAxisTickFormat(value: string): string {
    return ' ' + value; // Add a space before the value
  }
  
}
