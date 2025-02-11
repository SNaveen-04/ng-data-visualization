import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { listData } from '../type';
import { LineChartData } from '../shared/line-chart/line-chart.component';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private httpClient = inject(HttpClient);
  private api = 'http://172.31.171.161:8080/api/v1/';

  getLineChartData() {
    return this.httpClient.get(this.api + 'analysis/test');
  }

  getDepartmentsList() {
    return this.httpClient.get<listData>(this.api + 'departments');
  }

  getDepartmentTrends(id: any, timeFrame: string) {
    return this.httpClient.post<LineChartData>(
      this.api + 'analysis/trends?_for=department',
      {
        timeFrame: timeFrame,
        departmentIds: [id],
        storeId: 1,
        targetValue: 'sales',
      }
    );
  }
  getProductList() {
    return this.httpClient.get<
      {
        id: string;
        name: string;
      }[]
    >(this.api + 'product');
  }
}
