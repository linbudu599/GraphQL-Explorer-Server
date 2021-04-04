var Account_possibleTypes = ['Account'];
module.exports.isAccount = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isAccount"');
  return Account_possibleTypes.includes(obj.__typename);
};

var AccountJSON_possibleTypes = ['AccountJSON'];
module.exports.isAccountJSON = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isAccountJSON"');
  return AccountJSON_possibleTypes.includes(obj.__typename);
};

var AccountProfile_possibleTypes = ['AccountProfile'];
module.exports.isAccountProfile = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isAccountProfile"');
  return AccountProfile_possibleTypes.includes(obj.__typename);
};

var AccountStatus_possibleTypes = ['AccountStatus'];
module.exports.isAccountStatus = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isAccountStatus"');
  return AccountStatus_possibleTypes.includes(obj.__typename);
};

var AccountUnionResult_possibleTypes = [
  'AccountStatus',
  'LoginOrRegisterStatus',
];
module.exports.isAccountUnionResult = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isAccountUnionResult"');
  return AccountUnionResult_possibleTypes.includes(obj.__typename);
};

var Company_possibleTypes = ['Company'];
module.exports.isCompany = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isCompany"');
  return Company_possibleTypes.includes(obj.__typename);
};

var Cook_possibleTypes = ['Cook'];
module.exports.isCook = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isCook"');
  return Cook_possibleTypes.includes(obj.__typename);
};

var Executor_possibleTypes = ['Executor'];
module.exports.isExecutor = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isExecutor"');
  return Executor_possibleTypes.includes(obj.__typename);
};

var ExecutorDesc_possibleTypes = ['ExecutorDesc'];
module.exports.isExecutorDesc = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isExecutorDesc"');
  return ExecutorDesc_possibleTypes.includes(obj.__typename);
};

var ExecutorStatus_possibleTypes = ['ExecutorStatus'];
module.exports.isExecutorStatus = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isExecutorStatus"');
  return ExecutorStatus_possibleTypes.includes(obj.__typename);
};

var IAccount_possibleTypes = ['Account'];
module.exports.isIAccount = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isIAccount"');
  return IAccount_possibleTypes.includes(obj.__typename);
};

var IAccountProfile_possibleTypes = ['AccountProfile'];
module.exports.isIAccountProfile = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isIAccountProfile"');
  return IAccountProfile_possibleTypes.includes(obj.__typename);
};

var IBaseStatus_possibleTypes = [
  'AccountStatus',
  'ExecutorStatus',
  'LoginOrRegisterStatus',
  'RecordStatus',
  'SubstanceStatus',
  'TaskStatus',
];
module.exports.isIBaseStatus = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isIBaseStatus"');
  return IBaseStatus_possibleTypes.includes(obj.__typename);
};

var IExecutor_possibleTypes = ['Executor'];
module.exports.isIExecutor = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isIExecutor"');
  return IExecutor_possibleTypes.includes(obj.__typename);
};

var IExecutorDesc_possibleTypes = ['ExecutorDesc'];
module.exports.isIExecutorDesc = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isIExecutorDesc"');
  return IExecutorDesc_possibleTypes.includes(obj.__typename);
};

var IRecord_possibleTypes = ['Record'];
module.exports.isIRecord = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isIRecord"');
  return IRecord_possibleTypes.includes(obj.__typename);
};

var ISubstance_possibleTypes = ['Substance'];
module.exports.isISubstance = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isISubstance"');
  return ISubstance_possibleTypes.includes(obj.__typename);
};

var ITask_possibleTypes = ['Task'];
module.exports.isITask = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isITask"');
  return ITask_possibleTypes.includes(obj.__typename);
};

var LevelQueryResult_possibleTypes = ['Executor', 'Task'];
module.exports.isLevelQueryResult = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isLevelQueryResult"');
  return LevelQueryResult_possibleTypes.includes(obj.__typename);
};

var LoginOrRegisterStatus_possibleTypes = ['LoginOrRegisterStatus'];
module.exports.isLoginOrRegisterStatus = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isLoginOrRegisterStatus"');
  return LoginOrRegisterStatus_possibleTypes.includes(obj.__typename);
};

var Mutation_possibleTypes = ['Mutation'];
module.exports.isMutation = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isMutation"');
  return Mutation_possibleTypes.includes(obj.__typename);
};

var Notification_possibleTypes = ['Notification'];
module.exports.isNotification = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isNotification"');
  return Notification_possibleTypes.includes(obj.__typename);
};

var Query_possibleTypes = ['Query'];
module.exports.isQuery = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isQuery"');
  return Query_possibleTypes.includes(obj.__typename);
};

var Recipe_possibleTypes = ['Recipe'];
module.exports.isRecipe = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isRecipe"');
  return Recipe_possibleTypes.includes(obj.__typename);
};

var RecipeUnionResult_possibleTypes = ['Cook', 'Recipe', 'SaltFish'];
module.exports.isRecipeUnionResult = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isRecipeUnionResult"');
  return RecipeUnionResult_possibleTypes.includes(obj.__typename);
};

var Record_possibleTypes = ['Record'];
module.exports.isRecord = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isRecord"');
  return Record_possibleTypes.includes(obj.__typename);
};

var RecordStatus_possibleTypes = ['RecordStatus'];
module.exports.isRecordStatus = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isRecordStatus"');
  return RecordStatus_possibleTypes.includes(obj.__typename);
};

var SaltFish_possibleTypes = ['SaltFish'];
module.exports.isSaltFish = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isSaltFish"');
  return SaltFish_possibleTypes.includes(obj.__typename);
};

var Subscription_possibleTypes = ['Subscription'];
module.exports.isSubscription = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isSubscription"');
  return Subscription_possibleTypes.includes(obj.__typename);
};

var Substance_possibleTypes = ['Substance'];
module.exports.isSubstance = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isSubstance"');
  return Substance_possibleTypes.includes(obj.__typename);
};

var SubstanceStatus_possibleTypes = ['SubstanceStatus'];
module.exports.isSubstanceStatus = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isSubstanceStatus"');
  return SubstanceStatus_possibleTypes.includes(obj.__typename);
};

var Task_possibleTypes = ['Task'];
module.exports.isTask = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isTask"');
  return Task_possibleTypes.includes(obj.__typename);
};

var TaskStatus_possibleTypes = ['TaskStatus'];
module.exports.isTaskStatus = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isTaskStatus"');
  return TaskStatus_possibleTypes.includes(obj.__typename);
};

var TodoItem_possibleTypes = ['TodoItem'];
module.exports.isTodoItem = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isTodoItem"');
  return TodoItem_possibleTypes.includes(obj.__typename);
};

var User_possibleTypes = ['User'];
module.exports.isUser = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isUser"');
  return User_possibleTypes.includes(obj.__typename);
};

var WorkExperience_possibleTypes = ['WorkExperience'];
module.exports.isWorkExperience = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isWorkExperience"');
  return WorkExperience_possibleTypes.includes(obj.__typename);
};
