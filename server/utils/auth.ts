import { ACCOUNT_TYPE } from "./constants";

// TODO: 分为两个序列的权限管控
// 1. 用户权限级别
// 2. 用户类型级别
export const genarateRandomID = () => {
  // 随机鉴权
  // 为0时TypeDI容器注册会失败
  const randomID = Math.floor(Math.random() * 90) + 1;

  const UN_LOGIN = randomID >= 1 && randomID <= 11;
  const VISITOR = randomID >= 12 && randomID <= 21;
  const COMMON = randomID >= 22 && randomID <= 31;
  const PERSONAL = randomID >= 32 && randomID <= 41;
  const ORG = randomID >= 42 && randomID <= 51;
  const ENTERPRISE = randomID >= 52 && randomID <= 61;
  const GOV = randomID >= 62 && randomID <= 71;
  const ADMIN = randomID >= 72 && randomID <= 81;
  const DOMINATOR = randomID >= 82 && randomID <= 91;

  const type = UN_LOGIN
    ? ACCOUNT_TYPE.UN_LOGIN
    : VISITOR
    ? ACCOUNT_TYPE.VISITOR
    : COMMON
    ? ACCOUNT_TYPE.COMMON
    : PERSONAL
    ? ACCOUNT_TYPE.PERSONAL
    : ORG
    ? ACCOUNT_TYPE.ORG
    : ENTERPRISE
    ? ACCOUNT_TYPE.ENTERPRISE
    : GOV
    ? ACCOUNT_TYPE.GOV
    : ADMIN
    ? ACCOUNT_TYPE.ADMIN
    : ACCOUNT_TYPE.DOMINATOR;

  return {
    id: randomID,
    type,
  };
};
