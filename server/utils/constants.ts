export enum USER_ROLES {
  BANNED = -1,
  COMMON = 0,
  ADMIN = 1,
}

export const DATA_SOURCE_URL = "http://api.linbudu.top/data";

export const SPACEX_API = "https://api.spacexdata.com/v4";

export enum ACCOUNT_AUTH {
  UN_LOGIN = -1,
  COMMON = 0,
  ADMIN = 1,
}

// TODO: 需要更详尽的错误码+信息提示
export enum RESPONSE_INDICATOR {
  NOT_FOUND = "Resource Not Found",
  EXISTED = "Resource Existed",
  SUCCESS = "Success",
  FAILED = "Operation Failed",
  INVALID_LOGIN_TYPE = "Invalid Login Type",
  UNAUTHORIZED = "Unauthorized",
  TOKEN_EXPIRED = "Token Expired",
  INCORRECT_PWD = "Invalid Password",
  PERMISSION_DENIED = "Permission Denied",
  QUERY_NOT_ALLOWED = "Query Not Allowed",
  MUTATION_NOT_ALLOWED = "Mutation Not Allowed",
  HIGHER_AUTH_REQUIRED = "Higher Auth Required",
  UNDER_DEVELOPING = "Interface Under Developing",
}

export enum ACCOUNT_TYPE {
  VISITOR,
  COMMON,
  ORG,
  ENTERPRISE,
  GOV,
  ADMIN,
  DOMINATOR,
}

export const MAX_ALLOWED_COMPLEXITY = 30;

// https://github.com/vercel/ms
export const TOKEN_EXPIRED_IN = "7d";

export const PLAY_GROUND_SETTINGS = {
  "editor.theme": "dark" as "dark",
  "editor.reuseHeaders": true,
  "editor.fontSize": 16,
  "editor.fontFamily": `'Fira Code', 'Source Code Pro', 'Consolas'`,
  "prettier.printWidth": 2,
  "prettier.tabWidth": 2,
  "prettier.useTabs": true,
  "schema.polling.enable": true,
  "schema.polling.interval": 5000,
  "schema.disableComments": false,
  "tracing.hideTracingResponse": false,
  "queryPlan.hideQueryPlanResponse": false,
};

export const SALT = 10;
