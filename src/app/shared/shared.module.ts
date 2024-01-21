import { NavigationService } from './services/navigation.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import './extensions/string.extension';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent
  ],
  providers: [
    NavigationService
  ]
})
export class SharedModule { }
