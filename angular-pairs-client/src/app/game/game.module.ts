import { SharedModule } from './../shared/shared.module';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { CardComponent } from './game-screen/card/card.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    SharedModule
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
