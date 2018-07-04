import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() protected toggle: EventEmitter<void> = new EventEmitter();

  constructor() {}

  openSidebar(): void {
    this.toggle.emit();
  }

}
