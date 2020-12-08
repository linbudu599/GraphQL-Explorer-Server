import { dispatchToken, validateToken } from "../../utils/jwt";
import { ACCOUNT_TYPE } from "../../utils/constants";

const USER_NAME = "林不渡";
const LOGIN_TYPE = ACCOUNT_TYPE.DOMINATOR;

describe("[jwt.ts] Unit Tests", () => {
  beforeEach(() => {
    process.env.SECRET_KEY = undefined;
  });

  it("should generate string token from arguments", () => {
    const token = dispatchToken(USER_NAME);
    expect(typeof token).toBe("string");
  });

  it("should validate token correctly", () => {
    const token = dispatchToken(USER_NAME, LOGIN_TYPE);
    const verifyRes = validateToken(token);
    expect(verifyRes.valid).toBeTruthy();
    if (verifyRes.valid) {
      expect(verifyRes.info.username).toBe(USER_NAME);
      expect(verifyRes.info.loginType).toBe(LOGIN_TYPE);
    }
  });
  it("should reject invalid token", () => {
    const verifyRes = validateToken("token");
    expect(verifyRes.valid).toBeFalsy();
  });
});
