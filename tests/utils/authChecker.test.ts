import { GraphQLResolveInfo } from "graphql";
import { ContainerInstance } from "typedi";
import { authChecker } from "../../server/utils/authChecker";

import { ACCOUNT_TYPE, ACCOUNT_ROLE } from "../../server/utils/constants";

import { PrismaClient } from "@prisma/client";
import { IContext } from "../../server/typing";

describe("TypeGraphQL AuthChecker", () => {
  it("should pass whenever role contains 'UNKNOWN'", () => {
    const checkRes = authChecker(
      {
        root: {},
        args: {},
        context: {
          currentUser: {
            accountId: 1,
            accountType: ACCOUNT_TYPE.VISITOR,
            accountRole: ACCOUNT_ROLE.GOV,
          },
          container: {} as ContainerInstance,
          prisma: {} as PrismaClient,
        } as IContext,
        info: {} as GraphQLResolveInfo,
      },
      // @ts-ignore
      // type-graphql miss generic type here
      [ACCOUNT_TYPE.VISITOR, [ACCOUNT_ROLE.UNKNOWN]]
    );
    expect(checkRes).toBeTruthy();
  });

  it("should reject when account type not match", () => {
    const checkResShouldFail = authChecker(
      {
        root: {},
        args: {},
        context: {
          currentUser: {
            accountId: 1,
            accountType: ACCOUNT_TYPE.VISITOR,
            accountRole: ACCOUNT_ROLE.ENTERPRISE,
          },
          container: {} as ContainerInstance,
          prisma: {} as PrismaClient,
        } as IContext,
        info: {} as GraphQLResolveInfo,
      },
      // @ts-ignore
      [ACCOUNT_TYPE.DOMINATOR, [ACCOUNT_ROLE.ENTERPRISE]]
    );
    expect(checkResShouldFail).toBeFalsy();

    const checkResShouldPass = authChecker(
      {
        root: {},
        args: {},
        context: {
          currentUser: {
            accountId: 1,
            accountType: ACCOUNT_TYPE.DOMINATOR,
            accountRole: ACCOUNT_ROLE.ENTERPRISE,
          },
          container: {} as ContainerInstance,
          prisma: {} as PrismaClient,
        } as IContext,
        info: {} as GraphQLResolveInfo,
      },
      // @ts-ignore
      [ACCOUNT_TYPE.COMMON, [ACCOUNT_ROLE.ENTERPRISE]]
    );
    expect(checkResShouldPass).toBeTruthy();
  });

  it("should reject when account role not match", () => {
    const checkResShouldFail = authChecker(
      {
        root: {},
        args: {},
        context: {
          currentUser: {
            accountId: 1,
            accountType: ACCOUNT_TYPE.DOMINATOR,
            accountRole: ACCOUNT_ROLE.ENTERPRISE,
          },
          container: {} as ContainerInstance,
          prisma: {} as PrismaClient,
        } as IContext,
        info: {} as GraphQLResolveInfo,
      },
      // @ts-ignore
      [ACCOUNT_TYPE.DOMINATOR, [ACCOUNT_ROLE.GOV]]
    );
    expect(checkResShouldFail).toBeFalsy();

    const checkResShouldPass = authChecker(
      {
        root: {},
        args: {},
        context: {
          currentUser: {
            accountId: 1,
            accountType: ACCOUNT_TYPE.DOMINATOR,
            accountRole: ACCOUNT_ROLE.GOV,
          },
          container: {} as ContainerInstance,
          prisma: {} as PrismaClient,
        } as IContext,
        info: {} as GraphQLResolveInfo,
      },
      // @ts-ignore
      [ACCOUNT_TYPE.DOMINATOR, [ACCOUNT_ROLE.GOV]]
    );
    expect(checkResShouldPass).toBeTruthy();
  });
});
