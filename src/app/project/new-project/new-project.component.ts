import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NewProjectComponent>, @Inject(MAT_DIALOG_DATA) private datas) { }

  ngOnInit() {
    console.log(JSON.stringify(this.datas));
  }

  save(): void {
    // 给外面返回数据
    this.dialogRef.close('已经保存了');
  }
}
