import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { CardComponent } from './game-screen/card/card.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule
  ],
  declarations: [
    GameScreenComponent,
    CardComponent
  ],
  exports: [
    GameScreenComponent
  ]
})
export class GameModule { }
