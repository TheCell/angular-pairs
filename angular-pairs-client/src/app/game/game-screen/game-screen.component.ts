import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { CardPair } from './card-pair';
import { CardService } from './card.service';
import { CardsPerArtist } from './cards-per-artist';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent {
  public faCoffee = faCoffee;
  public currentCards: Array<CardPair> = [];
  public imageWidth: number = 200;
  public cardsPerRow = 3;

  public get rowCount(): number {
    return Math.ceil(this.currentCards.length / this.cardsPerRow);
  }

  public constructor(public cardService: CardService) {
    this.cardService.playcards.subscribe((cardsPerArtist: CardsPerArtist) => {
      for (const key in cardsPerArtist) {
        const images = cardsPerArtist[key];
        this.shuffleArray(images);
        const entry1 = images.pop();
        const entry2 = images.pop();

        if (entry1 && entry2) {
          this.currentCards.push(this.getCard(key, entry1));
          this.currentCards.push(this.getCard(key, entry2));
        }
      }

      this.shuffleArray(this.currentCards);
    });
  }

  private getCard(artist: string, imagePath: string) : CardPair {
    return {
      authorName: artist,
      imagePath: imagePath
    }
  }

  private shuffleArray(arr: Array<string | CardPair>): void {
    arr.sort(() => Math.random() - 0.5); // maybe make it fixed per day?
  }
}
