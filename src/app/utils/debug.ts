import {Observable} from "rxjs/index";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/internal/operators";

declare module 'rxjs/Observable' {
  interface Observable<T> {
    debug: (...any) => Observable<T>;
  }
}

Observable.prototype.debug = function (msg: string) {
    return this.pipe(tap(
      next => {
        if (!environment.production) {
          console.log(msg, next);
        }
      },
      err => {
        if (!environment.production) {
          console.error(msg, err);
        }
      },
      () => {
        if (!environment.production) {
          console.log('complete');
        }
      }
    )
  );
};
