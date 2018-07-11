import {ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi      : true
    },
    {
      provide    : NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi      : true
    }
  ]
})
export class AreaListComponent implements OnInit, ControlValueAccessor, OnDestroy {

  private propagateChanged = (value: any) => () => null;
  private onTouched: () => void = () => null;
  constructor() { }

  ngOnInit() {
  }




  validate(c: FormControl): {[key: string]: any} {

  }


  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
    this.propagateChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnDestroy(): void {
  }

}
