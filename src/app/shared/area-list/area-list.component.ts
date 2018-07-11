import {ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
import {combineLatest, Observable, of, Subject, Subscription} from "rxjs/index";
import {Address} from "../../domain/user.model";
import {map, startWith, tap} from "rxjs/internal/operators";
import {getAreasByCity, getCitiesByProvince, getProvinces} from "../../utils/area";

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
  _address: Address = {
    province: '',
    city: '',
    district: '',
    street: ''
  };
  _province = new Subject<string>();
  _city = new Subject<string>();
  _district = new Subject<string>();
  _street = new Subject<string>();
  cities$: Observable<string[]>;
  districts$: Observable<string[]>;
  provinces$: Observable<string[]>;

  private _sub: Subscription;


  private propagateChanged = (value: Address) => () => null;
  private onTouched: () => void = () => null;
  constructor() { }

  ngOnInit() {
    const province$ = this._province.asObservable().pipe(startWith(''));
    const city$ = this._city.asObservable().pipe(startWith(''));
    const district$ = this._district.asObservable().pipe(startWith(''));
    const street$ = this._street.asObservable().pipe(startWith(''));
    this._sub = combineLatest([province$, city$, district$, street$], (_p, _c, _d, _s) => {
      return {
        province: _p,
        city: _c,
        district: _d,
        street: _s
      };
    }).subscribe(v => {
      this.propagateChanged(v);
    });

    // 获取省份
    this.provinces$ = of(getProvinces());

    // 根据省份的选择得到城市列表
    this.cities$ = province$.pipe(map(province => getCitiesByProvince(province)));

    // 根据省份和城市的选择得到地区列表
    this.districts$ = combineLatest(province$, city$, (p, c) => ({province: p, city: c}))
      .pipe(map(a => getAreasByCity(a.province, a.city)));
  }


  // 省份改变
  onProvinceChange(evt: string) {
    this._province.next(evt);
  }

  // 城市改变
  onCityChange(evt: string) {
    this._city.next(evt);
  }

  // 区县改变
  onDistrictChange(evt: string) {
    this._district.next(evt);
  }

  // 街道改变
  onStreetChange(evt: string) {
    this._street.next(evt);
  }


  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (val.province && val.city && val.district && val.street && val.street.length >= 4) {
      return null;
    }
    return {
      addressNotValid: true
    };
  }


  writeValue(obj: Address): void {
    if (obj) {
      this._address = obj;

      if (this._address.province) {
        this._province.next(this._address.province);
      }
      if (this._address.city) {
        this._city.next(this._address.city);
      }
      if (this._address.district) {
        this._district.next(this._address.district);
      }
      if (this._address.street) {
        this._street.next(this._address.street);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnDestroy(): void {
    if (this._sub) this._sub.unsubscribe();
  }

}
