// @ts-nocheck
import { Resolver, Query, Mutation, Root, FieldResolver } from "type-graphql";

import { StatusHandler } from "../graphql/Common";
import __ENTITY_NAME__ from "../entities/__ENTITY_NAME__";
import __ENTITY_NAME__Service from "../services/__ENTITY_NAME__.service";

import { RESPONSE_INDICATOR } from "../utils/constants";

@Resolver((of) => __ENTITY_NAME__)
export default class __ENTITY_NAME__Resolver {
  constructor(
    private readonly __LOWERCASE_ENTITY_NAME__Service: __ENTITY_NAME__Service
  ) {}

  @Query()
  async QueryAll__ENTITY_NAME__s() {
    try {
      return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, []);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }
}
