import { Service, Inject } from "typedi";
import { Recipe } from "../graphql/Recipe";
import { IRecipeService } from "../typding";

// make it global and be used across all the containers
@Service({ global: true })
export default class RecipeService implements IRecipeService {
  constructor(@Inject("RECIPES_DATA") private readonly recipes: Recipe[]) {}

  async getAllRecipes() {
    return this.recipes;
  }
}
