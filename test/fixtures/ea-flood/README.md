# Environment Agency flood fixtures

Real responses from the EA Real Time Flood Monitoring API
(https://environment.data.gov.uk/flood-monitoring), saved on 2026-10-02.
JSON files are stored exactly as returned.

| File                                       | Request                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------- |
| `floods-active.json`                       | `GET /id/floods` (all current warnings; one Flood Alert in Cumbria at the time) |
| `flood-areas-near-sw1a-1aa.json`           | `GET /id/floodAreas?lat=51.50101&long=-0.141563&dist=1`                         |
| `flood-area-063FWT23WestminC.json`         | `GET /id/floodAreas/063FWT23WestminC`                                           |
| `flood-area-063FWT23WestminC-polygon.json` | `GET /id/floodAreas/063FWT23WestminC/polygon` (GeoJSON)                         |
