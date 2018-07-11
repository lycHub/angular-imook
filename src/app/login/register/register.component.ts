import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime, filter, tap} from "rxjs/internal/operators";
import {Subscription} from "rxjs/index";
import {extractInfo, getAddrByCode, isValidAddr} from "../../utils/identity";
import {isValidDate} from "../../utils/date";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  items: string[];
  private readonly avatarName = 'avatars';
  private _sub: Subscription;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    // avatars:svg-1
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.items = nums.map(item => `avatars:svg-${item}`);

    const img = `${this.avatarName}:svg-${(Math.random() * 16).toFixed()}`;
    this.form = this.fb.group({
      email: ['', [Validators.email]],
      name: [],
      password: [],
      repeat: [],
      avatar: [img],
      dateOfBirth: ['1990-01-01'],
      address: ['', Validators.maxLength(80)],
      identity: []
    });


    const id$ = this.form.get('identity').valueChanges.pipe(debounceTime(300),
      filter(_ => this.form.get('identity').valid));

    this._sub = id$.subscribe(id => {
      const info = extractInfo(id.identityNo);
      if (isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.get('address').patchValue(addr);
        // this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
      }
      if (isValidDate(info.dateOfBirth)) {
        const date = info.dateOfBirth;
        this.form.get('dateOfBirth').patchValue(date);
        // this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
      }
    });
  }

  onsubmit({ value, valid }, evt: Event) {
    evt.preventDefault();
    if (valid) {
      console.log(value);
    }
  }


  ngOnDestroy(): void {
    if (this._sub) this._sub.unsubscribe();
  }

}
