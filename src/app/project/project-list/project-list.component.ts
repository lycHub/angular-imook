import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";
import {NewProjectComponent} from "../new-project/new-project.component";
import {InviteComponent} from "../invite/invite.component";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects = [{
    name: '企业协作平台',
    desc: '这是个企业内部项目',
    coverImg: 'assets/img/covers/0.jpg'
  }, {
    name: '企业协作平台',
    desc: '这是个企业内部项目',
    coverImg: 'assets/img/covers/1.jpg'
  }];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {}

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: '传递数据给dialog'});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }


  // 邀请组员
  onInvite() {
    this.dialog.open(InviteComponent);
  }
}
