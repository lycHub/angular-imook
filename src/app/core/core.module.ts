import {NgModule, Optional, SkipSelf} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material";

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  declarations: [HeaderComponent, SidebarComponent, FooterComponent],
  exports: [
    SharedModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ]
})

export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule 已经装载，请仅在 AppModule 中引入该模块。');
    }
  }
}
