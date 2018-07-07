import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs/index";


export interface DragData {
  tag: string;    // 区分是哪一级拖拽
  data: any;
}

@Injectable()
export class DragDropService {

  private _dragData = new BehaviorSubject<DragData>(null);

  setDragData(data: DragData) {
    this._dragData.next(data);
  }

  getDragData(): Observable<DragData> {
    return this._dragData.asObservable();
  }

  clearDragData(): void {
    this._dragData.next(null);
  }
}
