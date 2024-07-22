import { Component, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { QueryByParamsDirective } from '../../../directives/query-by-params.directive';
import { MenuService } from '../../../services/menu.service';
import { PaginationDirective } from '../../../directives/pagination.directive';
import { DatePaginationDirective } from '../../../directives/date-pagination.directive';

@Component({
  selector: 'app-paginated-search-table',
  templateUrl: './paginated-search-table.component.html',
  styleUrls: ['./paginated-search-table.component.css']
})
export class PaginatedSearchTableComponent implements OnInit {
  @Input('isCard') isCard: boolean = true;
  @Input('showExportButtons') showExportButtons: boolean = true;
  @Input('textForNoData') textForNoData: string = 'No hay datos disponibles.'
  protected queryByParamsInstance!: QueryByParamsDirective;
  constructor(
    public readonly menuService: MenuService,
    @Optional() public readonly pagination: PaginationDirective,
    @Optional() public readonly datePagination?: DatePaginationDirective,
  ) {
    if (pagination) {
      this.queryByParamsInstance = pagination;
    } else if (datePagination) {
      this.queryByParamsInstance = datePagination;
    }
  }

  ngOnInit(): void { }

  onPrevious() {
    this.queryByParamsInstance.onPrevious();
  }
  onNext() {
    this.queryByParamsInstance.onNext();
  }
  onSearchChange() {
    this.queryByParamsInstance.onSearchChange();
  }
  onSearch() {
    this.queryByParamsInstance.updateTableContent();
  }
}
