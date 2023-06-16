import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-game-frame',
  templateUrl: './game-frame.component.html',
  styleUrls: ['./game-frame.component.scss']
})
export class GameFrameComponent implements OnChanges {
  @Input() public showGameNr = 0;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['showGameNr']) {
      console.log(`loading game nr ${changes['showGameNr'].currentValue}`);

    }
  }

}
