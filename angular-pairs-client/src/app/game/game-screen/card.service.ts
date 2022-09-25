import { ReplaySubject } from 'rxjs';
import { Cards } from './../../../assets/cards/cards';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardPair } from './card-pair';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public playcards = new ReplaySubject<Array<CardPair>>();

  private allFiles: Array<string> = [];

  public constructor(private http: HttpClient) {
    this.http.get('assets/cards/cards.json').subscribe((allCards) => {
      const cards = allCards as Cards;
      this.allFiles = cards.files;
      this.updatePlayCards();
    })
  }

  private updatePlayCards(): void {
    const allCards:Array<CardPair> = [];
    this.allFiles.forEach((filepath: string) => {
      console.log(filepath);
      allCards.push({
        authorName: filepath,
        imagePath: './assets/cards/' + filepath
      })
    });

    this.playcards.next(allCards);
  }
}
