# OCPI 2.1.1-d2 Validation Schema Corrections

Based on the official OCPI 2.1.1-d2 specification PDF, the following corrections have been made to the validation schemas.

## Summary of Changes

### 1. **Session Object Field Names** ✅ CRITICAL FIX
**Issue**: Field names were incorrect
- **Before**: `start_date_time`, `end_date_time`
- **After**: `start_datetime`, `end_datetime` (no underscores)
- **Reason**: OCPI 2.1.1-d2 spec (page 45) shows the field names as `start_datetime` and `end_datetime`

### 2. **CDR Object Structure** ✅ MAJOR FIX
**Issue**: Location object in CDR was simplified incorrectly
- **Before**: Minimal location with single connector reference
- **After**: Complete Location object with nested `evses` array
- **Reason**: OCPI 2.1.1 spec (page 51) shows CDR contains full Location object with EVSEs array

**Changes**:
```javascript
// Added to CDR location:
- type: LocationType (optional)
- evses: Array of EVSE objects (instead of flat evse_uid/evse_id/connector fields)
- Each EVSE contains: uid, evse_id, status, connectors[], last_updated
- Each Connector contains: id, standard, format, power_type, voltage, amperage, tariff_id, last_updated
- last_updated field at location level
```

### 3. **CDR Field Name** ✅ CRITICAL FIX
**Issue**: End time field name was incorrect
- **Before**: `end_date_time`
- **After**: `stop_date_time`
- **Reason**: OCPI 2.1.1 spec explicitly uses `stop_date_time` for CDRs (page 50)

### 4. **CDR Additional Fields** ✅ ENHANCEMENT
**Issue**: Missing optional fields
- **Added**: `total_parking_time` (optional number)
- **Added**: `remark` (optional string, max 255)
- **Added**: `tariffs` array (optional, contains tariff references)
- **Reason**: These fields exist in OCPI 2.1.1 spec (page 50)

### 5. **ChargingPeriod Dimension Types** ✅ MAJOR FIX
**Issue**: Session and CDR had incorrect dimension types
- **Before Session**: Only 4 types (ENERGY, FLAT, PARKING_TIME, TIME)
- **Before CDR**: Only 4 types (ENERGY, FLAT, PARKING_TIME, TIME)
- **After**: 6 types for OCPI 2.1.1: **ENERGY, FLAT, MAX_CURRENT, MIN_CURRENT, PARKING_TIME, TIME**
- **Reason**: OCPI 2.1.1 spec (page 52) defines CdrDimensionType enum with 6 values

**Created separate ChargingPeriod schemas**:
```javascript
// For OCPI 2.1.1 (6 dimension types)
ChargingPeriodSchema_211: ENERGY, FLAT, MAX_CURRENT, MIN_CURRENT, PARKING_TIME, TIME

// For OCPI 2.2.1+ (13 dimension types)
ChargingPeriodSchema: CURRENT, ENERGY, ENERGY_EXPORT, ENERGY_IMPORT, MAX_CURRENT, 
                      MIN_CURRENT, MAX_POWER, MIN_POWER, PARKING_TIME, POWER, 
                      RESERVATION_TIME, STATE_OF_CHARGE, TIME
```

### 6. **Tariff Price Component Types** ✅ VERIFIED
**Issue**: Tariff dimension types were already correct
- **OCPI 2.1.1 TariffDimensionType**: ENERGY, FLAT, PARKING_TIME, TIME (4 types)
- **Status**: No change needed - already correct

## Detailed Field Changes

### SessionSchema_211

| Field | Change | Reason |
|-------|--------|--------|
| `start_date_time` → `start_datetime` | ✅ Renamed | Spec uses `start_datetime` |
| `end_date_time` → `end_datetime` | ✅ Renamed | Spec uses `end_datetime` |
| `charging_periods.dimensions.type` | ✅ Updated enum | Added MAX_CURRENT, MIN_CURRENT |

### CDRSchema_211

| Field | Change | Reason |
|-------|--------|--------|
| `end_date_time` → `stop_date_time` | ✅ Renamed | Spec uses `stop_date_time` |
| `location` structure | ✅ Restructured | Now contains full Location with evses array |
| `location.type` | ✅ Added | Optional LocationType field |
| `location.evses` | ✅ Added | Array of EVSE objects with connectors |
| `location.last_updated` | ✅ Added | Required DateTime field |
| `tariffs` | ✅ Added | Optional array of Tariff references |
| `total_parking_time` | ✅ Added | Optional number field |
| `remark` | ✅ Added | Optional string (max 255 chars) |
| `charging_periods.dimensions.type` | ✅ Updated enum | Added MAX_CURRENT, MIN_CURRENT |

## Testing Recommendations

### 1. Session Object Validation
Test with corrected field names:
```json
{
  "id": "101",
  "start_datetime": "2015-06-29T22:39:09Z",
  "end_datetime": "2015-06-29T23:50:16Z",
  "kwh": 41.00,
  "auth_id": "DE8ACC12E46L89",
  "auth_method": "WHITELIST",
  "location": { ... },
  "currency": "EUR",
  "status": "COMPLETED",
  "last_updated": "2015-06-29T23:09:10Z"
}
```

### 2. CDR Object Validation
Test with complete location structure:
```json
{
  "id": "12345",
  "start_date_time": "2015-06-29T21:39:09Z",
  "stop_date_time": "2015-06-29T23:37:32Z",
  "location": {
    "id": "LOC1",
    "type": "ON_STREET",
    "evses": [{
      "uid": "3256",
      "evse_id": "BE-BEC-E041503003",
      "status": "AVAILABLE",
      "connectors": [{
        "id": "1",
        "standard": "IEC_62196_T2",
        "format": "SOCKET",
        "power_type": "AC_1_PHASE",
        "voltage": 230,
        "amperage": 64,
        "tariff_id": "11",
        "last_updated": "2015-06-29T21:39:01Z"
      }],
      "last_updated": "2015-06-29T21:39:01Z"
    }],
    "last_updated": "2015-06-29T21:39:01Z"
  },
  "charging_periods": [{
    "start_date_time": "2015-06-29T21:39:09Z",
    "dimensions": [{
      "type": "MAX_CURRENT",
      "volume": 30
    }]
  }],
  "total_cost": 4.00,
  "total_energy": 15.342,
  "total_time": 1.973,
  "last_updated": "2015-06-29T22:01:13Z"
}
```

### 3. Charging Period Dimensions
Test all 6 valid dimension types:
- ENERGY
- FLAT
- MAX_CURRENT ← New
- MIN_CURRENT ← New
- PARKING_TIME
- TIME

## Version Differences Summary

### OCPI 2.1.1 vs 2.2.1+

| Feature | OCPI 2.1.1 | OCPI 2.2.1+ |
|---------|------------|-------------|
| Session datetime fields | `start_datetime`, `end_datetime` | `start_date_time`, `end_date_time` |
| CDR end field | `stop_date_time` | `end_date_time` |
| CDR location structure | Full Location with evses array | Simplified CdrLocation |
| Charging dimension types | 6 types | 13 types |
| Tariff dimension types | 4 types | 4 types (same) |

## References

- **OCPI 2.1.1-d2 Specification**: Official PDF document
- **Page 45**: Session object example showing `start_datetime`
- **Page 50**: CDR object definition
- **Page 51**: CDR example with full location structure
- **Page 52**: CdrDimensionType enum definition
- **Page 59**: TariffDimensionType enum definition

## Validation

All schemas have been updated and validated for syntax errors. Run your test suite to ensure compatibility with actual OCPI 2.1.1 implementations.
