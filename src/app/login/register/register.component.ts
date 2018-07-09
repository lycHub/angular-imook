import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  items: string[];
  private readonly avatarName = 'avatars';
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
      dateOfBirth: ['1990-01-01']
    });
  }

  onsubmit({ value, valid }, evt: Event) {
    evt.preventDefault();
    if (valid) {
      console.log(value);
    }
  }

}
