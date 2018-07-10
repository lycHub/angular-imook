import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy} from '@angular/core';
import {MatDialog} from "@angular/material";
import {NewProjectComponent} from "../new-project/new-project.component";
import {InviteComponent} from "../invite/invite.component";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {slideToRight} from "../../anims/router.anim";
import {listAnimation} from "../../anims/list.anim";
import {ProjectService} from "../../services/project.service";
import {Project} from "../../domain";
import * as _ from 'lodash';
import {filter, first, map, switchMap} from "rxjs/internal/operators";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnDestroy {
  projects: Project[];
  sub: Subscription;

  @HostBinding('@routeAnim') state;

  constructor(private dialog: MatDialog, private ref: ChangeDetectorRef, private service$: ProjectService) {
    this.sub = this.service$.get('37489e0c-df34-c261-71c4-ce75357e3035').subscribe(projects => {
      this.projects = projects;
      this.ref.markForCheck();
    });
  }

  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {
      title: '新增项目',
      thumbnail: this.getThumbnails(),
      img: selectedImg
    }});
    dialogRef.afterClosed().pipe(first(), filter(n => n),
      map(val => ({...val, coverImg: this.buildImgSrc(val.coverImg)})),
      switchMap(v => this.service$.add(v))).subscribe(project => {
        this.projects = [...this.projects, project];
        this.ref.markForCheck();
    });
  }


  // 邀请组员
  launchInviteDialog(): void {
    this.dialog.open(InviteComponent);
  }

  // 修改项目
  launchUpdateDialog(project: Project): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {
      title: '编辑项目',
      thumbnail: this.getThumbnails(),
      project
    }});
    dialogRef.afterClosed().pipe(first(), filter(n => n),
      map(val => ({...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg)})),
      switchMap(v => this.service$.update(v))).subscribe(project_update => {
      const index = this.projects.findIndex(item => item.id === project.id);
      this.projects = [...this.projects.slice(0, index), project_update, ...this.projects.slice(index + 1)];
      this.ref.markForCheck();
    });
  }


  // 删除项目
  launchConfirmDialog(project: Project): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '确认删除？'}});
    dialogRef.afterClosed().pipe(first(), filter(n => n),
      switchMap(_ => this.service$.del(project))).subscribe(prj => {
      this.projects = this.projects.filter(item => item.id !== prj.id);
      this.ref.markForCheck();
    });
  }


  // 获取缩略图封面
  private getThumbnails() {
    return _.range(0, 40).map(i => `/assets/img/covers/${i}_tn.jpg`);
  }

  // 如果是缩略图就变成大图
  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
  }


  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
