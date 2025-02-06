import { Component } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { DropDownComponent } from "./shared/drop-down/drop-down.component";
import {NgxChartsModule} from '@swimlane/ngx-charts'; 
import { BarChartComponent } from './shared/bar-chart/bar-chart/bar-chart.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet, DropDownComponent,BarChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'visualization-project';
 
}
