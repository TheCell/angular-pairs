import { Component, EventEmitter } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReplaySubject, timer } from 'rxjs';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
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
  public cardsToTurnBack: EventEmitter<number> = new EventEmitter();
  public isClickingEnabled: ReplaySubject<boolean> = new ReplaySubject(1);

  public get rowCount(): number {
    return Math.ceil(this.currentCards.length / this.cardsPerRow);
  }

  private firstCardId = -1;
  private secondCardId = -1;
  private solvedCardIndexes: Array<number> = [];

  public constructor(
    public cardService: CardService,
    private modalService: NgbModal) {
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

    this.isClickingEnabled.next(true);
  }

  public openVideoPopup() {
    // const modalRef = this.modalService.open(ModalComponent);
    // modalRef.componentInstance.src = link;
    this.modalService.open(ModalComponent);
  }

  public wasSolved(index: number): boolean {
    return this.solvedCardIndexes.indexOf(index) > -1;
  }

  public cardClicked(id: number): void {
    if (this.firstCardId === -1) {
      this.firstCardId = id;
    } else {
      this.secondCardId = id;
      this.checkForMatch();
    }
  }

  public turnBackCard(id: number): void {
    this.cardsToTurnBack.next(id);
  }

  private checkForMatch(): void {
    this.isClickingEnabled.next(false);

    if (this.areCardsMatching()) {
      this.isClickingEnabled.next(true);
      timer(1000).subscribe(() => {
        this.solvedCardIndexes.push(this.firstCardId);
        this.solvedCardIndexes.push(this.secondCardId);
        this.firstCardId = -1;
        this.secondCardId = -1;
      });
    } else {
      timer(1000).subscribe(() => {
        // allow the player to see the cards before turning them again
        this.turnBackCard(this.firstCardId);
        this.turnBackCard(this.secondCardId);
        this.firstCardId = -1;
        this.secondCardId = -1;
        this.isClickingEnabled.next(true);
      });
    }
  }

  private areCardsMatching(): boolean {
    return this.currentCards[this.firstCardId].authorName === this.currentCards[this.secondCardId].authorName;
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
