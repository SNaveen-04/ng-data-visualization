import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { listData } from '../../type';
@Component({
  selector: 'app-drop-down',
  imports: [FormsModule],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css',
})
export class DropDownComponent {
  selectedValue = input.required<string>();
  listElements = input.required<listData>();
  selected = output<string>();

  filterValue = signal('');
  image_path = 'assets/images/dropdown.png';
  isListOpen = false;

  filteredList = computed(() => {
    if (
      this.listElements()
        .map((d) => d.name)
        .includes(this.filterValue())
    ) {
      return this.listElements();
    }
    return this.listElements().filter((value) =>
      value.name.toLowerCase().includes(this.filterValue().toLowerCase())
    );
  });

  ngOnChanges() {
    this.filterValue.set(this.selectedValue());
  }

  toggleVisible() {
    this.isListOpen = !this.isListOpen;
  }

  select(value: string) {
    this.selected.emit(value);
    this.filterValue.set(value);
    this.isListOpen = false;
  }
}
