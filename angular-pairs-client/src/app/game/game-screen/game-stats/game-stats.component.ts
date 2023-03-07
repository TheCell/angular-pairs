import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscription } from 'rxjs';
import { CurrentData } from './current-data';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.scss']
})
export class GameStatsComponent implements OnInit, OnDestroy {
  @Input() public statsToDisplay: CurrentData = {
    attempts: 0,
    clicks: 0,
    matches: 0
  };
  @Input() public saveGame: Observable<CurrentData> | null = null;

  public lastGame: CurrentData | null = null;

  private subscription = new Subscription();
  private savingString = 'last-game-stats';

  public constructor(private cookieService: CookieService) {
    console.log(document.cookie);
    console.log(localStorage);
    console.log(sessionStorage);
  }

  public ngOnInit(): void {
    this.loadStats();

    if (this.saveGame) {
      this.subscription.add(this.saveGame.subscribe((data: CurrentData) => {
        this.saveStats(data);
      }))
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public deleteStorage(): void {
    this.cookieService.delete(this.savingString);
    localStorage.removeItem(this.savingString);
    sessionStorage.removeItem(this.savingString);

    this.loadStats();
  }

  private loadStats(): void {
    // 'last-game-stats'
    const cookieExample = this.cookieService.get(this.savingString);
    console.log(`Cookie: for ${this.savingString}`, cookieExample);

    const sessionExample = sessionStorage.getItem(this.savingString);
    console.log(`SessionStorage: for ${this.savingString}`, sessionExample);

    const localExample = localStorage.getItem(this.savingString);
    console.log(`LocalStorage: for ${this.savingString}`, localExample);

    if (localStorage.getItem(this.savingString))
    {
      const savedString = localStorage.getItem(this.savingString);
      if (savedString) {
        const lastGame = JSON.parse(savedString);
        this.lastGame = lastGame;
      }
    } else {
      this.lastGame = null;
    }
  }

  private saveStats(data: CurrentData): void {
    localStorage.setItem(this.savingString, JSON.stringify(data));
    sessionStorage.setItem(this.savingString, JSON.stringify(data));
    this.cookieService.set(this.savingString, JSON.stringify(data));
  }
}
