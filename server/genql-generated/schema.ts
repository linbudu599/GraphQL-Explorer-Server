import { FieldsSelection, Observable } from '@genql/runtime';

export type Scalars = {
  Boolean: boolean;
  ID: string;
  String: string;
  Int: number;
  Float: number;
  Timestamp: any;
};

export interface Account {
  /** ACCOUNT_JSON_TYPE */
  AccountJSONField: AccountJSON;
  /** 账号资料 */
  AccountProfileField: AccountProfile;
  RecordFieldResolver: Record[];
  accountAvaliable: Scalars['Boolean'];
  accountId: Scalars['ID'];
  accountName: Scalars['String'];
  accountProfile: Scalars['String'];
  accountPwd: Scalars['String'];
  accountRole: AccountRole;
  accountType: AccountType;
  lastUpdateDate: Scalars['Timestamp'];
  registryDate: Scalars['Timestamp'];
  relatedRecord?: Record[];
  __typename: 'Account';
}

export interface AccountJSON {
  _JUST_FOR_TEST_: Scalars['Int'];
  __typename: 'AccountJSON';
}

export interface AccountProfile {
  VIPLevel: AccountVIPLevel;
  avatar: Scalars['String'];
  isLifeTimeVIP: Scalars['Boolean'];
  selfIntro: Scalars['String'];
  __typename: 'AccountProfile';
}

/** Account Role Enum */
export type AccountRole = 'ENTERPRISE' | 'GOV' | 'ORG' | 'PERSONAL' | 'UNKNOWN';

/** Primitive Response Status Indicator */
export interface AccountStatus {
  data?: Account[];
  message: Scalars['String'];
  success: Scalars['Boolean'];
  __typename: 'AccountStatus';
}

/** Account Type Enum */
export type AccountType = 'ADMIN' | 'COMMON' | 'DOMINATOR' | 'VISITOR';

export type AccountUnionResult = (AccountStatus | LoginOrRegisterStatus) & {
  __isUnion?: true;
};

/** Account VIP Level Enum */
export type AccountVIPLevel =
  | 'DIAMOND'
  | 'DOMINATOR'
  | 'GOLD'
  | 'NON_VIP'
  | 'SILVER';

/** For @auth usage only */
export type AuthDirectiveRoleEnum = 'ADMIN' | 'REVIEWER' | 'UNKNOWN' | 'USER';

/** Recipe >>> Cook >>> WorkExperience >> Company */
export interface Company {
  description: Scalars['String'];
  name: Scalars['String'];
  registerDate: Scalars['Timestamp'];
  scale: CompanyScale;
  __typename: 'Company';
}

/** Company Scale */
export type CompanyScale = 'Huge' | 'Middle' | 'Small';

/** Recipe >>> Cook */
export interface Cook {
  WorkExperienceExtraFieldResolver: WorkExperience;
  experience: WorkExperience;
  name: Scalars['String'];
  yearsOfExperience: Scalars['Int'];
  __typename: 'Cook';
}

/** All possible preparation difficulty levels */
export type Difficulty = 'Beginner' | 'Easy' | 'Hard' | 'MasterChef' | 'Medium';

/** Executor Skill & Task Difficulty Level Enum */
export type DifficultyLevel =
  | 'BEGINNER'
  | 'LEGEND'
  | 'MASTER'
  | 'NOVICE'
  | 'OLD_DOMINATOR'
  | 'ROOKIE'
  | 'SKILLED';

export interface Executor {
  /** 获取对象类型的执行者描述 */
  ExecutorDescField: ExecutorDesc;
  ExecutorInnerTaskFieldResolver: Task[];
  age: Scalars['Float'];
  avaliable: Scalars['Boolean'];
  desc: Scalars['String'];
  isFool: Scalars['Boolean'];
  job: Job;
  joinDate: Scalars['Timestamp'];
  lastUpdateDate: Scalars['Timestamp'];
  name: Scalars['String'];
  region: Region;
  relatedRecord?: Record[];
  spAgeField: Scalars['Int'];
  tasks?: Task[];
  uid: Scalars['ID'];
  __typename: 'Executor';
}

export interface ExecutorDesc {
  level: DifficultyLevel;
  satisfaction?: Scalars['Int'];
  successRate?: Scalars['Int'];
  __typename: 'ExecutorDesc';
}

/** Executor Response Status Indicator */
export interface ExecutorStatus {
  data?: Executor[];
  message: Scalars['String'];
  success: Scalars['Boolean'];
  __typename: 'ExecutorStatus';
}

/** Account Interface Type */
export type IAccount = Account & { __isUnion?: true };

/** Account Profile Type */
export type IAccountProfile = AccountProfile & { __isUnion?: true };

/** Basic Status Wrapper */
export type IBaseStatus = (
  | AccountStatus
  | ExecutorStatus
  | LoginOrRegisterStatus
  | RecordStatus
  | SubstanceStatus
  | TaskStatus
) & { __isUnion?: true };

/** Update Executor Basic Info Input */
export type IExecutor = Executor & { __isUnion?: true };

/** Executor Interface Type */
export type IExecutorDesc = ExecutorDesc & { __isUnion?: true };

/** Record Interface Type */
export type IRecord = Record & { __isUnion?: true };

/** Substance Interface Type */
export type ISubstance = Substance & { __isUnion?: true };

/** Task Interface Type */
export type ITask = Task & { __isUnion?: true };

/** Executor Job Enum */
export type Job = 'BE' | 'FE';

export type LevelQueryResult = (Executor | Task) & { __isUnion?: true };

/** Login / Register Status Indicator */
export interface LoginOrRegisterStatus {
  expiredDate?: Scalars['Int'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
  token?: Scalars['String'];
  __typename: 'LoginOrRegisterStatus';
}

export interface Mutation {
  /** 用户永久注销 */
  AccountDestory: LoginOrRegisterStatus;
  /** 提升/下降 用户类型 */
  AccountLevelMutate: AccountUnionResult;
  /** 新用户注册 */
  AccountRegistry: LoginOrRegisterStatus;
  /** 指派任务 */
  AssignTask: TaskStatus;
  /** 将实体关联到任务 */
  CombineSubstanceAndTask: SubstanceStatus;
  /** 添加执行者 */
  CreateExecutor: ExecutorStatus;
  /** 创建任务同时关联到实体 */
  CreateNewTask: TaskStatus;
  /** 新增实体 */
  CreateSubstance: SubstanceStatus;
  /** 删除执行者 */
  DeleteExecutor: ExecutorStatus;
  /** 删除实体 */
  DeleteSubstance: SubstanceStatus;
  /** 删除任务 */
  DeleteTask: TaskStatus;
  /** 冻结账号 */
  FreezeAccount: AccountStatus;
  /** 冻结任务 无法恢复 */
  FreezeTask: TaskStatus;
  /** 修改密码 */
  ModifyPassword: LoginOrRegisterStatus;
  /** 账号详情变更 */
  MutateAccountProfile: AccountStatus;
  /** 变更用户角色 */
  MutateAccountRole: LoginOrRegisterStatus;
  /** 变更任务级别 */
  MutateTaskLevel: TaskStatus;
  /** 发送邮件验证码 */
  SendEmailVerifyCode: LoginOrRegisterStatus;
  /** 发送短信验证码 */
  SendPhoneVerifyCode: LoginOrRegisterStatus;
  /** 变更任务状态 */
  ToggleTaskStatus: TaskStatus;
  /** 更新执行者基本信息 */
  UpdateExecutorBasicInfo: ExecutorStatus;
  /** 更新执行者描述 */
  UpdateExecutorDesc: ExecutorStatus;
  /** 变更实体信息 */
  UpdateSubstanceInfo: SubstanceStatus;
  /** 变更任务基本信息 */
  UpdateTaskInfo: TaskStatus;
  pubSubMutation: Scalars['Boolean'];
  pubSubMutationToDynamicTopic: Scalars['Boolean'];
  publisherMutation: Scalars['Boolean'];
  __typename: 'Mutation';
}

export interface Notification {
  date: Scalars['Timestamp'];
  id: Scalars['ID'];
  message?: Scalars['String'];
  __typename: 'Notification';
}

export interface Query {
  /** 账号登录 */
  AccountLogin: LoginOrRegisterStatus;
  /** 账号详情 */
  CheckAccountDetail: AccountStatus;
  /** 检验token是否合法 */
  CheckIsTokenValid: LoginOrRegisterStatus;
  /** 验证邮件 */
  CheckVerifyCode: LoginOrRegisterStatus;
  /** 容器注册时间 */
  ContainerRegisterTime: Scalars['Timestamp'];
  /** 基于资料查找用户 */
  QueryAccountByProfile: AccountStatus;
  /** 查询所有用户 */
  QueryAllAccounts: AccountStatus;
  /** 获取所有执行者 */
  QueryAllExecutors: ExecutorStatus;
  QueryAllPrismaItems: TodoItem[];
  QueryAllPrismaUsers: User[];
  QueryAllRecords: RecordStatus;
  /** 查找所有实体信息 */
  QueryAllSubstances: SubstanceStatus;
  /** 获取所有任务 */
  QueryAllTasks: TaskStatus;
  /** 基于级别获取所有执行者与任务 */
  QueryByDifficultyLevel: LevelQueryResult[];
  /** 根据基本条件查找执行者 */
  QueryExecutorByConditions: ExecutorStatus;
  /** 根据描述（等级、成功率、评分）查找执行者 */
  QueryExecutorByDesc: ExecutorStatus;
  /** 根据ID查找特定执行者信息 */
  QueryExecutorById: ExecutorStatus;
  /** 查询执行者当前被分配的任务 */
  QueryExecutorTasks: TaskStatus;
  /** 基于条件查找单个实体 */
  QueryOneSubstanceByConditions: SubstanceStatus;
  /** 返回所有菜谱 厨师 和 咸鱼 */
  QueryRecipeUnions: RecipeUnionResult[];
  /** 基于难度查找菜谱 */
  QueryRecipesByDifficulty: Recipe[];
  /** 基于作料查找菜谱 */
  QueryRecipesByIngredients: Recipe[];
  QueryRecordById: RecordStatus;
  /** 根据恩格尔系数查找咸鱼 */
  QuerySaltFishByCoefficient: SaltFish[];
  /** 基于ID查找实体 */
  QuerySubstanceById: SubstanceStatus;
  /** 基于条件查找多个实体 */
  QuerySubstancesByConditions: SubstanceStatus;
  /** 基于条件获取单个任务 */
  QueryTaskByConditions: TaskStatus;
  /** 基于ID获取任务 */
  QueryTaskByID: TaskStatus;
  /** 基于条件获取多个任务 */
  QueryTasksByConditions: TaskStatus;
  /** DataLoader 实际效果演示 */
  Recipes: Recipe[];
  currentDate: Scalars['Timestamp'];
  __typename: 'Query';
}

/** Recipe Type */
export interface Recipe {
  CookExtraFieldResolver: Cook;
  RecipeExtraFieldResolver?: Recipe;
  cook: Cook;
  description?: Scalars['String'];
  ingredients?: Scalars['String'][];
  preparationDifficulty?: Difficulty;
  title: Scalars['String'];
  __typename: 'Recipe';
}

export type RecipeUnionResult = (Cook | Recipe | SaltFish) & {
  __isUnion?: true;
};

export interface Record {
  RecordInnerExecutorFieldResolver: Executor[];
  RecordInnerSubstanceFieldResolver: Substance[];
  RecordInnerTaskFieldResolver: Task[];
  createDate: Scalars['Timestamp'];
  lastUpdateDate: Scalars['Timestamp'];
  recordAccount?: Account;
  recordExecutor?: Executor;
  recordId: Scalars['ID'];
  recordSubstance?: Substance;
  recordTask?: Task;
  __typename: 'Record';
}

/** Record Response Status Indicator */
export interface RecordStatus {
  data?: Record[];
  message: Scalars['String'];
  success: Scalars['Boolean'];
  __typename: 'RecordStatus';
}

/** Executor Region Enum */
export type Region =
  | 'ABANDONED'
  | 'CENTRAL'
  | 'NORTH'
  | 'OTHER'
  | 'PACIFIC_OCEAN'
  | 'SOUTH';

/** useless object type in union type, just for funny:) */
export interface SaltFish {
  EngelCoefficient: Scalars['Int'];
  date: Scalars['Timestamp'];
  fishName: Scalars['String'];
  num?: Scalars['Int'];
  role?: AuthDirectiveRoleEnum;
  str?: Scalars['String'];
  __typename: 'SaltFish';
}

export interface Subscription {
  normalSubscription: Notification;
  subscriptionWithFilter: Notification;
  subscriptionWithFilterToDynamicTopic: Notification;
  __typename: 'Subscription';
}

export interface Substance {
  asylumed: Scalars['Boolean'];
  lastActiveDate: Scalars['Timestamp'];
  relatedRecord?: Record[];
  relatedTask?: Task;
  substanceAlive: Scalars['Boolean'];
  substanceAppearDate: Scalars['Timestamp'];
  substanceDesc: Scalars['String'];
  substanceId: Scalars['ID'];
  substanceIssues: Scalars['String'];
  substanceLevel: DifficultyLevel;
  substanceName: Scalars['String'];
  __typename: 'Substance';
}

/** Substance Response Status Indicator */
export interface SubstanceStatus {
  data?: Substance[];
  message: Scalars['String'];
  success: Scalars['Boolean'];
  __typename: 'SubstanceStatus';
}

export interface Task {
  TaskInnerExecutorFieldResolver: Executor;
  TaskInnerSubstanceFieldResolver: Substance;
  allowAbort: Scalars['Boolean'];
  assignee?: Executor;
  lastUpdateDate: Scalars['Timestamp'];
  publishDate: Scalars['Timestamp'];
  relatedRecord?: Record[];
  requireCleaner: Scalars['Boolean'];
  requirePsychologicalIntervention: Scalars['Boolean'];
  taskAccmplished: Scalars['Boolean'];
  taskAvaliable: Scalars['Boolean'];
  taskContent: Scalars['String'];
  taskId: Scalars['ID'];
  taskLevel: DifficultyLevel;
  taskRate: Scalars['Int'];
  taskReward: Scalars['Int'];
  taskSource: TaskSource;
  taskSubstance?: Substance;
  taskTarget: TaskTarget;
  taskTitle: Scalars['String'];
  __typename: 'Task';
}

/** Task Source */
export type TaskSource = 'GOV' | 'MERCHANT' | 'OTHER' | 'PERSONAL' | 'SCP';

/** Task Response Status Indicator */
export interface TaskStatus {
  data?: Task[];
  message: Scalars['String'];
  success: Scalars['Boolean'];
  __typename: 'TaskStatus';
}

/** Task Against */
export type TaskTarget =
  | 'AI'
  | 'ALIEN'
  | 'CTHULHU'
  | 'HUMAN'
  | 'OTHER'
  | 'SCP_ITEM'
  | 'WITCHER';

export interface TodoItem {
  content?: Scalars['String'];
  createdAt: Scalars['Timestamp'];
  id: Scalars['ID'];
  owner?: User;
  ownerId?: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['Timestamp'];
  __typename: 'TodoItem';
}

export interface User {
  id: Scalars['ID'];
  items?: TodoItem[];
  name: Scalars['String'];
  nickName?: Scalars['String'];
  __typename: 'User';
}

/** Recipe >>> Cook >>> WorkExperience */
export interface WorkExperience {
  CompanyExtraFieldResolver: Company;
  company: Company;
  isFired: Scalars['Boolean'];
  workYears: Scalars['Int'];
  __typename: 'WorkExperience';
}

export interface AccountRequest {
  /** ACCOUNT_JSON_TYPE */
  AccountJSONField?: AccountJSONRequest;
  /** 账号资料 */
  AccountProfileField?: AccountProfileRequest;
  RecordFieldResolver?: RecordRequest;
  accountAvaliable?: boolean | number;
  accountId?: boolean | number;
  accountName?: boolean | number;
  accountProfile?: boolean | number;
  accountPwd?: boolean | number;
  accountRole?: boolean | number;
  accountType?: boolean | number;
  lastUpdateDate?: boolean | number;
  registryDate?: boolean | number;
  relatedRecord?: RecordRequest;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface AccountJSONRequest {
  _JUST_FOR_TEST_?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Login Input Type */
export interface AccountLoginInput {
  accountName: Scalars['String'];
  accountPwd: Scalars['String'];
  accountRole?: AccountRole | null;
  accountType: AccountType;
}

/** Account Password Modify Input Type */
export interface AccountPasswordModifyInput {
  accountId: Scalars['Int'];
  accountName: Scalars['String'];
  newPassword: Scalars['String'];
  prevPassword: Scalars['String'];
}

export interface AccountProfileRequest {
  VIPLevel?: boolean | number;
  avatar?: boolean | number;
  isLifeTimeVIP?: boolean | number;
  selfIntro?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Account Profile Query Input */
export interface AccountProfileQueryInput {
  VIPLevel?: AccountVIPLevel | null;
  avatar?: Scalars['String'] | null;
  isLifeTimeVIP?: Scalars['Boolean'] | null;
  selfIntro?: Scalars['String'] | null;
}

/** Account Profile Update Input */
export interface AccountProfileUpdateInput {
  VIPLevel?: AccountVIPLevel | null;
  avatar?: Scalars['String'] | null;
  isLifeTimeVIP?: Scalars['Boolean'] | null;
  selfIntro?: Scalars['String'] | null;
}

/** Register Input Type */
export interface AccountRegistryInput {
  accountName: Scalars['String'];
  accountPwd: Scalars['String'];
  accountRole?: AccountRole | null;
  accountType?: AccountType | null;
}

/** Account Relations Input Type */
export interface AccountRelationsInput {
  joinRecord?: Scalars['Boolean'] | null;
}

/** Primitive Response Status Indicator */
export interface AccountStatusRequest {
  data?: AccountRequest;
  message?: boolean | number;
  success?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface AccountUnionResultRequest {
  on_AccountStatus?: AccountStatusRequest;
  on_LoginOrRegisterStatus?: LoginOrRegisterStatusRequest;
  on_IBaseStatus?: IBaseStatusRequest;
  __typename?: boolean | number;
}

/** Recipe >>> Cook >>> WorkExperience >> Company */
export interface CompanyRequest {
  description?: boolean | number;
  name?: boolean | number;
  registerDate?: boolean | number;
  scale?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Recipe >>> Cook */
export interface CookRequest {
  WorkExperienceExtraFieldResolver?: [
    { year: Scalars['Float'] },
    WorkExperienceRequest
  ];
  experience?: WorkExperienceRequest;
  name?: boolean | number;
  yearsOfExperience?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface ExecutorRequest {
  /** 获取对象类型的执行者描述 */
  ExecutorDescField?: ExecutorDescRequest;
  ExecutorInnerTaskFieldResolver?: TaskRequest;
  age?: boolean | number;
  avaliable?: boolean | number;
  desc?: boolean | number;
  isFool?: boolean | number;
  job?: boolean | number;
  joinDate?: boolean | number;
  lastUpdateDate?: boolean | number;
  name?: boolean | number;
  region?: boolean | number;
  relatedRecord?: RecordRequest;
  spAgeField?: [{ param?: Scalars['Float'] | null }] | boolean | number;
  tasks?: TaskRequest;
  uid?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Executor Create Input */
export interface ExecutorCreateInput {
  age?: Scalars['Int'] | null;
  avaliable?: Scalars['Boolean'] | null;
  isFool?: Scalars['Boolean'] | null;
  job?: Job | null;
  name: Scalars['String'];
  region?: Region | null;
}

export interface ExecutorDescRequest {
  level?: boolean | number;
  satisfaction?: boolean | number;
  successRate?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Update Executor Desc Input */
export interface ExecutorDescUpdateInput {
  level?: DifficultyLevel | null;
  satisfaction?: Scalars['Int'] | null;
  successRate?: Scalars['Int'] | null;
}

/** Executor Relations Input */
export interface ExecutorRelationsInput {
  joinRecord?: Scalars['Boolean'] | null;
  joinSubstance?: Scalars['Boolean'] | null;
  joinTasks?: Scalars['Boolean'] | null;
}

/** Executor Response Status Indicator */
export interface ExecutorStatusRequest {
  data?: ExecutorRequest;
  message?: boolean | number;
  success?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Executor Update Input */
export interface ExecutorUpdateInput {
  age?: Scalars['Int'] | null;
  avaliable?: Scalars['Boolean'] | null;
  isFool?: Scalars['Boolean'] | null;
  job?: Job | null;
  name?: Scalars['String'] | null;
  region?: Region | null;
  uid: Scalars['Float'];
}

/** Account Interface Type */
export interface IAccountRequest {
  accountAvaliable?: boolean | number;
  accountId?: boolean | number;
  accountName?: boolean | number;
  accountProfile?: boolean | number;
  accountPwd?: boolean | number;
  accountRole?: boolean | number;
  accountType?: boolean | number;
  lastUpdateDate?: boolean | number;
  registryDate?: boolean | number;
  relatedRecord?: RecordRequest;
  on_Account?: AccountRequest;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Account Profile Type */
export interface IAccountProfileRequest {
  VIPLevel?: boolean | number;
  avatar?: boolean | number;
  isLifeTimeVIP?: boolean | number;
  selfIntro?: boolean | number;
  on_AccountProfile?: AccountProfileRequest;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Basic Status Wrapper */
export interface IBaseStatusRequest {
  message?: boolean | number;
  success?: boolean | number;
  on_AccountStatus?: AccountStatusRequest;
  on_ExecutorStatus?: ExecutorStatusRequest;
  on_LoginOrRegisterStatus?: LoginOrRegisterStatusRequest;
  on_RecordStatus?: RecordStatusRequest;
  on_SubstanceStatus?: SubstanceStatusRequest;
  on_TaskStatus?: TaskStatusRequest;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Update Executor Basic Info Input */
export interface IExecutorRequest {
  age?: boolean | number;
  avaliable?: boolean | number;
  desc?: boolean | number;
  isFool?: boolean | number;
  job?: boolean | number;
  joinDate?: boolean | number;
  lastUpdateDate?: boolean | number;
  name?: boolean | number;
  region?: boolean | number;
  relatedRecord?: RecordRequest;
  spAgeField?: boolean | number;
  tasks?: TaskRequest;
  uid?: boolean | number;
  on_Executor?: ExecutorRequest;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Executor Interface Type */
export interface IExecutorDescRequest {
  level?: boolean | number;
  satisfaction?: boolean | number;
  successRate?: boolean | number;
  on_ExecutorDesc?: ExecutorDescRequest;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Record Interface Type */
export interface IRecordRequest {
  createDate?: boolean | number;
  lastUpdateDate?: boolean | number;
  recordAccount?: AccountRequest;
  recordExecutor?: ExecutorRequest;
  recordId?: boolean | number;
  recordSubstance?: SubstanceRequest;
  recordTask?: TaskRequest;
  on_Record?: RecordRequest;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Substance Interface Type */
export interface ISubstanceRequest {
  asylumed?: boolean | number;
  lastActiveDate?: boolean | number;
  relatedRecord?: RecordRequest;
  relatedTask?: TaskRequest;
  substanceAlive?: boolean | number;
  substanceAppearDate?: boolean | number;
  substanceDesc?: boolean | number;
  substanceId?: boolean | number;
  substanceIssues?: boolean | number;
  substanceLevel?: boolean | number;
  substanceName?: boolean | number;
  on_Substance?: SubstanceRequest;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Task Interface Type */
export interface ITaskRequest {
  allowAbort?: boolean | number;
  assignee?: ExecutorRequest;
  lastUpdateDate?: boolean | number;
  publishDate?: boolean | number;
  relatedRecord?: RecordRequest;
  requireCleaner?: boolean | number;
  requirePsychologicalIntervention?: boolean | number;
  taskAccmplished?: boolean | number;
  taskAvaliable?: boolean | number;
  taskContent?: boolean | number;
  taskId?: boolean | number;
  taskLevel?: boolean | number;
  taskRate?: boolean | number;
  taskReward?: boolean | number;
  taskSource?: boolean | number;
  taskSubstance?: SubstanceRequest;
  taskTarget?: boolean | number;
  taskTitle?: boolean | number;
  on_Task?: TaskRequest;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface LevelQueryResultRequest {
  on_Executor?: ExecutorRequest;
  on_Task?: TaskRequest;
  on_IExecutor?: IExecutorRequest;
  on_ITask?: ITaskRequest;
  __typename?: boolean | number;
}

/** Login / Register Status Indicator */
export interface LoginOrRegisterStatusRequest {
  expiredDate?: boolean | number;
  message?: boolean | number;
  success?: boolean | number;
  token?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface MutationRequest {
  /** 用户永久注销 */
  AccountDestory?: [
    { accountName: Scalars['String']; accountPwd: Scalars['String'] },
    LoginOrRegisterStatusRequest
  ];
  /** 提升/下降 用户类型 */
  AccountLevelMutate?: [
    { accountId: Scalars['Int']; type: AccountType },
    AccountUnionResultRequest
  ];
  /** 新用户注册 */
  AccountRegistry?: [
    { account: AccountRegistryInput },
    LoginOrRegisterStatusRequest
  ];
  /** 指派任务 */
  AssignTask?: [
    { taskId: Scalars['Float']; uid: Scalars['Float'] },
    TaskStatusRequest
  ];
  /** 将实体关联到任务 */
  CombineSubstanceAndTask?: [
    { substanceId: Scalars['Int']; taskId: Scalars['Int'] },
    SubstanceStatusRequest
  ];
  /** 添加执行者 */
  CreateExecutor?: [
    { newExecutorInfo: ExecutorCreateInput },
    ExecutorStatusRequest
  ];
  /** 创建任务同时关联到实体 */
  CreateNewTask?: [{ taskCreateParam: TaskCreateInput }, TaskStatusRequest];
  /** 新增实体 */
  CreateSubstance?: [
    { substanceCreateParam: SubstanceCreateInput },
    SubstanceStatusRequest
  ];
  /** 删除执行者 */
  DeleteExecutor?: [{ uid: Scalars['Int'] }, ExecutorStatusRequest];
  /** 删除实体 */
  DeleteSubstance?: [{ substanceId: Scalars['Int'] }, SubstanceStatusRequest];
  /** 删除任务 */
  DeleteTask?: [{ taskId: Scalars['Float'] }, TaskStatusRequest];
  /** 冻结账号 */
  FreezeAccount?: [{ accountId: Scalars['Int'] }, AccountStatusRequest];
  /** 冻结任务 无法恢复 */
  FreezeTask?: [{ taskId: Scalars['Float'] }, TaskStatusRequest];
  /** 修改密码 */
  ModifyPassword?: [
    { accountInfo: AccountPasswordModifyInput },
    LoginOrRegisterStatusRequest
  ];
  /** 账号详情变更 */
  MutateAccountProfile?: [
    {
      accountId: Scalars['Int'];
      modifiedAccountProfile: AccountProfileUpdateInput;
    },
    AccountStatusRequest
  ];
  /** 变更用户角色 */
  MutateAccountRole?: LoginOrRegisterStatusRequest;
  /** 变更任务级别 */
  MutateTaskLevel?: [
    { level: DifficultyLevel; taskId: Scalars['Float'] },
    TaskStatusRequest
  ];
  /** 发送邮件验证码 */
  SendEmailVerifyCode?: LoginOrRegisterStatusRequest;
  /** 发送短信验证码 */
  SendPhoneVerifyCode?: LoginOrRegisterStatusRequest;
  /** 变更任务状态 */
  ToggleTaskStatus?: [{ taskId: Scalars['Float'] }, TaskStatusRequest];
  /** 更新执行者基本信息 */
  UpdateExecutorBasicInfo?: [
    { modifiedExecutorInfo: ExecutorUpdateInput },
    ExecutorStatusRequest
  ];
  /** 更新执行者描述 */
  UpdateExecutorDesc?: [
    { uid: Scalars['Int']; userDesc: ExecutorDescUpdateInput },
    ExecutorStatusRequest
  ];
  /** 变更实体信息 */
  UpdateSubstanceInfo?: [
    { substanceUpdateParam: SubstanceUpdateInput },
    SubstanceStatusRequest
  ];
  /** 变更任务基本信息 */
  UpdateTaskInfo?: [{ taskUpdateParam: TaskUpdateInput }, TaskStatusRequest];
  pubSubMutation?: [{ message?: Scalars['String'] | null }] | boolean | number;
  pubSubMutationToDynamicTopic?: [
    { message?: Scalars['String'] | null; topic: Scalars['String'] }
  ];
  publisherMutation?:
    | [{ message?: Scalars['String'] | null }]
    | boolean
    | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface NotificationRequest {
  date?: boolean | number;
  id?: boolean | number;
  message?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Pagination Options Input */
export interface PaginationOptions {
  offset?: Scalars['Int'] | null;
  take?: Scalars['Int'] | null;
}

export interface QueryRequest {
  /** 账号登录 */
  AccountLogin?: [{ account: AccountLoginInput }, LoginOrRegisterStatusRequest];
  /** 账号详情 */
  CheckAccountDetail?: [
    { accountId: Scalars['Int']; relations?: AccountRelationsInput | null },
    AccountStatusRequest
  ];
  /** 检验token是否合法 */
  CheckIsTokenValid?: [
    { token: Scalars['String'] },
    LoginOrRegisterStatusRequest
  ];
  /** 验证邮件 */
  CheckVerifyCode?: LoginOrRegisterStatusRequest;
  /** 容器注册时间 */
  ContainerRegisterTime?: boolean | number;
  /** 基于资料查找用户 */
  QueryAccountByProfile?:
    | [
        {
          pagination?: PaginationOptions | null;
          profileQueryParams?: AccountProfileQueryInput | null;
          relations?: AccountRelationsInput | null;
        },
        AccountStatusRequest
      ]
    | AccountStatusRequest;
  /** 查询所有用户 */
  QueryAllAccounts?:
    | [
        {
          pagination?: PaginationOptions | null;
          relations?: AccountRelationsInput | null;
        },
        AccountStatusRequest
      ]
    | AccountStatusRequest;
  /** 获取所有执行者 */
  QueryAllExecutors?:
    | [
        {
          pagination?: PaginationOptions | null;
          relations?: ExecutorRelationsInput | null;
        },
        ExecutorStatusRequest
      ]
    | ExecutorStatusRequest;
  QueryAllPrismaItems?: TodoItemRequest;
  QueryAllPrismaUsers?: UserRequest;
  QueryAllRecords?:
    | [{ relations?: RecordRelationsInput | null }, RecordStatusRequest]
    | RecordStatusRequest;
  /** 查找所有实体信息 */
  QueryAllSubstances?:
    | [
        {
          pagination?: PaginationOptions | null;
          relations?: SubstanceRelationsInput | null;
        },
        SubstanceStatusRequest
      ]
    | SubstanceStatusRequest;
  /** 获取所有任务 */
  QueryAllTasks?:
    | [
        {
          pagination?: PaginationOptions | null;
          relations?: TaskRelationsInput | null;
        },
        TaskStatusRequest
      ]
    | TaskStatusRequest;
  /** 基于级别获取所有执行者与任务 */
  QueryByDifficultyLevel?:
    | [
        {
          difficulty?: DifficultyLevel | null;
          pagination?: PaginationOptions | null;
        },
        LevelQueryResultRequest
      ]
    | LevelQueryResultRequest;
  /** 根据基本条件查找执行者 */
  QueryExecutorByConditions?:
    | [
        {
          age?: Scalars['Int'] | null;
          avaliable?: Scalars['Boolean'] | null;
          isFool?: Scalars['Boolean'] | null;
          job?: Job | null;
          name?: Scalars['String'] | null;
          region?: Region | null;
          relations?: ExecutorRelationsInput | null;
        },
        ExecutorStatusRequest
      ]
    | ExecutorStatusRequest;
  /** 根据描述（等级、成功率、评分）查找执行者 */
  QueryExecutorByDesc?:
    | [
        {
          level?: DifficultyLevel | null;
          pagination?: PaginationOptions | null;
          relations?: ExecutorRelationsInput | null;
          satisfaction?: Scalars['Int'] | null;
          successRate?: Scalars['Int'] | null;
        },
        ExecutorStatusRequest
      ]
    | ExecutorStatusRequest;
  /** 根据ID查找特定执行者信息 */
  QueryExecutorById?: [
    { relations?: ExecutorRelationsInput | null; uid: Scalars['Int'] },
    ExecutorStatusRequest
  ];
  /** 查询执行者当前被分配的任务 */
  QueryExecutorTasks?: [
    {
      pagination?: PaginationOptions | null;
      relations?: TaskRelationsInput | null;
      uid: Scalars['Float'];
    },
    TaskStatusRequest
  ];
  /** 基于条件查找单个实体 */
  QueryOneSubstanceByConditions?: [
    {
      relations?: SubstanceRelationsInput | null;
      substanceQueryParam: SubstanceQueryInput;
    },
    SubstanceStatusRequest
  ];
  /** 返回所有菜谱 厨师 和 咸鱼 */
  QueryRecipeUnions?: RecipeUnionResultRequest;
  /** 基于难度查找菜谱 */
  QueryRecipesByDifficulty?:
    | [{ difficulty?: Difficulty | null }, RecipeRequest]
    | RecipeRequest;
  /** 基于作料查找菜谱 */
  QueryRecipesByIngredients?:
    | [{ ingredients?: Scalars['String'][] | null }, RecipeRequest]
    | RecipeRequest;
  QueryRecordById?: [
    { recordId: Scalars['Int']; relations?: RecordRelationsInput | null },
    RecordStatusRequest
  ];
  /** 根据恩格尔系数查找咸鱼 */
  QuerySaltFishByCoefficient?:
    | [{ coefficient?: Scalars['Int'] | null }, SaltFishRequest]
    | SaltFishRequest;
  /** 基于ID查找实体 */
  QuerySubstanceById?: [
    { relations?: SubstanceRelationsInput | null; substanceId: Scalars['Int'] },
    SubstanceStatusRequest
  ];
  /** 基于条件查找多个实体 */
  QuerySubstancesByConditions?: [
    {
      pagination?: PaginationOptions | null;
      relations?: SubstanceRelationsInput | null;
      substanceQueryParam: SubstanceQueryInput;
    },
    SubstanceStatusRequest
  ];
  /** 基于条件获取单个任务 */
  QueryTaskByConditions?: [
    { relations?: TaskRelationsInput | null; taskQueryParams: TaskQueryInput },
    TaskStatusRequest
  ];
  /** 基于ID获取任务 */
  QueryTaskByID?: [
    { relations?: TaskRelationsInput | null; taskId: Scalars['Float'] },
    TaskStatusRequest
  ];
  /** 基于条件获取多个任务 */
  QueryTasksByConditions?: [
    {
      pagination?: PaginationOptions | null;
      relations?: TaskRelationsInput | null;
      taskQueryParams: TaskQueryInput;
    },
    TaskStatusRequest
  ];
  /** DataLoader 实际效果演示 */
  Recipes?: RecipeRequest;
  currentDate?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Recipe Type */
export interface RecipeRequest {
  CookExtraFieldResolver?: [{ name: Scalars['String'] }, CookRequest];
  RecipeExtraFieldResolver?: [{ title: Scalars['String'] }, RecipeRequest];
  cook?: CookRequest;
  description?: boolean | number;
  ingredients?: boolean | number;
  preparationDifficulty?: boolean | number;
  title?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface RecipeUnionResultRequest {
  on_Cook?: CookRequest;
  on_Recipe?: RecipeRequest;
  on_SaltFish?: SaltFishRequest;
  __typename?: boolean | number;
}

export interface RecordRequest {
  RecordInnerExecutorFieldResolver?: ExecutorRequest;
  RecordInnerSubstanceFieldResolver?: SubstanceRequest;
  RecordInnerTaskFieldResolver?: TaskRequest;
  createDate?: boolean | number;
  lastUpdateDate?: boolean | number;
  recordAccount?: AccountRequest;
  recordExecutor?: ExecutorRequest;
  recordId?: boolean | number;
  recordSubstance?: SubstanceRequest;
  recordTask?: TaskRequest;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Record Relations Input */
export interface RecordRelationsInput {
  joinAccount?: Scalars['Boolean'] | null;
  joinExecutor?: Scalars['Boolean'] | null;
  joinSubstance?: Scalars['Boolean'] | null;
  joinTask?: Scalars['Boolean'] | null;
}

/** Record Response Status Indicator */
export interface RecordStatusRequest {
  data?: RecordRequest;
  message?: boolean | number;
  success?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** useless object type in union type, just for funny:) */
export interface SaltFishRequest {
  EngelCoefficient?: boolean | number;
  date?: boolean | number;
  fishName?: boolean | number;
  num?: boolean | number;
  role?: boolean | number;
  str?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SubscriptionRequest {
  normalSubscription?: NotificationRequest;
  subscriptionWithFilter?: NotificationRequest;
  subscriptionWithFilterToDynamicTopic?: [
    { topic: Scalars['String'] },
    NotificationRequest
  ];
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface SubstanceRequest {
  asylumed?: boolean | number;
  lastActiveDate?: boolean | number;
  relatedRecord?: RecordRequest;
  relatedTask?: TaskRequest;
  substanceAlive?: boolean | number;
  substanceAppearDate?: boolean | number;
  substanceDesc?: boolean | number;
  substanceId?: boolean | number;
  substanceIssues?: boolean | number;
  substanceLevel?: boolean | number;
  substanceName?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Substance Create Input */
export interface SubstanceCreateInput {
  asylumed?: Scalars['Boolean'] | null;
  substanceAlive?: Scalars['Boolean'] | null;
  substanceIssues?: Scalars['String'] | null;
  substanceLevel?: DifficultyLevel | null;
  substanceName: Scalars['String'];
}

/** Substance Create Input */
export interface SubstanceQueryInput {
  asylumed?: Scalars['Boolean'] | null;
  substanceAlive?: Scalars['Boolean'] | null;
  substanceIssues?: Scalars['String'] | null;
  substanceLevel?: DifficultyLevel | null;
  substanceName?: Scalars['String'] | null;
}

/** Substance Relations Input */
export interface SubstanceRelationsInput {
  joinAssignee?: Scalars['Boolean'] | null;
  joinRecord?: Scalars['Boolean'] | null;
  joinTask?: Scalars['Boolean'] | null;
}

/** Substance Response Status Indicator */
export interface SubstanceStatusRequest {
  data?: SubstanceRequest;
  message?: boolean | number;
  success?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Substance Update Input */
export interface SubstanceUpdateInput {
  asylumed?: Scalars['Boolean'] | null;
  substanceAlive?: Scalars['Boolean'] | null;
  substanceId: Scalars['Int'];
  substanceIssues?: Scalars['String'] | null;
  substanceLevel?: DifficultyLevel | null;
  substanceName?: Scalars['String'] | null;
}

export interface TaskRequest {
  TaskInnerExecutorFieldResolver?: ExecutorRequest;
  TaskInnerSubstanceFieldResolver?: SubstanceRequest;
  allowAbort?: boolean | number;
  assignee?: ExecutorRequest;
  lastUpdateDate?: boolean | number;
  publishDate?: boolean | number;
  relatedRecord?: RecordRequest;
  requireCleaner?: boolean | number;
  requirePsychologicalIntervention?: boolean | number;
  taskAccmplished?: boolean | number;
  taskAvaliable?: boolean | number;
  taskContent?: boolean | number;
  taskId?: boolean | number;
  taskLevel?: boolean | number;
  taskRate?: boolean | number;
  taskReward?: boolean | number;
  taskSource?: boolean | number;
  taskSubstance?: SubstanceRequest;
  taskTarget?: boolean | number;
  taskTitle?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Task Create Input */
export interface TaskCreateInput {
  allowAbort?: Scalars['Boolean'] | null;
  requireCleaner?: Scalars['Boolean'] | null;
  requirePsychologicalIntervention?: Scalars['Boolean'] | null;
  substanceId: Scalars['ID'];
  taskAvaliable?: Scalars['Boolean'] | null;
  taskContent?: Scalars['String'] | null;
  taskLevel?: DifficultyLevel | null;
  taskRate?: Scalars['Int'] | null;
  taskReward?: Scalars['Int'] | null;
  taskSource?: TaskSource | null;
  taskTarget?: TaskTarget | null;
  taskTitle: Scalars['String'];
}

/** Task Query Input */
export interface TaskQueryInput {
  allowAbort?: Scalars['Boolean'] | null;
  requireCleaner?: Scalars['Boolean'] | null;
  requirePsychologicalIntervention?: Scalars['Boolean'] | null;
  taskAvaliable?: Scalars['Boolean'] | null;
  taskContent?: Scalars['String'] | null;
  taskLevel?: DifficultyLevel | null;
  taskRate?: Scalars['Int'] | null;
  taskReward?: Scalars['Int'] | null;
  taskSource?: TaskSource | null;
  taskTarget?: TaskTarget | null;
  taskTitle?: Scalars['String'] | null;
}

/** Task Relations Input */
export interface TaskRelationsInput {
  joinAssignee?: Scalars['Boolean'] | null;
  joinRecord?: Scalars['Boolean'] | null;
  joinSubstance?: Scalars['Boolean'] | null;
}

/** Task Response Status Indicator */
export interface TaskStatusRequest {
  data?: TaskRequest;
  message?: boolean | number;
  success?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Task Update Input */
export interface TaskUpdateInput {
  allowAbort?: Scalars['Boolean'] | null;
  requireCleaner?: Scalars['Boolean'] | null;
  requirePsychologicalIntervention?: Scalars['Boolean'] | null;
  taskAvaliable?: Scalars['Boolean'] | null;
  taskContent?: Scalars['String'] | null;
  taskId: Scalars['Int'];
  taskLevel?: DifficultyLevel | null;
  taskRate?: Scalars['Int'] | null;
  taskReward?: Scalars['Int'] | null;
  taskSource?: TaskSource | null;
  taskTarget?: TaskTarget | null;
  taskTitle?: Scalars['String'] | null;
}

export interface TodoItemRequest {
  content?: boolean | number;
  createdAt?: boolean | number;
  id?: boolean | number;
  owner?: UserRequest;
  ownerId?: boolean | number;
  title?: boolean | number;
  updatedAt?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

export interface UserRequest {
  id?: boolean | number;
  items?: TodoItemRequest;
  name?: boolean | number;
  nickName?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

/** Recipe >>> Cook >>> WorkExperience */
export interface WorkExperienceRequest {
  CompanyExtraFieldResolver?: [{ name: Scalars['String'] }, CompanyRequest];
  company?: CompanyRequest;
  isFired?: boolean | number;
  workYears?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

const Account_possibleTypes = ['Account'];
export const isAccount = (
  obj?: { __typename?: any } | null
): obj is Account => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAccount"');
  return Account_possibleTypes.includes(obj.__typename);
};

const AccountJSON_possibleTypes = ['AccountJSON'];
export const isAccountJSON = (
  obj?: { __typename?: any } | null
): obj is AccountJSON => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isAccountJSON"');
  return AccountJSON_possibleTypes.includes(obj.__typename);
};

const AccountProfile_possibleTypes = ['AccountProfile'];
export const isAccountProfile = (
  obj?: { __typename?: any } | null
): obj is AccountProfile => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isAccountProfile"');
  return AccountProfile_possibleTypes.includes(obj.__typename);
};

const AccountStatus_possibleTypes = ['AccountStatus'];
export const isAccountStatus = (
  obj?: { __typename?: any } | null
): obj is AccountStatus => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isAccountStatus"');
  return AccountStatus_possibleTypes.includes(obj.__typename);
};

const AccountUnionResult_possibleTypes = [
  'AccountStatus',
  'LoginOrRegisterStatus',
];
export const isAccountUnionResult = (
  obj?: { __typename?: any } | null
): obj is AccountUnionResult => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isAccountUnionResult"');
  return AccountUnionResult_possibleTypes.includes(obj.__typename);
};

const Company_possibleTypes = ['Company'];
export const isCompany = (
  obj?: { __typename?: any } | null
): obj is Company => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCompany"');
  return Company_possibleTypes.includes(obj.__typename);
};

const Cook_possibleTypes = ['Cook'];
export const isCook = (obj?: { __typename?: any } | null): obj is Cook => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCook"');
  return Cook_possibleTypes.includes(obj.__typename);
};

const Executor_possibleTypes = ['Executor'];
export const isExecutor = (
  obj?: { __typename?: any } | null
): obj is Executor => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isExecutor"');
  return Executor_possibleTypes.includes(obj.__typename);
};

const ExecutorDesc_possibleTypes = ['ExecutorDesc'];
export const isExecutorDesc = (
  obj?: { __typename?: any } | null
): obj is ExecutorDesc => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isExecutorDesc"');
  return ExecutorDesc_possibleTypes.includes(obj.__typename);
};

const ExecutorStatus_possibleTypes = ['ExecutorStatus'];
export const isExecutorStatus = (
  obj?: { __typename?: any } | null
): obj is ExecutorStatus => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isExecutorStatus"');
  return ExecutorStatus_possibleTypes.includes(obj.__typename);
};

const IAccount_possibleTypes = ['Account'];
export const isIAccount = (
  obj?: { __typename?: any } | null
): obj is IAccount => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isIAccount"');
  return IAccount_possibleTypes.includes(obj.__typename);
};

const IAccountProfile_possibleTypes = ['AccountProfile'];
export const isIAccountProfile = (
  obj?: { __typename?: any } | null
): obj is IAccountProfile => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isIAccountProfile"');
  return IAccountProfile_possibleTypes.includes(obj.__typename);
};

const IBaseStatus_possibleTypes = [
  'AccountStatus',
  'ExecutorStatus',
  'LoginOrRegisterStatus',
  'RecordStatus',
  'SubstanceStatus',
  'TaskStatus',
];
export const isIBaseStatus = (
  obj?: { __typename?: any } | null
): obj is IBaseStatus => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isIBaseStatus"');
  return IBaseStatus_possibleTypes.includes(obj.__typename);
};

const IExecutor_possibleTypes = ['Executor'];
export const isIExecutor = (
  obj?: { __typename?: any } | null
): obj is IExecutor => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isIExecutor"');
  return IExecutor_possibleTypes.includes(obj.__typename);
};

const IExecutorDesc_possibleTypes = ['ExecutorDesc'];
export const isIExecutorDesc = (
  obj?: { __typename?: any } | null
): obj is IExecutorDesc => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isIExecutorDesc"');
  return IExecutorDesc_possibleTypes.includes(obj.__typename);
};

const IRecord_possibleTypes = ['Record'];
export const isIRecord = (
  obj?: { __typename?: any } | null
): obj is IRecord => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isIRecord"');
  return IRecord_possibleTypes.includes(obj.__typename);
};

const ISubstance_possibleTypes = ['Substance'];
export const isISubstance = (
  obj?: { __typename?: any } | null
): obj is ISubstance => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isISubstance"');
  return ISubstance_possibleTypes.includes(obj.__typename);
};

const ITask_possibleTypes = ['Task'];
export const isITask = (obj?: { __typename?: any } | null): obj is ITask => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isITask"');
  return ITask_possibleTypes.includes(obj.__typename);
};

const LevelQueryResult_possibleTypes = ['Executor', 'Task'];
export const isLevelQueryResult = (
  obj?: { __typename?: any } | null
): obj is LevelQueryResult => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isLevelQueryResult"');
  return LevelQueryResult_possibleTypes.includes(obj.__typename);
};

const LoginOrRegisterStatus_possibleTypes = ['LoginOrRegisterStatus'];
export const isLoginOrRegisterStatus = (
  obj?: { __typename?: any } | null
): obj is LoginOrRegisterStatus => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isLoginOrRegisterStatus"');
  return LoginOrRegisterStatus_possibleTypes.includes(obj.__typename);
};

const Mutation_possibleTypes = ['Mutation'];
export const isMutation = (
  obj?: { __typename?: any } | null
): obj is Mutation => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isMutation"');
  return Mutation_possibleTypes.includes(obj.__typename);
};

const Notification_possibleTypes = ['Notification'];
export const isNotification = (
  obj?: { __typename?: any } | null
): obj is Notification => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isNotification"');
  return Notification_possibleTypes.includes(obj.__typename);
};

const Query_possibleTypes = ['Query'];
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"');
  return Query_possibleTypes.includes(obj.__typename);
};

const Recipe_possibleTypes = ['Recipe'];
export const isRecipe = (obj?: { __typename?: any } | null): obj is Recipe => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRecipe"');
  return Recipe_possibleTypes.includes(obj.__typename);
};

const RecipeUnionResult_possibleTypes = ['Cook', 'Recipe', 'SaltFish'];
export const isRecipeUnionResult = (
  obj?: { __typename?: any } | null
): obj is RecipeUnionResult => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isRecipeUnionResult"');
  return RecipeUnionResult_possibleTypes.includes(obj.__typename);
};

const Record_possibleTypes = ['Record'];
export const isRecord = (obj?: { __typename?: any } | null): obj is Record => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRecord"');
  return Record_possibleTypes.includes(obj.__typename);
};

const RecordStatus_possibleTypes = ['RecordStatus'];
export const isRecordStatus = (
  obj?: { __typename?: any } | null
): obj is RecordStatus => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isRecordStatus"');
  return RecordStatus_possibleTypes.includes(obj.__typename);
};

const SaltFish_possibleTypes = ['SaltFish'];
export const isSaltFish = (
  obj?: { __typename?: any } | null
): obj is SaltFish => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isSaltFish"');
  return SaltFish_possibleTypes.includes(obj.__typename);
};

const Subscription_possibleTypes = ['Subscription'];
export const isSubscription = (
  obj?: { __typename?: any } | null
): obj is Subscription => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isSubscription"');
  return Subscription_possibleTypes.includes(obj.__typename);
};

const Substance_possibleTypes = ['Substance'];
export const isSubstance = (
  obj?: { __typename?: any } | null
): obj is Substance => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isSubstance"');
  return Substance_possibleTypes.includes(obj.__typename);
};

const SubstanceStatus_possibleTypes = ['SubstanceStatus'];
export const isSubstanceStatus = (
  obj?: { __typename?: any } | null
): obj is SubstanceStatus => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isSubstanceStatus"');
  return SubstanceStatus_possibleTypes.includes(obj.__typename);
};

const Task_possibleTypes = ['Task'];
export const isTask = (obj?: { __typename?: any } | null): obj is Task => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTask"');
  return Task_possibleTypes.includes(obj.__typename);
};

const TaskStatus_possibleTypes = ['TaskStatus'];
export const isTaskStatus = (
  obj?: { __typename?: any } | null
): obj is TaskStatus => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isTaskStatus"');
  return TaskStatus_possibleTypes.includes(obj.__typename);
};

const TodoItem_possibleTypes = ['TodoItem'];
export const isTodoItem = (
  obj?: { __typename?: any } | null
): obj is TodoItem => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isTodoItem"');
  return TodoItem_possibleTypes.includes(obj.__typename);
};

const User_possibleTypes = ['User'];
export const isUser = (obj?: { __typename?: any } | null): obj is User => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUser"');
  return User_possibleTypes.includes(obj.__typename);
};

const WorkExperience_possibleTypes = ['WorkExperience'];
export const isWorkExperience = (
  obj?: { __typename?: any } | null
): obj is WorkExperience => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isWorkExperience"');
  return WorkExperience_possibleTypes.includes(obj.__typename);
};

export interface AccountPromiseChain {
  /** ACCOUNT_JSON_TYPE */
  AccountJSONField: AccountJSONPromiseChain & {
    get: <R extends AccountJSONRequest>(
      request: R,
      defaultValue?: FieldsSelection<AccountJSON, R>
    ) => Promise<FieldsSelection<AccountJSON, R>>;
  };

  /** 账号资料 */
  AccountProfileField: AccountProfilePromiseChain & {
    get: <R extends AccountProfileRequest>(
      request: R,
      defaultValue?: FieldsSelection<AccountProfile, R>
    ) => Promise<FieldsSelection<AccountProfile, R>>;
  };
  RecordFieldResolver: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[]
    ) => Promise<FieldsSelection<Record, R>[]>;
  };
  accountAvaliable: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  accountId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Promise<Scalars['ID']>;
  };
  accountName: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  accountProfile: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  accountPwd: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  accountRole: {
    get: (
      request?: boolean | number,
      defaultValue?: AccountRole
    ) => Promise<AccountRole>;
  };
  accountType: {
    get: (
      request?: boolean | number,
      defaultValue?: AccountType
    ) => Promise<AccountType>;
  };
  lastUpdateDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  registryDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  relatedRecord: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Promise<FieldsSelection<Record, R>[] | undefined>;
  };
}

export interface AccountObservableChain {
  /** ACCOUNT_JSON_TYPE */
  AccountJSONField: AccountJSONObservableChain & {
    get: <R extends AccountJSONRequest>(
      request: R,
      defaultValue?: FieldsSelection<AccountJSON, R>
    ) => Observable<FieldsSelection<AccountJSON, R>>;
  };

  /** 账号资料 */
  AccountProfileField: AccountProfileObservableChain & {
    get: <R extends AccountProfileRequest>(
      request: R,
      defaultValue?: FieldsSelection<AccountProfile, R>
    ) => Observable<FieldsSelection<AccountProfile, R>>;
  };
  RecordFieldResolver: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[]
    ) => Observable<FieldsSelection<Record, R>[]>;
  };
  accountAvaliable: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  accountId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Observable<Scalars['ID']>;
  };
  accountName: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  accountProfile: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  accountPwd: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  accountRole: {
    get: (
      request?: boolean | number,
      defaultValue?: AccountRole
    ) => Observable<AccountRole>;
  };
  accountType: {
    get: (
      request?: boolean | number,
      defaultValue?: AccountType
    ) => Observable<AccountType>;
  };
  lastUpdateDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  registryDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  relatedRecord: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Observable<FieldsSelection<Record, R>[] | undefined>;
  };
}

export interface AccountJSONPromiseChain {
  _JUST_FOR_TEST_: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Promise<Scalars['Int']>;
  };
}

export interface AccountJSONObservableChain {
  _JUST_FOR_TEST_: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Observable<Scalars['Int']>;
  };
}

export interface AccountProfilePromiseChain {
  VIPLevel: {
    get: (
      request?: boolean | number,
      defaultValue?: AccountVIPLevel
    ) => Promise<AccountVIPLevel>;
  };
  avatar: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  isLifeTimeVIP: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  selfIntro: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
}

export interface AccountProfileObservableChain {
  VIPLevel: {
    get: (
      request?: boolean | number,
      defaultValue?: AccountVIPLevel
    ) => Observable<AccountVIPLevel>;
  };
  avatar: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  isLifeTimeVIP: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  selfIntro: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
}

/** Primitive Response Status Indicator */
export interface AccountStatusPromiseChain {
  data: {
    get: <R extends AccountRequest>(
      request: R,
      defaultValue?: FieldsSelection<Account, R>[] | undefined
    ) => Promise<FieldsSelection<Account, R>[] | undefined>;
  };
  message: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  success: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
}

/** Primitive Response Status Indicator */
export interface AccountStatusObservableChain {
  data: {
    get: <R extends AccountRequest>(
      request: R,
      defaultValue?: FieldsSelection<Account, R>[] | undefined
    ) => Observable<FieldsSelection<Account, R>[] | undefined>;
  };
  message: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  success: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
}

/** Recipe >>> Cook >>> WorkExperience >> Company */
export interface CompanyPromiseChain {
  description: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  name: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  registerDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  scale: {
    get: (
      request?: boolean | number,
      defaultValue?: CompanyScale
    ) => Promise<CompanyScale>;
  };
}

/** Recipe >>> Cook >>> WorkExperience >> Company */
export interface CompanyObservableChain {
  description: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  name: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  registerDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  scale: {
    get: (
      request?: boolean | number,
      defaultValue?: CompanyScale
    ) => Observable<CompanyScale>;
  };
}

/** Recipe >>> Cook */
export interface CookPromiseChain {
  WorkExperienceExtraFieldResolver: (args: {
    year: Scalars['Float'];
  }) => WorkExperiencePromiseChain & {
    get: <R extends WorkExperienceRequest>(
      request: R,
      defaultValue?: FieldsSelection<WorkExperience, R>
    ) => Promise<FieldsSelection<WorkExperience, R>>;
  };
  experience: WorkExperiencePromiseChain & {
    get: <R extends WorkExperienceRequest>(
      request: R,
      defaultValue?: FieldsSelection<WorkExperience, R>
    ) => Promise<FieldsSelection<WorkExperience, R>>;
  };
  name: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  yearsOfExperience: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Promise<Scalars['Int']>;
  };
}

/** Recipe >>> Cook */
export interface CookObservableChain {
  WorkExperienceExtraFieldResolver: (args: {
    year: Scalars['Float'];
  }) => WorkExperienceObservableChain & {
    get: <R extends WorkExperienceRequest>(
      request: R,
      defaultValue?: FieldsSelection<WorkExperience, R>
    ) => Observable<FieldsSelection<WorkExperience, R>>;
  };
  experience: WorkExperienceObservableChain & {
    get: <R extends WorkExperienceRequest>(
      request: R,
      defaultValue?: FieldsSelection<WorkExperience, R>
    ) => Observable<FieldsSelection<WorkExperience, R>>;
  };
  name: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  yearsOfExperience: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Observable<Scalars['Int']>;
  };
}

export interface ExecutorPromiseChain {
  /** 获取对象类型的执行者描述 */
  ExecutorDescField: ExecutorDescPromiseChain & {
    get: <R extends ExecutorDescRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorDesc, R>
    ) => Promise<FieldsSelection<ExecutorDesc, R>>;
  };
  ExecutorInnerTaskFieldResolver: {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R>[]
    ) => Promise<FieldsSelection<Task, R>[]>;
  };
  age: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Float']
    ) => Promise<Scalars['Float']>;
  };
  avaliable: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  desc: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  isFool: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  job: {
    get: (request?: boolean | number, defaultValue?: Job) => Promise<Job>;
  };
  joinDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  lastUpdateDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  name: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  region: {
    get: (request?: boolean | number, defaultValue?: Region) => Promise<Region>;
  };
  relatedRecord: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Promise<FieldsSelection<Record, R>[] | undefined>;
  };
  spAgeField: ((args?: {
    param?: Scalars['Float'] | null;
  }) => {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Promise<Scalars['Int']>;
  }) & {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Promise<Scalars['Int']>;
  };
  tasks: {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R>[] | undefined
    ) => Promise<FieldsSelection<Task, R>[] | undefined>;
  };
  uid: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Promise<Scalars['ID']>;
  };
}

export interface ExecutorObservableChain {
  /** 获取对象类型的执行者描述 */
  ExecutorDescField: ExecutorDescObservableChain & {
    get: <R extends ExecutorDescRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorDesc, R>
    ) => Observable<FieldsSelection<ExecutorDesc, R>>;
  };
  ExecutorInnerTaskFieldResolver: {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R>[]
    ) => Observable<FieldsSelection<Task, R>[]>;
  };
  age: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Float']
    ) => Observable<Scalars['Float']>;
  };
  avaliable: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  desc: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  isFool: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  job: {
    get: (request?: boolean | number, defaultValue?: Job) => Observable<Job>;
  };
  joinDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  lastUpdateDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  name: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  region: {
    get: (
      request?: boolean | number,
      defaultValue?: Region
    ) => Observable<Region>;
  };
  relatedRecord: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Observable<FieldsSelection<Record, R>[] | undefined>;
  };
  spAgeField: ((args?: {
    param?: Scalars['Float'] | null;
  }) => {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Observable<Scalars['Int']>;
  }) & {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Observable<Scalars['Int']>;
  };
  tasks: {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R>[] | undefined
    ) => Observable<FieldsSelection<Task, R>[] | undefined>;
  };
  uid: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Observable<Scalars['ID']>;
  };
}

export interface ExecutorDescPromiseChain {
  level: {
    get: (
      request?: boolean | number,
      defaultValue?: DifficultyLevel
    ) => Promise<DifficultyLevel>;
  };
  satisfaction: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int'] | undefined
    ) => Promise<Scalars['Int'] | undefined>;
  };
  successRate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int'] | undefined
    ) => Promise<Scalars['Int'] | undefined>;
  };
}

export interface ExecutorDescObservableChain {
  level: {
    get: (
      request?: boolean | number,
      defaultValue?: DifficultyLevel
    ) => Observable<DifficultyLevel>;
  };
  satisfaction: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int'] | undefined
    ) => Observable<Scalars['Int'] | undefined>;
  };
  successRate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int'] | undefined
    ) => Observable<Scalars['Int'] | undefined>;
  };
}

/** Executor Response Status Indicator */
export interface ExecutorStatusPromiseChain {
  data: {
    get: <R extends ExecutorRequest>(
      request: R,
      defaultValue?: FieldsSelection<Executor, R>[] | undefined
    ) => Promise<FieldsSelection<Executor, R>[] | undefined>;
  };
  message: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  success: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
}

/** Executor Response Status Indicator */
export interface ExecutorStatusObservableChain {
  data: {
    get: <R extends ExecutorRequest>(
      request: R,
      defaultValue?: FieldsSelection<Executor, R>[] | undefined
    ) => Observable<FieldsSelection<Executor, R>[] | undefined>;
  };
  message: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  success: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
}

/** Account Interface Type */
export interface IAccountPromiseChain {
  accountAvaliable: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  accountId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Promise<Scalars['ID']>;
  };
  accountName: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  accountProfile: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  accountPwd: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  accountRole: {
    get: (
      request?: boolean | number,
      defaultValue?: AccountRole
    ) => Promise<AccountRole>;
  };
  accountType: {
    get: (
      request?: boolean | number,
      defaultValue?: AccountType
    ) => Promise<AccountType>;
  };
  lastUpdateDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  registryDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  relatedRecord: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Promise<FieldsSelection<Record, R>[] | undefined>;
  };
}

/** Account Interface Type */
export interface IAccountObservableChain {
  accountAvaliable: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  accountId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Observable<Scalars['ID']>;
  };
  accountName: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  accountProfile: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  accountPwd: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  accountRole: {
    get: (
      request?: boolean | number,
      defaultValue?: AccountRole
    ) => Observable<AccountRole>;
  };
  accountType: {
    get: (
      request?: boolean | number,
      defaultValue?: AccountType
    ) => Observable<AccountType>;
  };
  lastUpdateDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  registryDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  relatedRecord: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Observable<FieldsSelection<Record, R>[] | undefined>;
  };
}

/** Account Profile Type */
export interface IAccountProfilePromiseChain {
  VIPLevel: {
    get: (
      request?: boolean | number,
      defaultValue?: AccountVIPLevel
    ) => Promise<AccountVIPLevel>;
  };
  avatar: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  isLifeTimeVIP: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  selfIntro: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
}

/** Account Profile Type */
export interface IAccountProfileObservableChain {
  VIPLevel: {
    get: (
      request?: boolean | number,
      defaultValue?: AccountVIPLevel
    ) => Observable<AccountVIPLevel>;
  };
  avatar: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  isLifeTimeVIP: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  selfIntro: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
}

/** Basic Status Wrapper */
export interface IBaseStatusPromiseChain {
  message: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  success: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
}

/** Basic Status Wrapper */
export interface IBaseStatusObservableChain {
  message: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  success: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
}

/** Update Executor Basic Info Input */
export interface IExecutorPromiseChain {
  age: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Float']
    ) => Promise<Scalars['Float']>;
  };
  avaliable: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  desc: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  isFool: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  job: {
    get: (request?: boolean | number, defaultValue?: Job) => Promise<Job>;
  };
  joinDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  lastUpdateDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  name: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  region: {
    get: (request?: boolean | number, defaultValue?: Region) => Promise<Region>;
  };
  relatedRecord: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Promise<FieldsSelection<Record, R>[] | undefined>;
  };
  spAgeField: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int'] | undefined
    ) => Promise<Scalars['Int'] | undefined>;
  };
  tasks: {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R>[] | undefined
    ) => Promise<FieldsSelection<Task, R>[] | undefined>;
  };
  uid: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Promise<Scalars['ID']>;
  };
}

/** Update Executor Basic Info Input */
export interface IExecutorObservableChain {
  age: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Float']
    ) => Observable<Scalars['Float']>;
  };
  avaliable: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  desc: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  isFool: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  job: {
    get: (request?: boolean | number, defaultValue?: Job) => Observable<Job>;
  };
  joinDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  lastUpdateDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  name: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  region: {
    get: (
      request?: boolean | number,
      defaultValue?: Region
    ) => Observable<Region>;
  };
  relatedRecord: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Observable<FieldsSelection<Record, R>[] | undefined>;
  };
  spAgeField: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int'] | undefined
    ) => Observable<Scalars['Int'] | undefined>;
  };
  tasks: {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R>[] | undefined
    ) => Observable<FieldsSelection<Task, R>[] | undefined>;
  };
  uid: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Observable<Scalars['ID']>;
  };
}

/** Executor Interface Type */
export interface IExecutorDescPromiseChain {
  level: {
    get: (
      request?: boolean | number,
      defaultValue?: DifficultyLevel
    ) => Promise<DifficultyLevel>;
  };
  satisfaction: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int'] | undefined
    ) => Promise<Scalars['Int'] | undefined>;
  };
  successRate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int'] | undefined
    ) => Promise<Scalars['Int'] | undefined>;
  };
}

/** Executor Interface Type */
export interface IExecutorDescObservableChain {
  level: {
    get: (
      request?: boolean | number,
      defaultValue?: DifficultyLevel
    ) => Observable<DifficultyLevel>;
  };
  satisfaction: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int'] | undefined
    ) => Observable<Scalars['Int'] | undefined>;
  };
  successRate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int'] | undefined
    ) => Observable<Scalars['Int'] | undefined>;
  };
}

/** Record Interface Type */
export interface IRecordPromiseChain {
  createDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  lastUpdateDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  recordAccount: AccountPromiseChain & {
    get: <R extends AccountRequest>(
      request: R,
      defaultValue?: FieldsSelection<Account, R> | undefined
    ) => Promise<FieldsSelection<Account, R> | undefined>;
  };
  recordExecutor: ExecutorPromiseChain & {
    get: <R extends ExecutorRequest>(
      request: R,
      defaultValue?: FieldsSelection<Executor, R> | undefined
    ) => Promise<FieldsSelection<Executor, R> | undefined>;
  };
  recordId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Promise<Scalars['ID']>;
  };
  recordSubstance: SubstancePromiseChain & {
    get: <R extends SubstanceRequest>(
      request: R,
      defaultValue?: FieldsSelection<Substance, R> | undefined
    ) => Promise<FieldsSelection<Substance, R> | undefined>;
  };
  recordTask: TaskPromiseChain & {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R> | undefined
    ) => Promise<FieldsSelection<Task, R> | undefined>;
  };
}

/** Record Interface Type */
export interface IRecordObservableChain {
  createDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  lastUpdateDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  recordAccount: AccountObservableChain & {
    get: <R extends AccountRequest>(
      request: R,
      defaultValue?: FieldsSelection<Account, R> | undefined
    ) => Observable<FieldsSelection<Account, R> | undefined>;
  };
  recordExecutor: ExecutorObservableChain & {
    get: <R extends ExecutorRequest>(
      request: R,
      defaultValue?: FieldsSelection<Executor, R> | undefined
    ) => Observable<FieldsSelection<Executor, R> | undefined>;
  };
  recordId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Observable<Scalars['ID']>;
  };
  recordSubstance: SubstanceObservableChain & {
    get: <R extends SubstanceRequest>(
      request: R,
      defaultValue?: FieldsSelection<Substance, R> | undefined
    ) => Observable<FieldsSelection<Substance, R> | undefined>;
  };
  recordTask: TaskObservableChain & {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R> | undefined
    ) => Observable<FieldsSelection<Task, R> | undefined>;
  };
}

/** Substance Interface Type */
export interface ISubstancePromiseChain {
  asylumed: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  lastActiveDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  relatedRecord: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Promise<FieldsSelection<Record, R>[] | undefined>;
  };
  relatedTask: TaskPromiseChain & {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R> | undefined
    ) => Promise<FieldsSelection<Task, R> | undefined>;
  };
  substanceAlive: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  substanceAppearDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  substanceDesc: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  substanceId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Promise<Scalars['ID']>;
  };
  substanceIssues: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  substanceLevel: {
    get: (
      request?: boolean | number,
      defaultValue?: DifficultyLevel
    ) => Promise<DifficultyLevel>;
  };
  substanceName: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
}

/** Substance Interface Type */
export interface ISubstanceObservableChain {
  asylumed: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  lastActiveDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  relatedRecord: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Observable<FieldsSelection<Record, R>[] | undefined>;
  };
  relatedTask: TaskObservableChain & {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R> | undefined
    ) => Observable<FieldsSelection<Task, R> | undefined>;
  };
  substanceAlive: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  substanceAppearDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  substanceDesc: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  substanceId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Observable<Scalars['ID']>;
  };
  substanceIssues: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  substanceLevel: {
    get: (
      request?: boolean | number,
      defaultValue?: DifficultyLevel
    ) => Observable<DifficultyLevel>;
  };
  substanceName: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
}

/** Task Interface Type */
export interface ITaskPromiseChain {
  allowAbort: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  assignee: ExecutorPromiseChain & {
    get: <R extends ExecutorRequest>(
      request: R,
      defaultValue?: FieldsSelection<Executor, R> | undefined
    ) => Promise<FieldsSelection<Executor, R> | undefined>;
  };
  lastUpdateDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  publishDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  relatedRecord: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Promise<FieldsSelection<Record, R>[] | undefined>;
  };
  requireCleaner: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  requirePsychologicalIntervention: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  taskAccmplished: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  taskAvaliable: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  taskContent: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  taskId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Promise<Scalars['ID']>;
  };
  taskLevel: {
    get: (
      request?: boolean | number,
      defaultValue?: DifficultyLevel
    ) => Promise<DifficultyLevel>;
  };
  taskRate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Promise<Scalars['Int']>;
  };
  taskReward: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Promise<Scalars['Int']>;
  };
  taskSource: {
    get: (
      request?: boolean | number,
      defaultValue?: TaskSource
    ) => Promise<TaskSource>;
  };
  taskSubstance: SubstancePromiseChain & {
    get: <R extends SubstanceRequest>(
      request: R,
      defaultValue?: FieldsSelection<Substance, R> | undefined
    ) => Promise<FieldsSelection<Substance, R> | undefined>;
  };
  taskTarget: {
    get: (
      request?: boolean | number,
      defaultValue?: TaskTarget
    ) => Promise<TaskTarget>;
  };
  taskTitle: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
}

/** Task Interface Type */
export interface ITaskObservableChain {
  allowAbort: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  assignee: ExecutorObservableChain & {
    get: <R extends ExecutorRequest>(
      request: R,
      defaultValue?: FieldsSelection<Executor, R> | undefined
    ) => Observable<FieldsSelection<Executor, R> | undefined>;
  };
  lastUpdateDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  publishDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  relatedRecord: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Observable<FieldsSelection<Record, R>[] | undefined>;
  };
  requireCleaner: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  requirePsychologicalIntervention: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  taskAccmplished: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  taskAvaliable: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  taskContent: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  taskId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Observable<Scalars['ID']>;
  };
  taskLevel: {
    get: (
      request?: boolean | number,
      defaultValue?: DifficultyLevel
    ) => Observable<DifficultyLevel>;
  };
  taskRate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Observable<Scalars['Int']>;
  };
  taskReward: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Observable<Scalars['Int']>;
  };
  taskSource: {
    get: (
      request?: boolean | number,
      defaultValue?: TaskSource
    ) => Observable<TaskSource>;
  };
  taskSubstance: SubstanceObservableChain & {
    get: <R extends SubstanceRequest>(
      request: R,
      defaultValue?: FieldsSelection<Substance, R> | undefined
    ) => Observable<FieldsSelection<Substance, R> | undefined>;
  };
  taskTarget: {
    get: (
      request?: boolean | number,
      defaultValue?: TaskTarget
    ) => Observable<TaskTarget>;
  };
  taskTitle: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
}

/** Login / Register Status Indicator */
export interface LoginOrRegisterStatusPromiseChain {
  expiredDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int'] | undefined
    ) => Promise<Scalars['Int'] | undefined>;
  };
  message: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  success: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  token: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String'] | undefined
    ) => Promise<Scalars['String'] | undefined>;
  };
}

/** Login / Register Status Indicator */
export interface LoginOrRegisterStatusObservableChain {
  expiredDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int'] | undefined
    ) => Observable<Scalars['Int'] | undefined>;
  };
  message: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  success: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  token: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String'] | undefined
    ) => Observable<Scalars['String'] | undefined>;
  };
}

export interface MutationPromiseChain {
  /** 用户永久注销 */
  AccountDestory: (args: {
    accountName: Scalars['String'];
    accountPwd: Scalars['String'];
  }) => LoginOrRegisterStatusPromiseChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Promise<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 提升/下降 用户类型 */
  AccountLevelMutate: (args: {
    accountId: Scalars['Int'];
    type: AccountType;
  }) => {
    get: <R extends AccountUnionResultRequest>(
      request: R,
      defaultValue?: FieldsSelection<AccountUnionResult, R>
    ) => Promise<FieldsSelection<AccountUnionResult, R>>;
  };

  /** 新用户注册 */
  AccountRegistry: (args: {
    account: AccountRegistryInput;
  }) => LoginOrRegisterStatusPromiseChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Promise<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 指派任务 */
  AssignTask: (args: {
    taskId: Scalars['Float'];
    uid: Scalars['Float'];
  }) => TaskStatusPromiseChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Promise<FieldsSelection<TaskStatus, R>>;
  };

  /** 将实体关联到任务 */
  CombineSubstanceAndTask: (args: {
    substanceId: Scalars['Int'];
    taskId: Scalars['Int'];
  }) => SubstanceStatusPromiseChain & {
    get: <R extends SubstanceStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<SubstanceStatus, R>
    ) => Promise<FieldsSelection<SubstanceStatus, R>>;
  };

  /** 添加执行者 */
  CreateExecutor: (args: {
    newExecutorInfo: ExecutorCreateInput;
  }) => ExecutorStatusPromiseChain & {
    get: <R extends ExecutorStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorStatus, R>
    ) => Promise<FieldsSelection<ExecutorStatus, R>>;
  };

  /** 创建任务同时关联到实体 */
  CreateNewTask: (args: {
    taskCreateParam: TaskCreateInput;
  }) => TaskStatusPromiseChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Promise<FieldsSelection<TaskStatus, R>>;
  };

  /** 新增实体 */
  CreateSubstance: (args: {
    substanceCreateParam: SubstanceCreateInput;
  }) => SubstanceStatusPromiseChain & {
    get: <R extends SubstanceStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<SubstanceStatus, R>
    ) => Promise<FieldsSelection<SubstanceStatus, R>>;
  };

  /** 删除执行者 */
  DeleteExecutor: (args: {
    uid: Scalars['Int'];
  }) => ExecutorStatusPromiseChain & {
    get: <R extends ExecutorStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorStatus, R>
    ) => Promise<FieldsSelection<ExecutorStatus, R>>;
  };

  /** 删除实体 */
  DeleteSubstance: (args: {
    substanceId: Scalars['Int'];
  }) => SubstanceStatusPromiseChain & {
    get: <R extends SubstanceStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<SubstanceStatus, R>
    ) => Promise<FieldsSelection<SubstanceStatus, R>>;
  };

  /** 删除任务 */
  DeleteTask: (args: {
    taskId: Scalars['Float'];
  }) => TaskStatusPromiseChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Promise<FieldsSelection<TaskStatus, R>>;
  };

  /** 冻结账号 */
  FreezeAccount: (args: {
    accountId: Scalars['Int'];
  }) => AccountStatusPromiseChain & {
    get: <R extends AccountStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<AccountStatus, R>
    ) => Promise<FieldsSelection<AccountStatus, R>>;
  };

  /** 冻结任务 无法恢复 */
  FreezeTask: (args: {
    taskId: Scalars['Float'];
  }) => TaskStatusPromiseChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Promise<FieldsSelection<TaskStatus, R>>;
  };

  /** 修改密码 */
  ModifyPassword: (args: {
    accountInfo: AccountPasswordModifyInput;
  }) => LoginOrRegisterStatusPromiseChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Promise<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 账号详情变更 */
  MutateAccountProfile: (args: {
    accountId: Scalars['Int'];
    modifiedAccountProfile: AccountProfileUpdateInput;
  }) => AccountStatusPromiseChain & {
    get: <R extends AccountStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<AccountStatus, R>
    ) => Promise<FieldsSelection<AccountStatus, R>>;
  };

  /** 变更用户角色 */
  MutateAccountRole: LoginOrRegisterStatusPromiseChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Promise<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 变更任务级别 */
  MutateTaskLevel: (args: {
    level: DifficultyLevel;
    taskId: Scalars['Float'];
  }) => TaskStatusPromiseChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Promise<FieldsSelection<TaskStatus, R>>;
  };

  /** 发送邮件验证码 */
  SendEmailVerifyCode: LoginOrRegisterStatusPromiseChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Promise<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 发送短信验证码 */
  SendPhoneVerifyCode: LoginOrRegisterStatusPromiseChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Promise<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 变更任务状态 */
  ToggleTaskStatus: (args: {
    taskId: Scalars['Float'];
  }) => TaskStatusPromiseChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Promise<FieldsSelection<TaskStatus, R>>;
  };

  /** 更新执行者基本信息 */
  UpdateExecutorBasicInfo: (args: {
    modifiedExecutorInfo: ExecutorUpdateInput;
  }) => ExecutorStatusPromiseChain & {
    get: <R extends ExecutorStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorStatus, R>
    ) => Promise<FieldsSelection<ExecutorStatus, R>>;
  };

  /** 更新执行者描述 */
  UpdateExecutorDesc: (args: {
    uid: Scalars['Int'];
    userDesc: ExecutorDescUpdateInput;
  }) => ExecutorStatusPromiseChain & {
    get: <R extends ExecutorStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorStatus, R>
    ) => Promise<FieldsSelection<ExecutorStatus, R>>;
  };

  /** 变更实体信息 */
  UpdateSubstanceInfo: (args: {
    substanceUpdateParam: SubstanceUpdateInput;
  }) => SubstanceStatusPromiseChain & {
    get: <R extends SubstanceStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<SubstanceStatus, R>
    ) => Promise<FieldsSelection<SubstanceStatus, R>>;
  };

  /** 变更任务基本信息 */
  UpdateTaskInfo: (args: {
    taskUpdateParam: TaskUpdateInput;
  }) => TaskStatusPromiseChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Promise<FieldsSelection<TaskStatus, R>>;
  };
  pubSubMutation: ((args?: {
    message?: Scalars['String'] | null;
  }) => {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  }) & {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  pubSubMutationToDynamicTopic: (args: {
    message?: Scalars['String'] | null;
    topic: Scalars['String'];
  }) => {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  publisherMutation: ((args?: {
    message?: Scalars['String'] | null;
  }) => {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  }) & {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
}

export interface MutationObservableChain {
  /** 用户永久注销 */
  AccountDestory: (args: {
    accountName: Scalars['String'];
    accountPwd: Scalars['String'];
  }) => LoginOrRegisterStatusObservableChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Observable<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 提升/下降 用户类型 */
  AccountLevelMutate: (args: {
    accountId: Scalars['Int'];
    type: AccountType;
  }) => {
    get: <R extends AccountUnionResultRequest>(
      request: R,
      defaultValue?: FieldsSelection<AccountUnionResult, R>
    ) => Observable<FieldsSelection<AccountUnionResult, R>>;
  };

  /** 新用户注册 */
  AccountRegistry: (args: {
    account: AccountRegistryInput;
  }) => LoginOrRegisterStatusObservableChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Observable<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 指派任务 */
  AssignTask: (args: {
    taskId: Scalars['Float'];
    uid: Scalars['Float'];
  }) => TaskStatusObservableChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Observable<FieldsSelection<TaskStatus, R>>;
  };

  /** 将实体关联到任务 */
  CombineSubstanceAndTask: (args: {
    substanceId: Scalars['Int'];
    taskId: Scalars['Int'];
  }) => SubstanceStatusObservableChain & {
    get: <R extends SubstanceStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<SubstanceStatus, R>
    ) => Observable<FieldsSelection<SubstanceStatus, R>>;
  };

  /** 添加执行者 */
  CreateExecutor: (args: {
    newExecutorInfo: ExecutorCreateInput;
  }) => ExecutorStatusObservableChain & {
    get: <R extends ExecutorStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorStatus, R>
    ) => Observable<FieldsSelection<ExecutorStatus, R>>;
  };

  /** 创建任务同时关联到实体 */
  CreateNewTask: (args: {
    taskCreateParam: TaskCreateInput;
  }) => TaskStatusObservableChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Observable<FieldsSelection<TaskStatus, R>>;
  };

  /** 新增实体 */
  CreateSubstance: (args: {
    substanceCreateParam: SubstanceCreateInput;
  }) => SubstanceStatusObservableChain & {
    get: <R extends SubstanceStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<SubstanceStatus, R>
    ) => Observable<FieldsSelection<SubstanceStatus, R>>;
  };

  /** 删除执行者 */
  DeleteExecutor: (args: {
    uid: Scalars['Int'];
  }) => ExecutorStatusObservableChain & {
    get: <R extends ExecutorStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorStatus, R>
    ) => Observable<FieldsSelection<ExecutorStatus, R>>;
  };

  /** 删除实体 */
  DeleteSubstance: (args: {
    substanceId: Scalars['Int'];
  }) => SubstanceStatusObservableChain & {
    get: <R extends SubstanceStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<SubstanceStatus, R>
    ) => Observable<FieldsSelection<SubstanceStatus, R>>;
  };

  /** 删除任务 */
  DeleteTask: (args: {
    taskId: Scalars['Float'];
  }) => TaskStatusObservableChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Observable<FieldsSelection<TaskStatus, R>>;
  };

  /** 冻结账号 */
  FreezeAccount: (args: {
    accountId: Scalars['Int'];
  }) => AccountStatusObservableChain & {
    get: <R extends AccountStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<AccountStatus, R>
    ) => Observable<FieldsSelection<AccountStatus, R>>;
  };

  /** 冻结任务 无法恢复 */
  FreezeTask: (args: {
    taskId: Scalars['Float'];
  }) => TaskStatusObservableChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Observable<FieldsSelection<TaskStatus, R>>;
  };

  /** 修改密码 */
  ModifyPassword: (args: {
    accountInfo: AccountPasswordModifyInput;
  }) => LoginOrRegisterStatusObservableChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Observable<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 账号详情变更 */
  MutateAccountProfile: (args: {
    accountId: Scalars['Int'];
    modifiedAccountProfile: AccountProfileUpdateInput;
  }) => AccountStatusObservableChain & {
    get: <R extends AccountStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<AccountStatus, R>
    ) => Observable<FieldsSelection<AccountStatus, R>>;
  };

  /** 变更用户角色 */
  MutateAccountRole: LoginOrRegisterStatusObservableChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Observable<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 变更任务级别 */
  MutateTaskLevel: (args: {
    level: DifficultyLevel;
    taskId: Scalars['Float'];
  }) => TaskStatusObservableChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Observable<FieldsSelection<TaskStatus, R>>;
  };

  /** 发送邮件验证码 */
  SendEmailVerifyCode: LoginOrRegisterStatusObservableChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Observable<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 发送短信验证码 */
  SendPhoneVerifyCode: LoginOrRegisterStatusObservableChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Observable<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 变更任务状态 */
  ToggleTaskStatus: (args: {
    taskId: Scalars['Float'];
  }) => TaskStatusObservableChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Observable<FieldsSelection<TaskStatus, R>>;
  };

  /** 更新执行者基本信息 */
  UpdateExecutorBasicInfo: (args: {
    modifiedExecutorInfo: ExecutorUpdateInput;
  }) => ExecutorStatusObservableChain & {
    get: <R extends ExecutorStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorStatus, R>
    ) => Observable<FieldsSelection<ExecutorStatus, R>>;
  };

  /** 更新执行者描述 */
  UpdateExecutorDesc: (args: {
    uid: Scalars['Int'];
    userDesc: ExecutorDescUpdateInput;
  }) => ExecutorStatusObservableChain & {
    get: <R extends ExecutorStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorStatus, R>
    ) => Observable<FieldsSelection<ExecutorStatus, R>>;
  };

  /** 变更实体信息 */
  UpdateSubstanceInfo: (args: {
    substanceUpdateParam: SubstanceUpdateInput;
  }) => SubstanceStatusObservableChain & {
    get: <R extends SubstanceStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<SubstanceStatus, R>
    ) => Observable<FieldsSelection<SubstanceStatus, R>>;
  };

  /** 变更任务基本信息 */
  UpdateTaskInfo: (args: {
    taskUpdateParam: TaskUpdateInput;
  }) => TaskStatusObservableChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Observable<FieldsSelection<TaskStatus, R>>;
  };
  pubSubMutation: ((args?: {
    message?: Scalars['String'] | null;
  }) => {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  }) & {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  pubSubMutationToDynamicTopic: (args: {
    message?: Scalars['String'] | null;
    topic: Scalars['String'];
  }) => {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  publisherMutation: ((args?: {
    message?: Scalars['String'] | null;
  }) => {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  }) & {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
}

export interface NotificationPromiseChain {
  date: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  id: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Promise<Scalars['ID']>;
  };
  message: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String'] | undefined
    ) => Promise<Scalars['String'] | undefined>;
  };
}

export interface NotificationObservableChain {
  date: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  id: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Observable<Scalars['ID']>;
  };
  message: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String'] | undefined
    ) => Observable<Scalars['String'] | undefined>;
  };
}

export interface QueryPromiseChain {
  /** 账号登录 */
  AccountLogin: (args: {
    account: AccountLoginInput;
  }) => LoginOrRegisterStatusPromiseChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Promise<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 账号详情 */
  CheckAccountDetail: (args: {
    accountId: Scalars['Int'];
    relations?: AccountRelationsInput | null;
  }) => AccountStatusPromiseChain & {
    get: <R extends AccountStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<AccountStatus, R>
    ) => Promise<FieldsSelection<AccountStatus, R>>;
  };

  /** 检验token是否合法 */
  CheckIsTokenValid: (args: {
    token: Scalars['String'];
  }) => LoginOrRegisterStatusPromiseChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Promise<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 验证邮件 */
  CheckVerifyCode: LoginOrRegisterStatusPromiseChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Promise<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 容器注册时间 */
  ContainerRegisterTime: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };

  /** 基于资料查找用户 */
  QueryAccountByProfile: ((args?: {
    pagination?: PaginationOptions | null;
    profileQueryParams?: AccountProfileQueryInput | null;
    relations?: AccountRelationsInput | null;
  }) => AccountStatusPromiseChain & {
    get: <R extends AccountStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<AccountStatus, R>
    ) => Promise<FieldsSelection<AccountStatus, R>>;
  }) &
    (AccountStatusPromiseChain & {
      get: <R extends AccountStatusRequest>(
        request: R,
        defaultValue?: FieldsSelection<AccountStatus, R>
      ) => Promise<FieldsSelection<AccountStatus, R>>;
    });

  /** 查询所有用户 */
  QueryAllAccounts: ((args?: {
    pagination?: PaginationOptions | null;
    relations?: AccountRelationsInput | null;
  }) => AccountStatusPromiseChain & {
    get: <R extends AccountStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<AccountStatus, R>
    ) => Promise<FieldsSelection<AccountStatus, R>>;
  }) &
    (AccountStatusPromiseChain & {
      get: <R extends AccountStatusRequest>(
        request: R,
        defaultValue?: FieldsSelection<AccountStatus, R>
      ) => Promise<FieldsSelection<AccountStatus, R>>;
    });

  /** 获取所有执行者 */
  QueryAllExecutors: ((args?: {
    pagination?: PaginationOptions | null;
    relations?: ExecutorRelationsInput | null;
  }) => ExecutorStatusPromiseChain & {
    get: <R extends ExecutorStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorStatus, R>
    ) => Promise<FieldsSelection<ExecutorStatus, R>>;
  }) &
    (ExecutorStatusPromiseChain & {
      get: <R extends ExecutorStatusRequest>(
        request: R,
        defaultValue?: FieldsSelection<ExecutorStatus, R>
      ) => Promise<FieldsSelection<ExecutorStatus, R>>;
    });
  QueryAllPrismaItems: {
    get: <R extends TodoItemRequest>(
      request: R,
      defaultValue?: FieldsSelection<TodoItem, R>[]
    ) => Promise<FieldsSelection<TodoItem, R>[]>;
  };
  QueryAllPrismaUsers: {
    get: <R extends UserRequest>(
      request: R,
      defaultValue?: FieldsSelection<User, R>[]
    ) => Promise<FieldsSelection<User, R>[]>;
  };
  QueryAllRecords: ((args?: {
    relations?: RecordRelationsInput | null;
  }) => RecordStatusPromiseChain & {
    get: <R extends RecordStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<RecordStatus, R>
    ) => Promise<FieldsSelection<RecordStatus, R>>;
  }) &
    (RecordStatusPromiseChain & {
      get: <R extends RecordStatusRequest>(
        request: R,
        defaultValue?: FieldsSelection<RecordStatus, R>
      ) => Promise<FieldsSelection<RecordStatus, R>>;
    });

  /** 查找所有实体信息 */
  QueryAllSubstances: ((args?: {
    pagination?: PaginationOptions | null;
    relations?: SubstanceRelationsInput | null;
  }) => SubstanceStatusPromiseChain & {
    get: <R extends SubstanceStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<SubstanceStatus, R>
    ) => Promise<FieldsSelection<SubstanceStatus, R>>;
  }) &
    (SubstanceStatusPromiseChain & {
      get: <R extends SubstanceStatusRequest>(
        request: R,
        defaultValue?: FieldsSelection<SubstanceStatus, R>
      ) => Promise<FieldsSelection<SubstanceStatus, R>>;
    });

  /** 获取所有任务 */
  QueryAllTasks: ((args?: {
    pagination?: PaginationOptions | null;
    relations?: TaskRelationsInput | null;
  }) => TaskStatusPromiseChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Promise<FieldsSelection<TaskStatus, R>>;
  }) &
    (TaskStatusPromiseChain & {
      get: <R extends TaskStatusRequest>(
        request: R,
        defaultValue?: FieldsSelection<TaskStatus, R>
      ) => Promise<FieldsSelection<TaskStatus, R>>;
    });

  /** 基于级别获取所有执行者与任务 */
  QueryByDifficultyLevel: ((args?: {
    difficulty?: DifficultyLevel | null;
    pagination?: PaginationOptions | null;
  }) => {
    get: <R extends LevelQueryResultRequest>(
      request: R,
      defaultValue?: FieldsSelection<LevelQueryResult, R>[]
    ) => Promise<FieldsSelection<LevelQueryResult, R>[]>;
  }) & {
    get: <R extends LevelQueryResultRequest>(
      request: R,
      defaultValue?: FieldsSelection<LevelQueryResult, R>[]
    ) => Promise<FieldsSelection<LevelQueryResult, R>[]>;
  };

  /** 根据基本条件查找执行者 */
  QueryExecutorByConditions: ((args?: {
    age?: Scalars['Int'] | null;
    avaliable?: Scalars['Boolean'] | null;
    isFool?: Scalars['Boolean'] | null;
    job?: Job | null;
    name?: Scalars['String'] | null;
    region?: Region | null;
    relations?: ExecutorRelationsInput | null;
  }) => ExecutorStatusPromiseChain & {
    get: <R extends ExecutorStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorStatus, R>
    ) => Promise<FieldsSelection<ExecutorStatus, R>>;
  }) &
    (ExecutorStatusPromiseChain & {
      get: <R extends ExecutorStatusRequest>(
        request: R,
        defaultValue?: FieldsSelection<ExecutorStatus, R>
      ) => Promise<FieldsSelection<ExecutorStatus, R>>;
    });

  /** 根据描述（等级、成功率、评分）查找执行者 */
  QueryExecutorByDesc: ((args?: {
    level?: DifficultyLevel | null;
    pagination?: PaginationOptions | null;
    relations?: ExecutorRelationsInput | null;
    satisfaction?: Scalars['Int'] | null;
    successRate?: Scalars['Int'] | null;
  }) => ExecutorStatusPromiseChain & {
    get: <R extends ExecutorStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorStatus, R>
    ) => Promise<FieldsSelection<ExecutorStatus, R>>;
  }) &
    (ExecutorStatusPromiseChain & {
      get: <R extends ExecutorStatusRequest>(
        request: R,
        defaultValue?: FieldsSelection<ExecutorStatus, R>
      ) => Promise<FieldsSelection<ExecutorStatus, R>>;
    });

  /** 根据ID查找特定执行者信息 */
  QueryExecutorById: (args: {
    relations?: ExecutorRelationsInput | null;
    uid: Scalars['Int'];
  }) => ExecutorStatusPromiseChain & {
    get: <R extends ExecutorStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorStatus, R>
    ) => Promise<FieldsSelection<ExecutorStatus, R>>;
  };

  /** 查询执行者当前被分配的任务 */
  QueryExecutorTasks: (args: {
    pagination?: PaginationOptions | null;
    relations?: TaskRelationsInput | null;
    uid: Scalars['Float'];
  }) => TaskStatusPromiseChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Promise<FieldsSelection<TaskStatus, R>>;
  };

  /** 基于条件查找单个实体 */
  QueryOneSubstanceByConditions: (args: {
    relations?: SubstanceRelationsInput | null;
    substanceQueryParam: SubstanceQueryInput;
  }) => SubstanceStatusPromiseChain & {
    get: <R extends SubstanceStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<SubstanceStatus, R>
    ) => Promise<FieldsSelection<SubstanceStatus, R>>;
  };

  /** 返回所有菜谱 厨师 和 咸鱼 */
  QueryRecipeUnions: {
    get: <R extends RecipeUnionResultRequest>(
      request: R,
      defaultValue?: FieldsSelection<RecipeUnionResult, R>[]
    ) => Promise<FieldsSelection<RecipeUnionResult, R>[]>;
  };

  /** 基于难度查找菜谱 */
  QueryRecipesByDifficulty: ((args?: {
    difficulty?: Difficulty | null;
  }) => {
    get: <R extends RecipeRequest>(
      request: R,
      defaultValue?: FieldsSelection<Recipe, R>[]
    ) => Promise<FieldsSelection<Recipe, R>[]>;
  }) & {
    get: <R extends RecipeRequest>(
      request: R,
      defaultValue?: FieldsSelection<Recipe, R>[]
    ) => Promise<FieldsSelection<Recipe, R>[]>;
  };

  /** 基于作料查找菜谱 */
  QueryRecipesByIngredients: ((args?: {
    ingredients?: Scalars['String'][] | null;
  }) => {
    get: <R extends RecipeRequest>(
      request: R,
      defaultValue?: FieldsSelection<Recipe, R>[]
    ) => Promise<FieldsSelection<Recipe, R>[]>;
  }) & {
    get: <R extends RecipeRequest>(
      request: R,
      defaultValue?: FieldsSelection<Recipe, R>[]
    ) => Promise<FieldsSelection<Recipe, R>[]>;
  };
  QueryRecordById: (args: {
    recordId: Scalars['Int'];
    relations?: RecordRelationsInput | null;
  }) => RecordStatusPromiseChain & {
    get: <R extends RecordStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<RecordStatus, R>
    ) => Promise<FieldsSelection<RecordStatus, R>>;
  };

  /** 根据恩格尔系数查找咸鱼 */
  QuerySaltFishByCoefficient: ((args?: {
    coefficient?: Scalars['Int'] | null;
  }) => {
    get: <R extends SaltFishRequest>(
      request: R,
      defaultValue?: FieldsSelection<SaltFish, R>[]
    ) => Promise<FieldsSelection<SaltFish, R>[]>;
  }) & {
    get: <R extends SaltFishRequest>(
      request: R,
      defaultValue?: FieldsSelection<SaltFish, R>[]
    ) => Promise<FieldsSelection<SaltFish, R>[]>;
  };

  /** 基于ID查找实体 */
  QuerySubstanceById: (args: {
    relations?: SubstanceRelationsInput | null;
    substanceId: Scalars['Int'];
  }) => SubstanceStatusPromiseChain & {
    get: <R extends SubstanceStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<SubstanceStatus, R>
    ) => Promise<FieldsSelection<SubstanceStatus, R>>;
  };

  /** 基于条件查找多个实体 */
  QuerySubstancesByConditions: (args: {
    pagination?: PaginationOptions | null;
    relations?: SubstanceRelationsInput | null;
    substanceQueryParam: SubstanceQueryInput;
  }) => SubstanceStatusPromiseChain & {
    get: <R extends SubstanceStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<SubstanceStatus, R>
    ) => Promise<FieldsSelection<SubstanceStatus, R>>;
  };

  /** 基于条件获取单个任务 */
  QueryTaskByConditions: (args: {
    relations?: TaskRelationsInput | null;
    taskQueryParams: TaskQueryInput;
  }) => TaskStatusPromiseChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Promise<FieldsSelection<TaskStatus, R>>;
  };

  /** 基于ID获取任务 */
  QueryTaskByID: (args: {
    relations?: TaskRelationsInput | null;
    taskId: Scalars['Float'];
  }) => TaskStatusPromiseChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Promise<FieldsSelection<TaskStatus, R>>;
  };

  /** 基于条件获取多个任务 */
  QueryTasksByConditions: (args: {
    pagination?: PaginationOptions | null;
    relations?: TaskRelationsInput | null;
    taskQueryParams: TaskQueryInput;
  }) => TaskStatusPromiseChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Promise<FieldsSelection<TaskStatus, R>>;
  };

  /** DataLoader 实际效果演示 */
  Recipes: {
    get: <R extends RecipeRequest>(
      request: R,
      defaultValue?: FieldsSelection<Recipe, R>[]
    ) => Promise<FieldsSelection<Recipe, R>[]>;
  };
  currentDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
}

export interface QueryObservableChain {
  /** 账号登录 */
  AccountLogin: (args: {
    account: AccountLoginInput;
  }) => LoginOrRegisterStatusObservableChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Observable<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 账号详情 */
  CheckAccountDetail: (args: {
    accountId: Scalars['Int'];
    relations?: AccountRelationsInput | null;
  }) => AccountStatusObservableChain & {
    get: <R extends AccountStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<AccountStatus, R>
    ) => Observable<FieldsSelection<AccountStatus, R>>;
  };

  /** 检验token是否合法 */
  CheckIsTokenValid: (args: {
    token: Scalars['String'];
  }) => LoginOrRegisterStatusObservableChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Observable<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 验证邮件 */
  CheckVerifyCode: LoginOrRegisterStatusObservableChain & {
    get: <R extends LoginOrRegisterStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<LoginOrRegisterStatus, R>
    ) => Observable<FieldsSelection<LoginOrRegisterStatus, R>>;
  };

  /** 容器注册时间 */
  ContainerRegisterTime: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };

  /** 基于资料查找用户 */
  QueryAccountByProfile: ((args?: {
    pagination?: PaginationOptions | null;
    profileQueryParams?: AccountProfileQueryInput | null;
    relations?: AccountRelationsInput | null;
  }) => AccountStatusObservableChain & {
    get: <R extends AccountStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<AccountStatus, R>
    ) => Observable<FieldsSelection<AccountStatus, R>>;
  }) &
    (AccountStatusObservableChain & {
      get: <R extends AccountStatusRequest>(
        request: R,
        defaultValue?: FieldsSelection<AccountStatus, R>
      ) => Observable<FieldsSelection<AccountStatus, R>>;
    });

  /** 查询所有用户 */
  QueryAllAccounts: ((args?: {
    pagination?: PaginationOptions | null;
    relations?: AccountRelationsInput | null;
  }) => AccountStatusObservableChain & {
    get: <R extends AccountStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<AccountStatus, R>
    ) => Observable<FieldsSelection<AccountStatus, R>>;
  }) &
    (AccountStatusObservableChain & {
      get: <R extends AccountStatusRequest>(
        request: R,
        defaultValue?: FieldsSelection<AccountStatus, R>
      ) => Observable<FieldsSelection<AccountStatus, R>>;
    });

  /** 获取所有执行者 */
  QueryAllExecutors: ((args?: {
    pagination?: PaginationOptions | null;
    relations?: ExecutorRelationsInput | null;
  }) => ExecutorStatusObservableChain & {
    get: <R extends ExecutorStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorStatus, R>
    ) => Observable<FieldsSelection<ExecutorStatus, R>>;
  }) &
    (ExecutorStatusObservableChain & {
      get: <R extends ExecutorStatusRequest>(
        request: R,
        defaultValue?: FieldsSelection<ExecutorStatus, R>
      ) => Observable<FieldsSelection<ExecutorStatus, R>>;
    });
  QueryAllPrismaItems: {
    get: <R extends TodoItemRequest>(
      request: R,
      defaultValue?: FieldsSelection<TodoItem, R>[]
    ) => Observable<FieldsSelection<TodoItem, R>[]>;
  };
  QueryAllPrismaUsers: {
    get: <R extends UserRequest>(
      request: R,
      defaultValue?: FieldsSelection<User, R>[]
    ) => Observable<FieldsSelection<User, R>[]>;
  };
  QueryAllRecords: ((args?: {
    relations?: RecordRelationsInput | null;
  }) => RecordStatusObservableChain & {
    get: <R extends RecordStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<RecordStatus, R>
    ) => Observable<FieldsSelection<RecordStatus, R>>;
  }) &
    (RecordStatusObservableChain & {
      get: <R extends RecordStatusRequest>(
        request: R,
        defaultValue?: FieldsSelection<RecordStatus, R>
      ) => Observable<FieldsSelection<RecordStatus, R>>;
    });

  /** 查找所有实体信息 */
  QueryAllSubstances: ((args?: {
    pagination?: PaginationOptions | null;
    relations?: SubstanceRelationsInput | null;
  }) => SubstanceStatusObservableChain & {
    get: <R extends SubstanceStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<SubstanceStatus, R>
    ) => Observable<FieldsSelection<SubstanceStatus, R>>;
  }) &
    (SubstanceStatusObservableChain & {
      get: <R extends SubstanceStatusRequest>(
        request: R,
        defaultValue?: FieldsSelection<SubstanceStatus, R>
      ) => Observable<FieldsSelection<SubstanceStatus, R>>;
    });

  /** 获取所有任务 */
  QueryAllTasks: ((args?: {
    pagination?: PaginationOptions | null;
    relations?: TaskRelationsInput | null;
  }) => TaskStatusObservableChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Observable<FieldsSelection<TaskStatus, R>>;
  }) &
    (TaskStatusObservableChain & {
      get: <R extends TaskStatusRequest>(
        request: R,
        defaultValue?: FieldsSelection<TaskStatus, R>
      ) => Observable<FieldsSelection<TaskStatus, R>>;
    });

  /** 基于级别获取所有执行者与任务 */
  QueryByDifficultyLevel: ((args?: {
    difficulty?: DifficultyLevel | null;
    pagination?: PaginationOptions | null;
  }) => {
    get: <R extends LevelQueryResultRequest>(
      request: R,
      defaultValue?: FieldsSelection<LevelQueryResult, R>[]
    ) => Observable<FieldsSelection<LevelQueryResult, R>[]>;
  }) & {
    get: <R extends LevelQueryResultRequest>(
      request: R,
      defaultValue?: FieldsSelection<LevelQueryResult, R>[]
    ) => Observable<FieldsSelection<LevelQueryResult, R>[]>;
  };

  /** 根据基本条件查找执行者 */
  QueryExecutorByConditions: ((args?: {
    age?: Scalars['Int'] | null;
    avaliable?: Scalars['Boolean'] | null;
    isFool?: Scalars['Boolean'] | null;
    job?: Job | null;
    name?: Scalars['String'] | null;
    region?: Region | null;
    relations?: ExecutorRelationsInput | null;
  }) => ExecutorStatusObservableChain & {
    get: <R extends ExecutorStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorStatus, R>
    ) => Observable<FieldsSelection<ExecutorStatus, R>>;
  }) &
    (ExecutorStatusObservableChain & {
      get: <R extends ExecutorStatusRequest>(
        request: R,
        defaultValue?: FieldsSelection<ExecutorStatus, R>
      ) => Observable<FieldsSelection<ExecutorStatus, R>>;
    });

  /** 根据描述（等级、成功率、评分）查找执行者 */
  QueryExecutorByDesc: ((args?: {
    level?: DifficultyLevel | null;
    pagination?: PaginationOptions | null;
    relations?: ExecutorRelationsInput | null;
    satisfaction?: Scalars['Int'] | null;
    successRate?: Scalars['Int'] | null;
  }) => ExecutorStatusObservableChain & {
    get: <R extends ExecutorStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorStatus, R>
    ) => Observable<FieldsSelection<ExecutorStatus, R>>;
  }) &
    (ExecutorStatusObservableChain & {
      get: <R extends ExecutorStatusRequest>(
        request: R,
        defaultValue?: FieldsSelection<ExecutorStatus, R>
      ) => Observable<FieldsSelection<ExecutorStatus, R>>;
    });

  /** 根据ID查找特定执行者信息 */
  QueryExecutorById: (args: {
    relations?: ExecutorRelationsInput | null;
    uid: Scalars['Int'];
  }) => ExecutorStatusObservableChain & {
    get: <R extends ExecutorStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<ExecutorStatus, R>
    ) => Observable<FieldsSelection<ExecutorStatus, R>>;
  };

  /** 查询执行者当前被分配的任务 */
  QueryExecutorTasks: (args: {
    pagination?: PaginationOptions | null;
    relations?: TaskRelationsInput | null;
    uid: Scalars['Float'];
  }) => TaskStatusObservableChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Observable<FieldsSelection<TaskStatus, R>>;
  };

  /** 基于条件查找单个实体 */
  QueryOneSubstanceByConditions: (args: {
    relations?: SubstanceRelationsInput | null;
    substanceQueryParam: SubstanceQueryInput;
  }) => SubstanceStatusObservableChain & {
    get: <R extends SubstanceStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<SubstanceStatus, R>
    ) => Observable<FieldsSelection<SubstanceStatus, R>>;
  };

  /** 返回所有菜谱 厨师 和 咸鱼 */
  QueryRecipeUnions: {
    get: <R extends RecipeUnionResultRequest>(
      request: R,
      defaultValue?: FieldsSelection<RecipeUnionResult, R>[]
    ) => Observable<FieldsSelection<RecipeUnionResult, R>[]>;
  };

  /** 基于难度查找菜谱 */
  QueryRecipesByDifficulty: ((args?: {
    difficulty?: Difficulty | null;
  }) => {
    get: <R extends RecipeRequest>(
      request: R,
      defaultValue?: FieldsSelection<Recipe, R>[]
    ) => Observable<FieldsSelection<Recipe, R>[]>;
  }) & {
    get: <R extends RecipeRequest>(
      request: R,
      defaultValue?: FieldsSelection<Recipe, R>[]
    ) => Observable<FieldsSelection<Recipe, R>[]>;
  };

  /** 基于作料查找菜谱 */
  QueryRecipesByIngredients: ((args?: {
    ingredients?: Scalars['String'][] | null;
  }) => {
    get: <R extends RecipeRequest>(
      request: R,
      defaultValue?: FieldsSelection<Recipe, R>[]
    ) => Observable<FieldsSelection<Recipe, R>[]>;
  }) & {
    get: <R extends RecipeRequest>(
      request: R,
      defaultValue?: FieldsSelection<Recipe, R>[]
    ) => Observable<FieldsSelection<Recipe, R>[]>;
  };
  QueryRecordById: (args: {
    recordId: Scalars['Int'];
    relations?: RecordRelationsInput | null;
  }) => RecordStatusObservableChain & {
    get: <R extends RecordStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<RecordStatus, R>
    ) => Observable<FieldsSelection<RecordStatus, R>>;
  };

  /** 根据恩格尔系数查找咸鱼 */
  QuerySaltFishByCoefficient: ((args?: {
    coefficient?: Scalars['Int'] | null;
  }) => {
    get: <R extends SaltFishRequest>(
      request: R,
      defaultValue?: FieldsSelection<SaltFish, R>[]
    ) => Observable<FieldsSelection<SaltFish, R>[]>;
  }) & {
    get: <R extends SaltFishRequest>(
      request: R,
      defaultValue?: FieldsSelection<SaltFish, R>[]
    ) => Observable<FieldsSelection<SaltFish, R>[]>;
  };

  /** 基于ID查找实体 */
  QuerySubstanceById: (args: {
    relations?: SubstanceRelationsInput | null;
    substanceId: Scalars['Int'];
  }) => SubstanceStatusObservableChain & {
    get: <R extends SubstanceStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<SubstanceStatus, R>
    ) => Observable<FieldsSelection<SubstanceStatus, R>>;
  };

  /** 基于条件查找多个实体 */
  QuerySubstancesByConditions: (args: {
    pagination?: PaginationOptions | null;
    relations?: SubstanceRelationsInput | null;
    substanceQueryParam: SubstanceQueryInput;
  }) => SubstanceStatusObservableChain & {
    get: <R extends SubstanceStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<SubstanceStatus, R>
    ) => Observable<FieldsSelection<SubstanceStatus, R>>;
  };

  /** 基于条件获取单个任务 */
  QueryTaskByConditions: (args: {
    relations?: TaskRelationsInput | null;
    taskQueryParams: TaskQueryInput;
  }) => TaskStatusObservableChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Observable<FieldsSelection<TaskStatus, R>>;
  };

  /** 基于ID获取任务 */
  QueryTaskByID: (args: {
    relations?: TaskRelationsInput | null;
    taskId: Scalars['Float'];
  }) => TaskStatusObservableChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Observable<FieldsSelection<TaskStatus, R>>;
  };

  /** 基于条件获取多个任务 */
  QueryTasksByConditions: (args: {
    pagination?: PaginationOptions | null;
    relations?: TaskRelationsInput | null;
    taskQueryParams: TaskQueryInput;
  }) => TaskStatusObservableChain & {
    get: <R extends TaskStatusRequest>(
      request: R,
      defaultValue?: FieldsSelection<TaskStatus, R>
    ) => Observable<FieldsSelection<TaskStatus, R>>;
  };

  /** DataLoader 实际效果演示 */
  Recipes: {
    get: <R extends RecipeRequest>(
      request: R,
      defaultValue?: FieldsSelection<Recipe, R>[]
    ) => Observable<FieldsSelection<Recipe, R>[]>;
  };
  currentDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
}

/** Recipe Type */
export interface RecipePromiseChain {
  CookExtraFieldResolver: (args: {
    name: Scalars['String'];
  }) => CookPromiseChain & {
    get: <R extends CookRequest>(
      request: R,
      defaultValue?: FieldsSelection<Cook, R>
    ) => Promise<FieldsSelection<Cook, R>>;
  };
  RecipeExtraFieldResolver: (args: {
    title: Scalars['String'];
  }) => RecipePromiseChain & {
    get: <R extends RecipeRequest>(
      request: R,
      defaultValue?: FieldsSelection<Recipe, R> | undefined
    ) => Promise<FieldsSelection<Recipe, R> | undefined>;
  };
  cook: CookPromiseChain & {
    get: <R extends CookRequest>(
      request: R,
      defaultValue?: FieldsSelection<Cook, R>
    ) => Promise<FieldsSelection<Cook, R>>;
  };
  description: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String'] | undefined
    ) => Promise<Scalars['String'] | undefined>;
  };
  ingredients: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String'][] | undefined
    ) => Promise<Scalars['String'][] | undefined>;
  };
  preparationDifficulty: {
    get: (
      request?: boolean | number,
      defaultValue?: Difficulty | undefined
    ) => Promise<Difficulty | undefined>;
  };
  title: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
}

/** Recipe Type */
export interface RecipeObservableChain {
  CookExtraFieldResolver: (args: {
    name: Scalars['String'];
  }) => CookObservableChain & {
    get: <R extends CookRequest>(
      request: R,
      defaultValue?: FieldsSelection<Cook, R>
    ) => Observable<FieldsSelection<Cook, R>>;
  };
  RecipeExtraFieldResolver: (args: {
    title: Scalars['String'];
  }) => RecipeObservableChain & {
    get: <R extends RecipeRequest>(
      request: R,
      defaultValue?: FieldsSelection<Recipe, R> | undefined
    ) => Observable<FieldsSelection<Recipe, R> | undefined>;
  };
  cook: CookObservableChain & {
    get: <R extends CookRequest>(
      request: R,
      defaultValue?: FieldsSelection<Cook, R>
    ) => Observable<FieldsSelection<Cook, R>>;
  };
  description: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String'] | undefined
    ) => Observable<Scalars['String'] | undefined>;
  };
  ingredients: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String'][] | undefined
    ) => Observable<Scalars['String'][] | undefined>;
  };
  preparationDifficulty: {
    get: (
      request?: boolean | number,
      defaultValue?: Difficulty | undefined
    ) => Observable<Difficulty | undefined>;
  };
  title: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
}

export interface RecordPromiseChain {
  RecordInnerExecutorFieldResolver: {
    get: <R extends ExecutorRequest>(
      request: R,
      defaultValue?: FieldsSelection<Executor, R>[]
    ) => Promise<FieldsSelection<Executor, R>[]>;
  };
  RecordInnerSubstanceFieldResolver: {
    get: <R extends SubstanceRequest>(
      request: R,
      defaultValue?: FieldsSelection<Substance, R>[]
    ) => Promise<FieldsSelection<Substance, R>[]>;
  };
  RecordInnerTaskFieldResolver: {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R>[]
    ) => Promise<FieldsSelection<Task, R>[]>;
  };
  createDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  lastUpdateDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  recordAccount: AccountPromiseChain & {
    get: <R extends AccountRequest>(
      request: R,
      defaultValue?: FieldsSelection<Account, R> | undefined
    ) => Promise<FieldsSelection<Account, R> | undefined>;
  };
  recordExecutor: ExecutorPromiseChain & {
    get: <R extends ExecutorRequest>(
      request: R,
      defaultValue?: FieldsSelection<Executor, R> | undefined
    ) => Promise<FieldsSelection<Executor, R> | undefined>;
  };
  recordId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Promise<Scalars['ID']>;
  };
  recordSubstance: SubstancePromiseChain & {
    get: <R extends SubstanceRequest>(
      request: R,
      defaultValue?: FieldsSelection<Substance, R> | undefined
    ) => Promise<FieldsSelection<Substance, R> | undefined>;
  };
  recordTask: TaskPromiseChain & {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R> | undefined
    ) => Promise<FieldsSelection<Task, R> | undefined>;
  };
}

export interface RecordObservableChain {
  RecordInnerExecutorFieldResolver: {
    get: <R extends ExecutorRequest>(
      request: R,
      defaultValue?: FieldsSelection<Executor, R>[]
    ) => Observable<FieldsSelection<Executor, R>[]>;
  };
  RecordInnerSubstanceFieldResolver: {
    get: <R extends SubstanceRequest>(
      request: R,
      defaultValue?: FieldsSelection<Substance, R>[]
    ) => Observable<FieldsSelection<Substance, R>[]>;
  };
  RecordInnerTaskFieldResolver: {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R>[]
    ) => Observable<FieldsSelection<Task, R>[]>;
  };
  createDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  lastUpdateDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  recordAccount: AccountObservableChain & {
    get: <R extends AccountRequest>(
      request: R,
      defaultValue?: FieldsSelection<Account, R> | undefined
    ) => Observable<FieldsSelection<Account, R> | undefined>;
  };
  recordExecutor: ExecutorObservableChain & {
    get: <R extends ExecutorRequest>(
      request: R,
      defaultValue?: FieldsSelection<Executor, R> | undefined
    ) => Observable<FieldsSelection<Executor, R> | undefined>;
  };
  recordId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Observable<Scalars['ID']>;
  };
  recordSubstance: SubstanceObservableChain & {
    get: <R extends SubstanceRequest>(
      request: R,
      defaultValue?: FieldsSelection<Substance, R> | undefined
    ) => Observable<FieldsSelection<Substance, R> | undefined>;
  };
  recordTask: TaskObservableChain & {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R> | undefined
    ) => Observable<FieldsSelection<Task, R> | undefined>;
  };
}

/** Record Response Status Indicator */
export interface RecordStatusPromiseChain {
  data: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Promise<FieldsSelection<Record, R>[] | undefined>;
  };
  message: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  success: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
}

/** Record Response Status Indicator */
export interface RecordStatusObservableChain {
  data: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Observable<FieldsSelection<Record, R>[] | undefined>;
  };
  message: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  success: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
}

/** useless object type in union type, just for funny:) */
export interface SaltFishPromiseChain {
  EngelCoefficient: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Promise<Scalars['Int']>;
  };
  date: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  fishName: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  num: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int'] | undefined
    ) => Promise<Scalars['Int'] | undefined>;
  };
  role: {
    get: (
      request?: boolean | number,
      defaultValue?: AuthDirectiveRoleEnum | undefined
    ) => Promise<AuthDirectiveRoleEnum | undefined>;
  };
  str: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String'] | undefined
    ) => Promise<Scalars['String'] | undefined>;
  };
}

/** useless object type in union type, just for funny:) */
export interface SaltFishObservableChain {
  EngelCoefficient: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Observable<Scalars['Int']>;
  };
  date: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  fishName: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  num: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int'] | undefined
    ) => Observable<Scalars['Int'] | undefined>;
  };
  role: {
    get: (
      request?: boolean | number,
      defaultValue?: AuthDirectiveRoleEnum | undefined
    ) => Observable<AuthDirectiveRoleEnum | undefined>;
  };
  str: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String'] | undefined
    ) => Observable<Scalars['String'] | undefined>;
  };
}

export interface SubscriptionPromiseChain {
  normalSubscription: NotificationPromiseChain & {
    get: <R extends NotificationRequest>(
      request: R,
      defaultValue?: FieldsSelection<Notification, R>
    ) => Promise<FieldsSelection<Notification, R>>;
  };
  subscriptionWithFilter: NotificationPromiseChain & {
    get: <R extends NotificationRequest>(
      request: R,
      defaultValue?: FieldsSelection<Notification, R>
    ) => Promise<FieldsSelection<Notification, R>>;
  };
  subscriptionWithFilterToDynamicTopic: (args: {
    topic: Scalars['String'];
  }) => NotificationPromiseChain & {
    get: <R extends NotificationRequest>(
      request: R,
      defaultValue?: FieldsSelection<Notification, R>
    ) => Promise<FieldsSelection<Notification, R>>;
  };
}

export interface SubscriptionObservableChain {
  normalSubscription: NotificationObservableChain & {
    get: <R extends NotificationRequest>(
      request: R,
      defaultValue?: FieldsSelection<Notification, R>
    ) => Observable<FieldsSelection<Notification, R>>;
  };
  subscriptionWithFilter: NotificationObservableChain & {
    get: <R extends NotificationRequest>(
      request: R,
      defaultValue?: FieldsSelection<Notification, R>
    ) => Observable<FieldsSelection<Notification, R>>;
  };
  subscriptionWithFilterToDynamicTopic: (args: {
    topic: Scalars['String'];
  }) => NotificationObservableChain & {
    get: <R extends NotificationRequest>(
      request: R,
      defaultValue?: FieldsSelection<Notification, R>
    ) => Observable<FieldsSelection<Notification, R>>;
  };
}

export interface SubstancePromiseChain {
  asylumed: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  lastActiveDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  relatedRecord: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Promise<FieldsSelection<Record, R>[] | undefined>;
  };
  relatedTask: TaskPromiseChain & {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R> | undefined
    ) => Promise<FieldsSelection<Task, R> | undefined>;
  };
  substanceAlive: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  substanceAppearDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  substanceDesc: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  substanceId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Promise<Scalars['ID']>;
  };
  substanceIssues: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  substanceLevel: {
    get: (
      request?: boolean | number,
      defaultValue?: DifficultyLevel
    ) => Promise<DifficultyLevel>;
  };
  substanceName: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
}

export interface SubstanceObservableChain {
  asylumed: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  lastActiveDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  relatedRecord: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Observable<FieldsSelection<Record, R>[] | undefined>;
  };
  relatedTask: TaskObservableChain & {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R> | undefined
    ) => Observable<FieldsSelection<Task, R> | undefined>;
  };
  substanceAlive: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  substanceAppearDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  substanceDesc: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  substanceId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Observable<Scalars['ID']>;
  };
  substanceIssues: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  substanceLevel: {
    get: (
      request?: boolean | number,
      defaultValue?: DifficultyLevel
    ) => Observable<DifficultyLevel>;
  };
  substanceName: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
}

/** Substance Response Status Indicator */
export interface SubstanceStatusPromiseChain {
  data: {
    get: <R extends SubstanceRequest>(
      request: R,
      defaultValue?: FieldsSelection<Substance, R>[] | undefined
    ) => Promise<FieldsSelection<Substance, R>[] | undefined>;
  };
  message: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  success: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
}

/** Substance Response Status Indicator */
export interface SubstanceStatusObservableChain {
  data: {
    get: <R extends SubstanceRequest>(
      request: R,
      defaultValue?: FieldsSelection<Substance, R>[] | undefined
    ) => Observable<FieldsSelection<Substance, R>[] | undefined>;
  };
  message: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  success: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
}

export interface TaskPromiseChain {
  TaskInnerExecutorFieldResolver: ExecutorPromiseChain & {
    get: <R extends ExecutorRequest>(
      request: R,
      defaultValue?: FieldsSelection<Executor, R>
    ) => Promise<FieldsSelection<Executor, R>>;
  };
  TaskInnerSubstanceFieldResolver: SubstancePromiseChain & {
    get: <R extends SubstanceRequest>(
      request: R,
      defaultValue?: FieldsSelection<Substance, R>
    ) => Promise<FieldsSelection<Substance, R>>;
  };
  allowAbort: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  assignee: ExecutorPromiseChain & {
    get: <R extends ExecutorRequest>(
      request: R,
      defaultValue?: FieldsSelection<Executor, R> | undefined
    ) => Promise<FieldsSelection<Executor, R> | undefined>;
  };
  lastUpdateDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  publishDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  relatedRecord: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Promise<FieldsSelection<Record, R>[] | undefined>;
  };
  requireCleaner: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  requirePsychologicalIntervention: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  taskAccmplished: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  taskAvaliable: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  taskContent: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  taskId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Promise<Scalars['ID']>;
  };
  taskLevel: {
    get: (
      request?: boolean | number,
      defaultValue?: DifficultyLevel
    ) => Promise<DifficultyLevel>;
  };
  taskRate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Promise<Scalars['Int']>;
  };
  taskReward: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Promise<Scalars['Int']>;
  };
  taskSource: {
    get: (
      request?: boolean | number,
      defaultValue?: TaskSource
    ) => Promise<TaskSource>;
  };
  taskSubstance: SubstancePromiseChain & {
    get: <R extends SubstanceRequest>(
      request: R,
      defaultValue?: FieldsSelection<Substance, R> | undefined
    ) => Promise<FieldsSelection<Substance, R> | undefined>;
  };
  taskTarget: {
    get: (
      request?: boolean | number,
      defaultValue?: TaskTarget
    ) => Promise<TaskTarget>;
  };
  taskTitle: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
}

export interface TaskObservableChain {
  TaskInnerExecutorFieldResolver: ExecutorObservableChain & {
    get: <R extends ExecutorRequest>(
      request: R,
      defaultValue?: FieldsSelection<Executor, R>
    ) => Observable<FieldsSelection<Executor, R>>;
  };
  TaskInnerSubstanceFieldResolver: SubstanceObservableChain & {
    get: <R extends SubstanceRequest>(
      request: R,
      defaultValue?: FieldsSelection<Substance, R>
    ) => Observable<FieldsSelection<Substance, R>>;
  };
  allowAbort: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  assignee: ExecutorObservableChain & {
    get: <R extends ExecutorRequest>(
      request: R,
      defaultValue?: FieldsSelection<Executor, R> | undefined
    ) => Observable<FieldsSelection<Executor, R> | undefined>;
  };
  lastUpdateDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  publishDate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  relatedRecord: {
    get: <R extends RecordRequest>(
      request: R,
      defaultValue?: FieldsSelection<Record, R>[] | undefined
    ) => Observable<FieldsSelection<Record, R>[] | undefined>;
  };
  requireCleaner: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  requirePsychologicalIntervention: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  taskAccmplished: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  taskAvaliable: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  taskContent: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  taskId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Observable<Scalars['ID']>;
  };
  taskLevel: {
    get: (
      request?: boolean | number,
      defaultValue?: DifficultyLevel
    ) => Observable<DifficultyLevel>;
  };
  taskRate: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Observable<Scalars['Int']>;
  };
  taskReward: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Observable<Scalars['Int']>;
  };
  taskSource: {
    get: (
      request?: boolean | number,
      defaultValue?: TaskSource
    ) => Observable<TaskSource>;
  };
  taskSubstance: SubstanceObservableChain & {
    get: <R extends SubstanceRequest>(
      request: R,
      defaultValue?: FieldsSelection<Substance, R> | undefined
    ) => Observable<FieldsSelection<Substance, R> | undefined>;
  };
  taskTarget: {
    get: (
      request?: boolean | number,
      defaultValue?: TaskTarget
    ) => Observable<TaskTarget>;
  };
  taskTitle: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
}

/** Task Response Status Indicator */
export interface TaskStatusPromiseChain {
  data: {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R>[] | undefined
    ) => Promise<FieldsSelection<Task, R>[] | undefined>;
  };
  message: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  success: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
}

/** Task Response Status Indicator */
export interface TaskStatusObservableChain {
  data: {
    get: <R extends TaskRequest>(
      request: R,
      defaultValue?: FieldsSelection<Task, R>[] | undefined
    ) => Observable<FieldsSelection<Task, R>[] | undefined>;
  };
  message: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  success: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
}

export interface TodoItemPromiseChain {
  content: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String'] | undefined
    ) => Promise<Scalars['String'] | undefined>;
  };
  createdAt: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
  id: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Promise<Scalars['ID']>;
  };
  owner: UserPromiseChain & {
    get: <R extends UserRequest>(
      request: R,
      defaultValue?: FieldsSelection<User, R> | undefined
    ) => Promise<FieldsSelection<User, R> | undefined>;
  };
  ownerId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int'] | undefined
    ) => Promise<Scalars['Int'] | undefined>;
  };
  title: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  updatedAt: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Promise<Scalars['Timestamp']>;
  };
}

export interface TodoItemObservableChain {
  content: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String'] | undefined
    ) => Observable<Scalars['String'] | undefined>;
  };
  createdAt: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
  id: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Observable<Scalars['ID']>;
  };
  owner: UserObservableChain & {
    get: <R extends UserRequest>(
      request: R,
      defaultValue?: FieldsSelection<User, R> | undefined
    ) => Observable<FieldsSelection<User, R> | undefined>;
  };
  ownerId: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int'] | undefined
    ) => Observable<Scalars['Int'] | undefined>;
  };
  title: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  updatedAt: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Timestamp']
    ) => Observable<Scalars['Timestamp']>;
  };
}

export interface UserPromiseChain {
  id: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Promise<Scalars['ID']>;
  };
  items: {
    get: <R extends TodoItemRequest>(
      request: R,
      defaultValue?: FieldsSelection<TodoItem, R>[] | undefined
    ) => Promise<FieldsSelection<TodoItem, R>[] | undefined>;
  };
  name: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Promise<Scalars['String']>;
  };
  nickName: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String'] | undefined
    ) => Promise<Scalars['String'] | undefined>;
  };
}

export interface UserObservableChain {
  id: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['ID']
    ) => Observable<Scalars['ID']>;
  };
  items: {
    get: <R extends TodoItemRequest>(
      request: R,
      defaultValue?: FieldsSelection<TodoItem, R>[] | undefined
    ) => Observable<FieldsSelection<TodoItem, R>[] | undefined>;
  };
  name: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String']
    ) => Observable<Scalars['String']>;
  };
  nickName: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['String'] | undefined
    ) => Observable<Scalars['String'] | undefined>;
  };
}

/** Recipe >>> Cook >>> WorkExperience */
export interface WorkExperiencePromiseChain {
  CompanyExtraFieldResolver: (args: {
    name: Scalars['String'];
  }) => CompanyPromiseChain & {
    get: <R extends CompanyRequest>(
      request: R,
      defaultValue?: FieldsSelection<Company, R>
    ) => Promise<FieldsSelection<Company, R>>;
  };
  company: CompanyPromiseChain & {
    get: <R extends CompanyRequest>(
      request: R,
      defaultValue?: FieldsSelection<Company, R>
    ) => Promise<FieldsSelection<Company, R>>;
  };
  isFired: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Promise<Scalars['Boolean']>;
  };
  workYears: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Promise<Scalars['Int']>;
  };
}

/** Recipe >>> Cook >>> WorkExperience */
export interface WorkExperienceObservableChain {
  CompanyExtraFieldResolver: (args: {
    name: Scalars['String'];
  }) => CompanyObservableChain & {
    get: <R extends CompanyRequest>(
      request: R,
      defaultValue?: FieldsSelection<Company, R>
    ) => Observable<FieldsSelection<Company, R>>;
  };
  company: CompanyObservableChain & {
    get: <R extends CompanyRequest>(
      request: R,
      defaultValue?: FieldsSelection<Company, R>
    ) => Observable<FieldsSelection<Company, R>>;
  };
  isFired: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Boolean']
    ) => Observable<Scalars['Boolean']>;
  };
  workYears: {
    get: (
      request?: boolean | number,
      defaultValue?: Scalars['Int']
    ) => Observable<Scalars['Int']>;
  };
}
