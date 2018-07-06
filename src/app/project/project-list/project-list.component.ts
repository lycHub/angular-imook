import {Component, HostBinding, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {NewProjectComponent} from "../new-project/new-project.component";
import {InviteComponent} from "../invite/invite.component";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {slideToRight} from "../../anims/router.anim";
import {listAnimation} from "../../anims/list.anim";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation]
})
export class ProjectListComponent implements OnInit {
  projects = [{
    id: 1,
    name: '企业协作平台',
    desc: '这是个企业内部项目',
    coverImg: 'assets/img/covers/0.jpg'
  }, {
    id: 2,
    name: '企业协作平台',
    desc: '这是个企业内部项目',
    coverImg: 'assets/img/covers/1.jpg'
  }];

  @HostBinding('@routeAnim') state;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {}

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '新增项目'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = [...this.projects, {
          id: 3,
          name: '一个新项目',
          desc: '这是一个新项目',
          coverImg: 'assets/img/covers/1.jpg'
      }, {
        id: 4,
        name: '又一个新项目',
        desc: '这又是一个新项目',
        coverImg: 'assets/img/covers/2.jpg'
      }];
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
  launchConfirmDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '确认删除？'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(item => item.id !== id);
    });
  }
}
