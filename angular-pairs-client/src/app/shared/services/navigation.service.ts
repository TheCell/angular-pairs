import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, ReplaySubject, Subscription } from 'rxjs';
import { NavigationRoute } from './navigation-route';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnDestroy {
  public currentRoute = new ReplaySubject<NavigationRoute>(NavigationRoute.home);

  private subscription = new Subscription();

  public constructor(router: Router) {
    router.events.pipe(filter((navigationEvent) => navigationEvent instanceof NavigationEnd)).subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.url.startsWith('/about')) {
          this.currentRoute.next(NavigationRoute.about);
        } else if (evt.url.startsWith('/game')) {
          this.currentRoute.next(NavigationRoute.game);
        } else {
          this.currentRoute.next(NavigationRoute.home);
        }
      }
    })
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
