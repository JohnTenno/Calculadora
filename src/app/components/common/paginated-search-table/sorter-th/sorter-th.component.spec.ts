import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorterThComponent } from './sorter-th.component';

describe('SorterThComponent', () => {
  let component: SorterThComponent;
  let fixture: ComponentFixture<SorterThComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SorterThComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SorterThComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
