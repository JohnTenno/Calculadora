import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

  constructor() { }

  public version: string = environment.version;

  ngOnInit() {
  }

}
