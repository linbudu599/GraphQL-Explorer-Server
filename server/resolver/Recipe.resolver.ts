import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Root,
  FieldResolver,
} from "type-graphql";
import { sampleCooks, sampleRecipes } from "../utils/mock";
import { SearchResult, Difficulty, Cook, Recipe } from "../graphql/Recipe";

@Resolver()
export default class RecipeResolver {
  private recipesData: Recipe[] = sampleRecipes;
  private cooks: Cook[] = sampleCooks;

  @Query(() => [SearchResult])
  async Search(
    @Arg("cookName") cookName: string
  ): Promise<typeof SearchResult[]> {
    const recipes = this.recipesData.filter((recipe) =>
      recipe.cook.name.match(cookName)
    );
    const cooks = this.cooks.filter((cook) => cook.name.match(cookName));

    return [...recipes, ...cooks];
  }

  @Query((returns) => [Recipe])
  async Recipes(
    @Arg("difficulty", (type) => Difficulty, { nullable: true })
    difficulty?: Difficulty
  ): Promise<Recipe[]> {
    if (!difficulty) {
      return this.recipesData;
    }

    return this.recipesData.filter(
      (recipe) => recipe.preparationDifficulty === difficulty
    );
  }
}
