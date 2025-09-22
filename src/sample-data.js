// Sample OCPI test data organized by version

// ============= OCPI 2.2.1-d2 Sample Data =============

export const sampleData_221 = {
  location: {
    "country_code": "NL",
    "party_id": "ABC",
    "id": "LOC123",
    "publish": true,
    "name": "Amsterdam Charging Hub 2.2.1",
    "address": "Keizersgracht 123",
    "city": "Amsterdam",
    "postal_code": "1015 CJ",
    "state": "North Holland",
    "country": "NLD",
    "coordinates": {
      "latitude": "52.370216",
      "longitude": "4.895168"
    },
    "related_locations": [{
      "latitude": "52.370316",
      "longitude": "4.895268",
      "name": {
        "language": "en",
        "text": "Parking entrance"
      }
    }],
    "parking_restrictions": ["EV_ONLY", "PLUGGED"],
    "opening_times": {
      "twentyfourseven": true
    },
    "charging_when_closed": false,
    "images": [{
      "url": "https://example.com/images/location.jpg",
      "thumbnail": "https://example.com/images/location_thumb.jpg",
      "category": "LOCATION",
      "type": "jpeg",
      "width": 800,
      "height": 600
    }],
    "energy_mix": {
      "is_green_energy": true,
      "energy_sources": [{
        "source": "SOLAR",
        "percentage": 70.5
      }, {
        "source": "WIND",
        "percentage": 29.5
      }],
      "supplier_name": "Green Energy Co",
      "energy_product_name": "100% Renewable"
    },
    "directions": [{
      "language": "en",
      "text": "Located next to the canal, blue building"
    }],
    "operator": {
      "name": "Amsterdam Charging Network"
    },
    "facilities": ["CAFE", "WIFI", "PARKING_LOT"],
    "evses": [{
      "uid": "EVS123",
      "evse_id": "NL*ABC*E123456",
      "status": "AVAILABLE",
      "capabilities": ["CHARGING_PROFILE_CAPABLE", "REMOTE_START_STOP_CAPABLE", "RFID_READER"],
      "connectors": [{
        "id": "CON123",
        "standard": "IEC_62196_T2",
        "format": "SOCKET",
        "power_type": "AC_3_PHASE",
        "max_voltage": 400,
        "max_amperage": 32,
        "max_electric_power": 22000,
        "tariff_ids": ["TAR123"],
        "last_updated": "2024-01-15T14:30:00Z"
      }],
      "floor_level": "0",
      "physical_reference": "Pole 1",
      "directions": [{
        "language": "en",
        "text": "First charging station on the left"
      }],
      "parking_restrictions": ["EV_ONLY"],
      "images": [{
        "url": "https://example.com/images/evse.jpg",
        "category": "CHARGER",
        "type": "jpeg"
      }],
      "last_updated": "2024-01-15T14:30:00Z"
    }],
    "time_zone": "Europe/Amsterdam",
    "last_updated": "2024-01-15T14:30:00Z"
  },

  session: {
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
    "authorization_reference": "AUTH123",
    "location_id": "LOC123",
    "evse_uid": "EVS123",
    "connector_id": "CON123",
    "meter_id": "MTR123",
    "currency": "EUR",
    "charging_periods": [{
      "start_date_time": "2024-01-15T14:30:00Z",
      "dimensions": [{
        "type": "ENERGY",
        "volume": 25.5
      }, {
        "type": "TIME",
        "volume": 3600
      }],
      "tariff_id": "TAR123"
    }],
    "total_cost": {
      "excl_vat": 10.21,
      "incl_vat": 12.35
    },
    "status": "COMPLETED",
    "last_updated": "2024-01-15T15:30:00Z"
  }
};

// ============= OCPI 2.3.0 Sample Data =============

export const sampleData_230 = {
  location: {
    "country_code": "NL",
    "party_id": "ABC",
    "id": "LOC456",
    "publish": true,
    "publish_allowed_to": [{
      "uid": "PUB123",
      "type": "APP_USER",
      "contract_id": "CONT456"
    }],
    "name": "Smart HDV Charging Hub 2.3.0",
    "address": "Zuiderpark 456",
    "city": "Rotterdam",
    "postal_code": "3083 CX",
    "state": "South Holland",
    "country": "NLD",
    "coordinates": {
      "latitude": "51.890401",
      "longitude": "4.466362"
    },
    "related_locations": [{
      "latitude": "51.890501",
      "longitude": "4.466462",
      "name": {
        "language": "en",
        "text": "HDV parking area entrance"
      }
    }],
    "parking_restrictions": ["EV_ONLY", "PLUGGED"],
    "opening_times": {
      "twentyfourseven": true
    },
    "charging_when_closed": true,
    "images": [{
      "url": "https://example.com/images/hdv_location.jpg",
      "thumbnail": "https://example.com/images/hdv_location_thumb.jpg",
      "category": "LOCATION",
      "type": "jpeg",
      "width": 1200,
      "height": 800
    }],
    "energy_mix": {
      "is_green_energy": true,
      "energy_sources": [{
        "source": "SOLAR",
        "percentage": 60.0
      }, {
        "source": "WIND",
        "percentage": 25.0
      }, {
        "source": "WATER",
        "percentage": 15.0
      }],
      "supplier_name": "Sustainable Fleet Energy",
      "energy_product_name": "HDV Green Power"
    },
    "directions": [{
      "language": "en",
      "text": "Take the dedicated HDV entrance, follow HDV charging signs"
    }],
    "operator": {
      "name": "Rotterdam HDV Charging Network"
    },
    "facilities": ["RESTAURANT", "WIFI", "PARKING_LOT", "FUEL_STATION"],
    "vehicle_types": ["HDV", "TRUCK", "BUS"],
    "max_reservation": 48,
    "evses": [{
      "uid": "EVS456",
      "evse_id": "NL*ABC*E456789",
      "status": "AVAILABLE",
      "capabilities": ["CHARGING_PROFILE_CAPABLE", "REMOTE_START_STOP_CAPABLE", "RFID_READER", "RESERVABLE"],
      "vehicle_types": ["HDV", "TRUCK"],
      "connectors": [{
        "id": "CON456",
        "standard": "CCS",
        "format": "CABLE",
        "power_type": "DC",
        "max_voltage": 1000,
        "max_amperage": 500,
        "max_electric_power": 500000,
        "tariff_ids": ["TAR456"],
        "last_updated": "2024-01-15T14:30:00Z"
      }, {
        "id": "CON457",
        "standard": "GB_T_20234_3",
        "format": "CABLE",
        "power_type": "DC",
        "max_voltage": 1000,
        "max_amperage": 350,
        "max_electric_power": 350000,
        "tariff_ids": ["TAR456"],
        "last_updated": "2024-01-15T14:30:00Z"
      }],
      "floor_level": "0",
      "physical_reference": "HDV Bay 1",
      "directions": [{
        "language": "en",
        "text": "First HDV charging bay on the right, suitable for articulated trucks"
      }],
      "parking_restrictions": ["EV_ONLY"],
      "images": [{
        "url": "https://example.com/images/hdv_charger.jpg",
        "category": "CHARGER",
        "type": "jpeg"
      }],
      "last_updated": "2024-01-15T14:30:00Z"
    }],
    "time_zone": "Europe/Amsterdam",
    "last_updated": "2024-01-15T14:30:00Z"
  },

  session: {
    "country_code": "NL",
    "party_id": "ABC", 
    "id": "SES456",
    "start_date_time": "2024-01-15T14:30:00Z",
    "end_date_time": "2024-01-15T16:30:00Z",
    "kwh": 155.7,
    "cdr_token": {
      "uid": "TOK456",
      "type": "OTHER",
      "contract_id": "HDV_CON456"
    },
    "auth_method": "COMMAND",
    "authorization_reference": "HDV_AUTH456",
    "location_id": "LOC456",
    "evse_uid": "EVS456",
    "connector_id": "CON456",
    "meter_id": "HDV_MTR456",
    "currency": "EUR",
    "charging_periods": [{
      "start_date_time": "2024-01-15T14:30:00Z",
      "dimensions": [{
        "type": "ENERGY",
        "volume": 155.7
      }, {
        "type": "TIME",
        "volume": 7200
      }, {
        "type": "POWER",
        "volume": 350.0
      }],
      "tariff_id": "TAR456"
    }],
    "total_cost": {
      "excl_vat": 93.42,
      "incl_vat": 113.04
    },
    "vehicle_type": "HDV",
    "vehicle_info": {
      "license_plate": "NL-HDV-456",
      "brand": "Volvo",
      "model": "FH Electric",
      "connector_type": "CCS",
      "max_charging_power": 500000
    },
    "charging_preferences": {
      "departure_time": "2024-01-16T06:00:00Z",
      "energy_need": 200.0,
      "discharge_allowed": false
    },
    "status": "COMPLETED",
    "last_updated": "2024-01-15T16:30:00Z"
  },

  booking: {
    "country_code": "NL",
    "party_id": "ABC",
    "id": "BOK456",
    "token": {
      "uid": "TOK456",
      "type": "RFID",
      "auth_id": "HDV_AUTH456",
      "issuer": "HDV Fleet Services",
      "valid": true,
      "whitelist": "ALLOWED",
      "last_updated": "2024-01-15T14:30:00Z"
    },
    "location_id": "LOC456",
    "evse_uid": "EVS456",
    "connector_id": "CON456",
    "start_date_time": "2024-01-16T08:00:00Z",
    "end_date_time": "2024-01-16T12:00:00Z",
    "booking_type": "BOOKING",
    "status": "ACCEPTED",
    "vehicle_type": "HDV",
    "vehicle_details": {
      "license_plate": "NL-HDV-789",
      "brand": "Volvo",
      "model": "FH Electric Articulated",
      "connector_type": "CCS",
      "max_charging_power": 500000
    },
    "estimated_consumption": 180.5,
    "booking_restrictions": ["HDV_ONLY", "FAST_CHARGING_ONLY"],
    "cancellation_policy": {
      "cancellation_fee": {
        "excl_vat": 25.0,
        "incl_vat": 30.25
      },
      "free_cancellation_until": "2024-01-16T06:00:00Z"
    },
    "created": "2024-01-15T14:30:00Z",
    "last_updated": "2024-01-15T14:30:00Z"
  }
};

// ============= Legacy Compatibility Exports =============
// For backwards compatibility - these point to 2.2.1 data by default

export const sampleLocation = sampleData_221.location;
export const sampleSession = sampleData_221.session;
export const sampleBooking = sampleData_230.booking;

// Additional sample data that doesn't have version differences yet
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
  "charging_periods": [{
    "start_date_time": "2024-01-15T14:30:00Z",
    "dimensions": [{
      "type": "ENERGY",
      "volume": 25.5
    }]
  }],
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
  "elements": [{
    "price_components": [{
      "type": "ENERGY",
      "price": 0.40,
      "step_size": 1
    }]
  }],
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