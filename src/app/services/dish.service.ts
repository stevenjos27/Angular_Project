import { baseURL } from './../shared/baseurl';
import { DISHES } from './../shared/dishes';
import { Dish } from './../shared/dish';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient, private restangular: Restangular,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
//    return this.http.get<Dish[]>(baseURL + 'dishes')
//    .pipe(catchError(this.processHTTPMsgService.handleError));
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
    // Simulate server latency with 2 second delay
//    return this.http.get<Dish>(baseURL + 'dishes/' + id)
//    .pipe(catchError(this.processHTTPMsgService.handleError));
    return this.restangular.one('dishes', id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    // return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(
    //   map(dishes => dishes[0]))
    //   .pipe(catchError(this.processHTTPMsgService.handleError));
    return this.restangular.all('dishes').getList({featured: true})
      .pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)),
    catchError(error => error));
  }
}
