import {Component, EventEmitter, Output} from '@angular/core';
import {getDate} from 'date-fns';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  today = 'day';

  @Output() navClick: EventEmitter<void> = new EventEmitter();
  constructor() {
    this.today = `day${getDate(Date.now())}`;
  }

  onNavClick(): void {
    this.navClick.emit();
  }
}
