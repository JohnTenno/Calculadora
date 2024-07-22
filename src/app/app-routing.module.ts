import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CleanComponent } from './components/common/layout/clean/clean.component';
import { AplicationComponent } from './components/aplication/aplication.component';

const routes: Routes = [
  { path: '', redirectTo: 'aplication', pathMatch: 'full' },
  {
    path: '',
    component: CleanComponent,
    children: [
      { path: 'aplication', component: AplicationComponent, canActivate: [] },
    ],
  },
  { path: '**', redirectTo: '/aplication', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
