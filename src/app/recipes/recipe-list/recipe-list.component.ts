import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>()
  recipes: Recipe[] = [
    new Recipe(
      'Test Recipe',
      'This is a test',
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg'
    ),
  ];
  constructor() {}

  ngOnInit(): void {}
  onRecipeSelected(recipe: Recipe) {
this.recipeWasSelected.emit(recipe);
  }
}
