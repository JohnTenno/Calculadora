import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { IMaskModule } from 'angular-imask';
import { MessageService } from 'primeng/api';
import { RouterModule, Routes } from '@angular/router';
import { CleanComponent } from './components/common/layout/clean/clean.component';
import { AplicationComponent } from './components/aplication/aplication.component';
import { VerticalComponent } from './components/common/layout/vertical/vertical.component';
import { FooterComponent } from './components/common/layout/main/footer/footer.component';
import { MainComponent } from './components/common/layout/main/main.component';
import { HeaderComponent } from './components/common/layout/main/header/header.component';
import { LeftMenuComponent } from './components/common/layout/vertical/left-menu/left-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    CleanComponent,
    AplicationComponent,
    VerticalComponent,
    FooterComponent,
    MainComponent,
    HeaderComponent,
    MainComponent,
    LeftMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DialogModule,
    RouterModule,
    IMaskModule,
    RadioButtonModule,

  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
