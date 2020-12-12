import { Service } from "typedi";
import { Resolver, Query, Arg, UseMiddleware, Int } from "type-graphql";

import {
  RecipeUnionResult,
  Difficulty,
  Recipe,
  SaltFish,
} from "../graphql/Recipe";

import RecipeService from "../service/Recipe.service";

import CacheControl, { RecipeCacheHint } from "../middleware/cacheControl";
import CacheMiddleware from "../middleware/cache";

import { log } from "../utils/helper";

@Service()
@Resolver()
export default class RecipeResolver {
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
    const recipes = await this.recipeService.getAllRecipes();
    const cooks = await this.recipeService.getAllCooks();
    const saltFishes = await this.recipeService.getAllSaltFishes();

    return [...recipes, ...cooks, ...saltFishes];
  }

  @Query(() => [Recipe], { nullable: false, description: "基于难度查找菜谱" })
  async QueryRecipesByDifficulty(
    @Arg("difficulty", (type) => Difficulty, { nullable: true })
    difficulty?: Difficulty
  ): Promise<Recipe[]> {
    return this.recipeService.getRecipesByDifficulty(difficulty);
  }

  @Query(() => [Recipe], { nullable: false, description: "基于作料查找菜谱" })
  async QueryRecipesByIngredients(
    @Arg("ingredients", () => [String], { nullable: true })
    ingredients: string[]
  ): Promise<Recipe[]> {
    return this.recipeService.getRecipesByIngredients(ingredients);
  }

  @Query(() => [SaltFish], {
    nullable: false,
    description: "根据恩格尔系数查找咸鱼",
  })
  async QuerySaltFishByCoefficient(
    @Arg("coefficient", () => Int, { nullable: false })
    coefficient: number
  ): Promise<SaltFish[]> {
    return this.recipeService.getSaltFishesByCoefficient(coefficient);
  }
}
