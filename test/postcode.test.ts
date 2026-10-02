import { describe, expect, it } from "vitest";
import { normalisePostcode } from "../src/postcode.js";

describe("normalisePostcode", () => {
  it("formats valid postcodes in upper case with one space", () => {
    expect(normalisePostcode("sw1a1aa")).toBe("SW1A 1AA");
    expect(normalisePostcode("  m1   1ae ")).toBe("M1 1AE");
    expect(normalisePostcode("CR2 6XH")).toBe("CR2 6XH");
  });

  it("rejects input that is not a postcode", () => {
    expect(normalisePostcode("")).toBeNull();
    expect(normalisePostcode("hello")).toBeNull();
    expect(normalisePostcode("12345")).toBeNull();
  });
});
