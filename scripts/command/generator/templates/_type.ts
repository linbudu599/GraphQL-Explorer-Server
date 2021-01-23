// @ts-nocheck
import { Field, ID, InterfaceType } from "type-graphql";

@InterfaceType({ description: "__ENTITY_NAME__ Type" })
export abstract class I__ENTITY_NAME__ {
  @Field((type) => ID)
  __LOWER_CASE_ENEITY_NAME__Id!: number;

  @Field()
  prop!: string;

  @Field((type) => Date)
  createDate!: Date;

  @Field((type) => Date)
  updateDate!: Date;
}
