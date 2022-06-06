import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Recipe} from "../recipes/recipes.model";
import {RecipeService} from "../recipes/recipe.service";
import {exhaustMap, map, take, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-course-recipe-book-37fc8-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(response => {console.log(response)});
  }
  fetchRecipes() {
    return this.http.get<Recipe[]>(
      'https://ng-course-recipe-book-37fc8-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
    ).pipe(
      map(recipes => {
            return recipes.map(recipe => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []
              };
            });
          }),
          tap(recipes => {
            this.recipeService.setRecipes(recipes);
          })
        );
  }
}
