import {ActionReducer, combineReducers, StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../../../environments/environment";
import {NgModule} from "@angular/core";
import * as fromQuote from './quote.reducer';
import {storeFreeze} from "ngrx-store-freeze";
import {compose} from "@ngrx/core/compose";


// 全局state
export interface State {
  quote: fromQuote.State;
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
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

// 全局reducer
export function reducer(state = initialState, action: any): State {
  return environment.production ?  productionReducers(state, action) : developmentReducers(state, action);
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducer),   // 引入全局reducer
    StoreDevtoolsModule.instrument({logOnly: environment.production})
  ]
})
export class AppStoreModule { }
