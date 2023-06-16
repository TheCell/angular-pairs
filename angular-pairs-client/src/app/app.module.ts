import { GameModule } from './game/game.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { ConstantsService } from './core/constants.service';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ProEscapeTestingComponent } from './pro-escape-testing/pro-escape-testing.component';
import { AvatarFrameComponent } from './pro-escape-testing/avatar-frame/avatar-frame.component';
import { TrackedKeysComponent } from './pro-escape-testing/tracked-keys/tracked-keys.component';
import { ChatFrameComponent } from './pro-escape-testing/chat-frame/chat-frame.component';
import { GameFrameComponent } from './pro-escape-testing/game-frame/game-frame.component';
import { EscapeGameOneComponent } from './pro-escape-testing/escape-games/escape-game-one/escape-game-one.component';
import { EscapeGameTwoComponent } from './pro-escape-testing/escape-games/escape-game-two/escape-game-two.component';
import { CodeEntryComponent } from './pro-escape-testing/code-entry/code-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ProEscapeTestingComponent,
    AvatarFrameComponent,
    TrackedKeysComponent,
    ChatFrameComponent,
    GameFrameComponent,
    EscapeGameOneComponent,
    EscapeGameTwoComponent,
    CodeEntryComponent
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    GameModule,
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
