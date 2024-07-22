import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatedSearchTableComponent } from './paginated-search-table.component';

describe('PaginatedSearchTableComponent', () => {
  let component: PaginatedSearchTableComponent;
  let fixture: ComponentFixture<PaginatedSearchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatedSearchTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatedSearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
