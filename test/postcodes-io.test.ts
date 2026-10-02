import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { lookupPostcode } from "../src/postcodes-io.js";

function fixture(name: string): Response {
  const body = readFileSync(
    new URL(`./fixtures/postcodes-io/${name}`, import.meta.url),
    "utf8",
  );
  const status = (JSON.parse(body) as { status: number }).status;
  return new Response(body, {
    status,
    headers: { "content-type": "application/json" },
  });
}

// Fake fetch that answers each URL path with a saved fixture.
function fakeFetch(routes: Record<string, string>) {
  return vi.fn(async (url: string | URL | Request) => {
    const path = new URL(url.toString()).pathname;
    const name = routes[path];
    if (!name) throw new Error(`Unexpected request: ${path}`);
    return fixture(name);
  });
}

describe("lookupPostcode", () => {
  it("returns location details for a live postcode", async () => {
    const fetchFn = fakeFetch({ "/postcodes/SW1A1AA": "lookup-sw1a-1aa.json" });

    const result = await lookupPostcode("sw1a 1aa", fetchFn);

    expect(result).toEqual({
      status: "found",
      postcode: "SW1A 1AA",
      outcode: "SW1A",
      latitude: 51.50101,
      longitude: -0.141563,
      country: "England",
      region: "London",
      adminDistrict: "Westminster",
    });
  });

  it("recognises a terminated postcode", async () => {
    const fetchFn = fakeFetch({
      "/postcodes/AB10AA": "lookup-not-found.json",
      "/terminated_postcodes/AB10AA": "terminated-ab1-0aa.json",
    });

    const result = await lookupPostcode("AB1 0AA", fetchFn);

    expect(result).toEqual({
      status: "terminated",
      postcode: "AB1 0AA",
      terminatedYear: 1996,
      terminatedMonth: 6,
    });
  });

  it("reports a well-formed postcode that does not exist", async () => {
    const fetchFn = fakeFetch({
      "/postcodes/ZZ991ZZ": "lookup-not-found.json",
      "/terminated_postcodes/ZZ991ZZ": "terminated-not-found.json",
    });

    const result = await lookupPostcode("ZZ99 1ZZ", fetchFn);

    expect(result).toEqual({ status: "not_found", postcode: "ZZ99 1ZZ" });
  });

  it("rejects text that is not a postcode without calling the API", async () => {
    const fetchFn = fakeFetch({});

    const result = await lookupPostcode("hello", fetchFn);

    expect(result).toEqual({ status: "invalid", input: "hello" });
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it("throws when postcodes.io is unavailable", async () => {
    const fetchFn = vi.fn(
      async () => new Response("Service Unavailable", { status: 503 }),
    );

    await expect(lookupPostcode("SW1A 1AA", fetchFn)).rejects.toThrow(
      "HTTP 503",
    );
  });
});
