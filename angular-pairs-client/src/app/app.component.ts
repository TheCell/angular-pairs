import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutType } from './core/layout-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public activeLayout: LayoutType = LayoutType.fullscreen;
  public layoutType = LayoutType;

  public constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      console.log(params);
    })
  }

}
