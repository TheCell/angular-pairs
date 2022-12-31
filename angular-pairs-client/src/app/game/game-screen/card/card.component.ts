import { Observable, Subscription } from 'rxjs';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() public imagePath: string = '';
  @Input() public imageWidth?: number;
  @Input() public id = 0;
  @Input() public hideCard?: Observable<number>;
  @Input() public isClickingAllowed?: Observable<boolean>;
  @Output() public cardClicked: EventEmitter<number> = new EventEmitter();
  @ViewChild('card') public cardRef: ElementRef = {} as ElementRef;

  private subscription: Subscription = new Subscription();
  private isClickable = true;
  private isFlipped = false;

  public constructor() {
  }

  public ngOnInit(): void {
    this.subscription.add(this.hideCard?.subscribe((id: number) => {
      if (this.id === id) {
        this.toggleCard();
      }
    }));

    this.subscription.add(this.isClickingAllowed?.subscribe((isClickable: boolean) => {
      this.isClickable = isClickable;
    }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onClick(): void
  {
    if (!this.isClickable || this.isFlipped) {
      return;
    }

    this.toggleCard();
    this.cardClicked.emit(this.id);
  }

  private toggleCard(): void {
    this.isFlipped = !this.isFlipped;
    this.cardRef.nativeElement.classList.toggle('flipped');
  }
}
