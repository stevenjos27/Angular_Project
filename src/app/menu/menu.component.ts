import { baseURL } from './../shared/baseurl';
import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from './../shared/dish';
// import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';

 @Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})

export class MenuComponent implements OnInit {
  errMess: string;
  dishes: Dish[];
  // selectedDish: Dish;

  constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errMess => this.errMess = <any>errMess.message);
  }

  // onSelect(dish: Dish) {
  //   this.selectedDish = dish;
  // }
}
