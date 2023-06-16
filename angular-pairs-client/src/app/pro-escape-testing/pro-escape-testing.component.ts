import { Component } from '@angular/core';
import { GameEnum } from './escape-games/game-enum';

@Component({
  selector: 'app-pro-escape-testing',
  templateUrl: './pro-escape-testing.component.html',
  styleUrls: ['./pro-escape-testing.component.scss']
})
export class ProEscapeTestingComponent {
  public currentGame = 0;

  public onNextGame() : void {
    this.currentGame++;
    if (this.currentGame > GameEnum.gameTwo) {
      this.currentGame = 0;
    }
  }
}
