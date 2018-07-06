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
      priority: 3,
      owner: {
        id: 1,
        name: '张三',
        avatar: 'avatars:svg-11'
      },
      dueDate: Date.now(),
      completed: true
    }, {
      id: 2,
      desc: '任务二：完成XXXXXXXXXPPT作业',
      priority: 2,
      owner: {
        id: 2,
        name: '李四',
        avatar: 'avatars:svg-12'
      },
      dueDate: Date.now(),
      reminder: Date.now(),
      completed: false
    }]
  }, {
    id: 2,
    name: '进行中',
    tasks: [{
      id: 1,
      desc: '任务三：审核代码',
      priority: 1,
      owner: {
        id: 3,
        name: '王五',
        avatar: 'avatars:svg-12'
      },
      dueDate: Date.now(),
      completed: false
    }, {
      id: 2,
      desc: '任务四：项目定制计划',
      priority: 2,
      owner: {
        id: 2,
        name: '李四',
        avatar: 'avatars:svg-12'
      },
      dueDate: Date.now(),
      completed: false
    }]
  }];

  constructor() { }

  ngOnInit() {
  }

}
