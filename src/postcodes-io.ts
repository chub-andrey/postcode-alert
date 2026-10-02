import { normalisePostcode } from "./postcode.js";

// Client for https://postcodes.io (open, no API key).
// Fixtures with real responses are in test/fixtures/postcodes-io.

const BASE_URL = "https://api.postcodes.io";

export type PostcodeLookup =
  | {
      status: "found";
      postcode: string;
      outcode: string;
      latitude: number;
      longitude: number;
      country: string;
      region: string | null;
      adminDistrict: string | null;
    }
  | {
      status: "terminated";
      postcode: string;
      terminatedYear: number;
      terminatedMonth: number;
    }
  | { status: "not_found"; postcode: string }
  | { status: "invalid"; input: string };

type Fetch = typeof fetch;

interface LookupResult {
  postcode: string;
  outcode: string;
  latitude: number | null;
  longitude: number | null;
  country: string;
  region: string | null;
  admin_district: string | null;
}

interface TerminatedResult {
  postcode: string;
  year_terminated: number;
  month_terminated: number;
}

export async function lookupPostcode(
  input: string,
  fetchFn: Fetch = fetch,
): Promise<PostcodeLookup> {
  const postcode = normalisePostcode(input);
  if (!postcode) return { status: "invalid", input };

  const path = encodeURIComponent(postcode.replace(" ", ""));

  const found = await getJson<LookupResult>(fetchFn, `/postcodes/${path}`);
  if (found) {
    // A handful of postcodes have no coordinates; we cannot place them on a map.
    if (found.latitude === null || found.longitude === null) {
      return { status: "not_found", postcode };
    }
    return {
      status: "found",
      postcode: found.postcode,
      outcode: found.outcode,
      latitude: found.latitude,
      longitude: found.longitude,
      country: found.country,
      region: found.region,
      adminDistrict: found.admin_district,
    };
  }

  const terminated = await getJson<TerminatedResult>(
    fetchFn,
    `/terminated_postcodes/${path}`,
  );
  if (terminated) {
    return {
      status: "terminated",
      postcode: terminated.postcode,
      terminatedYear: terminated.year_terminated,
      terminatedMonth: terminated.month_terminated,
    };
  }

  return { status: "not_found", postcode };
}

// Returns the `result` field, null on 404, and throws on any other failure.
async function getJson<T>(fetchFn: Fetch, path: string): Promise<T | null> {
  const response = await fetchFn(`${BASE_URL}${path}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`postcodes.io ${path} failed with HTTP ${response.status}`);
  }
  const body = (await response.json()) as { result: T };
  return body.result;
}
