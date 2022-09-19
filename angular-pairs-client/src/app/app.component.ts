import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LayoutType } from './core/layout-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public activeLayout: LayoutType = LayoutType.fullscreen;
  public layoutType = LayoutType;

  public constructor(router: Router) {
    router.events.pipe(filter((navigationEvent) => navigationEvent instanceof NavigationEnd)).subscribe((evt) => {
      const navigationEnd = evt as NavigationEnd;
      if (navigationEnd.url.startsWith('/about')) {
        this.activeLayout = LayoutType.fullscreen;
      } else {
        this.activeLayout = LayoutType.default;
      }
    })
  }

}
