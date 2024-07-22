import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Aplication } from '../../models/aplication/aplication.model';
import { Calculator } from '../../models/calculator/calculator.model';
import { CurrencyMask } from '../../models/currencyMask.model';

@Component({
  selector: 'app-aplication',
  templateUrl: './aplication.component.html',
  styleUrls: ['./aplication.component.css']
})
export class AplicationComponent implements OnInit {

  constructor(private messageService: MessageService,
    public router: Router,
  ) {

  }
  foodSelectOptions = {
    default: "",
    chilaquiles: "Chilaquiles",
    pastel: "Pastel"
  };

  foodSelect: string = this.foodSelectOptions.default;

  isLoading: boolean = false;
  aplication: Aplication = new Aplication();
  calculator: Calculator = new Calculator();
  showDialog: boolean = false;
  showDialogConfirm: boolean = false;
  progress: number = 0;
  section: number = 0;
  filledFields: number = 0;
  totalFields: number = 0;
  currencyMask = CurrencyMask;
  discountPercentage: number = 0;

  ngOnInit(): void {
    this.calculateRemain();
  }

  calculate() {
    console.log(this.foodSelect)
    this.showDialog = true;
    const originalPrice = parseFloat(this.calculator.basePriceString ?? "0");
    const discountedPrice = parseFloat(this.calculator.finalPriceString ?? "0");
    
    if (originalPrice === 0 || discountedPrice === 0) {
      console.error('Error: Valores no válidos para los precios.');
    } else {
      this.discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
    }
  }

  deleteData() {
    this.calculator.basePriceString = "";
    this.calculator.finalPriceString = "";
    this.foodSelect = this.foodSelectOptions.default;
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
