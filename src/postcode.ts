// Loose UK postcode check: outward code, optional space, inward code.
// Real validation against postcodes.io comes later.
const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/;

export function normalisePostcode(input: string): string | null {
  const compact = input.toUpperCase().replace(/\s+/g, "");
  if (!UK_POSTCODE.test(compact)) return null;
  return `${compact.slice(0, -3)} ${compact.slice(-3)}`;
}
