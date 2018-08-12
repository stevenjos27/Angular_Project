import { PromotionService } from './../services/promotion.service';
import { Promotion } from './../shared/promotion';
import { DishService } from './../services/dish.service';
import { Dish } from './../shared/dish';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;

  constructor( private dishservice: DishService,
    private promotionservice: PromotionService) { }

  ngOnInit() {
    this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promotionservice.getFeaturedPromotion();
  }

}
