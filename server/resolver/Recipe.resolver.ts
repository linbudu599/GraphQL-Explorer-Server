import { Service } from "typedi";
import { Resolver, Query, Arg, UseMiddleware } from "type-graphql";

import {
  RecipeUnionResult,
  Difficulty,
  Cook,
  Recipe,
  SaltFish,
} from "../graphql/Recipe";

import RecipeService from "../service/Recipe.service";

import CacheControl, { RecipeCacheHint } from "../middleware/cacheControl";
import CacheMiddleware from "../middleware/cache";

import { log } from "../utils/helper";
import { sampleCooks, sampleRecipes, sampleSaltFishes } from "../utils/mock";

@Service()
@Resolver()
export default class RecipeResolver {
  private recipes: Recipe[] = sampleRecipes;
  private cooks: Cook[] = sampleCooks;
  private saltFishes: SaltFish[] = sampleSaltFishes;

  constructor(private readonly recipeService: RecipeService) {
    // created for each request (scoped)
    log("=== recipeService Created! ===");
  }

  @Query(() => [RecipeUnionResult], {
    nullable: false,
    description: "返回所有菜谱 厨师 和 咸鱼!",
  })
  @UseMiddleware(CacheMiddleware)
  @CacheControl(RecipeCacheHint)
  async QueryRecipeUnions(): Promise<typeof RecipeUnionResult[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.recipes, ...this.cooks, ...this.saltFishes]);
      }, 500);
    });
  }

  @Query(() => [Recipe], { nullable: false, description: "基于难度查找菜谱" })
  async QueryRecipesByDifficulty(
    @Arg("difficulty", (type) => Difficulty, { nullable: true })
    difficulty?: Difficulty
  ): Promise<Recipe[]> {
    if (!difficulty) {
      return await this.recipeService.getAllRecipes();
    }

    const res = (await this.recipeService.getAllRecipes()).filter(
      (recipe) => recipe.preparationDifficulty === difficulty
    );

    return res;
  }

  @Query(() => [Recipe], { nullable: false, description: "基于作料查找菜谱" })
  async QueryRecipesByIngredients(
    @Arg("ingredients", () => [String], { nullable: true })
    ingredients: string[]
  ): Promise<Recipe[]> {
    const recipesList = await this.recipeService.getAllRecipes();
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
}
