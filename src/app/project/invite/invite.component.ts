import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {User} from "../../domain/user.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {
  members: User[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<InviteComponent>) { }

  ngOnInit() {
    // 接收项目中现有的成员
    this.members = [...this.data.members];
  }

  // 保存
  onSubmit(evt: Event, {valid, value}) {
    evt.preventDefault();
    if (valid) {
      this.dialogRef.close(this.members);
    }
  }

}
