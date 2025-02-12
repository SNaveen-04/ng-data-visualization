import { Component, input, output } from '@angular/core';

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
  deselect = output<string>();
  cancel() {
    this.department().selected = false;
    this.deselect.emit(this.department().id);
  }
}
