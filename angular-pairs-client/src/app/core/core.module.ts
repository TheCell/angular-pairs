import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FullscreenLayoutComponent } from './fullscreen-layout/fullscreen-layout.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    LayoutComponent,
    FullscreenLayoutComponent,
    PageNotFoundComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    TranslateModule,
    FontAwesomeModule,
    LayoutComponent,
    FullscreenLayoutComponent
  ]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule should only be loaded in the AppModule');
    }
  }

  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: TranslateModule.forRoot().providers,
    }
  }
}
