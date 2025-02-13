import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorAnalysisComponent } from './operator-analysis.component';

describe('OperatorAnalysisComponent', () => {
  let component: OperatorAnalysisComponent;
  let fixture: ComponentFixture<OperatorAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatorAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
