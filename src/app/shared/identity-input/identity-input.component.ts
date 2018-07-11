import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Identity, IdentityType} from "../../domain";
import {combineLatest, Observable, Subject} from "rxjs/index";

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi      : true
    },
    {
      provide    : NG_VALIDATORS,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi      : true
    }
  ]
})
export class IdentityInputComponent implements OnInit, ControlValueAccessor, OnDestroy {
  identityTypes = [{
    value: IdentityType.IdCard,
    label: '身份证'
  }, {
    value: IdentityType.Insurance,
    label: '医保'
  }, {
    value: IdentityType.Passport,
    label: '护照'
  }, {
    value: IdentityType.Military,
    label: '军官证'
  }, {
    value: IdentityType.Other,
    label: '其它'
  }];

  identity: Identity = {
    identityNo: null,
    identityType: null
  };

  private _idType = new Subject<IdentityType>();
  private _idNo = new Subject<string>();




  private propagateChanged = (value: any) => () => null;
  private onTouched: () => void = () => null;
  constructor() { }

  ngOnInit() {
    const val$ = combineLatest(this.idType, this.idNo, (_type, _no) => {
      return {
        identityType: _type,
        identityNo: _no
      }
    });
  }


  // 选择证件类型
  onIdTypeChange(idType: IdentityType) {
    // 每次改变都发射一个值
    this._idType.next(idType);
  }

  // 输入证件号
  onIdNoChange(idNo: string) {
    // 每次输入都发射一个值
    this._idNo.next(idNo);
  }

  get idType(): Observable<IdentityType> {
    return this._idType.asObservable();
  }

  get idNo(): Observable<string> {
    return this._idNo.asObservable();
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
