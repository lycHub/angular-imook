import {ModuleWithProviders, NgModule} from '@angular/core';

@NgModule(/*{
  imports: [
    CommonModule
  ],
  declarations: []
}*/)
export class ServicesModule {
  // 如果@NgModule中的元数据不是固定的，就可以提供个静态方法返回动态变化的元数据
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: []
    };
  }
}
