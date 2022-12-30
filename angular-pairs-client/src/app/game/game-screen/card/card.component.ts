import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public imagePath: string = '';
  @Input() public imageWidth?: number;
  @ViewChild('card') public cardRef: ElementRef = {} as ElementRef;

  public constructor() { }

  public ngOnInit(): void {
    console.log('todo');
  }

  public cardClicked(): void
  {
    console.log('clicked');
    this.cardRef.nativeElement.classList.toggle('flipped');
  }
}
