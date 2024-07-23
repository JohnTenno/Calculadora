import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Calculator } from '../../models/calculator/calculator.model';
import { CurrencyMask } from '../../models/currencyMask.model';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-aplication',
  templateUrl: './aplication.component.html',
  styleUrls: ['./aplication.component.css']
})
export class AplicationComponent implements OnInit {

  constructor(private messageService: MessageService,
    public router: Router,
    public themeService: ThemeService,
  ) {

  }
  foodSelectOptions = {
    default: "",
    chilaquiles: "Chilaquiles",
    pastel: "Pastel"
  };

  foodSelect: string = this.foodSelectOptions.default;

  isLoading: boolean = false;
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

  }

  toggleTheme() {
    this.themeService.toggleTheme();
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
}
