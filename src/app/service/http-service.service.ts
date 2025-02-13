import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  crossSellingProducts,
  CustomerInsights,
  listData,
  productPerformance,
} from '../type';
import { LineChartData } from '../shared/line-chart/line-chart.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private httpClient = inject(HttpClient);
  private api = 'http://172.31.171.161:8080/api/v1/';
  private storeId = '1';
  private targetValue: 'sales' | 'quantity' = 'sales';
  public targetValue$ = new BehaviorSubject<'sales' | 'quantity'>('sales');
  private timeFrame: 'week' | 'month' | 'year' = 'week';
  public timeFrame$ = new BehaviorSubject<'week' | 'month' | 'year'>('week');

  setTargetValue(targetValue: 'sales' | 'quantity') {
    this.targetValue = targetValue;
    this.targetValue$.next(this.targetValue);
  }

  setTimeFrame(timeFrame: 'week' | 'month' | 'year') {
    this.timeFrame = timeFrame;
  }

  getTimeFrame() {
    return this.timeFrame;
  }

  getTargetValue() {
    return this.targetValue;
  }

  setStoreId(storeId: string) {
    this.storeId = storeId;
  }

  getLineChartData() {
    return this.httpClient.get(this.api + 'analysis/test');
  }

  getDepartmentsList() {
    return this.httpClient.get<listData>(this.api + 'departments');
  }

  getOperatorList() {
    return this.httpClient.get(this.api + 'operator');
  }

  getDepartmentTrends(id: string[], timeFrame: string) {
    return this.httpClient.post<LineChartData>(
      this.api + 'analysis/trends?_for=department',
      {
        timeFrame: this.timeFrame,
        departmentIds: id,
        storeId: this.storeId,
        targetValue: this.targetValue,
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

  getProductTrends(id: any, timeFrame: string) {
    return this.httpClient.post<LineChartData>(
      this.api + 'analysis/trends?_for=product',
      {
        timeFrame: this.timeFrame,
        productIds: [id],
        storeId: this.storeId,
        targetValue: this.targetValue,
      }
    );
  }

  getProductPerformance(id: any, timeFrame: string) {
    return this.httpClient.post<productPerformance>(
      this.api + 'analysis/performance/product',
      {
        timeFrame: this.timeFrame,
        departmentIds: [id],
        storeId: this.storeId,
        targetValue: this.targetValue,
      }
    );
  }
  getDepartmentComparisonCustomerInsights(id: any, timeFrame: string) {
    return this.httpClient.post<CustomerInsights>(
      this.api + 'analysis/insights',
      {
        timeFrame: this.timeFrame,
        departmentIds: id,
        storeId: this.storeId,
        targetValue: 'any',
      }
    );
  }

  getDepartmentCustomerInsights(id: any, timeFrame: string) {
    return this.httpClient.post<CustomerInsights>(
      this.api + 'analysis/insights',
      {
        timeFrame: this.timeFrame,
        departmentIds: [id],
        storeId: this.storeId,
        targetValue: 'any',
      }
    );
  }

  getProductCustomerInsights(id: any, timeFrame: string) {
    return this.httpClient.post<CustomerInsights>(
      this.api + 'analysis/insights',
      {
        timeFrame: this.timeFrame,
        productIds: [id],
        storeId: this.storeId,
        targetValue: 'any',
      }
    );
  }

  //data from backend for Top-selling-bar-chart and Least selling bar chart
  getTopAndLeastPerformance(id: any, timeFrame: string) {
    return this.httpClient.post<productPerformance>(
      this.api + 'analysis/performance/product',
      {
        timeFrame: this.timeFrame,
        departmentIds: id,
        storeId: this.storeId,
        targetValue: this.targetValue,
      }
    );
  }

  getCrossSellingData(id: any, timeFrame: string) {
    return this.httpClient.post<any>(
      this.api + 'analysis/cross-sell/department',
      {
        timeFrame: this.timeFrame,
        departmentIds: id,
        storeId: this.storeId,
        targetValue: this.targetValue,
      }
    );
  }

  getCrossSellingProducts(id: any, timeFrame: string) {
    return this.httpClient.post<crossSellingProducts>(
      this.api + 'analysis/cross-sell/product',
      {
        timeFrame: this.timeFrame,
        productIds: id,
        storeId: this.storeId,
        targetValue: this.targetValue,
      }
    );
  }
}
