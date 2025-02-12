import {
  Component,
  input,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { storeId } from '../../../data';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'multi-store-app-navbar',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class MultiStoreNavbarComponent {
  selected = output<any>();
  image_path = 'assets/images/user.png';
  storeId = storeId;
  isListOpen = false;
  filterValue = 101;
  isMultiStore = true;

  toggleVisible() {
    this.isListOpen = !this.isListOpen;
  }

  select(value: any) {
    this.selected.emit(value);
    this.filterValue = value;
    this.isListOpen = false;
  }
}
