import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from "rxjs/index";
import {select, Store} from "@ngrx/store";
import * as fromRoot from '../../ngrx/reducers';
import {pluck} from "rxjs/internal/operators";
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store$: Store<fromRoot.State>) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store$.pipe(select('reducer'), pluck('auth'));
  }
}
