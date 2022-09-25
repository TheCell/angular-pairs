import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { CardService } from './card.service';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnInit {
  public faCoffee = faCoffee;

  public constructor(private cardService: CardService) {
    console.log(this.cardService);

  }

  public ngOnInit(): void {
    console.log('let\'s go');

  }

}
