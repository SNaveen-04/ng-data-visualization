import { Component, DestroyRef, inject, output } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { storeId } from '../../../data';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../service/http-service.service';
import { StoreType, timeFrame } from '../../type';
import { DropDownComponent } from '../drop-down/drop-down.component';

@Component({
  selector: 'multi-store-app-navbar',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class MultiStoreNavbarComponent {
  private route = inject(Router);
  private destroyRef = inject(DestroyRef);
  private httpService = inject(HttpService);
  storeId: StoreType[] = [];
  isListOpen = false;
  filterValue: string = '1';
  isMultiStore = false;
  navigationPrefix: '/multi' | '/single' = '/single';
  targetValue: 'sales' | 'quantity' = 'sales';
  timeFrame: timeFrame = 'week';
  timeFrameList: timeFrame[] = ['week', 'month', 'year'];
  isTFListOpen = false;
  get domain() {
    if (this.timeFrame === 'week') return 'Mon - Sun';
    if (this.timeFrame === 'month') return '1 - 31';
    return 'Feb - Jan';
  }
  ngOnInit() {
    this.timeFrame = this.httpService.getTimeFrame();
    const subscriber = this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.route.url.startsWith('/multi/')) {
          this.isMultiStore = true;
          this.navigationPrefix = '/multi';
        } else {
          this.navigationPrefix = '/single';
          this.isMultiStore = false;
        }
      }
    });
    this.destroyRef.onDestroy(() => {
      subscriber.unsubscribe();
    });
    this.httpService.getStoreList().subscribe({
      next: (data) => {
        this.storeId = data;
        this.filterValue = data[0].id;
      },
      error: (e) => console.log(e),
    });
  }

  changeTargetValue(targetValue: 'sales' | 'quantity') {
    this.targetValue = targetValue;
    this.httpService.setTargetValue(this.targetValue);
  }

  toggleVisible() {
    this.isListOpen = !this.isListOpen;
  }
  toggleTFList() {
    this.isTFListOpen = !this.isTFListOpen;
  }
  select(value: string) {
    this.filterValue = value;
    this.httpService.setStoreId(value);
    this.isListOpen = false;
  }

  selectTimeFrame(timeFrame: timeFrame) {
    this.httpService.setTimeFrame(timeFrame);
    this.timeFrame = timeFrame;
    this.isTFListOpen = false;
  }

  TimeFrameText(timeFrame: timeFrame) {
    return timeFrame.at(0)?.toUpperCase() + timeFrame.substring(1);
  }
}
