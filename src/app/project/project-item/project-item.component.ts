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

  constructor() { }


  onInviteClick() {
    this.onInvite.emit();
  }
}
