import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public imagePath: string = '';

  public constructor() { }

  public ngOnInit(): void {
    console.log('todo');

  }

}
