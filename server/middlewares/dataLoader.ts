import DataLoader from "dataloader";
import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { Container, Service, Inject } from "typedi";

import { IContext } from "../typing";

import RecipeService from "../services/Recipe.service";

// https://github.com/MichalLytek/type-graphql/issues/51

@Service()
export default class DataLoaderMiddleware
  implements MiddlewareInterface<IContext> {
  async use(
    { root, args, context, info }: ResolverData<IContext>,
    next: NextFn
  ) {
    if (!context.dataLoader.initialized) {
      context.dataLoader = {
        initialized: true,
        loaders: {},
      };

      const loaders = context.dataLoader.loaders;
      const recipeService = Container.get(RecipeService);

      loaders.recipeLoader = {
        rootRecipeLoader: new DataLoader((titles: Readonly<string[]>) =>
          recipeService.getRecipesByTitles(titles)
        ),
        cookLoader: new DataLoader((names: Readonly<string[]>) =>
          recipeService.getCookByNames(names)
        ),
        companyLoader: new DataLoader((names: Readonly<string[]>) =>
          recipeService.getCompaniesByNames(names)
        ),
      };
    }

    return next();
  }
}
