import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MultiStoreNavbarComponent } from './shared/navbar/navbar.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MultiStoreNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  barChartName: string = 'Top selling products';
  title = 'App component';
}
