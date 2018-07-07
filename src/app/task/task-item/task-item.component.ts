import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {itemAnim} from "../../anims/item.anim";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [itemAnim],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {
  @Input() item;

  @Input() avatar;

  @Output() taskClick: EventEmitter<void> = new EventEmitter();

  widerPriority = 'in';

  constructor() {

  }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }

  onItemClick(): void {
    this.taskClick.emit();
  }

  onCheckboxClick(evt: Event): void {
    evt.stopPropagation();
  }


  @HostListener('mouseenter')
  onMouseEnter() {
    this.widerPriority = 'out';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.widerPriority = 'in';
  }
}
