import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationRoute } from 'src/app/shared/services/navigation-route';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public activeLink = NavigationRoute.home;
  public navigationRoute = NavigationRoute;

  private subscription = new Subscription();

  public constructor(private navigationService: NavigationService) { }

  public ngOnInit(): void {
    this.subscription.add(this.navigationService.currentRoute.subscribe((navigationRoute: NavigationRoute) => {
      this.activeLink = navigationRoute;
    }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
