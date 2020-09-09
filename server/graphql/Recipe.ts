import {
  Field,
  ObjectType,
  Int,
  registerEnumType,
  createUnionType,
  Authorized,
} from "type-graphql";

export enum Difficulty {
  Beginner,
  Easy,
  Medium,
  Hard,
  MasterChef,
}

registerEnumType(Difficulty, {
  name: "Difficulty",
  description: "All possible preparation difficulty levels",
});

@ObjectType()
export class Cook {
  @Field()
  name!: string;

  @Field((type) => Int)
  yearsOfExperience!: number;
}

@ObjectType()
export class Recipe {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Authorized()
  @Field((type) => [String])
  ingredients!: string[];

  @Authorized("ADMIN")
  @Field((type) => Difficulty)
  preparationDifficulty!: Difficulty;

  @Field()
  cook!: Cook;
}

export const SearchResult = createUnionType({
  name: "SearchResult",
  types: () => [Recipe, Cook] as const,
});
