import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {
  @Input() header = '';

  @Output() newTask: EventEmitter<void> = new EventEmitter();

  @Output() moveAll: EventEmitter<void> = new EventEmitter();
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
}
