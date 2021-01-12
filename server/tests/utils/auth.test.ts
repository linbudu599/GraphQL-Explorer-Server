import { genarateRandomID } from "../../utils/auth";
import { ACCOUNT_TYPE } from "../../utils/constants";

describe("[auth.ts] Unit Tests", () => {
  it("should return object with id & type", () => {
    const invokeRes = genarateRandomID();
    expect(typeof invokeRes.id).toBe("number");
    expect(invokeRes.id).toBeLessThanOrEqual(91);
  });

  it("should return different objects", () => {
    const invokeRes1 = genarateRandomID();
    const invokeRes2 = genarateRandomID();
    expect(invokeRes1.id).not.toBe(invokeRes2.id);
  });
});
