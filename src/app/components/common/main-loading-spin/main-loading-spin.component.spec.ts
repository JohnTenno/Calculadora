import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLoadingSpinComponent } from './main-loading-spin.component';

describe('MainLoadingSpinComponent', () => {
  let component: MainLoadingSpinComponent;
  let fixture: ComponentFixture<MainLoadingSpinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainLoadingSpinComponent]
    });
    fixture = TestBed.createComponent(MainLoadingSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
