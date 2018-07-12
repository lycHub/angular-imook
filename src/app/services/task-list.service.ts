import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TaskList} from "../domain";
import {concat, Observable} from "rxjs/index";
import { map, mapTo, reduce } from "rxjs/internal/operators";

@Injectable()
export class TaskListService {
  private readonly domain = 'taskLists';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(@Inject('BASE_CONFIG') private api, private http: HttpClient) {}

  // 增加tasklist
  add(tasklist: TaskList): Observable<TaskList> {
    tasklist.id = null;
    const uri = `${this.api.uri}/${this.domain}`;
    return this.http.post(uri, JSON.stringify(tasklist), {headers: this.headers}).pipe(map(data => data as TaskList));
  }


  // 更新tasklist
  update(tasklist: TaskList): Observable<TaskList> {
    const uri = `${this.api.uri}/${this.domain}/${tasklist.id}`;
    const toUpdate = {
      name: tasklist.name
    };

    // patch和put都可以跟新数据，但是Put会把本条数据的所有字段跟新，而patch可以自己选择要跟新的字段
    return this.http.patch(uri, JSON.stringify(toUpdate), {headers: this.headers}).pipe(map(data => data as TaskList));
  }


  // 删除tasklist
  del(tasklist: TaskList): Observable<TaskList> {
    const uri = `${this.api.uri}/taskLists/${tasklist.id}`;
    return this.http.delete(uri).pipe(mapTo(tasklist));
  }


  // 获取某user参与的所有TaskList
  get(projectId: string): Observable<TaskList[]> {
    const uri = `${this.api.uri}/${this.domain}`;

    // {'members_like': userId}根据userId筛选，这是json-server的功能
    return this.http.get(uri, {params: {projectId}}).pipe(map(data => data as TaskList[]));
  }


  // 拖拽交换两个tasklist的顺序(order字段)，src => drag  target => drop
  swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
    const dragUri = `${this.api.uri}/${this.domain}/${src.id}`;
    const dropUri = `${this.api.uri}/${this.domain}/${target.id}`;
    const drag$ = this.http.patch(dragUri, JSON.stringify({order: target.order}), {headers: this.headers});
    const drop$ = this.http.patch(dropUri, JSON.stringify({order: src.order}), {headers: this.headers});
    return concat(drag$, drop$).pipe(reduce((arr, list) => {
      return [...arr, list];
    }, []));
  }

  // initializeTaskLists(prj: Project): Observable<Project> {
  //   const id = prj.id;
  //   return merge(
  //     this.add({name: '待办', projectId: id, order: 1}),
  //     this.add({name: '进行中', projectId: id, order: 2}),
  //     this.add({name: '已完成', projectId: id, order: 3}))
  //     .reduce((r, x) => {
  //       return [...r, x];
  //     }, [])
  //     .map(tls => ({...prj, taskLists: tls.map(tl => tl.id)}));
  // }

}
