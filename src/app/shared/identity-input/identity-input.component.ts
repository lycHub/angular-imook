import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Identity, IdentityType} from "../../domain";
import {combineLatest, Observable, Subject, Subscription} from "rxjs/index";
import {extractInfo, isValidAddr} from "../../utils/identity";
import {isValidDate} from "../../utils/date";

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
  private sub: Subscription;




  private propagateChanged = (value: Identity) => () => null;
  private onTouched: () => void = () => null;
  constructor() { }

  ngOnInit() {
    this.sub = combineLatest(this.idType, this.idNo, (_type, _no) => {
      return {
        identityType: _type,
        identityNo: _no
      }
    }).subscribe(identity => {
      this.propagateChanged(identity);
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
    if (!c.value) {
      return null;
    }
    switch (c.value.identityType) {
      case IdentityType.IdCard: {
        return this.validateIdNumber(c);
      }
      case IdentityType.Passport: {
        return this.validatePassport(c);
      }
      case IdentityType.Military: {
        return this.validateMilitary(c);
      }
      case IdentityType.Insurance:
      default: {
        return null;
      }
    }
  }


  // 身份证验证
  private validateIdNumber(c: FormControl): {[key: string]: any} {
    const val = c.value.identityNo;
    if (val.length !== 18) {
      return {
        idNotValid:  true
      };
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    let result = false;
    if (pattern.test(val)) {
      const info = extractInfo(val);
      if (isValidAddr(info.addrCode) && isValidDate(info.dateOfBirth)) {
        result = true;
      }
    }
    return result ? null : {idNotValid:  true};
  }

  private validatePassport(c: FormControl): {[key: string]: any} {
    const value = c.value.identityNo;
    if (value.length !== 9) {
      return {idNotValid: true};
    }
    const pattern = /^[GgEe]\d{8}$/;
    let result = false;
    if (pattern.test(value)) {
      result = true;
    }
    return result ? null : {idNotValid:  true};
  }

  private validateMilitary(c: FormControl): {[key: string]: any} {
    const value = c.value.identityNo;
    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    let result = false;
    if (pattern.test(value)) {
      result = true;
    }
    return result ? null : {idNotValid:  true};
  }

  writeValue(obj: Identity): void {
    if (obj) {
      this.identity = obj;
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
