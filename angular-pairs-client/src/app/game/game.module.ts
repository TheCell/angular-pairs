import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameScreenComponent } from './game-screen/game-screen.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule
  ],
  declarations: [
    GameScreenComponent
  ],
  exports: [
    GameScreenComponent
  ]
})
export class GameModule { }
