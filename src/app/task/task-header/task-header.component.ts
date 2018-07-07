import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHeaderComponent implements OnInit {
  @Input() header = '';

  @Output() newTask: EventEmitter<void> = new EventEmitter();

  @Output() moveAll: EventEmitter<void> = new EventEmitter();

  @Output() delList: EventEmitter<void> = new EventEmitter();

  @Output() onEditList: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  // 添加任务
  onNewTask(): void {
    this.newTask.emit();
  }


  // 移动所有任务
  onMoveAllClick(): void {
    this.moveAll.emit();
  }

  // 删除所有任务
  onDelListClick(): void {
    this.delList.emit();
  }

  // 修改列表名称
  onEditListClick(): void {
    this.onEditList.emit();
  }
}
