import { Component, Input, OnInit } from '@angular/core';
import { QueryByParamsDirective } from '../../../../directives/query-by-params.directive';


@Component({
  selector: 'sorter-th',
  templateUrl: './sorter-th.component.html',
  styleUrls: ['./sorter-th.component.css']
})
export class SorterThComponent implements OnInit {

  @Input("propertyName") propertyName: string = "";
  @Input("paginationDirective") pagination!: QueryByParamsDirective;
  @Input("order") order?: "asc" | "desc" | "";
  constructor() {
  }

  ngOnInit(): void {
    // this.pagination.registerSorterTh(this);
    if (this.pagination.isSelected(this.propertyName)) {
      this.order = this.pagination.sortDirection;


    }
    this.pagination.onSortChangeEvent.subscribe({
      next: (sortBy: string) => {
        if (this.propertyName != sortBy) {
          this.order = undefined;
        }
      }
    });
  }
  onToggle() {
    switch (this.order) {
      case undefined:
        this.order = "asc";
        break
      case "asc":
        this.order = "desc";
        break
      case "desc":
        this.order = undefined;
        break
    }
    this.pagination.onSortChange(this.propertyName, this.order);
  }
}
