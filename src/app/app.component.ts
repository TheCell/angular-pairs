import { Subscription } from 'rxjs';
import { NavigationRoute } from './shared/services/navigation-route';
import { NavigationService } from './shared/services/navigation.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LayoutType } from './core/layout-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public activeLayout: LayoutType = LayoutType.default;
  public layoutType = LayoutType;

  private subscription = new Subscription();

  public constructor(private navigationService: NavigationService) { }

  public ngOnInit(): void {
    this.subscription.add(this.navigationService.currentRoute.subscribe((navigationRoute: NavigationRoute) => {
      switch (navigationRoute) {
        case NavigationRoute.about:
          this.activeLayout = LayoutType.fullscreen;
          break;
        default:
          this.activeLayout = LayoutType.default;
      }
    }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
