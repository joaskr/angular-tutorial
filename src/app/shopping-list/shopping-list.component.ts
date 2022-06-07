import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";
import {LoggingService} from "../logging.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription
  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
    this.loggingService.printLog('hello from sh list comp');
  }
  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
ngOnDestroy() {
    this.igChangeSub.unsubscribe();
}
}
