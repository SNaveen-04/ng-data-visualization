import { Component } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { HorizontalBarChartComponent } from "./shared/d3-bar-chart/horizontal-bar-chart/horizontal-bar-chart.component";
@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet, HorizontalBarChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  barChartName:string="Top selling products";
   title="App component";
}
