# postcodes.io fixtures

Real responses from https://api.postcodes.io, saved on 2026-10-02.
Only formatting was changed (Prettier); the data is as returned.

| File                      | Request                            | HTTP |
| ------------------------- | ---------------------------------- | ---- |
| `lookup-sw1a-1aa.json`    | `GET /postcodes/SW1A1AA`           | 200  |
| `lookup-not-found.json`   | `GET /postcodes/ZZ991ZZ`           | 404  |
| `validate-invalid.json`   | `GET /postcodes/HELLO/validate`    | 200  |
| `terminated-ab1-0aa.json` | `GET /terminated_postcodes/AB10AA` | 200  |
