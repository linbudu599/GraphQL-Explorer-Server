import { dispatchToken, validateToken } from "../../server/utils/jwt";
import { ACCOUNT_TYPE, ACCOUNT_ROLE } from "../../server/utils/constants";

const USER_NAME = "林不渡";
const MOCK_ACCOUNT_TYPE = ACCOUNT_TYPE.DOMINATOR;

describe("[jwt.ts] Unit Tests", () => {
  beforeEach(() => {
    process.env.SECRET_KEY = undefined;
  });

  it("should generate string token from arguments", () => {
    const token = dispatchToken(USER_NAME);
    expect(typeof token).toBe("string");
  });

  it("should validate token correctly", () => {
    const token = dispatchToken(USER_NAME, MOCK_ACCOUNT_TYPE);
    const verifyRes = validateToken(token);
    expect(verifyRes.valid).toBeTruthy();
    if (verifyRes.valid) {
      expect(verifyRes.info.username).toBe(USER_NAME);
      expect(verifyRes.info.accountType).toBe(MOCK_ACCOUNT_TYPE);
      expect(verifyRes.info.accountRole).toBe(ACCOUNT_ROLE.UNKNOWN);
    }
  });
  it("should reject invalid token", () => {
    const verifyRes = validateToken("invalid_token");
    expect(verifyRes.valid).toBeFalsy();
  });
});
