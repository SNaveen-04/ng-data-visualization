import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-drop-down',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css',
})
export class DropDownComponent {
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  cars = [
    { value: 'ford', viewValue: 'Ford' },
    { value: 'chevrolet', viewValue: 'Chevrolet' },
    { value: 'dodge', viewValue: 'Dodge' },
  ];
  selectedFood = this.foods[2].value;
  selectedCar = this.cars[0].value;

  selectCar(event: Event) {
    this.selectedCar = (event.target as HTMLSelectElement).value;
  }
}
