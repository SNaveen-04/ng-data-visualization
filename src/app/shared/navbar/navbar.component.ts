import { Component, DestroyRef, inject, output } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../service/http-service.service';
import { StoreType, timeFrame } from '../../type';

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
  navigationPrefix: '/multi/store' | '/single' = '/single';
  targetValue: 'sales' | 'quantity' = 'sales';
  timeFrame: timeFrame = 'week';
  timeFrameList: timeFrame[] = ['day', 'week', 'month', 'year'];
  isTFListOpen = false;
  get domain() {
    const date = new Date();
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    if (this.timeFrame === 'day') {
      const currentHour = date.getHours();
      return `${currentHour}:00 - ${currentHour}:00`;
    }
    if (this.timeFrame === 'week') {
      const currentDay = date.getDay();
      return `${daysOfWeek[(currentDay + 1) % 7]} - ${daysOfWeek[currentDay]}`;
    }
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const currentMonth = date.getMonth();
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    if (this.timeFrame === 'month') {
      const currentDate = date.getDate();
      const startingDate = 30 - currentDate;
      return `${days[prevMonth] - startingDate} ${
        months[prevMonth]
      }- ${currentDate} ${months[currentMonth]}`;
    }
    const year = date.getFullYear();
    return `${months[(currentMonth + 1) % 12]} ${(year - 1) % 100} - ${
      months[currentMonth]
    } ${year % 100}`;
  }
  ngOnInit() {
    this.timeFrame = this.httpService.getTimeFrame();
    const subscriber = this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.route.url.startsWith('/multi/')) {
          this.isMultiStore = true;
          this.navigationPrefix = '/multi/store';
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
