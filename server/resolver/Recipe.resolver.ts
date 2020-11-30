import { Service } from "typedi";
import { Resolver, Query, Arg } from "type-graphql";
import { sampleCooks, sampleRecipes, sampleSaltFishes } from "../utils/mock";
import {
  SearchResult,
  Difficulty,
  Cook,
  Recipe,
  SaltFish,
} from "../graphql/Recipe";
import RecipeService from "../service/Recipe.service";
import { log } from "../utils/helper";

@Service()
@Resolver()
export default class RecipeResolver {
  private recipesData: Recipe[] = sampleRecipes;
  private cooks: Cook[] = sampleCooks;
  private saltFishes: SaltFish[] = sampleSaltFishes;

  constructor(private readonly recipeService: RecipeService) {
    // created for each request (scoped)
    log("RecipeService Created!");
  }

  @Query(() => [SearchResult])
  async Search(
    @Arg("cookName") cookName: string
  ): Promise<typeof SearchResult[]> {
    const recipes = this.recipesData.filter((recipe) =>
      recipe.cook.name.match(cookName)
    );

    const cooks = this.cooks.filter((cook) => cook.name.match(cookName));

    return [...recipes, ...cooks, ...this.saltFishes];
  }

  @Query(() => [Recipe])
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

  @Query(() => [Recipe])
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
