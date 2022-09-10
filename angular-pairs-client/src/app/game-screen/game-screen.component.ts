import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnInit {

  public constructor() { }

  public ngOnInit(): void {
    console.log('let\'s go');

  }

}
