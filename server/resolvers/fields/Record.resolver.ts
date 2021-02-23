import { GraphQLResolveInfo } from "graphql";
import { Resolver, FieldResolver, Root, Info, Ctx } from "type-graphql";

import Account from "../../entities/Account";
import Record from "../../entities/Record";
import Executor from "../../entities/Executor";
import Substance from "../../entities/Substance";
import Task from "../../entities/Task";

import AccountService from "../../services/Account.service";
import RecordService from "../../services/Record.service";
import ExecutorService from "../../services/Executor.service";
import SubstanceService from "../../services/Substance.service";
import TaskService from "../../services/Task.service";
import { IContext } from "../../typing";

@Resolver((of) => Record)
export default class RecordFieldResolver {
  constructor(
    private readonly accountService: AccountService,
    private readonly recordService: RecordService,
    private readonly executorService: ExecutorService,
    private readonly substancesService: SubstanceService,
    private readonly taskService: TaskService
  ) {}

  // should support this ?
  // @FieldResolver(() => [Account])
  // async AccountFieldResolver(
  //   @Root() record: Record,
  //   @Info() info: GraphQLResolveInfo
  // ) {
  //   const res = await this.accountService.getFullAccountByRecordId(record.recordId)
  //   return res;
  // }

  @FieldResolver(() => [Executor])
  async ExecutorFieldResolver(@Root() record: Record, @Ctx() ctx: IContext) {
    return [await ctx.dataLoader.loaders.Record.recordExecutor.load(record)];
  }

  @FieldResolver(() => [Substance])
  async SubstanceFieldResolver(@Root() record: Record, @Ctx() ctx: IContext) {
    // return await this.substancesService.getFullSubstanceByRecordId(
    //   record.recordId
    // );
    return [await ctx.dataLoader.loaders.Record.recordSubstance.load(record)];
  }

  @FieldResolver(() => [Task])
  async TaskFieldResolver(@Root() record: Record, @Ctx() ctx: IContext) {
    // return await this.taskService.getFullTaskByRecordId(record.recordId);
    return [await ctx.dataLoader.loaders.Record.recordTask.load(record)];
  }
}
