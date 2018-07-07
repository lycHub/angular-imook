import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {NewTaskComponent} from "../new-task/new-task.component";
import {CopyTaskComponent} from "../copy-task/copy-task.component";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {NewTaskListComponent} from "../new-task-list/new-task-list.component";
import {slideToRight} from "../../anims/router.anim";
import {DragData} from "../../directive/drag-drop/drag-drop.service";

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {
  lists = [{
    id: 1,
    name: '待办',
    tasks: [{
      id: 1,
      desc: '任务一：去买杯咖啡',
      priority: 3,
      owner: {
        id: 1,
        name: '张三',
        avatar: 'avatars:svg-11'
      },
      dueDate: Date.now(),
      completed: true
    }, {
      id: 2,
      desc: '任务二：完成XXXXXXXXXPPT作业',
      priority: 2,
      owner: {
        id: 2,
        name: '李四',
        avatar: 'avatars:svg-12'
      },
      dueDate: Date.now(),
      reminder: Date.now(),
      completed: false
    }]
  }, {
    id: 2,
    name: '进行中',
    tasks: [{
      id: 1,
      desc: '任务三：审核代码',
      priority: 1,
      owner: {
        id: 3,
        name: '王五',
        avatar: 'avatars:svg-12'
      },
      dueDate: Date.now(),
      completed: false
    }, {
      id: 2,
      desc: '任务四：项目定制计划',
      priority: 2,
      owner: {
        id: 2,
        name: '李四',
        avatar: 'avatars:svg-12'
      },
      dueDate: Date.now(),
      completed: false
    }]
  }];

  @HostBinding('@routeAnim') state;

  constructor(private dialog: MatDialog, private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }


  // 新建任务
  launchNewTaskDialog(): void {
    this.dialog.open(NewTaskComponent, {data: {title: '新建任务'}});
  }

  // 移动所有任务
  launchCopyTaskDialog(): void {
    const diaRef = this.dialog.open(CopyTaskComponent, {
      data: {lists: this.lists}
    });
  }


  // 修改任务
  launchUpdateTaskDialog(task): void {
    this.dialog.open(NewTaskComponent, {
      data: {title: '修改任务', task}
    });
  }


  // 删除任务
  launchConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除任务', content: '确认删除？'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }


  // 修改列表名称
  launchEditListDialog(): void {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '修改列表名称'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }


  // 新增任务列表
  launchNewListDialog(): void {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '新增列表'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }


  // 拖拽结束
  handleMove(dragData: DragData, list: any): void {
    switch (dragData.tag) {
      case 'task-item':
        console.log('task - item');
        break;
      case 'task-list':
        console.log('task - list');
        break;
    }
  }
}
