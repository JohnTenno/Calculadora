import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-refresh-button',
  templateUrl: './refresh-button.component.html',
  styleUrls: ['./refresh-button.component.css']
})
export class RefreshButtonComponent implements OnInit {
  @Input("text") text:String="Actualizar";
  @Input("isLoading") isLoading:Boolean=false;
  @Input("classes") classes:Array<string> = [];
  @Output("onClick") onClickEvent=new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.onClickEvent.emit();
  }
}
