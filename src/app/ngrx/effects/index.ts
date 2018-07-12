import {NgModule} from "@angular/core";
import {EffectsModule} from "@ngrx/effects";
import {QuoteEffects} from "./quote.effects";
export const effects = {

};

@NgModule({
  imports: [EffectsModule.forRoot([QuoteEffects])]
})
export class AppEffectsModule {
}
