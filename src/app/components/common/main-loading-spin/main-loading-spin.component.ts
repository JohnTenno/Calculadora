import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-loading-spin',
  templateUrl: './main-loading-spin.component.html',
  styleUrls: ['./main-loading-spin.component.css']
})
export class MainLoadingSpinComponent {
  @Input('loaded') loaded: boolean = false;


  /**
   * @todo Support for if else working.
   * @todo Use of main loading spin.
   */
}
