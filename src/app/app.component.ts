import { Component } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  barChartName:string="Top selling products"
   title="App c"
}
