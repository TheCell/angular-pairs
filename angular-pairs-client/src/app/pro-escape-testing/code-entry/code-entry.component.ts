import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-code-entry',
  templateUrl: './code-entry.component.html',
  styleUrls: ['./code-entry.component.scss']
})
export class CodeEntryComponent {
  @Output() public nextGame = new EventEmitter<void>();

  public onNextClick() : void {
    this.nextGame.next();
  }
}
