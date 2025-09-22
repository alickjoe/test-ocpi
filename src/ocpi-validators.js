import { z } from 'zod';

// Basic Types and Enums
const CurrencyCodeSchema = z.string().length(3, '货币代码必须为3位字符');
const CountryCodeSchema = z.string().length(2, '国家代码必须为2位字符');
const PartyIdSchema = z.string().max(3, 'Party ID最大3位字符');
const DateTimeSchema = z.string().datetime('日期时间格式不正确');

// Common Enums
const ConnectorTypeSchema = z.enum([
    'CHADEMO', 'IEC_62196_T1', 'IEC_62196_T1_COMBO', 'IEC_62196_T2', 
    'IEC_62196_T2_COMBO', 'IEC_62196_T3A', 'IEC_62196_T3C', 
    'DOMESTIC_A', 'DOMESTIC_B', 'DOMESTIC_C', 'DOMESTIC_D', 
    'DOMESTIC_E', 'DOMESTIC_F', 'DOMESTIC_G', 'DOMESTIC_H', 
    'DOMESTIC_I', 'DOMESTIC_J', 'DOMESTIC_K', 'DOMESTIC_L', 
    'TESLA_R', 'TESLA_S', 'GBT_AC', 'GBT_DC', 'CHAOJI'
]);

const ConnectorFormatSchema = z.enum(['SOCKET', 'CABLE']);
const PowerTypeSchema = z.enum(['AC_1_PHASE', 'AC_3_PHASE', 'DC']);
const StatusSchema = z.enum(['AVAILABLE', 'BLOCKED', 'CHARGING', 'INOPERATIVE', 'OUTOFORDER', 'PLANNED', 'REMOVED', 'RESERVED', 'UNKNOWN']);

// GeoLocation Schema
const GeoLocationSchema = z.object({
    latitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '纬度格式不正确'),
    longitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '经度格式不正确')
});

// Additional GeoLocation Schema
const AdditionalGeoLocationSchema = z.object({
    latitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '纬度格式不正确'),
    longitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '经度格式不正确'),
    name: z.object({
        language: z.string().length(2),
        text: z.string()
    }).optional()
});

// Hours Schema
const RegularHoursSchema = z.object({
    weekday: z.number().int().min(1).max(7),
    period_begin: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, '时间格式不正确 (HH:MM)'),
    period_end: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, '时间格式不正确 (HH:MM)')
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

// Image Schema
const ImageSchema = z.object({
    url: z.string().url('URL格式不正确'),
    thumbnail: z.string().url('缩略图URL格式不正确').optional(),
    category: z.enum(['CHARGER', 'ENTRANCE', 'LOCATION', 'NETWORK', 'OPERATOR', 'OTHER', 'OWNER']),
    type: z.string().max(4),
    width: z.number().int().optional(),
    height: z.number().int().optional()
});

// Business Details Schema
const BusinessDetailsSchema = z.object({
    name: z.string().max(100),
    website: z.string().url().optional(),
    logo: ImageSchema.optional()
});

// Energy Mix Schema
const EnergySourceSchema = z.object({
    source: z.enum(['NUCLEAR', 'GENERAL_FOSSIL', 'COAL', 'GAS', 'GENERAL_GREEN', 'SOLAR', 'WIND', 'WATER']),
    percentage: z.number().min(0).max(100)
});

const EnvironmentalImpactSchema = z.object({
    category: z.enum(['NUCLEAR_WASTE', 'CARBON_DIOXIDE']),
    amount: z.number().nonnegative()
});

const EnergyMixSchema = z.object({
    is_green_energy: z.boolean(),
    energy_sources: z.array(EnergySourceSchema).optional(),
    environ_impact: z.array(EnvironmentalImpactSchema).optional(),
    supplier_name: z.string().max(64).optional(),
    energy_product_name: z.string().max(64).optional()
});

// Connector Schema
const ConnectorSchema = z.object({
    id: z.string().max(36, 'Connector ID最大36位字符'),
    standard: ConnectorTypeSchema,
    format: ConnectorFormatSchema,
    power_type: PowerTypeSchema,
    max_voltage: z.number().int().min(0),
    max_amperage: z.number().int().min(0),
    max_electric_power: z.number().int().min(0).optional(),
    tariff_ids: z.array(z.string().max(36)).optional(),
    terms_and_conditions: z.string().url().optional(),
    last_updated: DateTimeSchema
});

// EVSE Schema
const EVSESchema = z.object({
    uid: z.string().max(36, 'EVSE UID最大36位字符'),
    evse_id: z.string().max(48).optional(),
    status: StatusSchema,
    status_schedule: z.array(z.object({
        period_begin: DateTimeSchema,
        period_end: DateTimeSchema.optional(),
        status: StatusSchema
    })).optional(),
    capabilities: z.array(z.enum([
        'CHARGING_PROFILE_CAPABLE', 'CHARGING_PREFERENCES_CAPABLE', 
        'CHIP_CARD_SUPPORT', 'CONTACTLESS_CARD_SUPPORT', 
        'CREDIT_CARD_PAYABLE', 'DEBIT_CARD_PAYABLE', 
        'PED_TERMINAL', 'REMOTE_START_STOP_CAPABLE', 
        'RESERVABLE', 'RFID_READER', 'TOKEN_GROUP_CAPABLE', 'UNLOCK_CAPABLE'
    ])).optional(),
    connectors: z.array(ConnectorSchema).min(1, '至少需要一个连接器'),
    floor_level: z.string().max(4).optional(),
    coordinates: GeoLocationSchema.optional(),
    physical_reference: z.string().max(16).optional(),
    directions: z.array(z.object({
        language: z.string().length(2),
        text: z.string().max(512)
    })).optional(),
    parking_restrictions: z.array(z.enum([
        'EV_ONLY', 'PLUGGED', 'DISABLED', 'CUSTOMERS', 'MOTORCYCLES'
    ])).optional(),
    images: z.array(ImageSchema).optional(),
    last_updated: DateTimeSchema
});

// Location Schema
export const LocationSchema = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    id: z.string().max(36, 'Location ID最大36位字符'),
    publish: z.boolean(),
    publish_allowed_to: z.array(z.object({
        uid: z.string().max(36),
        type: z.enum(['APP_USER', 'OTHER', 'RFID']),
        contract_id: z.string().max(36).optional()
    })).optional(),
    name: z.string().max(255).optional(),
    address: z.string().max(45, '地址最大45位字符'),
    city: z.string().max(45, '城市最大45位字符'),
    postal_code: z.string().max(10).optional(),
    state: z.string().max(20).optional(),
    country: z.string().length(3, '国家代码必须为3位字符'),
    coordinates: GeoLocationSchema,
    related_locations: z.array(AdditionalGeoLocationSchema).optional(),
    parking_type: z.enum(['ALONG_MOTORWAY', 'PARKING_GARAGE', 'PARKING_LOT', 'ON_DRIVEWAY', 'ON_STREET', 'UNDERGROUND_GARAGE']).optional(),
    evses: z.array(EVSESchema).optional(),
    directions: z.array(z.object({
        language: z.string().length(2),
        text: z.string().max(512)
    })).optional(),
    operator: BusinessDetailsSchema.optional(),
    suboperator: BusinessDetailsSchema.optional(),
    owner: BusinessDetailsSchema.optional(),
    facilities: z.array(z.enum([
        'HOTEL', 'RESTAURANT', 'CAFE', 'MALL', 'SUPERMARKET', 
        'SPORT', 'RECREATION_AREA', 'NATURE', 'MUSEUM', 
        'BIKE_SHARING', 'BUS_STOP', 'TAXI_STAND', 'TRAM_STOP', 
        'METRO_STATION', 'TRAIN_STATION', 'AIRPORT', 'PARKING_LOT', 
        'CARPOOL_PARKING', 'FUEL_STATION', 'WIFI'
    ])).optional(),
    time_zone: z.string(),
    opening_times: HoursSchema.optional(),
    charging_when_closed: z.boolean().optional(),
    images: z.array(ImageSchema).optional(),
    energy_mix: EnergyMixSchema.optional(),
    last_updated: DateTimeSchema
});

// Token Schema
const TokenSchema = z.object({
    uid: z.string().max(36),
    type: z.enum(['RFID', 'OTHER']),
    auth_id: z.string().max(36),
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


// Charging Period Schema
const ChargingPeriodSchema = z.object({
    start_date_time: DateTimeSchema,
    dimensions: z.array(z.object({
        type: z.enum(['CURRENT', 'ENERGY', 'ENERGY_EXPORT', 'ENERGY_IMPORT', 'MAX_CURRENT', 'MIN_CURRENT', 'MAX_POWER', 'MIN_POWER', 'PARKING_TIME', 'POWER', 'RESERVATION_TIME', 'STATE_OF_CHARGE', 'TIME']),
        volume: z.number().nonnegative()
    })),
    tariff_id: z.string().max(36).optional()
});

// CDR Token Schema
const CdrTokenSchema = z.object({
    uid: z.string().max(36),
    type: z.enum(['RFID', 'OTHER']),
    contract_id: z.string().max(36).optional()
});

// CDR Location Schema
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
    connector_standard: ConnectorTypeSchema,
    connector_format: ConnectorFormatSchema,
    connector_power_type: PowerTypeSchema
});

// Session Schema (updated)
export const SessionSchema = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    id: z.string().max(36, 'Session ID最大36位字符'),
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
    total_cost: z.object({
        excl_vat: z.number().optional(),
        incl_vat: z.number().optional()
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

// Price Component Schema
const PriceComponentSchema = z.object({
    type: z.enum(['ENERGY', 'FLAT', 'PARKING_TIME', 'TIME']),
    price: z.number().nonnegative(),
    vat: z.number().min(0).max(100).optional(),
    step_size: z.number().int().positive()
});

// Tariff Element Schema
const TariffElementSchema = z.object({
    price_components: z.array(PriceComponentSchema).min(1),
    restrictions: z.object({
        start_time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
        end_time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
        start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
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
});

// Tariffs Schema
export const TariffSchema = z.object({
    country_code: CountryCodeSchema,
    party_id: PartyIdSchema,
    id: z.string().max(36, 'Tariff ID最大36位字符'),
    currency: CurrencyCodeSchema,
    type: z.enum(['AD_HOC_PAYMENT', 'PROFILE_CHEAP', 'PROFILE_FAST', 'PROFILE_GREEN', 'REGULAR']).optional(),
    tariff_alt_text: z.array(z.object({
        language: z.string().length(2),
        text: z.string().max(1000)
    })).optional(),
    tariff_alt_url: z.string().url().max(255).optional(),
    min_price: z.object({
        excl_vat: z.number().optional(),
        incl_vat: z.number().optional()
    }).optional(),
    max_price: z.object({
        excl_vat: z.number().optional(),
        incl_vat: z.number().optional()
    }).optional(),
    elements: z.array(TariffElementSchema).min(1),
    start_date_time: DateTimeSchema.optional(),
    end_date_time: DateTimeSchema.optional(),
    energy_mix: EnergyMixSchema.optional(),
    last_updated: DateTimeSchema
});

// Commands Schemas

export const StartSessionCommandSchema = z.object({
    response_url: z.string().url(),
    token: TokenSchema,
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
    token: TokenSchema,
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

// Tokens Schema (exported)
export const TokensSchema = TokenSchema;

// Module Validators
export const ModuleValidators = {
    locations: LocationSchema,
    sessions: SessionSchema,
    cdrs: CDRSchema,
    tariffs: TariffSchema,
    tokens: TokensSchema,
    'commands/START_SESSION': StartSessionCommandSchema,
    'commands/STOP_SESSION': StopSessionCommandSchema,
    'commands/RESERVE_NOW': ReserveNowCommandSchema,
    'commands/CANCEL_RESERVATION': CancelReservationCommandSchema,
    'commands/UNLOCK_CONNECTOR': UnlockConnectorCommandSchema
};

// Validation Function
export const validateOCPIJson = (module, jsonData) => {
    const validator = ModuleValidators[module];
    if (!validator) {
        return { valid: false, errors: [`不支持的模块: ${module}`] };
    }
    
    const result = validator.safeParse(jsonData);
    if (!result.success) {
        const errors = result.error.issues.map(issue => 
            `${issue.path.join('.')}: ${issue.message}`
        );
        return { valid: false, errors };
    }
    return { valid: true, data: result.data };
};
