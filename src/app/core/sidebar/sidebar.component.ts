import { Component } from '@angular/core';
import {getDate} from 'date-fns';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  today = 'day';
  constructor() {
    this.today = `day${getDate(Date.now())}`;
  }
}
