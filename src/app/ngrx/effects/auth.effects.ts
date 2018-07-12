import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import * as actions from "../actions/auth.action";
import {catchError, map, switchMap} from "rxjs/internal/operators";
import {AuthService} from "../../services/auth.service";
import {User} from "../../domain/user.model";


@Injectable()
export class AuthEffects {
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(ofType(actions.AuthActionTypes.LOGIN),
    map(a => a.payload),
    switchMap(({email, password}) => this.service$.login(email, password).pipe(map(auth => new actions.LoginSuccessAction(auth)),
      catchError(err => of(new actions.LoginFailAction(JSON.stringify(err)))))));


  @Effect()
  register$: Observable<Action> = this.actions$.pipe(ofType(actions.AuthActionTypes.REGISTER),
    map(a => a.payload),
    switchMap((user: User) => this.service$.register(user).pipe(map(auth => new actions.RegisterSuccessAction(auth)),
      catchError(err => of(new actions.RegisterFailAction(JSON.stringify(err)))))));


  // @Effect()
  //   // 退出导航到根目录
  // logout$: Observable<Action> = this.actions$.pipe(ofType(actions.AutoActionTypes.LOGOUT), map(_ => go(['/'])));


  constructor(private actions$: Actions, private service$: AuthService) {}
}
