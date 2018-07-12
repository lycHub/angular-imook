import {Action} from "@ngrx/store";
import {Quote} from "../../domain/quote.model";
import {type} from "../../utils/type";

// export const QUOTE = 'qute';
// export const QUOTE_SUCCESS = 'Quote Success';
// export const QUOTE_FAIL = 'Quote Fail';


export const ActionTypes = {
  LOAD: type('[Quote] Load'),
  LOAD_SUCCESS: type('[Quote] Load Success'),
  LOAD_FAIL: type('[Quote] Load Fail')
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor(private payload: null) {}
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;
  constructor(private payload: Quote) {}
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;
  constructor(private payload: string) {}
}

export type QuoteActions = LoadAction | LoadSuccessAction | LoadFailAction;
