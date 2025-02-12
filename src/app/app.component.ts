import { Component } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { MultiStoreNavbarComponent } from './shared/navbar copy/navbar.component';
@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet, MultiStoreNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  barChartName: string = 'Top selling products';
  title = 'App component';
}
