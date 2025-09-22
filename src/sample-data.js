// Sample OCPI 2.2.1-d2 test data for validation

export const sampleLocation = {
  "country_code": "NL",
  "party_id": "ABC",
  "id": "LOC123",
  "publish": true,
  "name": "Sample Charging Location",
  "address": "Keizersgracht 123",
  "city": "Amsterdam",
  "postal_code": "1015 CJ",
  "country": "NLD",
  "coordinates": {
    "latitude": "52.370216",
    "longitude": "4.895168"
  },
  "evses": [
    {
      "uid": "EVS123",
      "status": "AVAILABLE",
      "connectors": [
        {
          "id": "CON123",
          "standard": "IEC_62196_T2",
          "format": "SOCKET",
          "power_type": "AC_3_PHASE",
          "max_voltage": 400,
          "max_amperage": 32,
          "max_electric_power": 22000,
          "last_updated": "2024-01-15T14:30:00Z"
        }
      ],
      "last_updated": "2024-01-15T14:30:00Z"
    }
  ],
  "time_zone": "Europe/Amsterdam",
  "last_updated": "2024-01-15T14:30:00Z"
};

export const sampleSession = {
  "country_code": "NL",
  "party_id": "ABC", 
  "id": "SES123",
  "start_date_time": "2024-01-15T14:30:00Z",
  "end_date_time": "2024-01-15T15:30:00Z",
  "kwh": 25.5,
  "cdr_token": {
    "uid": "TOK123",
    "type": "RFID",
    "contract_id": "CON123"
  },
  "auth_method": "WHITELIST",
  "location_id": "LOC123",
  "evse_uid": "EVS123",
  "connector_id": "CON123",
  "currency": "EUR",
  "charging_periods": [
    {
      "start_date_time": "2024-01-15T14:30:00Z",
      "dimensions": [
        {
          "type": "ENERGY",
          "volume": 25.5
        }
      ]
    }
  ],
  "total_cost": {
    "excl_vat": 10.21,
    "incl_vat": 12.35
  },
  "status": "COMPLETED",
  "last_updated": "2024-01-15T15:30:00Z"
};

export const sampleCDR = {
  "country_code": "NL",
  "party_id": "ABC",
  "id": "CDR123",
  "start_date_time": "2024-01-15T14:30:00Z",
  "end_date_time": "2024-01-15T15:30:00Z",
  "cdr_token": {
    "uid": "TOK123",
    "type": "RFID",
    "contract_id": "CON123"
  },
  "auth_method": "WHITELIST",
  "cdr_location": {
    "id": "LOC123",
    "address": "Keizersgracht 123",
    "city": "Amsterdam",
    "country": "NLD",
    "coordinates": {
      "latitude": "52.370216",
      "longitude": "4.895168"
    },
    "evse_uid": "EVS123",
    "evse_id": "NL*ABC*E123456",
    "connector_id": "CON123",
    "connector_standard": "IEC_62196_T2",
    "connector_format": "SOCKET",
    "connector_power_type": "AC_3_PHASE"
  },
  "currency": "EUR",
  "charging_periods": [
    {
      "start_date_time": "2024-01-15T14:30:00Z",
      "dimensions": [
        {
          "type": "ENERGY",
          "volume": 25.5
        }
      ]
    }
  ],
  "total_cost": {
    "excl_vat": 10.21,
    "incl_vat": 12.35
  },
  "total_energy": 25.5,
  "total_time": 3600,
  "last_updated": "2024-01-15T15:30:00Z"
};

export const sampleTariff = {
  "country_code": "NL",
  "party_id": "ABC",
  "id": "TAR123",
  "currency": "EUR",
  "elements": [
    {
      "price_components": [
        {
          "type": "ENERGY",
          "price": 0.40,
          "step_size": 1
        }
      ]
    }
  ],
  "last_updated": "2024-01-15T14:30:00Z"
};

export const sampleToken = {
  "uid": "TOK123",
  "type": "RFID",
  "auth_id": "AUTH123",
  "issuer": "Sample Company",
  "valid": true,
  "whitelist": "ALLOWED",
  "last_updated": "2024-01-15T14:30:00Z"
};

export const sampleStartSessionCommand = {
  "response_url": "https://example.com/response",
  "token": {
    "uid": "TOK123",
    "type": "RFID",
    "auth_id": "AUTH123",
    "issuer": "Sample Company",
    "valid": true,
    "whitelist": "ALLOWED",
    "last_updated": "2024-01-15T14:30:00Z"
  },
  "location_id": "LOC123",
  "evse_uid": "EVS123"
};

export const sampleStopSessionCommand = {
  "response_url": "https://example.com/response",
  "session_id": "SES123"
};

export const sampleReserveNowCommand = {
  "response_url": "https://example.com/response",
  "token": {
    "uid": "TOK123",
    "type": "RFID",
    "auth_id": "AUTH123",
    "issuer": "Sample Company",
    "valid": true,
    "whitelist": "ALLOWED",
    "last_updated": "2024-01-15T14:30:00Z"
  },
  "expiry_date": "2024-01-15T16:30:00Z",
  "reservation_id": "RES123",
  "location_id": "LOC123",
  "evse_uid": "EVS123"
};

export const sampleCancelReservationCommand = {
  "response_url": "https://example.com/response",
  "reservation_id": "RES123"
};

export const sampleUnlockConnectorCommand = {
  "response_url": "https://example.com/response",
  "location_id": "LOC123",
  "evse_uid": "EVS123",
  "connector_id": "CON123"
};