import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Quote} from "../domain/quote.model";
import {map} from "rxjs/internal/operators";

@Injectable()
export class QuoteService {

  constructor(@Inject('BASE_CONFIG') private api, private http: HttpClient) { }

  getQuote(): Observable<Quote> {
    const uri = `${this.api.uri}/quotes/${Math.floor((Math.random() * 10))}`;
    return this.http.get(uri).pipe(map(res => res as Quote));
  }
}
