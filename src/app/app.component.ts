import { Component } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { DropDownComponent } from "./shared/drop-down/drop-down.component";

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet, DropDownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'visualization-project';
}
