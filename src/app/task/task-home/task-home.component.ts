import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {
  lists = [{
    id: 1,
    name: '待办',
    tasks: [{
      id: 1,
      desc: '任务一：去买杯咖啡',
      owner: {
        id: 1,
        name: '张三',
        avatar: 'avatars:svg-11'
      },
      dueDate: Date.now()
    }, {
      id: 2,
      desc: '任务二：完成PPT作业',
      owner: {
        id: 2,
        name: '李四',
        avatar: 'avatars:svg-12'
      },
      dueDate: Date.now()
    }]
  }, {
    id: 2,
    name: '进行中',
    tasks: [{
      id: 1,
      desc: '任务三：审核代码',
      owner: {
        id: 3,
        name: '王五',
        avatar: 'avatars:svg-12'
      },
      dueDate: Date.now()
    }, {
      id: 2,
      desc: '任务四：项目定制计划',
      owner: {
        id: 2,
        name: '李四',
        avatar: 'avatars:svg-12'
      },
      dueDate: Date.now()
    }]
  }];

  constructor() { }

  ngOnInit() {
  }

}
