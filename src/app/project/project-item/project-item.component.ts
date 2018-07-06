import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent {
  @Input() item;

  // 点击了邀请按钮后发射事件
  @Output() onInvite: EventEmitter<void> = new EventEmitter();

  @Output() onEdit: EventEmitter<void> = new EventEmitter();

  @Output() onDel: EventEmitter<void> = new EventEmitter();

  constructor() { }


  onInviteClick() {
    this.onInvite.emit();
  }


  // 编辑项目
  onEditClick(): void {
    this.onEdit.emit();
  }


  // 删除项目
  onDelClick(): void {
    this.onDel.emit();
  }
}
