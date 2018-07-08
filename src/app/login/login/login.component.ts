import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.email, this.validate]],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
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
