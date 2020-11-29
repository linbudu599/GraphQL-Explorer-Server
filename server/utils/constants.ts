export enum USER_ROLES {
  BANNED = -1,
  COMMON = 0,
  ADMIN = 1,
}

export const DATA_SOURCE_URL = 'http://api.linbudu.top/data';

export const SPACEX_API = 'https://api.spacexdata.com/v4';

export enum ACCOUNT_AUTH {
  UN_LOGIN = -1,
  COMMON = 0,
  ADMIN = 1,
}

export enum RESPONSE_INDICATOR {
  NOT_FOUND = 'Resource Not Found',
  EXISTED = 'Resource Existed',
  SUCCESS = 'Success',
  FAILED = 'Operation Failed',
  INVALID_LOGIN_TYPE = 'Invalid Login Type',
  TOKEN_EXPIRED = 'Token Expired',
  PERMISSION_DENIED = 'Permission Denied',
  MUTATION_NOT_ALLOWED = 'Mutation Not Allowed',
}

export const MAX_ALLOWED_COMPLEXITY = 20;

// https://github.com/vercel/ms
export const TOKEN_EXPIRED_IN = '7d';
