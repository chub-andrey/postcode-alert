# DEFRA air quality fixtures

Real response from the UK-AIR air pollution forecast RSS feed
(`GET https://uk-air.defra.gov.uk/assets/rss/forecast.xml`), saved on 2026-10-02.

The full feed is about 1.7 MB with 5,886 forecast locations, so
`forecast-sample.xml` keeps the feed header and the first 20 `<item>` elements
unchanged. Each item has a location name, coordinates in degrees/minutes/seconds
and the Daily Air Quality Index (1-10) for the next five days.
