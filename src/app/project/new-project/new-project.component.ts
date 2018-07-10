import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {
  title = '';
  coverImages = [];
  form: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<NewProjectComponent>, @Inject(MAT_DIALOG_DATA) private data) {
    this.title = this.data.title;
    this.coverImages = this.data.thumbnail;
    const project = this.data.project;
    let formObj = {
      name: ['', Validators.required],
      desc: [],
      coverImg: [this.data.img]
    };

    if (project) {
      formObj = {
        name: [project.name, Validators.required],
        desc: [project.desc],
        coverImg: [project.coverImg]
      };
    }
    this.form = this.fb.group(formObj);
  }

  ngOnInit() {}

  onSubmit({ value, valid }, evt: Event): void {
    evt.preventDefault();
    if (valid) {
      // 给外面返回数据
      this.dialogRef.close(value);
    }
  }
}
