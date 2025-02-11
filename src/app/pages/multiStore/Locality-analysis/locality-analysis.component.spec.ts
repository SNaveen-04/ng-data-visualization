import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityAnalysisComponent } from './locality-analysis.component';

describe('LocalityAnalysisComponent', () => {
  let component: LocalityAnalysisComponent;
  let fixture: ComponentFixture<LocalityAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalityAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalityAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
