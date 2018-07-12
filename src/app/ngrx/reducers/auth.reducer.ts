import {Auth} from "../../domain/auth.model";
import {AuthActions, AuthActionTypes} from "../actions/auth.action";

export const initialState: Auth = {};

export function reducer(state = initialState, action: AuthActions): Auth {
  switch (action.type) {
    case AuthActionTypes.REGISTER_SUCCESS:
    case AuthActionTypes.LOGIN_SUCCESS:
      return {...<Auth>action.payload};

    case AuthActionTypes.REGISTER_FAIL:
    case AuthActionTypes.LOGIN_FAIL:
      return initialState;
    default:
      return state;
  }
}


// export const getQuote = (state: State) => state.quote;
