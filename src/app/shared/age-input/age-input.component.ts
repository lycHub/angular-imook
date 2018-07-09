import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
import {map} from "rxjs/internal/operators";
import {combineLatest, merge} from "rxjs/index";

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi      : true
    },
    {
      provide    : NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi      : true
    }
  ]
})
export class AgeInputComponent implements OnInit, ControlValueAccessor {
  form: FormGroup;


  private propagateChanged = (value: any) => () => null;
  private onTouched: () => void = () => null;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      birthday: [],
      age: this.fb.group({
        ageNum: [],
        ageUnit: []
      })
    });
  }

  ngOnInit() {
    const birthday$ = this.form.get('birthday').valueChanges.pipe(map(birth => {
      return {date: birth, from: 'birthday'};
    }));
    const ageNum$ = this.form.get('age').get('ageNum').valueChanges;
    const ageUnit$ = this.form.get('age').get('ageUnit').valueChanges;

    const age$ = combineLatest(ageNum$, ageUnit$).pipe(map((age, unit) => {
      return {
        date: this.toDate({age, unit}),
        from: 'age'
      };
    }));


    const merged$ = merge(birthday$, age$);


  }


  // 年龄转为生日
  toDate({age, unit}) {

  }

  writeValue(obj: any): void {

  }

  registerOnChange(fn: any): void {
    this.propagateChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
