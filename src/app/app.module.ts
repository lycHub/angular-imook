import { BrowserModule } from '@angular/platform-browser';
import {APP_ID, Inject, NgModule, PLATFORM_ID} from '@angular/core';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import {isPlatformBrowser} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserModule.withServerTransition({ appId: 'imooc' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
