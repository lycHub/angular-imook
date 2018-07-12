import {NgModule, Optional, SkipSelf} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconRegistry} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {loadSvgResources} from "../utils/svg";
import {LoginModule} from "../login/login.module";
import {ProjectModule} from "../project/project.module";
import {TaskModule} from "../task/task.module";
import {AppRoutingModule} from "../app-routing.module";
import {ServicesModule} from "../services/services.module";
import {AppStoreModule} from "../ngrx/reducers/index";
import {AppEffectsModule} from "../ngrx/effects/index";

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ServicesModule.forRoot(),
    LoginModule,
    ProjectModule,
    TaskModule,
    AppStoreModule,
    AppEffectsModule
  ],
  declarations: [HeaderComponent, SidebarComponent, FooterComponent],
  exports: [
    AppRoutingModule,
    SharedModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  providers: [
    {provide: 'BASE_CONFIG', useValue: {
      uri: 'http://localhost:3000'
    }},
  ]
})

export class CoreModule {

  constructor(@Optional() @SkipSelf() private parentModule: CoreModule,
    private ir: MatIconRegistry,
    private ds: DomSanitizer) {
    if (this.parentModule) {
      throw new Error('CoreModule 已经装载，请仅在 AppModule 中引入该模块。');
    }
    loadSvgResources(this.ir, this.ds);
  }
}
