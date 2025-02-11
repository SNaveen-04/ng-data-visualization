import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAnalysisComponent } from './department-analysis.component';

describe('DepartmentAnalysisComponent', () => {
  let component: DepartmentAnalysisComponent;
  let fixture: ComponentFixture<DepartmentAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
