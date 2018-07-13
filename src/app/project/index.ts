import { NgModule } from '@angular/core';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { InviteComponent } from './invite/invite.component';
import {ProjectRoutingModule} from "./project-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule
  ],
  declarations: [ProjectListComponent, ProjectItemComponent, NewProjectComponent, InviteComponent],

  // 需要动态加载的组件一般放这里，比如弹窗
  entryComponents: [NewProjectComponent, InviteComponent]
})
export class ProjectModule { }
