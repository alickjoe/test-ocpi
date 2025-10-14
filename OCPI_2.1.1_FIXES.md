# OCPI 2.1.1 Validation Logic Fixes

## Summary
This document details the corrections made to the OCPI 2.1.1 validation logic to align with the official OCPI 2.1.1 specification.

## Changes Made

### 1. Location Schema (LocationSchema_211)

#### Fixed Fields:
- **`type` field**: Changed from **required** to **optional** 
  - In OCPI 2.1.1, the `type` field is optional
  - Before: `type: z.enum([...])` 
  - After: `type: z.enum([...]).optional()`

- **`evses` field**: Changed from **required** to **optional**
  - Before: `evses: z.array(...)`
  - After: `evses: z.array(...).optional()`

- **`time_zone` field**: Changed from **required** to **optional**
  - Before: `time_zone: z.string()`
  - After: `time_zone: z.string().optional()`

### 2. Token Schema (TokenSchema_211)

#### Fixed Fields:
- **`type` enum values**: Updated to include all OCPI 2.1.1 token types
  - Before: `z.enum(['RFID', 'OTHER'])`
  - After: `z.enum(['AD_HOC_USER', 'APP_USER', 'OTHER', 'RFID'])`
  - Added: `AD_HOC_USER` and `APP_USER` types

- **`visual_number` field**: Added missing optional field
  - Added: `visual_number: z.string().max(64).optional()`
  - This field represents the visual readable number/identifier

### 3. CDR Token Schema (CdrTokenSchema)

#### Fixed Fields:
- **`type` enum values**: Updated to match OCPI 2.1.1 specification
  - Before: `z.enum(['RFID', 'APP_USER', 'REMOTE', 'OTHER'])`
  - After: `z.enum(['AD_HOC_USER', 'APP_USER', 'OTHER', 'RFID'])`
  - Changed: `REMOTE` is not in OCPI 2.1.1, replaced with `AD_HOC_USER`

- **`contract_id` field**: Changed from **optional** to **required**
  - Before: `contract_id: z.string().max(36).optional()`
  - After: `contract_id: z.string().max(36)`
  - In OCPI 2.1.1, contract_id is a required field in CDR

### 4. CDR Location Schema (CdrLocationSchema)

#### Fixed Fields:
- **Removed `state` field**: This field doesn't exist in OCPI 2.1.1
  - Removed: `state: z.string().max(20).optional()`
  - The `state` field was introduced in OCPI 2.2.1

- **`connector_standard` enum**: Updated to include all connector types
  - Before: Limited set `['CHADEMO', 'IEC_62196_T2', 'IEC_62196_T2_COMBO', 'CCS', 'TESLA_R', 'TESLA_S']`
  - After: Full set including DOMESTIC_* and IEC_60309_* types
  - Added connector standards:
    - `DOMESTIC_A` through `DOMESTIC_L`
    - `IEC_60309_2_single_16`, `IEC_60309_2_three_16`, `IEC_60309_2_three_32`, `IEC_60309_2_three_64`
    - `IEC_62196_T1`, `IEC_62196_T1_COMBO`, `IEC_62196_T3A`, `IEC_62196_T3C`
    - `PANTOGRAPH_BOTTOM_UP`, `PANTOGRAPH_TOP_DOWN`

### 5. Session Schema (SessionSchema_211)

#### Fixed Fields:
- **`location.type` field**: Changed from **required** to **optional**
  - Before: `type: z.enum([...])`
  - After: `type: z.enum([...]).optional()`

- **`connector_standard` enum**: Updated to match full connector types list
  - Same changes as CDR Location Schema above

### 6. CDR Schema (CDRSchema_211)

#### Fixed Fields:
- **`connector_standard` enum**: Updated to match full connector types list
  - Same changes as CDR Location Schema above

## Key Differences Between OCPI 2.1.1 and Later Versions

### Fields NOT in OCPI 2.1.1:
1. **`state`** field in Location/CdrLocation (introduced in 2.2.1)
2. **`REMOTE`** token type (introduced in 2.2.1)
3. Limited connector standard types (expanded in 2.2.1)

### Fields Required in 2.1.1:
1. **`contract_id`** in CdrToken (became optional in later versions)
2. **`time_zone`** is optional in 2.1.1 (became required in some implementations)

## Connector Standards in OCPI 2.1.1

The following connector standards are supported in OCPI 2.1.1:

- **CHAdeMO**: `CHADEMO`
- **Domestic plugs**: `DOMESTIC_A` through `DOMESTIC_L`
- **IEC 60309 (Industrial)**: 
  - `IEC_60309_2_single_16`
  - `IEC_60309_2_three_16`
  - `IEC_60309_2_three_32`
  - `IEC_60309_2_three_64`
- **IEC 62196 Type 1 (SAE J1772)**: `IEC_62196_T1`, `IEC_62196_T1_COMBO`
- **IEC 62196 Type 2 (Mennekes)**: `IEC_62196_T2`, `IEC_62196_T2_COMBO`
- **IEC 62196 Type 3**: `IEC_62196_T3A`, `IEC_62196_T3C`
- **Pantograph**: `PANTOGRAPH_BOTTOM_UP`, `PANTOGRAPH_TOP_DOWN`
- **Tesla**: `TESLA_R`, `TESLA_S`

Note: `CCS` is not explicitly listed in OCPI 2.1.1 connector standards. Use `IEC_62196_T1_COMBO` or `IEC_62196_T2_COMBO` instead.

## Token Types in OCPI 2.1.1

The following token types are supported:

- **`AD_HOC_USER`**: One-time use token for ad-hoc users
- **`APP_USER`**: Token for app-based authentication
- **`OTHER`**: Other token types
- **`RFID`**: RFID card token

Note: `REMOTE` token type is not in OCPI 2.1.1 specification.

## Validation Testing

To verify the fixes work correctly, test with:

1. **Location data** with optional `type` and `evses` fields
2. **Token data** with `AD_HOC_USER` and `APP_USER` types
3. **CDR data** with various connector standards including `DOMESTIC_*` and `IEC_60309_*` types
4. **Session data** without `location.type` field

## References

- OCPI 2.1.1 Official Specification: https://github.com/ocpi/ocpi (release-2.1.1-bugfixes branch)
- EV Roaming Foundation: https://evroaming.org/

## Date
2025-10-14
