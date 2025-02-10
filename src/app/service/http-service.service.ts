import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  private httpClient = inject(HttpClient);
  private api = 'http://172.31.171.161:8080/api/v1/analysis/test';

  getLineChartData() {
    return this.httpClient.get(this.api);
  }
}
