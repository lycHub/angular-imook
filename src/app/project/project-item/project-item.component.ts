import {Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {cardAnim} from "../../anims/card.anim";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [cardAnim]
})
export class ProjectItemComponent {
  @Input() item;

  // 点击了邀请按钮后发射事件
  @Output() onInvite: EventEmitter<void> = new EventEmitter();

  @Output() onEdit: EventEmitter<void> = new EventEmitter();

  @Output() onDel: EventEmitter<void> = new EventEmitter();


  // 给自身绑定一个属性，相当于<app-project-item [@card]="cardState"></app-project-item>
  @HostBinding('@card') cardState = 'out';

  constructor() { }

  // 可以有第二个参数 ['$event.target']
  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
  }

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
