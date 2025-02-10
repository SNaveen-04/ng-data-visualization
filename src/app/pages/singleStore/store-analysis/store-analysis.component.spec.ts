import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAnalysisComponent } from './store-analysis.component';

describe('StoreAnalysisComponent', () => {
  let component: StoreAnalysisComponent;
  let fixture: ComponentFixture<StoreAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
