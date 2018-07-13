import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {CoreModule} from "./core/core.module";
import {APP_BASE_HREF} from "@angular/common";
import {MatSidenavModule} from "@angular/material";

describe('测试根模块：AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [MatSidenavModule, RouterModule.forRoot([]), CoreModule],
      providers: [{
        provide: APP_BASE_HREF,
        useValue: '/'
      }]
    }).compileComponents();
  }));

  it('应该创建应用', async(() => {
    // 创建组件
    const fixture = TestBed.createComponent(AppComponent);

    // 拿到组件实例
    const app = fixture.debugElement.componentInstance;

    // 实例应该存在
    expect(app).toBeTruthy();
  }));

  it('应该包含一个 .site 的节点', async(() => {
    const fixture = TestBed.createComponent(AppComponent);

    // 监听组件变化
    fixture.detectChanges();

    // 拿到组件dom
    const compiled = fixture.debugElement.nativeElement;

    // 希望dom中包含.site
    expect(compiled.querySelector('.site')).toBeTruthy();
  }));
});
