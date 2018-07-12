import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User, Auth} from "../domain";
import {Observable} from "rxjs/index";
import {map, switchMap} from "rxjs/internal/operators";

// 模拟后台认证成功后返回的token
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
  '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
  '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';


@Injectable()
export class AuthService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(@Inject('BASE_CONFIG') private config, private http: HttpClient) { }

  /**
   * 注册
   * 使用用户提供的个人信息进行注册，成功则返回 User，否则抛出异常
   *
   * @param user 用户信息，id 属性会被忽略，因为服务器端会创建新的 id
   */
  register(user: User): Observable<Auth> {
    const uri = `${this.config.uri}/users`;
    return this.http.get(uri, {params: {'email': user.email}}).pipe(switchMap(res => {
        if (res.length > 0) throw new Error('该邮箱已注册');
        return this.http.post(uri, JSON.stringify(user), {headers: this.headers});
      }));
  }


  /**
   * 使用用户名和密码登录
   *
   * @param email 用户名
   * @param password 密码（明文），服务器会进行加密处理
   */
  login(email: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/users`;
    return this.http.get(uri, {params: {'email': email, 'password': password}}).pipe(map(res => {
      if (res.length === 0) throw new Error('登陆失败');
      return {
        token: TOKEN,
        user: res[0]
      };
    }));
  }
}
