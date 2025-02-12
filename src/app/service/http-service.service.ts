import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  crossSellingProducts,
  CustomerInsights,
  listData,
  productPerformance,
} from '../type';
import { LineChartData } from '../shared/line-chart/line-chart.component';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private httpClient = inject(HttpClient);
  private api = 'http://172.31.171.161:8080/api/v1/';
  private storeId = '1';
  private targetValue: 'sales' | 'quantity' | 'any' = 'sales';

  setTargetValue(targetValue: 'sales' | 'quantity' | 'any') {
    this.targetValue = targetValue;
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

  getDepartmentTrends(id: string[], timeFrame: string) {
    return this.httpClient.post<LineChartData>(
      this.api + 'analysis/trends?_for=department',
      {
        timeFrame: timeFrame,
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
        timeFrame: timeFrame,
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
        timeFrame: timeFrame,
        departmentIds: [id],
        storeId: this.storeId,
        targetValue: this.targetValue,
      }
    );
  }

  getDepartmentCustomerInsights(id: any, timeFrame: string) {
    return this.httpClient.post<CustomerInsights>(
      this.api + 'analysis/insights',
      {
        timeFrame: timeFrame,
        departmentIds: [id],
        storeId: this.storeId,
        targetValue: 'any',
      }
    );
  }
  


  //data from backend for Top-selling-bar-chart and Least selling bar chart  
  getTopAndLeastPerformance(id:any,timeFrame:string)
  {
     return this.httpClient.post<productPerformance>(
       this.api+'analysis/performance/product',
       {
           timeFrame:timeFrame,
           departmentIds:id
           ,
           storeId:this.storeId,
           targetValue:'sales'
           
       }
     )
  }

  getCrossSellingData(id:any,timeFrame:string)
  {
     return this.httpClient.post<any>(
      this.api+'analysis/cross-sell/department'
      ,
      {
        timeFrame:timeFrame,
        departmentIds:id
        ,
        storeId:this.storeId,
        targetValue:'sales'
      }
     )
  }



  getCrossSellingProducts(id: any, timeFrame: string) {
    return this.httpClient.post<crossSellingProducts>(
      this.api + 'analysis/cross-sell/product',
      {
        timeFrame: timeFrame,
        productIds: id,
        storeId: this.storeId,
        targetValue: this.targetValue,
      }
    );
  }
}
