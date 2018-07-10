import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {from, Observable} from "rxjs/index";
import {Task} from "../domain";
import {mapTo, mergeMap, reduce} from "rxjs/internal/operators";
import {TaskList} from "../domain/task-list.model";

@Injectable()
export class TaskService {
  private readonly domain = 'tasks';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(@Inject('BASE_CONFIG') private config, private http: HttpClient) {}

  add(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}`;
    const toAdd = {
      taskListId: task.taskListId,
      desc: task.desc,
      completed: task.completed,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      dueDate: task.dueDate,
      priority: task.priority,
      remark: task.remark,
      reminder: task.reminder,
      createDate: task.createDate
    };
    // const addTaskRef$ = this.addTaskRef()
    return this.http.post(uri, JSON.stringify(toAdd), {headers: this.headers});

  }

  update(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = {
      desc: task.desc,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      dueDate: task.dueDate,
      reminder: task.reminder,
      priority: task.priority,
      remark: task.remark
    };
    return this.http.patch(uri, JSON.stringify(toUpdate), {headers: this.headers});
  }

  del(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http.delete(uri).pipe(mapTo(task));
  }

  // GET project下的所有task
  getByLists(lists: TaskList[]): Observable<Task[]> {
    return from(lists).pipe(mergeMap(list => this.get(list.id)), reduce((tasks: Task[], t: Task[]) => [...tasks, ...t], []));
  }


  // GET 列表下的所有task
  get(taskListId: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, {params: {taskListId}});
  }


  // 移动任务
  move(taskId: string, taskListId: string): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${taskId}`;
    return this.http.patch(uri, JSON.stringify({taskListId}), {headers: this.headers});
  }

  // 把某列表的任务移到另一个列表去
  moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
    return this.get(srcListId).pipe(mergeMap(tasks => from(tasks)),
      mergeMap(task => this.move(task.id, targetListId)),
      reduce((arrTasks, t) => {
        return [...arrTasks, t];
      }, []));
  }

  // 切换任务完成状态
  complete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http.patch(uri, JSON.stringify({completed: !task.completed}), {headers: this.headers});
  }

  // addTaskRef(user: User, taskId: string): Observable<User> {
  //   const uri = `${this.config.uri}/users/${user.id}`;
  //   const taskIds = (user.taskIds) ? user.taskIds : [];
  //   return this.http
  //     .patch(uri, JSON.stringify({taskIds: [...taskIds, taskId]}), {headers: this.headers})
  //     .map(res => res.json() as User);
  // }
  //
  // removeTaskRef(user: User, taskId: string): Observable<User> {
  //   const uri = `${this.config.uri}/users/${user.id}`;
  //   const taskIds = (user.taskIds) ? user.taskIds : [];
  //   const index = taskIds.indexOf(taskId);
  //   return this.http
  //     .patch(uri, JSON.stringify({taskIds: [...taskIds.slice(0, index), taskIds.slice(index + 1)]}), {headers: this.headers})
  //     .map(res => res.json() as User);
  // }
}
