import {ActionReducer, combineReducers, StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../../../environments/environment";
import {NgModule} from "@angular/core";
import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';
import {Auth} from "../../domain/auth.model";
import {routerReducer, StoreRouterConnectingModule} from "@ngrx/router-store";


// 全局state
export interface State {
  quote: fromQuote.State;
  auth: Auth;
}

// 全局初始值
const initialState: State = {
  quote: fromQuote.initialState,
  auth: fromAuth.initialState
};

const reducers = {
  quote: fromQuote.reducer,
  auth: fromAuth.reducer
};

// 合并所有reducer
const productionReducers: ActionReducer<State> = combineReducers(reducers);
// const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

// 全局reducer
export function reducer(state = initialState, action: any): State {
  return productionReducers(state, action);
  // return environment.production ?  productionReducers(state, action) : developmentReducers(state, action);
}


// export const getQuoteState = (state: State) => state.quote.quote;
//
// // 定义简化组件中获取Quote-reducer-state的函数
// export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);

@NgModule({
  imports: [
    StoreModule.forRoot({reducer,  router: routerReducer}),   // 引入全局reducer
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    StoreDevtoolsModule.instrument({logOnly: environment.production})
  ]
})

// 需要导入coreModule
export class AppStoreModule { }
