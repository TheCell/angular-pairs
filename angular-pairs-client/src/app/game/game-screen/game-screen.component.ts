import { Router } from '@angular/router';
import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReplaySubject, Subject, Subscription, timer } from 'rxjs';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { CardPair } from './card-pair';
import { CardService } from './card.service';
import { CardsPerArtist } from './cards-per-artist';
import { GameEvent } from './game-event.enum';
import { CurrentData } from './game-stats/current-data';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnDestroy {
  public faCoffee = faCoffee;
  public currentCards: Array<CardPair> = [];
  public imageWidth: number = 200;
  public cardsPerRow = 3;
  public attempts = 0;
  public clicks = 0;
  public matches = 0;
  public cardsToTurnBack: EventEmitter<number> = new EventEmitter();
  public isClickingEnabled: ReplaySubject<boolean> = new ReplaySubject(1);
  public gameWonEvent = new Subject<CurrentData>();

  public get currentStats(): CurrentData {
    return this.getCurrentData();
  }

  public get rowCount(): number {
    return Math.ceil(this.currentCards.length / this.cardsPerRow);
  }

  private firstCardId = -1;
  private secondCardId = -1;
  private solvedCardIndexes: Array<number> = [];
  private subscription = new Subscription();
  private useHardMode = false;
  private gameEvent: EventEmitter<GameEvent> = new EventEmitter();

  public constructor(
    public cardService: CardService,
    private modalService: NgbModal,
    private router: Router) {
    this.cardService.playcards.subscribe((cardsPerArtist: CardsPerArtist) => {
      this.prepareCards(cardsPerArtist);
    });

    this.isClickingEnabled.next(true);
    this.subscription.add(this.gameEvent.subscribe((event: GameEvent) => {
      switch (event)
      {
        case GameEvent.CardTurn:
          this.clicks ++;
        break;
        case GameEvent.Match:
          this.matches ++;
        break;
        case GameEvent.Missmatch:
          this.attempts ++;
        break;
        case GameEvent.Won:
          this.gameWonEvent.next(this.getCurrentData());
          this.openPopup();
        break;
      }
    }))
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public wasSolved(index: number): boolean {
    return this.solvedCardIndexes.indexOf(index) > -1;
  }

  public cardClicked(id: number): void {
    this.gameEvent.next(GameEvent.CardTurn);
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

  public switchDifficulty(isHardmode: boolean) {
    this.useHardMode = isHardmode;

    this.cardService.playcards.subscribe((cardsPerArtist: CardsPerArtist) => {
      this.prepareCards(cardsPerArtist);
    });
  }

  private checkForMatch(): void {
    this.isClickingEnabled.next(false);

    if (this.areCardsMatching()) {
      timer(600).subscribe(() => {
        this.solvedCardIndexes.push(this.firstCardId);
        this.solvedCardIndexes.push(this.secondCardId);
        this.firstCardId = -1;
        this.secondCardId = -1;
        this.isClickingEnabled.next(true);
        this.gameEvent.next(GameEvent.Match);

        if (this.isGameFinished()) {
          this.gameEvent.next(GameEvent.Won);
        }
      });
    } else {
      timer(1000).subscribe(() => {
        // allow the player to see the cards before turning them again
        this.turnBackCard(this.firstCardId);
        this.turnBackCard(this.secondCardId);
        this.firstCardId = -1;
        this.secondCardId = -1;
        this.gameEvent.next(GameEvent.Missmatch);

        this.isClickingEnabled.next(true);
      });
    }
  }

  private openPopup() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'Finished';
    modalRef.componentInstance.message = `You solved the game of pairs. You had to retry only ${ this.attempts } ${ this.attempts === 1 ? 'time' : 'times'}.`;
    modalRef.closed.subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  private isGameFinished(): boolean {
    return this.solvedCardIndexes.length === this.currentCards.length;
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

  private shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (array.length - 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private getCurrentData(): CurrentData {
    return {
      attempts: this.attempts,
      clicks: this.clicks,
      matches: this.matches,
      useHardMode: this.useHardMode
    }
  }

  private prepareCards(cardsPerArtist: CardsPerArtist): void {
    this.currentCards = [];
    this.solvedCardIndexes = [];
    this.attempts = 0;
    this.clicks = 0;
    this.matches = 0;
    this.firstCardId = -1;
    this.secondCardId = -1;

    let keys = Object.keys(cardsPerArtist);
    this.shuffle(keys);
    keys = keys.slice(0, 10);

    for (const key of keys) {
      const images = [...cardsPerArtist[key]];
      // const images = cardsPerArtist[key];
      this.shuffle(images);

      const entry1 = images.pop();
      const entry2 = images.pop();

      if (entry1 && entry2) {
        this.currentCards.push(this.getCard(key, entry1));

        if (this.useHardMode) {
          this.currentCards.push(this.getCard(key, entry2));
        } else {
          this.currentCards.push(this.getCard(key, entry1));
        }
      }
    }

    this.shuffle(this.currentCards);
  }
}
