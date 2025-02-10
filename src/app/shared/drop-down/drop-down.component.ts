import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-drop-down',
  imports: [FormsModule],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css',
})
export class DropDownComponent {
  value = 'Apple';
  image_path = 'assets/images/dropdown.png';

  listElements = [
    'Apple',
    'Mango',
    'Orange',
    'Cucumber',
    'Apple',
    'Mango',
    'Orange',
    'Cucumber',
    'Apple',
    'Mango',
    'Orange',
    'Cucumber',
    'Apple',
    'Mango',
    'Orange',
    'Cucumber',
    'Apple',
    'Mango',
    'Orange',
    'Cucumber',
    'Apple',
    'Mango',
    'Orange',
    'Cucumber',
    'Apple',
    'Mango',
    'Orange',
    'Cucumber',
    'Apple',
    'Mango',
    'Orange',
    'Cucumber',
    'Apple',
    'Mango',
    'Orange',
    'Cucumber',
    'Apple',
    'Mango',
    'Orange',
    'Cucumber',
  ];

  select(value: string) {
    console.log(value);
  }
}
