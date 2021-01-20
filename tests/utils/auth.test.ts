import { genarateRandomID } from "../../server/utils/auth";
import { ACCOUNT_TYPE, ACCOUNT_ROLE } from "../../server/utils/constants";

describe("[auth.ts] Unit Tests", () => {
  it("should return object with id & type & role", () => {
    const invokeRes = genarateRandomID();
    expect(typeof invokeRes.id).toBe("number");
    expect(invokeRes.id).toBeLessThanOrEqual(51);
    expect(invokeRes.accountType).toBeLessThanOrEqual(ACCOUNT_TYPE.DOMINATOR);
    expect(invokeRes.accountRole).toBeDefined();
  });
});
