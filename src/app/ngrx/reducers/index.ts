import {ActionReducer, combineReducers, StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../../../environments/environment";
import {NgModule} from "@angular/core";
import * as fromQuote from './quote.reducer';
import {Quote} from "../../domain/quote.model";


// 全局state
export interface State {
  quote: Quote;
}

// 全局初始值
const initialState: State = {
  quote: fromQuote.initialState
};

const reducers = {
  quote: fromQuote.reducer
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
    StoreModule.forRoot({reducer}),   // 引入全局reducer
    StoreDevtoolsModule.instrument({logOnly: environment.production})
  ]
})

// 需要导入coreModule
export class AppStoreModule { }
