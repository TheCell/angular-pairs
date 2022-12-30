import { NavigationService } from './services/navigation.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import './extensions/string.extension';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    NavigationService
  ]
})
export class SharedModule { }
