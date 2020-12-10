import {
  Field,
  ObjectType,
  Int,
  registerEnumType,
  createUnionType,
  Directive,
} from "type-graphql";

export enum Difficulty {
  Beginner,
  Easy,
  Medium,
  Hard,
  MasterChef,
}

export enum CompanyScale {
  Small,
  Middle,
  Huge,
}

registerEnumType(Difficulty, {
  name: "Difficulty",
  description: "All possible preparation difficulty levels",
});

registerEnumType(CompanyScale, {
  name: "CompanyScale",
  description: "Company Scale",
});

@Directive("@cacheControl(maxAge: 1000)")
@ObjectType({
  description: "Recipe >>> Cook >>> WorkExperience >> Company",
  // skip auth & middleware stack & ...
  simpleResolvers: true,
})
export class Company {
  @Field()
  name!: string;

  @Field(() => CompanyScale, { nullable: true })
  scale!: CompanyScale;

  @Field()
  registerDate!: Date;

  @Field()
  description!: string;
}
@Directive("@cacheControl(maxAge: 1000)")
@ObjectType({ description: "Recipe >>> Cook >>> WorkExperience" })
export class WorkExperience {
  @Field((type) => Company)
  company!: Company;

  @Field()
  isFired!: boolean;

  @Field()
  workYears!: number;
}

@Directive("@cacheControl(maxAge: 1000)")
@ObjectType({ description: "Recipe >>> Cook" })
export class Cook {
  @Field()
  name!: string;

  @Field((type) => Int)
  yearsOfExperience!: number;

  @Field((type) => WorkExperience)
  experience!: WorkExperience;
}

@Directive("@cacheControl(maxAge: 1000)")
@ObjectType({ description: "Recipe Type" })
export class Recipe {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => [String], { nullable: true })
  ingredients!: string[];

  @Field((type) => Difficulty, { nullable: true })
  preparationDifficulty!: Difficulty;

  @Field({ nullable: true })
  cook!: Cook;
}

@Directive("@cacheControl(maxAge: 1000)")
@ObjectType({
  description: "useless object type in union type, just for funny:)",
})
export class SaltFish {
  @Field((type) => Int)
  EngelCoefficient!: number;
}

export const RecipeUnionResult = createUnionType({
  name: "RecipeUnionResult",
  types: () => [Recipe, Cook, SaltFish] as const,
});
