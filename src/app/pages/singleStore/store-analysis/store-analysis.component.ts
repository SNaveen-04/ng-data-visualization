import { Component, inject } from '@angular/core';
import { CustomerInsightsComponent } from '../../../shared/customer-insights/customer-insights.component';
import {
  LineChartComponent,
  LineChartData,
} from '../../../shared/line-chart/line-chart.component';
import { HorizontalBarChartComponent } from '../../../shared/horizontal-bar-chart/horizontal-bar-chart.component';
import { HttpService } from '../../../service/http-service.service';
import { MultiSelectDropDownComponent } from '../../../shared/multi-select-drop-down/multi-select-drop-down.component';
import { ChipsComponent } from '../../../shared/chips/chips.component';
import { CrossSellingDepartments, customerData } from '../../../../data';
import { CrossSellingBarChartComponent } from '../../../shared/cross-selling-bar-chart/cross-selling-bar-chart.component';
import { timeFrame } from '../../../type';
@Component({
  selector: 'app-store-analysis',
  imports: [
    LineChartComponent,
    CustomerInsightsComponent,
    HorizontalBarChartComponent,
    MultiSelectDropDownComponent,
    ChipsComponent,
    CrossSellingBarChartComponent,
  ],
  templateUrl: './store-analysis.component.html',
  styleUrl: './store-analysis.component.css',
})
export class StoreAnalysisComponent {
  private httpService = inject(HttpService);
  public crossData:any[]=[];
  timeFrame: timeFrame = 'month';
  leastSellingData:any[]=[];
  topSellingData:any[]=[];
  topLeastTotalData:any;
  customerData = customerData;
  LineChartdata!: LineChartData;
  selectedIds: string[] = [];
  listElements: {
    id: string;
    name: string;
    selected: boolean;
  }[] = [];
  get disabled() {
    if (this.selectedDepartments.length === 1) return true;
    return false;
  }
  get selectedDepartments() {
    return this.listElements
      .filter((d) => d.selected)
      .map((d) => {
        return {
          id: d.id,
          name: d.name,
        };
      });
  }

  select() {
    this.selectedIds = this.listElements
      .filter((element) => element.selected)
      .map((element) => element.id);
    this.getDepartmentTrends();
    this.getTopLeastData();
    this.getCrossSellingData();
  }

  ngOnInit() {
    this.getDepartmentsList();
  }

 getTopLeastData()
 {
  this.httpService.getTopAndLeastPerformance(this.selectedIds, 'week').subscribe({
    next: (data) => {
      // console.log(data);
      this.createPerformanceData(data);
    },
    error: (e) => console.log(e),
  });
 } 
  
  
// split the product performance into top least bar chart and least selling bar chart data 
 //input :  data  - from the  backend
 //output : topSellingData, leastSelling data variable assigned with their values 
 createPerformanceData(datas: any[]) {
  this.topLeastTotalData=datas;
  let finalData: any[] = []; // Initialize finalData as an empty array
  datas.forEach(data => {
      data.data.forEach((item: any) => { 
          finalData.push({ "name": item.name, "value":Math.floor( item.value) });
      });
  });
  console.log("final data : ", finalData);
 finalData.sort((a,b)=>{return a.value-b.value});
this.leastSellingData=finalData.slice(0,5);
this.topSellingData=finalData.slice(finalData.length-5,finalData.length);
 console.log("top data : ",this.topSellingData);
 console.log("least data :",this.leastSellingData);
}

removeTopLeastData(id:string)
{
  let temp: string = '';
  for (const item of this.listElements) {
    if (item.id === id) {
      temp = item.name;
    }
  }
  this.topLeastTotalData = this.topLeastTotalData.filter((data: any) => data.name !== temp);
  this.createPerformanceData(this.topLeastTotalData);
}

removeCrossSelingData(id:string)
{
  let temp: string = '';
  for (const item of this.listElements) {
    if (item.id === id) {
      temp = item.name;
    }
  }
  this.crossData = this.crossData.filter((data: any) => data.name !== temp);
}



getCrossSellingData()
{
  this.httpService.getCrossSellingData(this.selectedIds,this.timeFrame).subscribe({
    next:(data)=>{
      this.crossData=data;
      console.log("Get cross selling data : ",this.crossData);
      
    },
    error: (error) => console.log(error),
  })
}





  getDepartmentTrends() {
    this.httpService
      .getDepartmentTrends(this.selectedIds, this.timeFrame)
      .subscribe({
        next: (data) => {
          this.LineChartdata = data;
        },
        error: (error) => console.log(error),
      });
  }

  getDepartmentsList() {
    this.httpService.getDepartmentsList().subscribe({
      next: (data) => {
        this.listElements = data.map((d) => {
          return {
            ...d,
            selected: false,
          };
        });
        this.selectedIds = [this.listElements[0].id];
        this.listElements[0].selected = true;
        this.getDepartmentTrends();
        this.getTopLeastData();
        this.getCrossSellingData();
      },
      error: (e) => console.log(e),
    });
  }

  deselect(id: string) {
    if (this.selectedIds.length !== 1) {
      this.selectedIds = this.selectedIds.filter((d) => d != id);
      let temp = '';
      this.listElements.map((d) => {
        if (d.id === id) {
          temp = d.name;
        }
      });
      this.LineChartdata = this.LineChartdata.filter((d) => d.name !== temp);
    } else {
      this.listElements.map((d) => {
        if (d.id === id) {
          d.selected = true;
        }
      });
    }
    this.removeTopLeastData(id);
    this.removeCrossSelingData(id);
  }
  
}
