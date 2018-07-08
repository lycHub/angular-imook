import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,

      // 起别名
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi      : true
    },
    {
      provide    : NG_VALIDATORS,

      // 起别名
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi      : true
    }
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {
  // 多少列
  @Input() cols = 6;

  // 行高
  @Input() rowHeight = 64;

  @Input() title = '选择头像';

  @Input() items: string[] = [];

  @Input() useSvgIcon = false;

  @Input() itemWidth = '80px';

  selected: string;

  private propagateChanged = (value: string) => () => null;
  private onTouched: () => void = () => null;
  constructor() { }


  // 选择头像
  onChange(i: number) {
    this.selected = this.items[i];
    this.propagateChanged(this.selected);
  }


  // 此控件的验证
  validate(c: FormControl): {[key: string]: any} {
    return this.selected ? null : {
      imageListInValid: { valid: false }
    };
  }


  writeValue(obj: string): void {
    this.selected = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
