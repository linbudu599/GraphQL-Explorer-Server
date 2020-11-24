export enum USER_ROLES {
  BANNED = -1,
  COMMON = 0,
  ADMIN = 1,
}

export const DATA_SOURCE_URL = "http://api.linbudu.top/data";

export enum ACCOUNT_AUTH {
  UN_LOGIN = -1,
  COMMON = 0,
  ADMIN = 1,
}

export enum RESPONSE_INDICATOR {
  NOT_FOUND = "Resource Not Found",
  EXISTED = "Resource Existed",
  SUCCESS = "Success",
  FAILED = "Operation Failed",
}

export const MAX_ALLOWED_COMPLEXITY = 20;
