# Power cut fixtures

Real responses from distribution network operators, saved on 2026-10-02 around 15:40 UTC.
Files are stored exactly as returned.

| File                                | Operator                               | Source                                                                                                              |
| ----------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `ukpn-live-faults.json`             | UK Power Networks                      | `GET https://ukpowernetworks.opendatasoft.com/api/explore/v2.1/catalog/datasets/ukpn-live-faults/records?limit=100` |
| `ssen-getallfaults.json`            | SSEN                                   | `GET https://external.distribution.prd.ssen.co.uk/opendataportal-prd/v4/api/getallfaults`                           |
| `nged-live-power-cuts.csv`          | National Grid Electricity Distribution | "Live Power Cuts" CSV from the `live-power-cuts` dataset on connecteddata.nationalgrid.co.uk                        |
| `nged-live-detailed-power-cuts.csv` | National Grid Electricity Distribution | "Live Detailed Power Cuts" CSV from the same dataset                                                                |

Timestamps: SSEN uses UTC (`...Z`). UKPN and NGED give local UK time with no offset.
