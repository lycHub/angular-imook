import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../domain";
import {from, Observable, of} from "rxjs/index";
import {Project} from "../domain/project.model";
import {filter, reduce, switchMap} from "rxjs/internal/operators";

@Injectable()
export class UserService {
  private readonly domain = 'users';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(@Inject('BASE_CONFIG') private config, private http: HttpClient) { }

  // 搜索用户
  searchUsers(str: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, {params: {'name_like': str}});
  }


  // 获取某项目中的所有用户
  getUsersByProject(projectId: string): Observable<User[]> {
    const uri = `${this.config.uri}/users`;
    return this.http.get(uri, {params: {projectId}});
  }


  // 把某项目分配给某用户
  addProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = (user.projectIds) ? user.projectIds : [];
    if (projectIds.indexOf(projectId) !== -1) return of(user);
    return this.http.patch(uri, JSON.stringify({projectIds: [...projectIds, projectId]}), {headers: this.headers});
  }

  // 把项目中的某用户删除
  removeProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = (user.projectIds) ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    if (index === -1) return of(user);
    const toUpdate = [...projectIds.slice(0, index), ...projectIds.slice(index + 1)];
    return this.http.patch(uri, JSON.stringify({projectIds: toUpdate}), {headers: this.headers});
  }


  // 批量给用户添加某个项目
  batchUpdateProjectRef(project: Project): Observable<User[]> {
    const projectId = project.id;

    // 该项目下需要的用户
    const memberIds = project.members ? project.members : [];
    return from(memberIds).pipe(
      // 获取到每一个用户的具体信息
      switchMap(id => {
        const uri = `${this.config.uri}/${this.domain}/${id}`;
        return this.http.get(uri);
      }),

      // 筛选出用户的projectIds中不包含本项目的用户
      filter(user => user.projectIds.indexOf(projectId) === -1),
      switchMap(u => this.addProjectRef(u, projectId)),
      reduce((users, curr) => [...users, curr], [])
    );
  }
}
