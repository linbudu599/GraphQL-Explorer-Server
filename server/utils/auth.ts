import { ACCOUNT_AUTH } from "./constants";

export const genarateRandomID = () => {
  // 随机鉴权
  // 为0时TypeDI容器注册会失败
  const randomID = Math.floor(Math.random() * 100) + 1;
  // 1-31 unlogin
  // 32-61 common
  // 62-101 admin

  const UN_LOGIN = randomID >= 1 && randomID <= 31;
  const COMMON = randomID >= 32 && randomID <= 61;
  const ADMIN = randomID >= 62 && randomID <= 101;

  const ACCOUNT_TYPE = UN_LOGIN
    ? ACCOUNT_AUTH.UN_LOGIN
    : COMMON
    ? ACCOUNT_AUTH.COMMON
    : ACCOUNT_AUTH.ADMIN;

  return {
    id: randomID,
    type: ACCOUNT_TYPE,
  };
};
