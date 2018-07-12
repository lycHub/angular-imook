import {Action} from "@ngrx/store";
import {type} from "../../utils/type";
import {Auth, User} from "../../domain";


export const AuthActionTypes = {
  LOGIN: type('[Auth] Login'),
  LOGIN_SUCCESS: type('[Auth] Login Success'),
  LOGIN_FAIL: type('[Auth] Login Fail'),
  REGISTER: type('[Auth] Register'),
  REGISTER_SUCCESS: type('[Auth] Register Success'),
  REGISTER_FAIL: type('[Auth] Register Fail'),
  LOGOUT: type('[Auth] Logout')
};


export class LoginAction implements Action {
  type = AuthActionTypes.LOGIN;

  constructor(public payload: { email: string, password: string }) {
  }
}

export class LoginSuccessAction implements Action {
  type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: Auth) {
  }
}

export class LoginFailAction implements Action {
  type = AuthActionTypes.LOGIN_FAIL;

  constructor(public payload: string) {
  }
}

export class RegisterAction implements Action {
  type = AuthActionTypes.REGISTER;

  constructor(public payload: User) {
  }
}

export class RegisterSuccessAction implements Action {
  type = AuthActionTypes.REGISTER_SUCCESS;

  constructor(public payload: Auth) {
  }
}

export class RegisterFailAction implements Action {
  type = AuthActionTypes.REGISTER_FAIL;

  constructor(public payload: string) {
  }
}

export class LogoutAction implements Action {
  type = AuthActionTypes.LOGOUT;

  constructor(public payload: Auth) {}
}

export type AuthActions
  = LoginAction
  | LoginSuccessAction
  | LoginFailAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailAction
  | LogoutAction;
