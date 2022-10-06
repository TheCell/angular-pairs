import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { CardPair } from './card-pair';
import { CardService } from './card.service';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnInit {
  public faCoffee = faCoffee;
  public currentCards: Array<CardPair> = [];
  public imageWidth: number = 200;

  public get rowCount(): number {
    return Math.ceil(this.currentCards.length / this.cardsPerRow);
  }

  public cardsPerRow = 3;

  public constructor(public cardService: CardService) {
    console.log(this.cardService);
    this.cardService.playcards.subscribe((cardPair) => {
      this.currentCards = [];
      const uniqueArtists: Array<CardPair> = cardPair;

       // todo pick 2 per artist
      // cardPair.forEach((c: CardPair) => {
      //   if (uniqueArtists.some((entry) => entry.authorName !== c.authorName)) {
      //     uniqueArtists.push(c);
      //   }
      // })

      this.currentCards = uniqueArtists;
    });
  }

  public ngOnInit(): void {
    console.log('let\'s go');

  }

}
