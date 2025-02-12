import { Component, DestroyRef, inject, output } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
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
  isMultiStore = false;
  navigationPrefix: '/multi' | '/single' = '/single';
  private route = inject(Router);
  private destroyRef = inject(DestroyRef);
  ngOnInit() {
    const subscriber = this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.route.url.startsWith('/multi/')) {
          this.isMultiStore = true;
        } else {
          this.isMultiStore = false;
        }
      }
    });
    this.destroyRef.onDestroy(() => {
      subscriber.unsubscribe();
    });
  }

  toggleVisible() {
    this.isListOpen = !this.isListOpen;
  }

  select(value: any) {
    this.selected.emit(value);
    this.filterValue = value;
    this.isListOpen = false;
  }
}
