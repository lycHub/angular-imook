import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Quote} from '../../domain/quote.model';
import {Observable} from "rxjs/index";
import {select, Store} from "@ngrx/store";
import * as fromRoot from '../../ngrx/reducers';
import {pluck} from "rxjs/internal/operators";
import {LoadAction} from "../../ngrx/actions/quote.action";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  quote$: Observable<Quote>;

  constructor(private store$: Store<fromRoot.State>, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.email, this.validate]],
      password: [null, Validators.required]
    });

    // 从store中的State里取值
    // 参数state指的是全局文件导出的interface State，所以state.quote指的是quote.reducer.ts中的State

    // this.quote$ = this.store$.pipe(select('reducer'), map(state => state.quote.quote));
    this.quote$ = this.store$.pipe(select('reducer'), pluck('quote', 'quote'));


    // this.quoteServe$.getQuote().subscribe(quote => {
    //   this.store$.dispatch(new LoadSuccessAction(quote));
    // });

    // 用effects可以有同样的效果
    this.store$.dispatch(new LoadAction(null));
  }

  onSubmit({value, valid}, evt: Event) {
    evt.preventDefault();
    console.log(value, valid);

    // 临时指定验证器
    // this.form.controls['email'].setValidators(this.validate);
  }


  private validate(c: FormControl): {[key: string]: any} {
    if (!c.value) {
      return null;
    } else {
      const pattern = /^wang+/;
      if (pattern.test(c.value)) {
        return null;
      } else {
        return {emailNotValid: '要以wang开头'};
      }
    }
  }
}
