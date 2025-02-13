import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  crossSellingProducts,
  CustomerInsights,
  listData,
  operatorResponse,
  productPerformance,
  timeFrame,
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
  private timeFrame: timeFrame = 'week';
  public timeFrame$ = new BehaviorSubject<timeFrame>(this.timeFrame);
  public storeId$ = new BehaviorSubject<number>(1);

  setTargetValue(targetValue: 'sales' | 'quantity') {
    this.targetValue = targetValue;
    this.targetValue$.next(this.targetValue);
  }

  setTimeFrame(timeFrame: timeFrame) {
    this.timeFrame = timeFrame;
    this.timeFrame$.next(this.timeFrame);
  }

  getTimeFrame() {
    return this.timeFrame;
  }

  getTargetValue() {
    return this.targetValue;
  }

  setStoreId(storeId: string) {
    this.storeId = storeId;
    this.storeId$.next(1);
  }

  getLineChartData() {
    return this.httpClient.get(this.api + 'analysis/test');
  }

  getDepartmentsList() {
    return this.httpClient.get<listData>(this.api + 'departments');
  }

  getOperatorList() {
    return this.httpClient.get<operatorResponse[]>(
      this.api + 'operator/store/' + this.storeId
    );
  }

  getStoreList() {
    return this.httpClient.get<operatorResponse[]>(this.api + 'stores');
  }

  getDepartmentTrends(id: string[]) {
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

  getProductTrends(id: any) {
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

  getOperatorTrends(id: any) {
    return this.httpClient.post(this.api + 'analysis/trends?_for=operator', {
      timeFrame: 'day',
      operatorId: id,
      targetValue: 'sales',
    });
  }

  getProductPerformance(id: any) {
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

  getDepartmentCustomerInsights(id: any) {
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

  getProductCustomerInsights(id: any) {
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
  getTopAndLeastPerformance(id: any) {
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

  getCrossSellingData(id: any) {
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

  getCrossSellingProducts(id: any) {
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
