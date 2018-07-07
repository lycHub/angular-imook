import {Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';
import {DragData, DragDropService} from "./drag-drop.service";
import {take} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";

@Directive({
  selector: '[app-drop][dragEnterClass][dropTags]'
})
export class DropDirective {
  @Input() dragEnterClass: string;

  @Input() dropTags: string[] = [];

  @Output() dropped: EventEmitter<DragData> = new EventEmitter();

  private data$: Observable<DragData>;

  constructor(private el: ElementRef, private rd: Renderer2, private service: DragDropService) {
    this.data$ = this.service.getDragData().pipe(take(1));
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.el.nativeElement === evt.currentTarget) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.addClass(this.el.nativeElement, this.dragEnterClass);
        }
      });
    }
  }


  @HostListener('dragover', ['$event'])
  onDragOver(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.el.nativeElement === evt.currentTarget) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.setProperty(evt, 'dataTransfer.effectAllowed', 'all');
          this.rd.setProperty(evt, 'dataTransfer.dropEffect', 'move');
        } else {
          this.rd.setProperty(evt, 'dataTransfer.effectAllowed', 'none');
          this.rd.setProperty(evt, 'dataTransfer.dropEffect', 'none');
        }
      });
    }
  }


  @HostListener('drop', ['$event'])
  onDrop(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.el.nativeElement === evt.currentTarget) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
          this.dropped.emit(dragData);
          this.service.clearDragData();
        }
      });
    }
  }


  @HostListener('dragleave', ['$event'])
  onDragLeave(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.el.nativeElement === evt.currentTarget) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
        }
      });
    }
  }



}
