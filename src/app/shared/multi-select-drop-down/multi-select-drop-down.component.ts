import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-multi-select-drop-down',
  imports: [FormsModule],
  templateUrl: './multi-select-drop-down.component.html',
  styleUrl: './multi-select-drop-down.component.css',
})
export class MultiSelectDropDownComponent {
  listElements = input.required<
    {
      id: string;
      name: string;
      selected: boolean;
    }[]
  >();
  disabled = input.required<boolean>();
  selected = output();
  filteredElements = signal([
    {
      id: '',
      name: '',
      selected: true,
    },
  ]);
  selectedCount = computed(() => {
    let count = 0;
    this.listElements().map((d) => {
      if (d.selected) {
        count++;
      }
    });
    return count;
  });
  image_path = 'assets/images/dropdown.png';
  isListOpen = false;

  ngOnChanges() {
    this.filteredElements.set(this.listElements());
  }

  toggleVisible() {
    this.isListOpen = !this.isListOpen;
  }

  isDisabled(condition: boolean) {
    return condition && this.disabled();
  }

  close() {
    this.isListOpen = false;
    this.selected.emit();
  }
}
