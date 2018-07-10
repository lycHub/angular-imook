import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Project} from "../domain";
import {from, Observable} from "rxjs/index";
import {count, map, mapTo, mergeMap, switchMap} from "rxjs/internal/operators";

@Injectable()
export class ProjectService {
  private readonly domain = 'projects';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(@Inject('BASE_CONFIG') private api, private http: HttpClient) {}

  // 增加项目
  add(project: Project): Observable<Project> {
    project.id = null;
    const uri = `${this.api.uri}/${this.domain}`;
    return this.http.post(uri, JSON.stringify(project), {headers: this.headers}).pipe(map(data => data as Project));
  }


  // 更新项目
  update(project: Project): Observable<Project> {
    const uri = `${this.api.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    };

    // patch和put都可以跟新数据，但是Put会把本条数据的所有字段跟新，而patch可以自己选择要跟新的字段
    return this.http.patch(uri, JSON.stringify(toUpdate), {headers: this.headers}).pipe(map(data => data as Project));
  }


  // 删除项目
  del(project: Project): Observable<Project> {
    // 删除项目下的所有task-list和task
    // mergeMap就算有个新的任务流进来，那之前的还是要继续删
    const delTasks$ = from(project.taskLists ? project.taskLists : [])
      .pipe(mergeMap(listId => this.http.delete(`${this.api.uri}/taskLists/${listId}`)), count());

    return delTasks$.pipe(switchMap(_ => this.http.delete(`${this.api.uri}/${this.domain}/${project.id}`)), mapTo(project));
  }


  // 获取某user参与的所有项目
  get(userId: string): Observable<Project[]> {
    const uri = `${this.api.uri}/${this.domain}`;

    // {'members_like': userId}根据userId筛选，这是json-server的功能
    return this.http.get(uri, {params: {'members_like': userId}}).pipe(map(data => data as Project[]));
  }
}
