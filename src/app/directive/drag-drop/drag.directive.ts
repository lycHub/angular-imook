import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {DragDropService} from "./drag-drop.service";

@Directive({
  selector: '[app-drag][dragTag][dragData][draggedClass]'
})
export class DragDirective {
  // 是否可拖拽
  private _isDraggble = false;

  // 起了个别名
  @Input('app-drag')
  set isDraggable(val: boolean) {
    this._isDraggble = val;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`);
  }

  get isDraggable(): boolean {
    return this._isDraggble;
  }



  @Input() draggedClass: string;

  @Input() dragTag: string;

  @Input() dragData: any;

  constructor(private el: ElementRef, private rd: Renderer2, private service: DragDropService) { }

  @HostListener('dragstart', ['$event'])
  onDragStart(evt: Event) {
    if (this.el.nativeElement === evt.target) {
      this.rd.addClass(this.el.nativeElement, this.draggedClass);
      this.service.setDragData({tag: this.dragTag, data: this.dragData});
    }
  }


  @HostListener('dragend', ['$event'])
  onDragEnd(evt: Event) {
    if (this.el.nativeElement === evt.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass);
    }
  }
}
