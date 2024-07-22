import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Aplication } from '../../models/aplication/aplication.model';

@Component({
  selector: 'app-aplication',
  templateUrl: './aplication.component.html',
  styleUrls: ['./aplication.component.css']
})
export class AplicationComponent implements OnInit {

  constructor (private messageService: MessageService,
    public router: Router,
  ) {
    
  }
  selectedEvaluationIsAvailableToMarkAsAbsence: boolean = false;
  isLoading: boolean = false;
  aplication: Aplication = new Aplication();
  showDialog: boolean = true;
  showDialogConfirm: boolean = false;
  progress: number = 0;
  section: number = 0;
  filledFields: number = 0;
  totalFields: number = 0;

  ngOnInit(): void {
    this.calculateRemain();
  }

  calculateRemain() {
    const healthConditionFields = Aplication.getProperties();
    this.totalFields = healthConditionFields.length;
    this.filledFields = Object.values(this.aplication).filter(value => value !== '').length;
    this.progress = (this.filledFields * 100) / (this.totalFields);
  }
  sendAplication() {
    this.showDialogConfirm = true;
  }
  next() {
    this.calculateRemain();
    this.section++;
  }
  previous() {
    this.calculateRemain();
    this.section--;
  }

  sendAnswers() {
    this.isLoading = true;
    setTimeout(() => {
      this.messageService.add({ severity: 'info', summary: 'Sent', detail: 'Your answers has been submitted!' });
      this.isLoading = false;
    this.router.navigate(['dashboard']);
    }, 2000);
    this.sendAplication
  }
  
}
