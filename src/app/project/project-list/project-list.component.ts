import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {NewProjectComponent} from "../new-project/new-project.component";
import {InviteComponent} from "../invite/invite.component";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {slideToRight} from "../../anims/router.anim";
import {listAnimation} from "../../anims/list.anim";
import {ProjectService} from "../../services/project.service";
import {Project} from "../../domain";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  projects: Project[];

  @HostBinding('@routeAnim') state;

  constructor(private dialog: MatDialog, private ref: ChangeDetectorRef, private service$: ProjectService) {
    this.service$.get('37489e0c-df34-c261-71c4-ce75357e3035').subscribe(projects => this.projects = projects);
  }

  ngOnInit() {}

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '新增项目'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // this.projects = [...this.projects, {
      //     id: 3,
      //     name: '一个新项目',
      //     desc: '这是一个新项目',
      //     coverImg: 'assets/img/covers/1.jpg'
      // }, {
      //   id: 4,
      //   name: '又一个新项目',
      //   desc: '这又是一个新项目',
      //   coverImg: 'assets/img/covers/2.jpg'
      // }];

      this.ref.markForCheck();
    });
  }


  // 邀请组员
  launchInviteDialog(): void {
    this.dialog.open(InviteComponent);
  }

  // 修改项目
  launchUpdateDialog(): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '编辑项目'}});
  }


  // 删除项目
  launchConfirmDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '确认删除？'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(item => item.id !== id);

      this.ref.markForCheck();
    });
  }
}
