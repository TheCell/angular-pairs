import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  public constructor(private http: HttpClient) {
    this.http.get('assets/cards/cards.json').subscribe((todo) => {
      console.log(todo);
    })
  }
}
