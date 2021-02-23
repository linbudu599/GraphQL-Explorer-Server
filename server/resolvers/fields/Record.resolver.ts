import { GraphQLResolveInfo } from "graphql";
import { Resolver, FieldResolver, Root, Info } from "type-graphql";

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
  async ExecutorFieldResolver(@Root() record: Record) {
    return await this.executorService.getFullExecutorByRecordId(
      record.recordId
    );
  }

  @FieldResolver(() => [Substance])
  async SubstanceFieldResolver(@Root() record: Record) {
    return await this.substancesService.getFullSubstanceByRecordId(
      record.recordId
    );
  }

  @FieldResolver(() => [Task])
  async TaskFieldResolver(@Root() record: Record) {
    return await this.taskService.getFullTaskByRecordId(record.recordId);
  }
}
