import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {
  ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, map, startWith, tap} from "rxjs/internal/operators";
import {combineLatest, merge, Subscription} from "rxjs/index";
import {subYears, format, parse, differenceInDays, differenceInMonths, differenceInYears, isBefore, subDays, subMonths} from 'date-fns';
import {isValidDate, toDate} from "../../utils/date";

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}


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
export class AgeInputComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsBottom = 1;
  @Input() yearsTop = 150;
  @Input() debounceTime = 300;

  dateOfBirth: string;
  selectedUnit = AgeUnit.Year;
  sub: Subscription;


  form: FormGroup;
  ageUnits = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'}
  ];

  private propagateChanged = (value: any) => () => null;
  private onTouched: () => void = () => null;
  constructor(private fb: FormBuilder) {
    // const initDate = this.dateOfBirth ? this.dateOfBirth : toDate(subYears(Date.now(), 30));
    // const initAge = this.toAge(initDate);

    this.form = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    });
  }

  ngOnInit() {
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges.pipe(filter(_ => birthday.valid),
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      map(birth => {
      return {date: birth, from: 'birthday'};
    }));
    const ageNum$ = ageNum.valueChanges.pipe(startWith(ageNum.value), debounceTime(this.debounceTime), distinctUntilChanged());
    const ageUnit$ = ageUnit.valueChanges.pipe(startWith(ageUnit.value), debounceTime(this.debounceTime), distinctUntilChanged());

    const age$ = combineLatest(ageNum$, ageUnit$, (age, unit) => {
      return {age, unit};
    }).pipe(filter(_ => this.form.get('age').valid), map(({age, unit}) => {
      return {
        date: this.toDate({age, unit}),
        from: 'age'
      };
    }));


    const merged$ = merge(birthday$, age$).pipe(filter(_ => this.form.valid));
    this.sub = merged$.subscribe(d => {
      // 将日期转为年龄
      const age = this.toAge(d.date);
      if (d.from === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, {emitEvent: false});
        }
        if (age.unit !== ageUnit.value) {
          this.selectedUnit = age.unit;
          ageUnit.patchValue(age.unit, {emitEvent: false});
        }
        this.propagateChanged(d.date);
      } else {
        // 将日期转为年龄
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue(d.date, {emitEvent: false});
          this.propagateChanged(d.date);
        }
      }
    });
  }


  // 年龄转为生日
  toDate(age: Age): string {
    const now = new Date();
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), 'YYYY-MM-DD');
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), 'YYYY-MM-DD');
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), 'YYYY-MM-DD');
      }
      default: {
        return null;
      }
    }
  }

  // 生日转为年龄
  toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = new Date();
    if (isBefore(subDays(now, this.daysTop), date)) {
      return {
        age: differenceInDays(now, date),
        unit: AgeUnit.Day
      };
    } else if (isBefore(subMonths(now, this.monthsTop), date)) {
      return {
        age: differenceInMonths(now, date),
        unit: AgeUnit.Month
      };
    } else {
      return {
        age: differenceInYears(now, date),
        unit: AgeUnit.Year
      };
    }
  }


  // 验证生日
  validateDate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    return isValidDate(val) ? null : {
      birthdayInvalid: true
    };
  }

  // 验证年龄
  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;

      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal <= this.yearsTop
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBottom && ageNumVal <= this.monthsTop
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal <= this.daysTop
          break;
        }
        default: {
          result = false;
          break;
        }
      }
      return result ? null : {
        ageInvalid: true
      };
    };
  }


  // 整个表单控件的验证
  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      dateOfBirthInvalid: true
    };
  }


  writeValue(obj: string): void {
    if (obj) {
      // const date = toDate(obj);
      const date = format(obj, 'YYYY-MM-DD');
      this.form.get('birthday').patchValue(date);
      const age = this.toAge(date);
      this.form.get('age').get('ageNum').patchValue(age.age, {emitEvent: true});
      this.form.get('age').get('ageUnit').patchValue(age.unit, {emitEvent: true});
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }


  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
