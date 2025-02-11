import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-multi-select-drop-down',
  imports: [FormsModule],
  templateUrl: './multi-select-drop-down.component.html',
  styleUrl: './multi-select-drop-down.component.css',
})
export class MultiSelectDropDownComponent {
  selectedValue = input.required<string>();
  listElements = input.required<
    {
      id: string;
      name: string;
      selected: boolean;
    }[]
  >();
  selected = output<string>();
  filteredElements = signal([
    {
      id: '',
      name: '',
      selected: false,
    },
  ]);

  filterValue = signal('');
  image_path = 'assets/images/dropdown.png';
  isListOpen = false;

  // filteredList = computed(() => {
  //   if (this.listElements().includes(this.filterValue())) {
  //     return this.listElements();
  //   }
  //   return this.listElements().filter((element) =>
  //     element.value.toLowerCase().includes(this.filterValue().toLowerCase())
  //   );
  // });

  ngOnChanges() {
    this.filterValue.set(this.selectedValue());
    this.filteredElements.set(this.listElements());
  }

  toggleVisible() {
    this.isListOpen = !this.isListOpen;
  }

  select(value: string) {
    this.filterValue.set(value);
    console.log(this.listElements());
  }

  close() {
    this.isListOpen = false;
  }
}
