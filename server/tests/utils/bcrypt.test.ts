import { encode, compare } from "../../utils/bcrypt";

describe("[bcrypt.js] Unit Tests", () => {
  it("should salt and return different salted res on same strings", () => {
    expect(typeof encode("xxx")).toBe("string");
    expect(encode("xxx")).not.toBe(encode("xxx"));
  });

  it("should encode and compare", () => {
    expect(compare("xxx", encode("xxx"))).toBeTruthy();
  });
});
