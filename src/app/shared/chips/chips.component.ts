import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chips',
  imports: [],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.css',
})
export class ChipsComponent {
  department = input.required<{
    id: string;
    name: string;
    selected: boolean;
  }>();

  cancel() {
    this.department().selected = false;
  }
}
