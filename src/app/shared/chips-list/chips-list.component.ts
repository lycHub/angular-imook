import {Component, forwardRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import {User} from "../../domain/user.model";
import {Observable} from "rxjs/index";
import {debounceTime, distinctUntilChanged, filter, switchMap} from "rxjs/internal/operators";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi      : true
    },
    {
      provide    : NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi      : true
    }
  ]
})
export class ChipsListComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @ViewChild('autoMember') autoMember;

  // 是否允许多选
  @Input() multiple = true;
  @Input() label = '添加/修改成员';
  @Input() placeholderText = '请输入成员 email';
  items: User[];
  form: FormGroup;
  memberResults$: Observable<User[]>;

  private propagateChanged = (value: User[]) => () => null;
  private onTouched: () => void = () => null;
  constructor(private fb: FormBuilder, private service: UserService) {
    this.form = this.fb.group({
      memberSearch: []
    });
  }

  ngOnInit() {
    this.memberResults$ = this.form.get('memberSearch').valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), filter(s => s && s.length > 0), switchMap(str => this.service.searchUsers(str)));
  }


  // 删掉已选用户的标签
  removeMember(member: User) {
    const ids = this.items.map(u => u.id);
    const i = ids.indexOf(member.id);
    if (this.multiple) {
      this.items = [...this.items.slice(0, i), ...this.items.slice(i + 1)];
    } else {
      this.items = [];
    }
    this.form.patchValue({ memberSearch: '' });
    this.propagateChanged(this.items);
  }


  // 选中用户添加标签
  handleMemberSelection(user: User) {
    if (this.items.map(u => u.id).indexOf(user.id) !== -1) {
      return;
    }
    if (this.multiple) {
      this.items = [...this.items, user];
    } else {
      this.items = [user];
    }
    this.form.patchValue({ memberSearch: user.name });
    this.propagateChanged(this.items);
  }


  displayUser(user: User): string {
    return user ? user.name : '';
  }

  // 是否显示输入框
  get displayInput() {
    return this.multiple || this.items.length === 0;
  }


  // 整个表单控件的验证
  validate(c: FormControl): {[key: string]: any} {
    return this.items ? null : { chipListInvalid: true };
  }


  writeValue(obj: User[]): void {
    // console.log(obj);
    if (obj && this.multiple) {
      const userEntities = obj.reduce((entities, user) => {
        return {...entities, [user.id]: user};
      }, {});
      if (this.items) {
        const remaining = this.items.filter(item => !userEntities[item.id]);
        this.items = [...remaining, ...obj];
      }
    } else if (obj && !this.multiple) {
      this.items = [...obj];
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnDestroy(): void {
  }
}
