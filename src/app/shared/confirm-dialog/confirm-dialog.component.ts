import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h3 mat-dialog-title>{{title}}</h3>
    <div mat-dialog-content>
      {{content}}
    </div>

    <div mat-dialog-actions>
      <button mat-raised-button color="primary" type="button" (click)="onClick(true)">确定</button>
      <button mat-button mat-dialog-close type="button" (click)="onClick(false)">取消</button>
    </div>
  `,
  styles: []
})
export class ConfirmDialogComponent implements OnInit {
  title = '';
  content = '';

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.title = this.data.title;
    this.content = this.data.content;
  }

  onClick(type: boolean): void {
    this.dialogRef.close(type);
  }
}
