// Sample OCPI test data organized by version

// ============= OCPI 2.1.1-d2 Sample Data =============

export const sampleData_211 = {
  location: {
    "id": "LOC001",
    "type": "PARKING_LOT",
    "name": "Amsterdam Charging Hub 2.1.1",
    "address": "Keizersgracht 123",
    "city": "Amsterdam",
    "postal_code": "1015 CJ",
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
    "evses": [{
      "uid": "EVS123",
      "evse_id": "NL*ABC*E123456",
      "status": "AVAILABLE",
      "capabilities": ["CHARGING_PROFILE_CAPABLE", "REMOTE_START_STOP_CAPABLE", "RESERVABLE"],
      "connectors": [{
        "id": "CON123",
        "standard": "IEC_62196_T2",
        "format": "SOCKET",
        "power_type": "AC_3_PHASE",
        "voltage": 400,
        "amperage": 32,
        "tariff_id": "TAR123",
        "last_updated": "2024-01-15T14:30:00Z"
      }],
      "physical_reference": "P1",
      "directions": [{
        "language": "en",
        "text": "First parking spot on the left"
      }],
      "parking_restrictions": ["EV_ONLY"],
      "images": [{
        "url": "https://example.com/images/charger.jpg",
        "thumbnail": "https://example.com/images/charger_thumb.jpg",
        "category": "CHARGER",
        "type": "jpeg",
        "width": 800,
        "height": 600
      }],
      "last_updated": "2024-01-15T14:30:00Z"
    }],
    "directions": [{
      "language": "en",
      "text": "Take the elevator to level -1"
    }],
    "operator": {
      "name": "Green Energy Co",
      "website": "https://greenenergy.example.com"
    },
    "suboperator": {
      "name": "Local Operator"
    },
    "owner": {
      "name": "Property Owner BV"
    },
    "facilities": ["RESTAURANT", "WIFI", "PARKING_LOT"],
    "time_zone": "Europe/Amsterdam",
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
        "percentage": 60.0
      }, {
        "source": "WIND",
        "percentage": 40.0
      }],
      "supplier_name": "Green Energy Co",
      "energy_product_name": "100% Renewable"
    },
    "last_updated": "2024-01-15T14:30:00Z"
  },

  session: {
    "id": "SES456",
    "start_datetime": "2024-01-15T14:30:00Z",
    "end_datetime": "2024-01-15T15:30:00Z",
    "kwh": 22.5,
    "auth_id": "AUTH123",
    "auth_method": "WHITELIST",
    "location": {
      "id": "LOC001",
      "type": "PARKING_LOT",
      "name": "Amsterdam Charging Hub",
      "address": "Keizersgracht 123",
      "city": "Amsterdam",
      "postal_code": "1015 CJ",
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
    "meter_id": "MTR456",
    "currency": "EUR",
    "charging_periods": [{
      "start_date_time": "2024-01-15T14:30:00Z",
      "dimensions": [{
        "type": "ENERGY",
        "volume": 22.5
      }, {
        "type": "TIME",
        "volume": 3600
      }],
      "tariff_id": "TAR123"
    }],
    "total_cost": 9.50,
    "status": "COMPLETED",
    "last_updated": "2024-01-15T15:30:00Z"
  },

  cdr: {
    "id": "CDR789",
    "start_date_time": "2024-01-15T14:30:00Z",
    "stop_date_time": "2024-01-15T15:30:00Z",
    "auth_id": "AUTH123",
    "auth_method": "WHITELIST",
    "location": {
      "id": "LOC001",
      "name": "Amsterdam Charging Hub",
      "address": "Keizersgracht 123",
      "city": "Amsterdam",
      "postal_code": "1015 CJ",
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
    "meter_id": "MTR456",
    "currency": "EUR",
    "charging_periods": [{
      "start_date_time": "2024-01-15T14:30:00Z",
      "dimensions": [{
        "type": "ENERGY",
        "volume": 22.5
      }, {
        "type": "TIME",
        "volume": 3600
      }],
      "tariff_id": "TAR123"
    }],
    "total_cost": 9.50,
    "total_energy": 22.5,
    "total_time": 3600,
    "last_updated": "2024-01-15T15:30:00Z"
  },

  token: {
    "uid": "TOK456",
    "type": "RFID",
    "auth_id": "AUTH123",
    "issuer": "Green Energy Co",
    "valid": true,
    "whitelist": "ALLOWED",
    "language": "en",
    "last_updated": "2024-01-15T10:00:00Z"
  },

  tariff: {
    "id": "TAR123",
    "currency": "EUR",
    "tariff_alt_text": [{
      "language": "en",
      "text": "Standard charging rate"
    }, {
      "language": "nl",
      "text": "Standaard laadtarief"
    }],
    "tariff_alt_url": "https://example.com/tariff-details",
    "elements": [{
      "price_components": [{
        "type": "ENERGY",
        "price": 0.42,
        "step_size": 1
      }, {
        "type": "TIME",
        "price": 0.10,
        "step_size": 60
      }],
      "restrictions": {
        "start_time": "06:00",
        "end_time": "22:00",
        "day_of_week": ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]
      }
    }, {
      "price_components": [{
        "type": "ENERGY",
        "price": 0.35,
        "step_size": 1
      }],
      "restrictions": {
        "day_of_week": ["SATURDAY", "SUNDAY"]
      }
    }],
    "energy_mix": {
      "is_green_energy": true,
      "energy_sources": [{
        "source": "SOLAR",
        "percentage": 60.0
      }, {
        "source": "WIND",
        "percentage": 40.0
      }],
      "supplier_name": "Green Energy Co",
      "energy_product_name": "100% Renewable"
    },
    "last_updated": "2024-01-15T10:00:00Z"
  }
};

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
    "parking_type": "PARKING_LOT",
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
      "name": "Amsterdam Charging Network",
      "website": "https://amsterdamcharging.example.com"
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
      "country_code": "NL",
      "party_id": "ABC",
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
      "before_taxes": 10.21,
      "taxes": [{
        "name": "VAT",
        "percentage": 21.0,
        "amount": 2.14
      }]
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
    "name": "Smart EV Charging Hub 2.3.0",
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
        "text": "Main parking area entrance"
      }
    }],
    "parking_type": "PARKING_LOT",
    "evses": [{
      "uid": "EVS456",
      "evse_id": "NL*ABC*E456789",
      "status": "AVAILABLE",
      "capabilities": ["CHARGING_PROFILE_CAPABLE", "CHARGING_PREFERENCES_CAPABLE", "REMOTE_START_STOP_CAPABLE", "RFID_READER", "RESERVABLE"],
      "connectors": [{
        "id": "CON456",
        "standard": "IEC_62196_T2_COMBO",
        "format": "CABLE",
        "power_type": "DC",
        "max_voltage": 1000,
        "max_amperage": 500,
        "max_electric_power": 500000,
        "tariff_ids": ["TAR456"],
        "last_updated": "2024-01-15T14:30:00Z"
      }, {
        "id": "CON457",
        "standard": "GBT_DC",
        "format": "CABLE",
        "power_type": "DC",
        "max_voltage": 1000,
        "max_amperage": 350,
        "max_electric_power": 350000,
        "tariff_ids": ["TAR456"],
        "last_updated": "2024-01-15T14:30:00Z"
      }],
      "floor_level": "0",
      "physical_reference": "Bay 1",
      "directions": [{
        "language": "en",
        "text": "First charging bay on the right"
      }],
      "parking_restrictions": ["EV_ONLY"],
      "images": [{
        "url": "https://example.com/images/hdv_charger.jpg",
        "category": "CHARGER",
        "type": "jpeg"
      }],
      "last_updated": "2024-01-15T14:30:00Z"
    }],
    "parking_places": [{
      "id": "PARK001",
      "vehicle_types": ["PERSONAL_VEHICLE", "VAN"],
      "restricted_to_type": false,
      "reservation_required": false
    }],
    "directions": [{
      "language": "en",
      "text": "Take the dedicated entrance, follow charging signs"
    }],
    "operator": {
      "name": "Rotterdam Charging Network",
      "website": "https://rotterdamcharging.example.com"
    },
    "facilities": ["RESTAURANT", "WIFI", "PARKING_LOT", "FUEL_STATION"],
    "time_zone": "Europe/Amsterdam",
    "opening_times": {
      "twentyfourseven": true
    },
    "charging_when_closed": true,
    "images": [{
      "url": "https://example.com/images/location.jpg",
      "thumbnail": "https://example.com/images/location_thumb.jpg",
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
      "energy_product_name": "Green Power"
    },
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
      "country_code": "NL",
      "party_id": "ABC",
      "uid": "TOK456",
      "type": "RFID",
      "contract_id": "CON456"
    },
    "auth_method": "COMMAND",
    "authorization_reference": "AUTH456",
    "location_id": "LOC456",
    "evse_uid": "EVS456",
    "connector_id": "CON456",
    "meter_id": "MTR456",
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
      "before_taxes": 93.42,
      "taxes": [{
        "name": "VAT",
        "percentage": 21.0,
        "amount": 19.62
      }]
    },
    "vehicle_type": "TRUCK_WITH_TRAILER",
    "vehicle_info": {
      "license_plate": "NL-HDV-456",
      "brand": "Volvo",
      "model": "FH Electric",
      "connector_type": "IEC_62196_T2_COMBO",
      "max_charging_power": 500000
    },
    "charging_preferences": {
      "profile_type": "FAST",
      "departure_time": "2024-01-16T06:00:00Z",
      "energy_need": 200.0,
      "discharge_allowed": false
    },
    "status": "COMPLETED",
    "last_updated": "2024-01-15T16:30:00Z"
  },

  booking: {
    "id": "BOK456",
    "country_code": "NL",
    "party_id": "ABC",
    "request_id": "REQ456",
    "location_id": "LOC456",
    "booking_tokens": [{
      "country_code": "NL",
      "party_id": "ABC",
      "uid": "TOK456",
      "type": "RFID",
      "contract_id": "CON456"
    }],
    "tariff_ids": ["TAR456"],
    "period": {
      "start_date_time": "2024-01-16T08:00:00Z",
      "end_date_time": "2024-01-16T12:00:00Z"
    },
    "reservation_status": "RESERVED",
    "authorization_reference": "AUTH456",
    "booking_terms": {
      "supported_access_methods": ["RFID"],
      "change_until_minutes": 60,
      "cancel_until_minutes": 120
    },
    "booking_requests": [{
      "request_status": "ACCEPTED",
      "booking_request": {
        "country_code": "NL",
        "party_id": "ABC",
        "request_id": "REQ456",
        "location_id": "LOC456",
        "booking_location_id": "LOC456",
        "period": {
          "start_date_time": "2024-01-16T08:00:00Z",
          "end_date_time": "2024-01-16T12:00:00Z"
        },
        "authorization_reference": "AUTH456"
      },
      "request_received": "2024-01-15T14:30:00Z"
    }],
    "last_updated": "2024-01-15T14:30:00Z"
  },

  credentials: {
    "token": "abcdefghijklmnopqrstuvwxyz0123456789",
    "url": "https://example.com/ocpi/versions",
    "roles": [{
      "role": "CPO",
      "business_details": {
        "name": "Rotterdam Charging Network",
        "website": "https://rotterdamcharging.example.com"
      },
      "party_id": "ABC",
      "country_code": "NL"
    }]
  },

  versions: {
    "version": "2.3.0",
    "endpoints": [{
      "identifier": "locations",
      "role": "SENDER",
      "url": "https://example.com/ocpi/2.3.0/locations"
    }, {
      "identifier": "sessions",
      "role": "SENDER",
      "url": "https://example.com/ocpi/2.3.0/sessions"
    }]
  },

  chargingprofiles: {
    "country_code": "NL",
    "party_id": "ABC",
    "id": "CP001",
    "session_id": "SES456",
    "charging_rate_unit": "W",
    "charging_profile_periods": [{
      "start_period": 0,
      "limit": 50000
    }, {
      "start_period": 3600,
      "limit": 35000
    }],
    "last_updated": "2024-01-15T14:30:00Z"
  },

  hubclientinfo: {
    "client_id": "HUB001",
    "connection_status": "CONNECTED",
    "last_updated": "2024-01-15T14:30:00Z"
  },

  payments: {
    "country_code": "NL",
    "party_id": "ABC",
    "id": "PAY001",
    "evse_uid": "EVS456",
    "authorization_reference": "AUTH456",
    "total_cost": {
      "before_taxes": 93.42,
      "taxes": [{
        "name": "VAT",
        "percentage": 21.0,
        "amount": 19.62
      }]
    },
    "last_updated": "2024-01-15T16:30:00Z"
  }
};

// ============= Legacy Compatibility Exports =============

export const sampleLocation = sampleData_221.location;
export const sampleSession = sampleData_221.session;
export const sampleBooking = sampleData_230.booking;

// Additional sample data shared across versions
export const sampleCDR = {
  "country_code": "NL",
  "party_id": "ABC",
  "id": "CDR123",
  "start_date_time": "2024-01-15T14:30:00Z",
  "end_date_time": "2024-01-15T15:30:00Z",
  "session_id": "SES123",
  "cdr_token": {
    "country_code": "NL",
    "party_id": "ABC",
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
    "before_taxes": 10.21,
    "taxes": [{
      "name": "VAT",
      "percentage": 21.0,
      "amount": 2.14
    }]
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
  "tax_included": "YES",
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
  "country_code": "NL",
  "party_id": "ABC",
  "uid": "TOK123",
  "type": "RFID",
  "contract_id": "CON123",
  "issuer": "Sample Company",
  "valid": true,
  "whitelist": "ALLOWED",
  "language": "en",
  "last_updated": "2024-01-15T14:30:00Z"
};

export const sampleStartSessionCommand = {
  "response_url": "https://example.com/response",
  "token": {
    "country_code": "NL",
    "party_id": "ABC",
    "uid": "TOK123",
    "type": "RFID",
    "contract_id": "CON123",
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
    "country_code": "NL",
    "party_id": "ABC",
    "uid": "TOK123",
    "type": "RFID",
    "contract_id": "CON123",
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

// New module sample exports
export const sampleCredentials = sampleData_230.credentials;
export const sampleVersionDetails = sampleData_230.versions;
export const sampleChargingProfile = sampleData_230.chargingprofiles;
export const sampleHubClientInfo = sampleData_230.hubclientinfo;
export const samplePayment = sampleData_230.payments;

// OCPI 2.1.1-d2 sample data exports
export const sampleLocation_211 = sampleData_211.location;
export const sampleSession_211 = sampleData_211.session;
export const sampleCDR_211 = sampleData_211.cdr;
export const sampleToken_211 = sampleData_211.token;
export const sampleTariff_211 = sampleData_211.tariff;
