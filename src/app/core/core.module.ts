import {NgModule, Optional, SkipSelf} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    SharedModule
  ],
  declarations: [HeaderComponent, SidebarComponent, FooterComponent]
})

export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule 已经装载，请仅在 AppModule 中引入该模块。');
    }
  }
}
