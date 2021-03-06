import { Resolver, Query, Ctx } from "type-graphql";

import PrismaUser from "../../graphql/prisma/User";
import PrismaItem from "../../graphql/prisma/Item";

import { IContext } from "../../typing";

@Resolver()
export default class PrismaResolver {
  constructor() {}

  @Query((returns) => [PrismaUser])
  async QueryAllPrismaUsers(@Ctx() ctx: IContext): Promise<PrismaUser[]> {
    return await ctx.prisma.user.findMany({ include: { items: true } });
  }

  @Query((returns) => [PrismaItem])
  async QueryAllPrismaItems(@Ctx() ctx: IContext): Promise<PrismaItem[]> {
    return await ctx.prisma.item.findMany({ include: { owner: true } });
  }
}
