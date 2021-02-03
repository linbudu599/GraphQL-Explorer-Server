import { Service, Inject } from "typedi";

import { Difficulty, Cook, Recipe, SaltFish } from "../graphql/Recipe";
import { sampleSaltFishes } from "../utils/mock";

export interface IRecipeService {
  getAllRecipes(): Promise<Recipe[]>;
  getAllCooks(): Promise<Cook[]>;
  getAllSaltFishes(): Promise<SaltFish[]>;
  getRecipesByDifficulty(difficulty?: Difficulty): Promise<Recipe[]>;
  getRecipesByIngredients(ingredients: string[]): Promise<Recipe[]>;
  getSaltFishesByCoefficient(coefficient: number): Promise<SaltFish[]>;
}

// make it global and be used across all the containers
@Service({ global: true })
export default class RecipeService implements IRecipeService {
  // import data or inject it
  private saltFishes: SaltFish[] = sampleSaltFishes;

  constructor(
    @Inject("RECIPES_DATA") private readonly recipes: Recipe[],

    @Inject("COOKS_DATA") private readonly cooks: Cook[]
  ) {}

  async getAllRecipes(): Promise<Recipe[]> {
    return this.recipes;
  }

  async getRecipesByDifficulty(difficulty?: Difficulty): Promise<Recipe[]> {
    return difficulty
      ? this.recipes.filter(
          (recipe) => recipe.preparationDifficulty === difficulty
        )
      : this.recipes;
  }

  async getRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
    const recipesList = this.recipes;
    switch (ingredients?.length) {
      case 0 || undefined:
        return recipesList;
      case 1:
        return recipesList.filter((recipe) =>
          recipe.ingredients.includes(ingredients[0])
        );
      default:
        return recipesList.filter((recipe) => {
          return ingredients.every((level) =>
            recipe.ingredients.includes(level)
          );
        });
    }
  }

  async getAllCooks(): Promise<Cook[]> {
    return this.cooks;
  }

  async getAllSaltFishes(): Promise<SaltFish[]> {
    return this.saltFishes;
  }

  async getSaltFishesByCoefficient(coefficient?: number): Promise<SaltFish[]> {
    return coefficient
      ? this.saltFishes.filter((fish) => fish.EngelCoefficient === coefficient)
      : this.saltFishes;
  }
}
