import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chips',
  imports: [],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.css',
})
export class ChipsComponent {
  text = input.required<string>();
}
