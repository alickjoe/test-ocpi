import { z } from 'zod';

// ============= COMMON SCHEMAS AND HELPERS =============

const CountryCodeSchema = z.string().length(2);
const PartyIdSchema = z.string().max(3);
const DateTimeSchema = z.string().datetime();
const CurrencyCodeSchema = z.string().length(3);

// TokenType enum per OCPI 2.3.0 spec (open enum)
const TokenTypeEnum = ['AD_HOC_USER', 'APP_USER', 'EMAID', 'OTHER', 'RFID'];

// ConnectorType enum per OCPI 2.3.0 spec (open enum)
const ConnectorTypeEnum = [
    'CHADEMO', 'CHAOJI',
    'DOMESTIC_A', 'DOMESTIC_B', 'DOMESTIC_C', 'DOMESTIC_D', 'DOMESTIC_E',
    'DOMESTIC_F', 'DOMESTIC_G', 'DOMESTIC_H', 'DOMESTIC_I', 'DOMESTIC_J',
    'DOMESTIC_K', 'DOMESTIC_L', 'DOMESTIC_M', 'DOMESTIC_N', 'DOMESTIC_O',
    'GBT_AC', 'GBT_DC',
    'IEC_60309_2_single_16', 'IEC_60309_2_three_16', 'IEC_60309_2_three_32', 'IEC_60309_2_three_64',
    'IEC_62196_T1', 'IEC_62196_T1_COMBO', 'IEC_62196_T2', 'IEC_62196_T2_COMBO',
    'IEC_62196_T3A', 'IEC_62196_T3C',
    'MCS',
    'NEMA_5_20', 'NEMA_6_30', 'NEMA_6_50', 'NEMA_10_30', 'NEMA_10_50', 'NEMA_14_30', 'NEMA_14_50',
    'PANTOGRAPH_BOTTOM_UP', 'PANTOGRAPH_TOP_DOWN',
    'SAE_J3400', 'TESLA_R', 'TESLA_S'
];

// ConnectorType for OCPI 2.1.1 (limited set)
const ConnectorTypeEnum_211 = [
    'CHADEMO',
    'DOMESTIC_A', 'DOMESTIC_B', 'DOMESTIC_C', 'DOMESTIC_D', 'DOMESTIC_E',
    'DOMESTIC_F', 'DOMESTIC_G', 'DOMESTIC_H', 'DOMESTIC_I', 'DOMESTIC_J',
    'DOMESTIC_K', 'DOMESTIC_L',
    'IEC_60309_2_single_16', 'IEC_60309_2_three_16', 'IEC_60309_2_three_32', 'IEC_60309_2_three_64',
    'IEC_62196_T1', 'IEC_62196_T1_COMBO', 'IEC_62196_T2', 'IEC_62196_T2_COMBO',
    'IEC_62196_T3A', 'IEC_62196_T3C',
    'PANTOGRAPH_BOTTOM_UP', 'PANTOGRAPH_TOP_DOWN',
    'TESLA_R', 'TESLA_S'
];

// VehicleType enum per OCPI 2.3.0 spec (open enum)
const VehicleTypeEnum = [
    'MOTORCYCLE', 'PERSONAL_VEHICLE', 'PERSONAL_VEHICLE_WITH_TRAILER',
    'VAN', 'SEMI_TRACTOR', 'RIGID', 'TRUCK_WITH_TRAILER', 'BUS', 'DISABLED'
];

// ParkingType enum per OCPI 2.3.0 spec (open enum)
const ParkingTypeEnum = ['ALONG_MOTORWAY', 'PARKING_GARAGE', 'PARKING_LOT', 'ON_DRIVEWAY', 'ON_STREET', 'UNDERGROUND_GARAGE'];

// Status enum
const StatusEnum = ['AVAILABLE', 'BLOCKED', 'CHARGING', 'INOPERATIVE', 'OUTOFORDER', 'PLANNED', 'REMOVED', 'RESERVED', 'UNKNOWN'];

// Capability enum per OCPI 2.3.0 spec
const CapabilityEnum = [
    'CHARGING_PROFILE_CAPABLE', 'CHARGING_PREFERENCES_CAPABLE',
    'CHIP_CARD_SUPPORT', 'CONTACTLESS_CARD_SUPPORT',
    'CREDIT_CARD_PAYABLE', 'DEBIT_CARD_PAYABLE', 'PED_TERMINAL',
    'REMOTE_START_STOP_CAPABLE', 'RESERVABLE', 'RFID_READER',
    'START_SESSION_CONNECTOR_REQUIRED', 'TOKEN_GROUP_CAPABLE', 'UNLOCK_CAPABLE'
];

// PowerType enum per OCPI 2.3.0 spec
const PowerTypeEnum = ['AC_1_PHASE', 'AC_2_PHASE', 'AC_2_PHASE_SPLIT', 'AC_3_PHASE', 'DC'];

// Facility enum per spec
const FacilityEnum = [
    'HOTEL', 'RESTAURANT', 'CAFE', 'MALL', 'SUPERMARKET', 'SPORT', 'RECREATION_AREA',
    'NATURE', 'MUSEUM', 'BIKE_SHARING', 'BUS_STOP', 'TAXI_STAND', 'TRAM_STOP',
    'METRO_STATION', 'TRAIN_STATION', 'AIRPORT', 'PARKING_LOT', 'CARPOOL_PARKING', 'FUEL_STATION', 'WIFI'
];

// ParkingRestriction enum
const ParkingRestrictionEnum = ['CUSTOMERS', 'DISABLED', 'EMPLOYEES', 'EV_ONLY', 'MOTORCYCLES', 'PLUGGED', 'TAXIS', 'TENANTS'];

// GeoLocation coordinates regex: latitude (2 digits), longitude (3 digits for ±180)
const LatitudeRegex = /^-?[0-9]{1,2}\.[0-9]{5,7}$/;
const LongitudeRegex = /^-?[0-9]{1,3}\.[0-9]{5,7}$/;

// GeoLocation schema
const GeoLocationSchema = z.object({
    latitude: z.string().regex(LatitudeRegex),
    longitude: z.string().regex(LongitudeRegex)
});

// DisplayText schema
const DisplayTextSchema = z.object({
    language: z.string().length(2),
    text: z.string().max(512)
});

// Image schema
const ImageSchema = z.object({
    url: z.string().url(),
    thumbnail: z.string().url().optional(),
    category: z.enum(['CHARGER', 'ENTRANCE', 'LOCATION', 'NETWORK', 'OPERATOR', 'OTHER', 'OWNER']),
    type: z.string().max(4),
    width: z.number().int().optional(),
    height: z.number().int().optional()
});

// BusinessDetails schema
const BusinessDetailsSchema = z.object({
    name: z.string().max(100),
    website: z.string().url().optional(),
    logo: ImageSchema.optional()
});

// EnergySource schema
const EnergySourceSchema = z.object({
    source: z.enum(['NUCLEAR', 'GENERAL_FOSSIL', 'COAL', 'GAS', 'GENERAL_GREEN', 'SOLAR', 'WIND', 'WATER']),
    percentage: z.number().min(0).max(100)
});

// EnvironmentalImpact schema
const EnvironmentalImpactSchema = z.object({
    category: z.enum(['NUCLEAR_WASTE', 'CARBON_DIOXIDE']),
    amount: z.number()
});

// EnergyMix schema
const EnergyMixSchema = z.object({
    is_green_energy: z.boolean(),
    energy_sources: z.array(EnergySourceSchema).optional(),
    environ_impact: z.array(EnvironmentalImpactSchema).optional(),
    supplier_name: z.string().max(64).optional(),
    energy_product_name: z.string().max(64).optional()
});

// CdrToken per OCPI 2.3.0 spec (used in Session and CDR)
const CdrTokenSchema = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    uid: z.string().max(36),
    type: z.enum(TokenTypeEnum),
    contract_id: z.string().max(36)
});

// CdrLocation per OCPI 2.3.0 CDR module
const CdrLocationSchema = z.object({
    id: z.string().max(36),
    name: z.string().max(255).optional(),
    address: z.string().max(45),
    city: z.string().max(45),
    postal_code: z.string().max(10).optional(),
    state: z.string().max(20).optional(),
    country: z.string().length(3),
    coordinates: GeoLocationSchema,
    evse_uid: z.string().max(36),
    evse_id: z.string().max(48),
    connector_id: z.string().max(36),
    connector_standard: z.enum(ConnectorTypeEnum),
    connector_format: z.enum(['SOCKET', 'CABLE']),
    connector_power_type: z.enum(PowerTypeEnum)
});

// Price schema per OCPI spec: before_taxes (required) + taxes (optional array of TaxAmount)
const TaxAmountSchema = z.object({
    name: z.string(),
    account_number: z.string().optional(),
    percentage: z.number().optional(),
    amount: z.number()
});

const PriceSchema = z.object({
    before_taxes: z.number(),
    taxes: z.array(TaxAmountSchema).optional()
});

// PriceLimit schema: before_taxes (required) + after_taxes (optional)
const PriceLimitSchema = z.object({
    before_taxes: z.number(),
    after_taxes: z.number().optional()
});

// ChargingPeriod for OCPI 2.2.1 and later (with all CdrDimensionType values)
const CdrDimensionTypeEnum = [
    'CURRENT', 'ENERGY', 'ENERGY_EXPORT', 'ENERGY_IMPORT',
    'MAX_CURRENT', 'MIN_CURRENT', 'MAX_POWER', 'MIN_POWER',
    'PARKING_TIME', 'POWER', 'RESERVATION_TIME',
    'RESERVATION_EXPIRES', 'RESERVATION_OVERTIME',
    'STATE_OF_CHARGE', 'TIME'
];

const ChargingPeriodSchema = z.object({
    start_date_time: DateTimeSchema,
    dimensions: z.array(z.object({
        type: z.enum(CdrDimensionTypeEnum),
        volume: z.number()
    })),
    tariff_id: z.string().max(36).optional()
});

// ChargingPeriod for OCPI 2.1.1 (limited dimension types)
const ChargingPeriodSchema_211 = z.object({
    start_date_time: DateTimeSchema,
    dimensions: z.array(z.object({
        type: z.enum(['ENERGY', 'FLAT', 'MAX_CURRENT', 'MIN_CURRENT', 'PARKING_TIME', 'TIME']),
        volume: z.number()
    })),
    tariff_id: z.string().max(36).optional()
});

// ============= OCPI 2.1.1-d2 SCHEMAS =============

// OCPI 2.1.1-d2 Location Schema
export const LocationSchema_211 = z.object({
    id: z.string().max(36, 'Location ID最大36位字符'),
    type: z.enum(['ON_STREET', 'PARKING_GARAGE', 'UNDERGROUND_GARAGE', 'PARKING_LOT', 'OTHER']).optional(),
    name: z.string().max(255, '地点名称最大255位字符').optional(),
    address: z.string().max(45, '地址最大45位字符'),
    city: z.string().max(45, '城市最大45位字符'),
    postal_code: z.string().max(10).optional(),
    country: z.string().length(3, '国家代码必须为3位字符'),
    coordinates: GeoLocationSchema,
    related_locations: z.array(z.object({
        latitude: z.string().regex(LatitudeRegex, '纬度格式不正确'),
        longitude: z.string().regex(LongitudeRegex, '经度格式不正确'),
        name: DisplayTextSchema.optional()
    })).optional(),
    evses: z.array(z.object({
        uid: z.string().max(36),
        evse_id: z.string().max(48).optional(),
        status: z.enum(StatusEnum),
        status_schedule: z.array(z.object({
            period_begin: DateTimeSchema,
            period_end: DateTimeSchema.optional(),
            status: z.enum(StatusEnum)
        })).optional(),
        capabilities: z.array(z.enum(['CHARGING_PROFILE_CAPABLE', 'CREDIT_CARD_PAYABLE', 'REMOTE_START_STOP_CAPABLE', 'RESERVABLE', 'RFID_READER', 'UNLOCK_CAPABLE'])).optional(),
        connectors: z.array(z.object({
            id: z.string().max(36),
            standard: z.enum(ConnectorTypeEnum_211),
            format: z.enum(['SOCKET', 'CABLE']),
            power_type: z.enum(['AC_1_PHASE', 'AC_3_PHASE', 'DC']),
            voltage: z.number().int().optional(),
            amperage: z.number().int().optional(),
            tariff_id: z.string().max(36).optional(),
            terms_and_conditions: z.string().url().optional(),
            last_updated: DateTimeSchema
        })),
        physical_reference: z.string().max(16).optional(),
        directions: z.array(DisplayTextSchema).optional(),
        parking_restrictions: z.array(z.enum(ParkingRestrictionEnum)).optional(),
        images: z.array(ImageSchema).optional(),
        last_updated: DateTimeSchema
    })).optional(),
    directions: z.array(DisplayTextSchema).optional(),
    operator: BusinessDetailsSchema.optional(),
    suboperator: BusinessDetailsSchema.optional(),
    owner: BusinessDetailsSchema.optional(),
    facilities: z.array(z.enum(FacilityEnum)).optional(),
    time_zone: z.string().optional(),
    opening_times: z.object({
        twentyfourseven: z.boolean(),
        regular_hours: z.array(z.object({
            weekday: z.number().int().min(1).max(7),
            period_begin: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
            period_end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        })).optional(),
        exceptional_openings: z.array(z.object({
            period_begin: DateTimeSchema,
            period_end: DateTimeSchema
        })).optional(),
        exceptional_closings: z.array(z.object({
            period_begin: DateTimeSchema,
            period_end: DateTimeSchema
        })).optional()
    }).optional(),
    charging_when_closed: z.boolean().optional(),
    images: z.array(ImageSchema).optional(),
    energy_mix: EnergyMixSchema.optional(),
    last_updated: DateTimeSchema
});

// OCPI 2.1.1-d2 Session Schema
export const SessionSchema_211 = z.object({
    id: z.string().max(36),
    start_datetime: DateTimeSchema,
    end_datetime: DateTimeSchema.optional(),
    kwh: z.number().nonnegative(),
    auth_id: z.string().max(36),
    auth_method: z.enum(['AUTH_REQUEST', 'WHITELIST']),
    location: z.object({
        id: z.string().max(36),
        type: z.enum(['ON_STREET', 'PARKING_GARAGE', 'UNDERGROUND_GARAGE', 'PARKING_LOT', 'OTHER']).optional(),
        name: z.string().max(255).optional(),
        address: z.string().max(45),
        city: z.string().max(45),
        postal_code: z.string().max(10).optional(),
        country: z.string().length(3),
        coordinates: GeoLocationSchema,
        evse_uid: z.string().max(36),
        evse_id: z.string().max(48),
        connector_id: z.string().max(36),
        connector_standard: z.enum(ConnectorTypeEnum_211),
        connector_format: z.enum(['SOCKET', 'CABLE']),
        connector_power_type: z.enum(['AC_1_PHASE', 'AC_3_PHASE', 'DC'])
    }),
    meter_id: z.string().max(255).optional(),
    currency: z.string().length(3),
    charging_periods: z.array(ChargingPeriodSchema_211).optional(),
    total_cost: z.number().nonnegative().optional(),
    status: z.enum(['ACTIVE', 'COMPLETED', 'INVALID', 'PENDING']),
    last_updated: DateTimeSchema
});

// OCPI 2.1.1-d2 CDR Schema
export const CDRSchema_211 = z.object({
    id: z.string().max(36),
    start_date_time: DateTimeSchema,
    stop_date_time: DateTimeSchema,
    auth_id: z.string().max(36),
    auth_method: z.enum(['AUTH_REQUEST', 'WHITELIST']),
    location: z.object({
        id: z.string().max(36),
        type: z.enum(['ON_STREET', 'PARKING_GARAGE', 'UNDERGROUND_GARAGE', 'PARKING_LOT', 'OTHER']).optional(),
        name: z.string().max(255).optional(),
        address: z.string().max(45),
        city: z.string().max(45),
        postal_code: z.string().max(10).optional(),
        country: z.string().length(3),
        coordinates: GeoLocationSchema,
        evses: z.array(z.object({
            uid: z.string().max(36),
            evse_id: z.string().max(48).optional(),
            status: z.enum(StatusEnum),
            connectors: z.array(z.object({
                id: z.string().max(36),
                standard: z.enum(ConnectorTypeEnum_211),
                format: z.enum(['SOCKET', 'CABLE']),
                power_type: z.enum(['AC_1_PHASE', 'AC_3_PHASE', 'DC']),
                voltage: z.number().int().optional(),
                amperage: z.number().int().optional(),
                tariff_id: z.string().max(36).optional(),
                last_updated: DateTimeSchema
            })),
            last_updated: DateTimeSchema
        })),
        last_updated: DateTimeSchema
    }),
    meter_id: z.string().max(255).optional(),
    currency: z.string().length(3),
    tariffs: z.array(z.object({
        id: z.string().max(36),
        currency: z.string().length(3),
        elements: z.array(z.object({
            price_components: z.array(z.object({
                type: z.enum(['ENERGY', 'FLAT', 'PARKING_TIME', 'TIME']),
                price: z.number(),
                step_size: z.number().int()
            }))
        })),
        last_updated: DateTimeSchema
    })).optional(),
    charging_periods: z.array(ChargingPeriodSchema_211),
    total_cost: z.number().nonnegative(),
    total_energy: z.number().nonnegative(),
    total_time: z.number().nonnegative(),
    total_parking_time: z.number().nonnegative().optional(),
    remark: z.string().max(255).optional(),
    last_updated: DateTimeSchema
});

// OCPI 2.1.1-d2 Token Schema
export const TokenSchema_211 = z.object({
    uid: z.string().max(36),
    type: z.enum(['AD_HOC_USER', 'APP_USER', 'OTHER', 'RFID']),
    auth_id: z.string().max(36),
    visual_number: z.string().max(64).optional(),
    issuer: z.string().max(64),
    valid: z.boolean(),
    whitelist: z.enum(['ALWAYS', 'ALLOWED', 'ALLOWED_OFFLINE', 'NEVER']),
    language: z.string().length(2).optional(),
    last_updated: DateTimeSchema
});

// OCPI 2.1.1-d2 Tariff Schema
export const TariffSchema_211 = z.object({
    id: z.string().max(36),
    currency: z.string().length(3),
    tariff_alt_text: z.array(DisplayTextSchema).optional(),
    tariff_alt_url: z.string().url().optional(),
    elements: z.array(z.object({
        price_components: z.array(z.object({
            type: z.enum(['ENERGY', 'FLAT', 'PARKING_TIME', 'TIME']),
            price: z.number(),
            step_size: z.number().int()
        })),
        restrictions: z.object({
            start_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
            end_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
            start_date: z.string().date().optional(),
            end_date: z.string().date().optional(),
            min_kwh: z.number().nonnegative().optional(),
            max_kwh: z.number().nonnegative().optional(),
            min_power: z.number().nonnegative().optional(),
            max_power: z.number().nonnegative().optional(),
            min_duration: z.number().int().nonnegative().optional(),
            max_duration: z.number().int().nonnegative().optional(),
            day_of_week: z.array(z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'])).optional()
        }).optional()
    })),
    energy_mix: EnergyMixSchema.optional(),
    last_updated: DateTimeSchema
});

// ============= OCPI 2.2.1-d2 SCHEMAS =============

// EVSE schema for 2.2.1
const EVSESchema_221 = z.object({
    uid: z.string().max(36),
    evse_id: z.string().max(48).optional(),
    status: z.enum(StatusEnum),
    status_schedule: z.array(z.object({
        period_begin: DateTimeSchema,
        period_end: DateTimeSchema.optional(),
        status: z.enum(StatusEnum)
    })).optional(),
    capabilities: z.array(z.enum(CapabilityEnum)).optional(),
    connectors: z.array(z.object({
        id: z.string().max(36),
        standard: z.enum(ConnectorTypeEnum),
        format: z.enum(['SOCKET', 'CABLE']),
        power_type: z.enum(PowerTypeEnum),
        max_voltage: z.number().int(),
        max_amperage: z.number().int(),
        max_electric_power: z.number().int().optional(),
        tariff_ids: z.array(z.string().max(36)).optional(),
        terms_and_conditions: z.string().url().optional(),
        capabilities: z.array(z.enum(['ISO_15118_2_PLUG_AND_CHARGE', 'ISO_15118_20_PLUG_AND_CHARGE'])).optional(),
        last_updated: DateTimeSchema
    })),
    floor_level: z.string().max(4).optional(),
    coordinates: GeoLocationSchema.optional(),
    physical_reference: z.string().max(16).optional(),
    directions: z.array(DisplayTextSchema).optional(),
    parking_restrictions: z.array(z.enum(ParkingRestrictionEnum)).optional(),
    images: z.array(ImageSchema).optional(),
    last_updated: DateTimeSchema
});

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
    coordinates: GeoLocationSchema,
    related_locations: z.array(z.object({
        latitude: z.string().regex(LatitudeRegex, '纬度格式不正确'),
        longitude: z.string().regex(LongitudeRegex, '经度格式不正确'),
        name: DisplayTextSchema.optional()
    })).optional(),
    parking_type: z.enum(ParkingTypeEnum).optional(),
    opening_times: z.object({
        twentyfourseven: z.boolean(),
        regular_hours: z.array(z.object({
            weekday: z.number().min(1).max(7),
            period_begin: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
            period_end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        })).optional(),
        exceptional_openings: z.array(z.object({
            period_begin: DateTimeSchema,
            period_end: DateTimeSchema
        })).optional(),
        exceptional_closings: z.array(z.object({
            period_begin: DateTimeSchema,
            period_end: DateTimeSchema
        })).optional()
    }).optional(),
    charging_when_closed: z.boolean().optional(),
    images: z.array(ImageSchema).optional(),
    energy_mix: EnergyMixSchema.optional(),
    directions: z.array(DisplayTextSchema).optional(),
    operator: BusinessDetailsSchema.optional(),
    suboperator: BusinessDetailsSchema.optional(),
    owner: BusinessDetailsSchema.optional(),
    facilities: z.array(z.enum(FacilityEnum)).optional(),
    evses: z.array(EVSESchema_221),
    time_zone: z.string(),
    last_updated: DateTimeSchema
});

// OCPI 2.2.1-d2 Session Schema
export const SessionSchema_221 = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    id: z.string().max(36),
    start_date_time: DateTimeSchema,
    end_date_time: DateTimeSchema.optional(),
    kwh: z.number().nonnegative(),
    cdr_token: CdrTokenSchema,
    auth_method: z.enum(['AUTH_REQUEST', 'COMMAND', 'WHITELIST']),
    authorization_reference: z.string().max(36).optional(),
    location_id: z.string().max(36),
    evse_uid: z.string().max(36),
    connector_id: z.string().max(36),
    meter_id: z.string().max(255).optional(),
    currency: CurrencyCodeSchema,
    charging_periods: z.array(ChargingPeriodSchema).optional(),
    total_cost: PriceSchema.optional(),
    status: z.enum(['ACTIVE', 'COMPLETED', 'INVALID', 'PENDING', 'RESERVATION']),
    last_updated: DateTimeSchema
});

// ============= OCPI 2.3.0 SCHEMAS =============

// PublishTokenType
const PublishTokenTypeSchema = z.object({
    uid: z.string().max(36),
    type: z.enum(TokenTypeEnum),
    visual_number: z.string().max(64).optional(),
    issuer: z.string().max(64).optional(),
    group_id: z.string().max(36).optional()
});

// StatusSchedule
const StatusScheduleSchema = z.object({
    period_begin: DateTimeSchema,
    period_end: DateTimeSchema.optional(),
    status: z.enum(StatusEnum)
});

// EVSEParking (new in 2.3.0)
const EVSEParkingSchema = z.object({
    parking_id: z.string().max(36),
    evse_position: z.enum(['LEFT', 'RIGHT', 'CENTER']).optional()
});

// Connector schema for 2.3.0
const ConnectorSchema_230 = z.object({
    id: z.string().max(36),
    standard: z.enum(ConnectorTypeEnum),
    format: z.enum(['SOCKET', 'CABLE']),
    power_type: z.enum(PowerTypeEnum),
    max_voltage: z.number().int(),
    max_amperage: z.number().int(),
    max_electric_power: z.number().int().optional(),
    tariff_ids: z.array(z.string().max(36)).optional(),
    terms_and_conditions: z.string().url().optional(),
    capabilities: z.array(z.enum(['ISO_15118_2_PLUG_AND_CHARGE', 'ISO_15118_20_PLUG_AND_CHARGE'])).optional(),
    last_updated: DateTimeSchema
});

// EVSE schema for 2.3.0
const EVSESchema_230 = z.object({
    uid: z.string().max(36),
    evse_id: z.string().max(48).optional(),
    status: z.enum(StatusEnum),
    status_schedule: z.array(StatusScheduleSchema).optional(),
    capabilities: z.array(z.enum(CapabilityEnum)).optional(),
    connectors: z.array(ConnectorSchema_230),
    floor_level: z.string().max(4).optional(),
    coordinates: GeoLocationSchema.optional(),
    physical_reference: z.string().max(16).optional(),
    directions: z.array(DisplayTextSchema).optional(),
    parking_restrictions: z.array(z.enum(ParkingRestrictionEnum)).optional(),
    parking: z.array(EVSEParkingSchema).optional(),
    accepted_service_providers: z.array(z.string().max(50)).optional(),
    images: z.array(ImageSchema).optional(),
    last_updated: DateTimeSchema
});

// Parking schema (new in 2.3.0)
const ParkingSchema = z.object({
    id: z.string().max(36),
    physical_reference: z.string().max(12).optional(),
    vehicle_types: z.array(z.enum(VehicleTypeEnum)),
    max_vehicle_weight: z.number().optional(),
    max_vehicle_height: z.number().optional(),
    max_vehicle_length: z.number().optional(),
    max_vehicle_width: z.number().optional(),
    parking_space_length: z.number().optional(),
    parking_space_width: z.number().optional(),
    dangerous_goods_allowed: z.boolean().optional(),
    direction: z.enum(['PARALLEL', 'PERPENDICULAR', 'ANGLE']).optional(),
    drive_through: z.boolean().optional(),
    restricted_to_type: z.boolean(),
    reservation_required: z.boolean(),
    time_limit: z.number().optional(),
    roofed: z.boolean().optional(),
    images: z.array(ImageSchema).optional(),
    lighting: z.boolean().optional(),
    refrigeration_outlet: z.boolean().optional(),
    standards: z.array(z.string().max(36)).optional(),
    apds_reference: z.string().optional()
});

// Hours schema with proper time regex
const RegularHoursSchema = z.object({
    weekday: z.number().int().min(1).max(7),
    period_begin: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/),
    period_end: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
});

const ExceptionalPeriodSchema = z.object({
    period_begin: DateTimeSchema,
    period_end: DateTimeSchema
});

const HoursSchema = z.object({
    twentyfourseven: z.boolean(),
    regular_hours: z.array(RegularHoursSchema).optional(),
    exceptional_openings: z.array(ExceptionalPeriodSchema).optional(),
    exceptional_closings: z.array(ExceptionalPeriodSchema).optional()
});

// OCPI 2.3.0 Location Schema
export const LocationSchema_230 = z.object({
    country_code: z.string().length(2, '国家代码必须为2位字符'),
    party_id: z.string().max(3, 'Party ID最大3位字符'),
    id: z.string().max(36, 'Location ID最大36位字符'),
    publish: z.boolean(),
    publish_allowed_to: z.array(PublishTokenTypeSchema).optional(),
    name: z.string().max(255, '地点名称最大255位字符').optional(),
    address: z.string().max(45, '地址最大45位字符'),
    city: z.string().max(45, '城市最大45位字符'),
    postal_code: z.string().max(10).optional(),
    state: z.string().max(20).optional(),
    country: z.string().length(3, '国家代码必须为3位字符'),
    coordinates: GeoLocationSchema,
    related_locations: z.array(z.object({
        latitude: z.string().regex(LatitudeRegex, '纬度格式不正确'),
        longitude: z.string().regex(LongitudeRegex, '经度格式不正确'),
        name: DisplayTextSchema.optional()
    })).optional(),
    parking_type: z.enum(ParkingTypeEnum).optional(),
    evses: z.array(EVSESchema_230).optional(),
    parking_places: z.array(ParkingSchema).optional(),
    directions: z.array(DisplayTextSchema).optional(),
    operator: BusinessDetailsSchema.optional(),
    suboperator: BusinessDetailsSchema.optional(),
    owner: BusinessDetailsSchema.optional(),
    facilities: z.array(z.enum(FacilityEnum)).optional(),
    time_zone: z.string().max(255),
    opening_times: HoursSchema.optional(),
    charging_when_closed: z.boolean().optional(),
    images: z.array(ImageSchema).optional(),
    energy_mix: EnergyMixSchema.optional(),
    help_phone: z.string().max(25).optional(),
    last_updated: DateTimeSchema
});

// VehicleInfo schema (2.3.0)
const VehicleInfoSchema = z.object({
    license_plate: z.string().max(20).optional(),
    brand: z.string().max(50).optional(),
    model: z.string().max(50).optional(),
    connector_type: z.enum(ConnectorTypeEnum).optional(),
    max_charging_power: z.number().positive().optional()
});

// ChargingPreferences schema (2.3.0)
const ChargingPreferencesSchema = z.object({
    profile_type: z.enum(['CHEAP', 'FAST', 'GREEN', 'REGULAR']),
    departure_time: DateTimeSchema.optional(),
    energy_need: z.number().optional(),
    discharge_allowed: z.boolean().optional()
});

// OCPI 2.3.0 Session Schema
export const SessionSchema_230 = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    id: z.string().max(36),
    start_date_time: DateTimeSchema,
    end_date_time: DateTimeSchema.optional(),
    kwh: z.number().nonnegative(),
    cdr_token: CdrTokenSchema,
    auth_method: z.enum(['AUTH_REQUEST', 'COMMAND', 'WHITELIST']),
    authorization_reference: z.string().max(36).optional(),
    location_id: z.string().max(36),
    evse_uid: z.string().max(36),
    connector_id: z.string().max(36),
    meter_id: z.string().max(255).optional(),
    currency: CurrencyCodeSchema,
    charging_periods: z.array(ChargingPeriodSchema).optional(),
    total_cost: PriceSchema.optional(),
    vehicle_type: z.enum(VehicleTypeEnum).optional(),
    vehicle_info: VehicleInfoSchema.optional(),
    charging_preferences: ChargingPreferencesSchema.optional(),
    status: z.enum(['ACTIVE', 'COMPLETED', 'INVALID', 'PENDING', 'RESERVATION']),
    last_updated: DateTimeSchema
});

// SignedData schema for CDR 2.3.0
const SignedValueSchema = z.object({
    nature: z.string().max(32),
    plain_data: z.string().max(512),
    signed_data: z.string().max(5000)
});

const SignedDataSchema = z.object({
    encoding_method: z.string().max(36),
    encoding_method_version: z.number().int().optional(),
    public_key: z.string().max(512).optional(),
    signed_values: z.array(SignedValueSchema),
    url: z.string().max(512).optional()
});

// Inline Tariff for CDR 2.3.0
const CDRInlineTariffSchema = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    id: z.string().max(36),
    currency: CurrencyCodeSchema,
    type: z.enum(['AD_HOC_PAYMENT', 'PROFILE_CHEAP', 'PROFILE_FAST', 'PROFILE_GREEN', 'REGULAR']).optional(),
    tariff_alt_text: z.array(DisplayTextSchema).optional(),
    tariff_alt_url: z.string().url().optional(),
    min_price: PriceLimitSchema.optional(),
    max_price: PriceLimitSchema.optional(),
    preauthorize_amount: z.number().optional(),
    tax_included: z.enum(['YES', 'NO', 'N/A']),
    elements: z.array(z.object({
        price_components: z.array(z.object({
            type: z.enum(['ENERGY', 'FLAT', 'PARKING_TIME', 'TIME']),
            price: z.number(),
            vat: z.number().optional(),
            step_size: z.number().int()
        })),
        restrictions: z.object({
            start_time: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/).optional(),
            end_time: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/).optional(),
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
            reservation: z.enum(['RESERVATION', 'RESERVATION_EXPIRES']).optional(),
            booking: z.enum(['BOOKING', 'BOOKING_EXPIRES', 'BOOKING_CANCELLATION_FEES', 'BOOKING_OVERTIME']).optional()
        }).optional()
    })),
    start_date_time: DateTimeSchema.optional(),
    end_date_time: DateTimeSchema.optional(),
    energy_mix: EnergyMixSchema.optional(),
    last_updated: DateTimeSchema
});

// OCPI 2.3.0 CDR Schema
export const CDRSchema_230 = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    id: z.string().max(39, 'CDR ID最大39位字符'),
    start_date_time: DateTimeSchema,
    end_date_time: DateTimeSchema,
    session_id: z.string().max(36).optional(),
    booking_id: z.string().max(36).optional(),
    cdr_token: CdrTokenSchema,
    auth_method: z.enum(['AUTH_REQUEST', 'COMMAND', 'WHITELIST']),
    authorization_reference: z.string().max(36).optional(),
    cdr_location: CdrLocationSchema,
    meter_id: z.string().max(255).optional(),
    currency: CurrencyCodeSchema,
    tariffs: z.array(CDRInlineTariffSchema).optional(),
    charging_periods: z.array(ChargingPeriodSchema),
    signed_data: SignedDataSchema.optional(),
    total_cost: PriceSchema,
    total_fixed_cost: PriceSchema.optional(),
    total_energy: z.number().nonnegative(),
    total_energy_cost: PriceSchema.optional(),
    total_time: z.number().nonnegative(),
    total_time_cost: PriceSchema.optional(),
    total_parking_time: z.number().nonnegative().optional(),
    total_parking_cost: PriceSchema.optional(),
    total_reservation_cost: PriceSchema.optional(),
    remark: z.string().max(255).optional(),
    invoice_reference_id: z.string().max(39).optional(),
    credit: z.boolean().optional(),
    credit_reference_id: z.string().max(39).optional(),
    home_charging_compensation: z.boolean().optional(),
    last_updated: DateTimeSchema
});

// OCPI 2.2.1/2.3.0 shared CDR Schema (simplified, for ModuleValidators_221)
const CDRSchema_221 = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    id: z.string().max(36),
    start_date_time: DateTimeSchema,
    end_date_time: DateTimeSchema,
    session_id: z.string().max(36).optional(),
    cdr_token: CdrTokenSchema,
    auth_method: z.enum(['AUTH_REQUEST', 'COMMAND', 'WHITELIST']),
    authorization_reference: z.string().max(36).optional(),
    cdr_location: CdrLocationSchema,
    meter_id: z.string().max(255).optional(),
    currency: CurrencyCodeSchema,
    charging_periods: z.array(ChargingPeriodSchema),
    total_cost: PriceSchema,
    total_energy: z.number().nonnegative(),
    total_time: z.number().nonnegative(),
    total_parking_time: z.number().nonnegative().optional(),
    remark: z.string().max(255).optional(),
    last_updated: DateTimeSchema
});

// OCPI 2.2.1/2.3.0 Tariff Schema
const TariffRestrictionsSchema = z.object({
    start_time: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    end_time: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/).optional(),
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
    reservation: z.enum(['RESERVATION', 'RESERVATION_EXPIRES']).optional(),
    booking: z.enum(['BOOKING', 'BOOKING_EXPIRES', 'BOOKING_CANCELLATION_FEES', 'BOOKING_OVERTIME']).optional()
});

export const TariffSchema = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    id: z.string().max(36),
    currency: CurrencyCodeSchema,
    type: z.enum(['AD_HOC_PAYMENT', 'PROFILE_CHEAP', 'PROFILE_FAST', 'PROFILE_GREEN', 'REGULAR']).optional(),
    tariff_alt_text: z.array(DisplayTextSchema).optional(),
    tariff_alt_url: z.string().url().optional(),
    min_price: PriceLimitSchema.optional(),
    max_price: PriceLimitSchema.optional(),
    preauthorize_amount: z.number().optional(),
    tax_included: z.enum(['YES', 'NO', 'N/A']),
    elements: z.array(z.object({
        price_components: z.array(z.object({
            type: z.enum(['ENERGY', 'FLAT', 'PARKING_TIME', 'TIME']),
            price: z.number(),
            vat: z.number().optional(),
            step_size: z.number().int()
        })),
        restrictions: TariffRestrictionsSchema.optional()
    })),
    start_date_time: DateTimeSchema.optional(),
    end_date_time: DateTimeSchema.optional(),
    energy_mix: EnergyMixSchema.optional(),
    last_updated: DateTimeSchema
});

// Full Token Schema per OCPI 2.2.1+ spec
const FullTokenSchema = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    uid: z.string().max(36),
    type: z.enum(TokenTypeEnum),
    contract_id: z.string().max(36),
    visual_number: z.string().max(64).optional(),
    issuer: z.string().max(64),
    group_id: z.string().max(36).optional(),
    valid: z.boolean(),
    whitelist: z.enum(['ALWAYS', 'ALLOWED', 'ALLOWED_OFFLINE', 'NEVER']),
    language: z.string().length(2).optional(),
    default_profile_type: z.enum(['CHEAP', 'FAST', 'GREEN', 'REGULAR']).optional(),
    energy_contract: z.object({
        supplier_name: z.string().max(64),
        contract_id: z.string().max(64).optional()
    }).optional(),
    last_updated: DateTimeSchema
});

// Simplified Token Schema (used in ModuleValidators for backward compat)
export const TokenSchema = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    uid: z.string().max(36),
    type: z.enum(TokenTypeEnum),
    contract_id: z.string().max(36),
    visual_number: z.string().max(64).optional(),
    issuer: z.string().max(64),
    group_id: z.string().max(36).optional(),
    valid: z.boolean(),
    whitelist: z.enum(['ALWAYS', 'ALLOWED', 'ALLOWED_OFFLINE', 'NEVER']),
    language: z.string().length(2).optional(),
    default_profile_type: z.enum(['CHEAP', 'FAST', 'GREEN', 'REGULAR']).optional(),
    energy_contract: z.object({
        supplier_name: z.string().max(64),
        contract_id: z.string().max(64).optional()
    }).optional(),
    last_updated: DateTimeSchema
});

// ============= OCPI 2.3.0 BOOKING SCHEMA =============

// Booking enums
const EVSEPositionEnum = ['LEFT', 'RIGHT', 'CENTER'];
const ReservationStatusEnum = ['PENDING', 'RESERVED', 'CANCELED', 'FAILED', 'NO_SHOW', 'FULFILLED', 'REJECTED', 'UNKNOWN'];
const CanceledReasonEnum = ['POWER_OUTAGE', 'BROKEN_CHARGER', 'FULL', 'BLOCKED', 'TRAFFIC', 'BROKEN_VEHICLE', 'NO_CANCELED', 'UNKNOWN'];
const RoleEnum = ['CPO', 'EMSP', 'NAP', 'NSP', 'OTHER', 'SCSP'];
const AccessMethodEnum = ['OPEN', 'TOKEN', 'LICENSE_PLATE', 'ACCESS_CODE', 'INTERCOM', 'PARKING_TICKET'];
const ReservationRequestStatusEnum = ['PENDING', 'ACCEPTED', 'DECLINED', 'FAILED'];

// BookingOption
const BookingOptionSchema = z.object({
    evse_uid: z.string().max(36).optional(),
    connector_id: z.string().max(36).optional(),
    parking_id: z.string().max(36).optional(),
    evse_position: z.array(z.enum(EVSEPositionEnum)).optional(),
    vehicle_types: z.array(z.enum(VehicleTypeEnum)).optional(),
    connector_format: z.array(z.enum(['SOCKET', 'CABLE'])).optional(),
    connector_types: z.array(z.enum(ConnectorTypeEnum)).optional(),
    power_types: z.array(z.enum(PowerTypeEnum)).optional(),
    max_vehicle_weight: z.number().optional(),
    max_vehicle_height: z.number().optional(),
    max_vehicle_length: z.number().optional(),
    max_vehicle_width: z.number().optional(),
    min_parking_space_length: z.number().optional(),
    min_parking_space_width: z.number().optional(),
    dangerous_goods_allowed: z.boolean().optional(),
    drive_through: z.boolean().optional(),
    refrigeration_outlet: z.boolean().optional()
});

// BookingTerms
const BookingTermsSchema = z.object({
    rfid_auth_required: z.boolean().optional(),
    token_groups_supported: z.boolean().optional(),
    remote_auth_supported: z.boolean().optional(),
    supported_access_methods: z.array(z.enum(AccessMethodEnum)),
    change_until_minutes: z.number(),
    cancel_until_minutes: z.number(),
    change_not_allowed: z.boolean().optional(),
    early_start_allowed: z.boolean().optional(),
    early_start_time: z.number().optional(),
    noshow_timeout: z.number().optional(),
    noshow_fee: z.boolean().optional(),
    late_stop_allowed: z.boolean().optional(),
    late_stop_time: z.number().optional(),
    overlapping_bookings_allowed: z.boolean().optional(),
    min_booking_duration: z.number().optional(),
    max_booking_duration: z.number().optional(),
    booking_terms: z.string().url().optional()
});

// Timeslot
const TimeslotSchema = z.object({
    start_date_time: DateTimeSchema,
    end_date_time: DateTimeSchema,
    min_power: z.number().optional(),
    max_power: z.number().optional(),
    green_energy_support: z.boolean().optional()
});

// BookingToken
const BookingTokenSchema = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    uid: z.string().max(36),
    type: z.enum(TokenTypeEnum),
    contract_id: z.string().max(36)
});

// Cancellation
const CancellationSchema = z.object({
    cancellation_reason: z.enum(CanceledReasonEnum),
    who_canceled: z.enum(RoleEnum)
});

// AccessInformation
const AccessInformationSchema = z.object({
    method: z.enum(AccessMethodEnum),
    value: z.string().optional()
});

// Period
const PeriodSchema = z.object({
    start_date_time: DateTimeSchema,
    end_date_time: DateTimeSchema
});

// BookingRequest
const BookingRequestSchema = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    request_id: z.string().max(36),
    booking_option: BookingOptionSchema.optional(),
    location_id: z.string().max(36),
    booking_location_id: z.string().max(36),
    tokens: z.array(BookingTokenSchema).optional(),
    access_information: z.array(AccessInformationSchema).optional(),
    period: PeriodSchema,
    authorization_reference: z.string().max(36),
    power_required: z.number().int().optional(),
    canceled: CancellationSchema.optional()
});

// BookingRequestStatus
const BookingRequestStatusSchema = z.object({
    request_status: z.enum(ReservationRequestStatusEnum),
    booking_request: BookingRequestSchema,
    request_received: DateTimeSchema
});

// Booking Schema per OCPI 2.3.0 spec
export const BookingSchema_230 = z.object({
    id: z.string().max(36, 'Booking ID最大36位字符'),
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    request_id: z.string().max(36),
    booking_option: BookingOptionSchema.optional(),
    location_id: z.string().max(36),
    booking_tokens: z.array(BookingTokenSchema).optional(),
    tariff_ids: z.array(z.string().max(36)).optional(),
    period: TimeslotSchema,
    reservation_status: z.enum(ReservationStatusEnum),
    canceled: CancellationSchema.optional(),
    access_information: z.array(AccessInformationSchema).optional(),
    authorization_reference: z.string().max(36),
    booking_terms: BookingTermsSchema,
    booking_requests: z.array(BookingRequestStatusSchema),
    last_updated: DateTimeSchema
});

// ============= COMMAND SCHEMAS =============

export const StartSessionCommandSchema = z.object({
    response_url: z.string().url(),
    token: FullTokenSchema,
    location_id: z.string().max(36),
    evse_uid: z.string().max(36).optional(),
    connector_id: z.string().max(36).optional(),
    authorization_reference: z.string().max(36).optional()
});

export const StopSessionCommandSchema = z.object({
    response_url: z.string().url(),
    session_id: z.string().max(36)
});

export const ReserveNowCommandSchema = z.object({
    response_url: z.string().url(),
    token: FullTokenSchema,
    expiry_date: DateTimeSchema,
    reservation_id: z.string().max(36),
    location_id: z.string().max(36),
    evse_uid: z.string().max(36).optional(),
    authorization_reference: z.string().max(36).optional()
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

// ============= NEW MODULE SCHEMAS (OCPI 2.3.0) =============

// Credentials Module
const CredentialsRoleSchema = z.object({
    role: z.enum(['CPO', 'EMSP', 'NAP', 'NSP', 'OTHER', 'SCSP']),
    business_details: BusinessDetailsSchema,
    party_id: PartyIdSchema,
    country_code: CountryCodeSchema
});

export const CredentialsSchema = z.object({
    token: z.string().max(64),
    url: z.string().url(),
    hub_party_id: z.string().length(5).optional(),
    roles: z.array(CredentialsRoleSchema).nonempty()
});

// Versions Module
export const VersionSchema = z.object({
    version: z.enum(['2.0', '2.1', '2.1.1', '2.2', '2.2.1', '2.3.0']),
    url: z.string().url()
});

export const EndpointSchema = z.object({
    identifier: z.enum([
        'cdrs', 'chargingprofiles', 'commands', 'credentials',
        'hubclientinfo', 'locations', 'sessions', 'tariffs',
        'tokens', 'bookings', 'payments'
    ]),
    role: z.enum(['SENDER', 'RECEIVER']),
    url: z.string().url()
});

export const VersionDetailsSchema = z.object({
    version: z.enum(['2.0', '2.1', '2.1.1', '2.2', '2.2.1', '2.3.0']),
    endpoints: z.array(EndpointSchema).nonempty()
});

// ChargingProfiles Module
const ChargingProfilePeriodSchema = z.object({
    start_period: z.number().int().nonnegative(),
    limit: z.number()
});

export const ChargingProfileSchema = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    id: z.string().max(36),
    session_id: z.string().max(36).optional(),
    start_date_time: DateTimeSchema.optional(),
    end_date_time: DateTimeSchema.optional(),
    charging_rate_unit: z.enum(['A', 'W']),
    min_charge_rate: z.number().optional(),
    charging_profile_periods: z.array(ChargingProfilePeriodSchema).optional(),
    last_updated: DateTimeSchema
});

// HubClientInfo Module
export const HubClientInfoSchema = z.object({
    client_id: z.string().max(36),
    connection_status: z.enum(['CONNECTED', 'DISCONNECTED', 'PAUSED']),
    last_updated: DateTimeSchema
});

// Payments Module
export const PaymentSchema = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    id: z.string().max(36),
    evse_uid: z.string().max(36),
    authorization_reference: z.string().max(36).optional(),
    total_cost: PriceSchema,
    last_updated: DateTimeSchema
});

// ============= MODULE VALIDATORS =============

export const ModuleValidators_211 = {
    locations: LocationSchema_211,
    sessions: SessionSchema_211,
    cdrs: CDRSchema_211,
    tariffs: TariffSchema_211,
    tokens: TokenSchema_211
};

export const ModuleValidators_221 = {
    locations: LocationSchema_221,
    sessions: SessionSchema_221,
    cdrs: CDRSchema_221,
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
    cdrs: CDRSchema_230,
    tariffs: TariffSchema,
    tokens: TokenSchema,
    credentials: CredentialsSchema,
    versions: VersionDetailsSchema,
    chargingprofiles: ChargingProfileSchema,
    hubclientinfo: HubClientInfoSchema,
    payments: PaymentSchema,
    'commands/START_SESSION': StartSessionCommandSchema,
    'commands/STOP_SESSION': StopSessionCommandSchema,
    'commands/RESERVE_NOW': ReserveNowCommandSchema,
    'commands/CANCEL_RESERVATION': CancelReservationCommandSchema,
    'commands/UNLOCK_CONNECTOR': UnlockConnectorCommandSchema
};

// Legacy compatibility
export const LocationSchema = LocationSchema_221;
export const SessionSchema = SessionSchema_221;
export const CDRSchema = CDRSchema_221;

// ============= VALIDATION FUNCTION =============

export const validateOCPIJson = (module, jsonData, version = '2.2.1-d2', t = null) => {
    let validator;
    
    const getTranslatedMessage = (key, params = {}) => {
        if (t && typeof t === 'function') {
            return t(key, params);
        }
        const fallbacks = {
            'validation.error.moduleNotAvailable': `${params.module}模块在OCPI 2.1.1-d2版本中不可用`,
            'validation.error.bookingsOnly230': 'Bookings模块仅在OCPI 2.3.0版本中可用',
            'validation.error.unsupportedModule': `不支持的模块: ${params.module} (版本: ${params.version})`
        };
        return fallbacks[key] || key;
    };
    
    if (version === '2.3.0') {
        validator = ModuleValidators_230[module];
    } else if (version === '2.1.1-d2') {
        if (['commands/START_SESSION', 'commands/STOP_SESSION', 'commands/RESERVE_NOW', 'commands/CANCEL_RESERVATION', 'commands/UNLOCK_CONNECTOR', 'bookings', 'credentials', 'versions', 'chargingprofiles', 'hubclientinfo', 'payments'].includes(module)) {
            return { valid: false, errors: [getTranslatedMessage('validation.error.moduleNotAvailable', { module })] };
        }
        validator = ModuleValidators_211[module];
    } else {
        if (['bookings', 'credentials', 'versions', 'chargingprofiles', 'hubclientinfo', 'payments'].includes(module)) {
            return { valid: false, errors: [getTranslatedMessage('validation.error.bookingsOnly230')] };
        }
        validator = ModuleValidators_221[module];
    }
    
    if (!validator) {
        return { valid: false, errors: [getTranslatedMessage('validation.error.unsupportedModule', { module, version })] };
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
