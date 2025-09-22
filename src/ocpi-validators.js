import { z } from 'zod';

// OCPI 2.2.1-d2 Location Schema
export const LocationSchema_221 = z.object({
    country_code: z.string().length(2, '国家代码必须为2位字符'),
    party_id: z.string().max(3, 'Party ID最大3位字符'),
    id: z.string().max(36, 'Location ID最大36位字符'),
    publish: z.boolean(),
    name: z.string().max(255, '地点名称最大255位字符').optional(),
    address: z.string().max(45, '地址最大45位字符'),
    city: z.string().max(45, '城市最大45位字符'),
    postal_code: z.string().max(10).optional(),
    state: z.string().max(20).optional(),
    country: z.string().length(3, '国家代码必须为3位字符'),
    coordinates: z.object({
        latitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '纬度格式不正确'),
        longitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '经度格式不正确')
    }),
    related_locations: z.array(z.object({
        latitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '纬度格式不正确'),
        longitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '经度格式不正确'),
        name: z.object({
            language: z.string().length(2),
            text: z.string().max(512)
        }).optional()
    })).optional(),
    parking_restrictions: z.array(z.enum(['EV_ONLY', 'PLUGGED', 'DISABLED', 'CUSTOMERS', 'MOTORCYCLES'])).optional(),
    opening_times: z.object({
        twentyfourseven: z.boolean(),
        regular_hours: z.array(z.object({
            weekday: z.number().min(1).max(7),
            period_begin: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
            period_end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        })).optional(),
        exceptional_openings: z.array(z.object({
            period_begin: z.string().datetime(),
            period_end: z.string().datetime()
        })).optional(),
        exceptional_closings: z.array(z.object({
            period_begin: z.string().datetime(),
            period_end: z.string().datetime()
        })).optional()
    }).optional(),
    charging_when_closed: z.boolean().optional(),
    images: z.array(z.object({
        url: z.string().url(),
        thumbnail: z.string().url().optional(),
        category: z.enum(['CHARGER', 'ENTRANCE', 'LOCATION', 'NETWORK', 'OPERATOR', 'OTHER', 'OWNER']),
        type: z.string().max(4),
        width: z.number().int().optional(),
        height: z.number().int().optional()
    })).optional(),
    energy_mix: z.object({
        is_green_energy: z.boolean(),
        energy_sources: z.array(z.object({
            source: z.enum(['NUCLEAR', 'GENERAL_FOSSIL', 'COAL', 'GAS', 'GENERAL_GREEN', 'SOLAR', 'WIND', 'WATER']),
            percentage: z.number().min(0).max(100)
        })).optional(),
        environ_impact: z.array(z.object({
            category: z.enum(['NUCLEAR_WASTE', 'CARBON_DIOXIDE']),
            amount: z.number()
        })).optional(),
        supplier_name: z.string().max(64).optional(),
        energy_product_name: z.string().max(64).optional()
    }).optional(),
    directions: z.array(z.object({
        language: z.string().length(2),
        text: z.string().max(512)
    })).optional(),
    operator: z.object({
        name: z.string().max(100)
    }).optional(),
    suboperator: z.object({
        name: z.string().max(100)
    }).optional(),
    owner: z.object({
        name: z.string().max(100)
    }).optional(),
    facilities: z.array(z.enum(['HOTEL', 'RESTAURANT', 'CAFE', 'MALL', 'SUPERMARKET', 'SPORT', 'RECREATION_AREA', 'NATURE', 'MUSEUM', 'BIKE_SHARING', 'BUS_STOP', 'TAXI_STAND', 'TRAM_STOP', 'METRO_STATION', 'TRAIN_STATION', 'AIRPORT', 'PARKING_LOT', 'CARPOOL_PARKING', 'FUEL_STATION', 'WIFI'])).optional(),
    evses: z.array(z.object({
        uid: z.string().max(36),
        evse_id: z.string().max(48).optional(),
        status: z.enum(['AVAILABLE', 'BLOCKED', 'CHARGING', 'INOPERATIVE', 'OUTOFORDER', 'PLANNED', 'REMOVED', 'RESERVED', 'UNKNOWN']),
        status_schedule: z.array(z.object({
            period_begin: z.string().datetime(),
            period_end: z.string().datetime().optional(),
            status: z.enum(['AVAILABLE', 'BLOCKED', 'CHARGING', 'INOPERATIVE', 'OUTOFORDER', 'PLANNED', 'REMOVED', 'RESERVED', 'UNKNOWN'])
        })).optional(),
        capabilities: z.array(z.enum(['CHARGING_PROFILE_CAPABLE', 'CREDIT_CARD_PAYABLE', 'CONTACTLESS_CARD_PAYABLE', 'CREDIT_CARD_PAYABLE', 'DEBIT_CARD_PAYABLE', 'PED_TERMINAL', 'REMOTE_START_STOP_CAPABLE', 'RESERVABLE', 'RFID_READER', 'TOKEN_GROUP_CAPABLE', 'UNLOCK_CAPABLE'])).optional(),
        connectors: z.array(z.object({
            id: z.string().max(36),
            standard: z.enum(['CHADEMO', 'DOMESTIC_A', 'DOMESTIC_B', 'DOMESTIC_C', 'DOMESTIC_D', 'DOMESTIC_E', 'DOMESTIC_F', 'DOMESTIC_G', 'DOMESTIC_H', 'DOMESTIC_I', 'DOMESTIC_J', 'DOMESTIC_K', 'DOMESTIC_L', 'IEC_60309_2_single_16', 'IEC_60309_2_three_16', 'IEC_60309_2_three_32', 'IEC_60309_2_three_64', 'IEC_62196_T1', 'IEC_62196_T1_COMBO', 'IEC_62196_T2', 'IEC_62196_T2_COMBO', 'IEC_62196_T3A', 'IEC_62196_T3C', 'PANTOGRAPH_BOTTOM_UP', 'PANTOGRAPH_TOP_DOWN', 'TESLA_R', 'TESLA_S']),
            format: z.enum(['SOCKET', 'CABLE']),
            power_type: z.enum(['AC_1_PHASE', 'AC_3_PHASE', 'DC']),
            max_voltage: z.number().int().optional(),
            max_amperage: z.number().int().optional(),
            max_electric_power: z.number().int().optional(),
            tariff_ids: z.array(z.string().max(36)).optional(),
            terms_and_conditions: z.string().url().optional(),
            last_updated: z.string().datetime()
        })),
        floor_level: z.string().max(4).optional(),
        coordinates: z.object({
            latitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '纬度格式不正确'),
            longitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '经度格式不正确')
        }).optional(),
        physical_reference: z.string().max(16).optional(),
        directions: z.array(z.object({
            language: z.string().length(2),
            text: z.string().max(512)
        })).optional(),
        parking_restrictions: z.array(z.enum(['EV_ONLY', 'PLUGGED', 'DISABLED', 'CUSTOMERS', 'MOTORCYCLES'])).optional(),
        images: z.array(z.object({
            url: z.string().url(),
            thumbnail: z.string().url().optional(),
            category: z.enum(['CHARGER', 'ENTRANCE', 'LOCATION', 'NETWORK', 'OPERATOR', 'OTHER', 'OWNER']),
            type: z.string().max(4),
            width: z.number().int().optional(),
            height: z.number().int().optional()
        })).optional(),
        last_updated: z.string().datetime()
    })),
    time_zone: z.string(),
    last_updated: z.string().datetime()
});

// OCPI 2.3.0 Location Schema - Enhanced with new features
export const LocationSchema_230 = z.object({
    country_code: z.string().length(2, '国家代码必须为2位字符'),
    party_id: z.string().max(3, 'Party ID最大3位字符'),
    id: z.string().max(36, 'Location ID最大36位字符'),
    publish: z.boolean(),
    publish_allowed_to: z.array(z.object({
        uid: z.string().max(36),
        type: z.enum(['APP_USER', 'RFID']),
        contract_id: z.string().max(36)
    })).optional(),
    name: z.string().max(255, '地点名称最大255位字符').optional(),
    address: z.string().max(45, '地址最大45位字符'),
    city: z.string().max(45, '城市最大45位字符'),
    postal_code: z.string().max(10).optional(),
    state: z.string().max(20).optional(),
    state: z.string().max(20).optional(),
    country: z.string().length(3, '国家代码必须为3位字符'),
    coordinates: z.object({
        latitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '纬度格式不正确'),
        longitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '经度格式不正确')
    }),
    related_locations: z.array(z.object({
        latitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '纬度格式不正确'),
        longitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '经度格式不正确'),
        name: z.object({
            language: z.string().length(2),
            text: z.string().max(512)
        }).optional()
    })).optional(),
    parking_restrictions: z.array(z.enum(['EV_ONLY', 'PLUGGED', 'DISABLED', 'CUSTOMERS', 'MOTORCYCLES'])).optional(),
    opening_times: z.object({
        twentyfourseven: z.boolean(),
        regular_hours: z.array(z.object({
            weekday: z.number().min(1).max(7),
            period_begin: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
            period_end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        })).optional(),
        exceptional_openings: z.array(z.object({
            period_begin: z.string().datetime(),
            period_end: z.string().datetime()
        })).optional(),
        exceptional_closings: z.array(z.object({
            period_begin: z.string().datetime(),
            period_end: z.string().datetime()
        })).optional()
    }).optional(),
    charging_when_closed: z.boolean().optional(),
    images: z.array(z.object({
        url: z.string().url(),
        thumbnail: z.string().url().optional(),
        category: z.enum(['CHARGER', 'ENTRANCE', 'LOCATION', 'NETWORK', 'OPERATOR', 'OTHER', 'OWNER']),
        type: z.string().max(4),
        width: z.number().int().optional(),
        height: z.number().int().optional()
    })).optional(),
    energy_mix: z.object({
        is_green_energy: z.boolean(),
        energy_sources: z.array(z.object({
            source: z.enum(['NUCLEAR', 'GENERAL_FOSSIL', 'COAL', 'GAS', 'GENERAL_GREEN', 'SOLAR', 'WIND', 'WATER']),
            percentage: z.number().min(0).max(100)
        })).optional(),
        environ_impact: z.array(z.object({
            category: z.enum(['NUCLEAR_WASTE', 'CARBON_DIOXIDE']),
            amount: z.number()
        })).optional(),
        supplier_name: z.string().max(64).optional(),
        energy_product_name: z.string().max(64).optional()
    }).optional(),
    directions: z.array(z.object({
        language: z.string().length(2),
        text: z.string().max(512)
    })).optional(),
    operator: z.object({
        name: z.string().max(100)
    }).optional(),
    suboperator: z.object({
        name: z.string().max(100)
    }).optional(),
    owner: z.object({
        name: z.string().max(100)
    }).optional(),
    facilities: z.array(z.enum(['HOTEL', 'RESTAURANT', 'CAFE', 'MALL', 'SUPERMARKET', 'SPORT', 'RECREATION_AREA', 'NATURE', 'MUSEUM', 'BUS_STOP', 'TAXI_STAND', 'TRAM_STOP', 'METRO_STATION', 'TRAIN_STATION', 'AIRPORT', 'PARKING_LOT', 'CARPOOL_PARKING', 'FUEL_STATION', 'WIFI'])).optional(),
    // New in 2.3.0: Enhanced vehicle support
    vehicle_types: z.array(z.enum(['CAR', 'BIKE', 'TRUCK', 'BUS', 'HDV'])).optional(),
    max_reservation: z.number().int().optional(),
    evses: z.array(z.object({
        uid: z.string().max(36),
        evse_id: z.string().max(48).optional(),
        status: z.enum(['AVAILABLE', 'BLOCKED', 'CHARGING', 'INOPERATIVE', 'OUTOFORDER', 'PLANNED', 'REMOVED', 'RESERVED', 'UNKNOWN']),
        status_schedule: z.array(z.object({
            period_begin: z.string().datetime(),
            period_end: z.string().datetime().optional(),
            status: z.enum(['AVAILABLE', 'BLOCKED', 'CHARGING', 'INOPERATIVE', 'OUTOFORDER', 'PLANNED', 'REMOVED', 'RESERVED', 'UNKNOWN'])
        })).optional(),
        capabilities: z.array(z.enum(['CHARGING_PROFILE_CAPABLE', 'CREDIT_CARD_PAYABLE', 'CONTACTLESS_CARD_PAYABLE', 'CREDIT_CARD_PAYABLE', 'DEBIT_CARD_PAYABLE', 'PED_TERMINAL', 'REMOTE_START_STOP_CAPABLE', 'RESERVABLE', 'RFID_READER', 'TOKEN_GROUP_CAPABLE', 'UNLOCK_CAPABLE'])).optional(),
        // New in 2.3.0: Vehicle type restrictions
        vehicle_types: z.array(z.enum(['CAR', 'BIKE', 'TRUCK', 'BUS', 'HDV'])).optional(),
        connectors: z.array(z.object({
            id: z.string().max(36),
            standard: z.enum(['CHADEMO', 'DOMESTIC_A', 'DOMESTIC_B', 'DOMESTIC_C', 'DOMESTIC_D', 'DOMESTIC_E', 'DOMESTIC_F', 'DOMESTIC_G', 'DOMESTIC_H', 'DOMESTIC_I', 'DOMESTIC_J', 'DOMESTIC_K', 'DOMESTIC_L', 'IEC_60309_2_single_16', 'IEC_60309_2_three_16', 'IEC_60309_2_three_32', 'IEC_60309_2_three_64', 'IEC_62196_T1', 'IEC_62196_T1_COMBO', 'IEC_62196_T2', 'IEC_62196_T2_COMBO', 'IEC_62196_T3A', 'IEC_62196_T3C', 'PANTOGRAPH_BOTTOM_UP', 'PANTOGRAPH_TOP_DOWN', 'TESLA_R', 'TESLA_S', 'GB_T_20234_2', 'GB_T_20234_3', 'CCS']),
            format: z.enum(['SOCKET', 'CABLE']),
            power_type: z.enum(['AC_1_PHASE', 'AC_3_PHASE', 'DC']),
            max_voltage: z.number().int().optional(),
            max_amperage: z.number().int().optional(),
            max_electric_power: z.number().int().optional(),
            tariff_ids: z.array(z.string().max(36)).optional(),
            terms_and_conditions: z.string().url().optional(),
            last_updated: z.string().datetime()
        })),
        floor_level: z.string().max(4).optional(),
        coordinates: z.object({
            latitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '纬度格式不正确'),
            longitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '经度格式不正确')
        }).optional(),
        physical_reference: z.string().max(16).optional(),
        directions: z.array(z.object({
            language: z.string().length(2),
            text: z.string().max(512)
        })).optional(),
        parking_restrictions: z.array(z.enum(['EV_ONLY', 'PLUGGED', 'DISABLED', 'CUSTOMERS', 'MOTORCYCLES'])).optional(),
        images: z.array(z.object({
            url: z.string().url(),
            thumbnail: z.string().url().optional(),
            category: z.enum(['CHARGER', 'ENTRANCE', 'LOCATION', 'NETWORK', 'OPERATOR', 'OTHER', 'OWNER']),
            type: z.string().max(4),
            width: z.number().int().optional(),
            height: z.number().int().optional()
        })).optional(),
        last_updated: z.string().datetime()
    })),
    time_zone: z.string(),
    last_updated: z.string().datetime()
});

// OCPI 2.2.1-d2 Session Module Schema
export const SessionSchema_221 = z.object({
    country_code: z.string().length(2),
    party_id: z.string().max(3),
    id: z.string().max(36),
    start_date_time: z.string().datetime(),
    end_date_time: z.string().datetime().optional(),
    kwh: z.number().nonnegative(),
    cdr_token: CdrTokenSchema,
    auth_method: z.enum(['AUTH_REQUEST', 'COMMAND', 'WHITELIST']),
    authorization_reference: z.string().max(36).optional(),
    location_id: z.string().max(36),
    evse_uid: z.string().max(36),
    connector_id: z.string().max(36),
    meter_id: z.string().max(255).optional(),
    currency: z.string().length(3),
    charging_periods: z.array(z.object({
        start_date_time: z.string().datetime(),
        dimensions: z.array(z.object({
            type: z.enum(['CURRENT', 'ENERGY', 'ENERGY_EXPORT', 'ENERGY_IMPORT', 'MAX_CURRENT', 'MIN_CURRENT', 'MAX_POWER', 'MIN_POWER', 'PARKING_TIME', 'POWER', 'RESERVATION_TIME', 'STATE_OF_CHARGE', 'TIME']),
            volume: z.number()
        })),
        tariff_id: z.string().max(36).optional()
    })).optional(),
    total_cost: z.object({
        excl_vat: z.number().optional(),
        incl_vat: z.number().optional()
    }).optional(),
    status: z.enum(['ACTIVE', 'COMPLETED', 'INVALID', 'PENDING', 'RESERVATION']),
    last_updated: z.string().datetime()
});

// OCPI 2.3.0 Session Module Schema - Enhanced with new features
export const SessionSchema_230 = z.object({
    country_code: z.string().length(2),
    party_id: z.string().max(3),
    id: z.string().max(36),
    start_date_time: z.string().datetime(),
    end_date_time: z.string().datetime().optional(),
    kwh: z.number().nonnegative(),
    cdr_token: z.object({
        uid: z.string(),
        type: z.enum(['RFID', 'APP_USER', 'REMOTE', 'OTHER']),
        contract_id: z.string().optional()
    }),
    auth_method: z.enum(['AUTH_REQUEST', 'COMMAND', 'WHITELIST']),
    authorization_reference: z.string().max(36).optional(),
    location_id: z.string().max(36),
    evse_uid: z.string().max(36),
    connector_id: z.string().max(36),
    meter_id: z.string().max(255).optional(),
    currency: z.string().length(3),
    charging_periods: z.array(z.object({
        start_date_time: z.string().datetime(),
        dimensions: z.array(z.object({
            type: z.enum(['CURRENT', 'ENERGY', 'ENERGY_EXPORT', 'ENERGY_IMPORT', 'MAX_CURRENT', 'MIN_CURRENT', 'MAX_POWER', 'MIN_POWER', 'PARKING_TIME', 'POWER', 'RESERVATION_TIME', 'STATE_OF_CHARGE', 'TIME']),
            volume: z.number()
        })),
        tariff_id: z.string().max(36).optional()
    })).optional(),
    total_cost: z.object({
        excl_vat: z.number().optional(),
        incl_vat: z.number().optional()
    }).optional(),
    // New in 2.3.0: Vehicle information
    vehicle_type: z.enum(['CAR', 'BIKE', 'TRUCK', 'BUS', 'HDV']).optional(),
    vehicle_info: z.object({
        license_plate: z.string().max(20).optional(),
        brand: z.string().max(50).optional(),
        model: z.string().max(50).optional(),
        connector_type: z.enum(['CHADEMO', 'IEC_62196_T2', 'IEC_62196_T2_COMBO', 'GB_T_20234_2', 'GB_T_20234_3', 'CCS', 'TESLA_R', 'TESLA_S']).optional(),
        max_charging_power: z.number().positive().optional()
    }).optional(),
    // New in 2.3.0: Smart charging information
    charging_preferences: z.object({
        departure_time: z.string().datetime().optional(),
        energy_need: z.number().nonnegative().optional(),
        discharge_allowed: z.boolean().optional()
    }).optional(),
    status: z.enum(['ACTIVE', 'COMPLETED', 'INVALID', 'PENDING', 'RESERVATION']),
    last_updated: DateTimeSchema
});

// CDRs Schema
export const CDRSchema = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    id: z.string().max(36, 'CDR ID最大36位字符'),
    start_date_time: DateTimeSchema,
    end_date_time: DateTimeSchema,
    session_id: z.string().max(36).optional(),
    cdr_token: CdrTokenSchema,
    auth_method: z.enum(['AUTH_REQUEST', 'COMMAND', 'WHITELIST']),
    authorization_reference: z.string().max(36).optional(),
    cdr_location: CdrLocationSchema,
    meter_id: z.string().max(255).optional(),
    currency: CurrencyCodeSchema,
    tariffs: z.array(z.object({
        country_code: CountryCodeSchema,
        party_id: PartyIdSchema,
        id: z.string().max(36)
    })).optional(),
    charging_periods: z.array(ChargingPeriodSchema),
    signed_data: z.object({
        encoding_method: z.enum(['BASE64']),
        encoding_method_version: z.number().int().optional(),
        public_key: z.string().optional(),
        signed_values: z.array(z.object({
            nature: z.string().max(32),
            plain_data: z.string().max(512),
            signed_data: z.string().max(5000)
        })),
        url: z.string().url().optional()
    }).optional(),
    total_cost: z.object({
        excl_vat: z.number().optional(),
        incl_vat: z.number().optional()
    }),
    total_fixed_cost: z.object({
        excl_vat: z.number().optional(),
        incl_vat: z.number().optional()
    }).optional(),
    total_energy: z.number().nonnegative(),
    total_energy_cost: z.object({
        excl_vat: z.number().optional(),
        incl_vat: z.number().optional()
    }).optional(),
    total_time: z.number().nonnegative(),
    total_time_cost: z.object({
        excl_vat: z.number().optional(),
        incl_vat: z.number().optional()
    }).optional(),
    total_parking_time: z.number().nonnegative().optional(),
    total_parking_cost: z.object({
        excl_vat: z.number().optional(),
        incl_vat: z.number().optional()
    }).optional(),
    total_reservation_cost: z.object({
        excl_vat: z.number().optional(),
        incl_vat: z.number().optional()
    }).optional(),
    remark: z.string().max(1000).optional(),
    invoice_reference_id: z.string().max(39).optional(),
    credit: z.boolean().optional(),
    credit_reference_id: z.string().max(39).optional(),
    home_charging_compensation: z.boolean().optional(),
    last_updated: DateTimeSchema
});

// OCPI 2.3.0 Booking Module Schema
export const BookingSchema_230 = z.object({
    country_code: z.string().length(2),
    party_id: z.string().max(3),
    id: z.string().max(36, 'Booking ID最大36位字符'),
    token: z.object({
        uid: z.string().max(36),
        type: z.enum(['RFID', 'OTHER']),
        auth_id: z.string().max(36),
        issuer: z.string().max(64),
        valid: z.boolean(),
        whitelist: z.enum(['ALWAYS', 'ALLOWED', 'ALLOWED_OFFLINE', 'NEVER']),
        last_updated: z.string().datetime()
    }),
    location_id: z.string().max(36),
    evse_uid: z.string().max(36),
    connector_id: z.string().max(36).optional(),
    start_date_time: z.string().datetime(),
    end_date_time: z.string().datetime(),
    booking_type: z.enum(['RESERVATION', 'BOOKING']),
    status: z.enum(['ACCEPTED', 'REJECTED', 'EXPIRED', 'CANCELLED', 'ACTIVE', 'COMPLETED']),
    vehicle_type: z.enum(['CAR', 'BIKE', 'TRUCK', 'BUS', 'HDV']).optional(),
    vehicle_details: z.object({
        license_plate: z.string().max(20).optional(),
        brand: z.string().max(50).optional(),
        model: z.string().max(50).optional(),
        connector_type: z.enum(['CHADEMO', 'IEC_62196_T2', 'IEC_62196_T2_COMBO', 'GB_T_20234_2', 'GB_T_20234_3', 'CCS', 'TESLA_R', 'TESLA_S']).optional(),
        max_charging_power: z.number().positive().optional()
    }).optional(),
    estimated_consumption: z.number().nonnegative().optional(),
    booking_restrictions: z.array(z.enum([
        'HDV_ONLY', 'FLEET_ONLY', 'FAST_CHARGING_ONLY'
    ])).optional(),
    cancellation_policy: z.object({
        cancellation_fee: z.object({
            excl_vat: z.number().optional(),
            incl_vat: z.number().optional()
        }).optional(),
        free_cancellation_until: z.string().datetime().optional()
    }).optional(),
    created: z.string().datetime(),
    last_updated: z.string().datetime()
});

// CDR Schema (same for both versions)
export const CDRSchema = z.object({
    country_code: z.string().length(2),
    party_id: z.string().max(3),
    id: z.string().max(36),
    start_date_time: z.string().datetime(),
    end_date_time: z.string().datetime(),
    session_id: z.string().max(36).optional(),
    cdr_token: z.object({
        uid: z.string(),
        type: z.enum(['RFID', 'APP_USER', 'REMOTE', 'OTHER']),
        contract_id: z.string().optional()
    }),
    auth_method: z.enum(['AUTH_REQUEST', 'COMMAND', 'WHITELIST']),
    authorization_reference: z.string().max(36).optional(),
    cdr_location: z.object({
        id: z.string().max(36),
        name: z.string().max(255).optional(),
        address: z.string().max(45),
        city: z.string().max(45),
        postal_code: z.string().max(10).optional(),
        state: z.string().max(20).optional(),
        country: z.string().length(3),
        coordinates: z.object({
            latitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/),
            longitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/)
        }),
        evse_uid: z.string().max(36),
        evse_id: z.string().max(48),
        connector_id: z.string().max(36),
        connector_standard: z.enum(['CHADEMO', 'IEC_62196_T2', 'IEC_62196_T2_COMBO', 'CCS', 'TESLA_R', 'TESLA_S']),
        connector_format: z.enum(['SOCKET', 'CABLE']),
        connector_power_type: z.enum(['AC_1_PHASE', 'AC_3_PHASE', 'DC'])
    }),
    meter_id: z.string().max(255).optional(),
    currency: z.string().length(3),
    charging_periods: z.array(z.object({
        start_date_time: z.string().datetime(),
        dimensions: z.array(z.object({
            type: z.enum(['CURRENT', 'ENERGY', 'ENERGY_EXPORT', 'ENERGY_IMPORT', 'MAX_CURRENT', 'MIN_CURRENT', 'MAX_POWER', 'MIN_POWER', 'PARKING_TIME', 'POWER', 'RESERVATION_TIME', 'STATE_OF_CHARGE', 'TIME']),
            volume: z.number()
        })),
        tariff_id: z.string().max(36).optional()
    })),
    total_cost: z.object({
        excl_vat: z.number().optional(),
        incl_vat: z.number().optional()
    }),
    total_energy: z.number().nonnegative(),
    total_time: z.number().nonnegative(),
    last_updated: z.string().datetime()
});

// Tariff Schema (same for both versions)
export const TariffSchema = z.object({
    country_code: z.string().length(2),
    party_id: z.string().max(3),
    id: z.string().max(36),
    currency: z.string().length(3),
    type: z.enum(['ADHOC_PAYMENT', 'PROFILE_CHEAP', 'PROFILE_FAST', 'PROFILE_GREEN', 'REGULAR']).optional(),
    tariff_alt_text: z.array(z.object({
        language: z.string().length(2),
        text: z.string().max(1000)
    })).optional(),
    tariff_alt_url: z.string().url().optional(),
    min_price: z.object({
        excl_vat: z.number().optional(),
        incl_vat: z.number().optional()
    }).optional(),
    max_price: z.object({
        excl_vat: z.number().optional(),
        incl_vat: z.number().optional()
    }).optional(),
    elements: z.array(z.object({
        price_components: z.array(z.object({
            type: z.enum(['ENERGY', 'FLAT', 'PARKING_TIME', 'TIME']),
            price: z.number(),
            vat: z.number().optional(),
            step_size: z.number().int()
        })),
        restrictions: z.object({
            start_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
            end_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
            start_date: z.string().regex(/^[0-9]{4}-[0-1][0-9]-[0-3][0-9]$/).optional(),
            end_date: z.string().regex(/^[0-9]{4}-[0-1][0-9]-[0-3][0-9]$/).optional(),
            min_kwh: z.number().nonnegative().optional(),
            max_kwh: z.number().nonnegative().optional(),
            min_current: z.number().nonnegative().optional(),
            max_current: z.number().nonnegative().optional(),
            min_power: z.number().nonnegative().optional(),
            max_power: z.number().nonnegative().optional(),
            min_duration: z.number().int().nonnegative().optional(),
            max_duration: z.number().int().nonnegative().optional(),
            day_of_week: z.array(z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'])).optional(),
            reservation: z.enum(['RESERVATION', 'RESERVATION_EXPIRES']).optional()
        }).optional()
    })),
    start_date_time: z.string().datetime().optional(),
    end_date_time: z.string().datetime().optional(),
    energy_mix: z.object({
        is_green_energy: z.boolean(),
        energy_sources: z.array(z.object({
            source: z.enum(['NUCLEAR', 'GENERAL_FOSSIL', 'COAL', 'GAS', 'GENERAL_GREEN', 'SOLAR', 'WIND', 'WATER']),
            percentage: z.number().min(0).max(100)
        })).optional(),
        environ_impact: z.array(z.object({
            category: z.enum(['NUCLEAR_WASTE', 'CARBON_DIOXIDE']),
            amount: z.number()
        })).optional(),
        supplier_name: z.string().max(64).optional(),
        energy_product_name: z.string().max(64).optional()
    }).optional(),
    last_updated: z.string().datetime()
});

// Token Schema (same for both versions but with some differences)
export const TokenSchema = z.object({
    uid: z.string().max(36),
    type: z.enum(['RFID', 'OTHER']),
    auth_id: z.string().max(36),
    issuer: z.string().max(64),
    valid: z.boolean(),
    whitelist: z.enum(['ALWAYS', 'ALLOWED', 'ALLOWED_OFFLINE', 'NEVER']),
    language: z.string().length(2).optional(),
    last_updated: z.string().datetime()
});

// Command Schemas (same for both versions)
export const StartSessionCommandSchema = z.object({
    response_url: z.string().url(),
    token: z.object({
        uid: z.string().max(36),
        type: z.enum(['RFID', 'OTHER']),
        auth_id: z.string().max(36),
        issuer: z.string().max(64),
        valid: z.boolean(),
        whitelist: z.enum(['ALWAYS', 'ALLOWED', 'ALLOWED_OFFLINE', 'NEVER']),
        last_updated: z.string().datetime()
    }),
    location_id: z.string().max(36),
    evse_uid: z.string().max(36),
    connector_id: z.string().max(36).optional()
});

export const StopSessionCommandSchema = z.object({
    response_url: z.string().url(),
    session_id: z.string().max(36)
});

export const ReserveNowCommandSchema = z.object({
    response_url: z.string().url(),
    token: z.object({
        uid: z.string().max(36),
        type: z.enum(['RFID', 'OTHER']),
        auth_id: z.string().max(36),
        issuer: z.string().max(64),
        valid: z.boolean(),
        whitelist: z.enum(['ALWAYS', 'ALLOWED', 'ALLOWED_OFFLINE', 'NEVER']),
        last_updated: z.string().datetime()
    }),
    expiry_date: z.string().datetime(),
    reservation_id: z.string().max(36),
    location_id: z.string().max(36),
    evse_uid: z.string().max(36),
    connector_id: z.string().max(36).optional()
});

export const CancelReservationCommandSchema = z.object({
    response_url: z.string().url(),
    reservation_id: z.string().max(36)
});

export const UnlockConnectorCommandSchema = z.object({
    response_url: z.string().url(),
    location_id: z.string().max(36),
    evse_uid: z.string().max(36),
    connector_id: z.string().max(36)
});

// Version-specific module validators
export const ModuleValidators_221 = {
    locations: LocationSchema_221,
    sessions: SessionSchema_221,
    cdrs: CDRSchema,
    tariffs: TariffSchema,
    tokens: TokenSchema,
    'commands/START_SESSION': StartSessionCommandSchema,
    'commands/STOP_SESSION': StopSessionCommandSchema,
    'commands/RESERVE_NOW': ReserveNowCommandSchema,
    'commands/CANCEL_RESERVATION': CancelReservationCommandSchema,
    'commands/UNLOCK_CONNECTOR': UnlockConnectorCommandSchema
};

export const ModuleValidators_230 = {
    locations: LocationSchema_230,
    sessions: SessionSchema_230,
    bookings: BookingSchema_230,
    cdrs: CDRSchema,
    tariffs: TariffSchema,
    tokens: TokenSchema,
    'commands/START_SESSION': StartSessionCommandSchema,
    'commands/STOP_SESSION': StopSessionCommandSchema,
    'commands/RESERVE_NOW': ReserveNowCommandSchema,
    'commands/CANCEL_RESERVATION': CancelReservationCommandSchema,
    'commands/UNLOCK_CONNECTOR': UnlockConnectorCommandSchema
};

// Legacy compatibility - keeping old names but they point to 2.2.1 schemas
export const LocationSchema = LocationSchema_221;
export const SessionSchema = SessionSchema_221;

// 验证函数
export const validateOCPIJson = (module, jsonData, version = '2.2.1-d2') => {
    let validator;
    
    // Select version-specific validators
    if (version === '2.3.0') {
        if (module === 'bookings') {
            validator = BookingSchema_230;
        } else {
            validator = ModuleValidators_230[module];
        }
    } else {
        // Default to 2.2.1-d2
        if (module === 'bookings') {
            return { valid: false, errors: [`Bookings模块仅在OCPI 2.3.0版本中可用`] };
        }
        validator = ModuleValidators_221[module];
    }
    
    if (!validator) {
        return { valid: false, errors: [`不支持的模块: ${module} (版本: ${version})`] };
    }
    
    const result = validator.safeParse(jsonData);
    if (!result.success) {
        const errors = result.error.issues.map(issue => 
            `${issue.path.join('.')}: ${issue.message}`
        );
        return { valid: false, errors };
    }
    return { valid: true, data: result.data, version };
};
