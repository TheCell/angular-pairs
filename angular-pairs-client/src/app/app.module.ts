import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { TranslateService } from '@ngx-translate/core';
import { ConstantsService } from './core/constants.service';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    GameScreenComponent,
    AboutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  public constructor(
    private constantsService: ConstantsService,
    private translateService: TranslateService) {
      this.initTranslateService();
  }

  private initTranslateService() {
    let language = 'en';
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      language = savedLang;
    } else {
      const browserlang = this.translateService.getBrowserLang();

      if (browserlang != null) {
        let lang = browserlang.toLocaleLowerCase();
        if (this.constantsService.languages.some((entries) => entries === lang)) {
          language = lang;
        }
      }
    }

    this.translateService.setDefaultLang(language);
    this.translateService.use('language');

    for (const lang of this.constantsService.languages) {
      this.translateService.setTranslation(lang, require(`../i18n/${lang}.json`));
    }
  }
}
