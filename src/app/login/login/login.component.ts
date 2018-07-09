import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuoteService} from '../../services/quote.service';
import {Quote} from '../../domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote: Quote = {
    id: '0',
    cn: '我突然就觉得自己像个华丽的木偶,演尽了所有的悲欢离合,可是背上总是有无数闪亮的银色丝线,操纵我哪怕一举手一投足。',
    en: 'I suddenly feel myself like a doll,acting all kinds of joys and sorrows.There are lots of shining silvery thread on my back,controlling all my action.',
    pic: '/assets/img/quotes/0.jpg'
  };

  constructor(private fb: FormBuilder, private quoteServe$: QuoteService) {
    this.form = this.fb.group({
      email: ['', [Validators.email, this.validate]],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.quoteServe$.getQuote().subscribe(quote => this.quote = quote);
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
