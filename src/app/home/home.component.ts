import { PromotionService } from './../services/promotion.service';
import { Promotion } from './../shared/promotion';
import { DishService } from './../services/dish.service';
import { Dish } from './../shared/dish';
import { Component, OnInit } from '@angular/core';
import { LeaderService } from './../services/leader.service';
import { Leader } from './../shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  constructor( private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService
  ) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .then(dish => this.dish = dish);

    this.promotionservice.getFeaturedPromotion()
    .then(promo => this.promotion = promo);

    this.leaderservice.getFeaturedLeader()
    .then(lead => this.leader = lead);
  }

}
