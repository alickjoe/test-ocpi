
import { z } from 'zod';

// Location模块验证Schema
export const LocationSchema = z.object({
    country_code: z.string().length(2, '国家代码必须为2位字符'),
    party_id: z.string().max(3, 'Party ID最大3位字符'),
    id: z.string().max(36, 'Location ID最大36位字符'),
    publish: z.boolean(),
    address: z.string().max(45, '地址最大45位字符'),
    city: z.string().max(45, '城市最大45位字符'),
    postal_code: z.string().max(10).optional(),
    country: z.string().length(3, '国家代码必须为3位字符'),
    coordinates: z.object({
        latitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '纬度格式不正确'),
        longitude: z.string().regex(/^-?[0-9]{1,2}\.[0-9]{5,7}$/, '经度格式不正确')
    }),
    evses: z.array(z.object({
        uid: z.string().max(36),
        status: z.enum(['AVAILABLE', 'BLOCKED', 'CHARGING', 'INOPERATIVE', 'OUTOFORDER', 'PLANNED', 'REMOVED', 'RESERVED', 'UNKNOWN']),
        connectors: z.array(z.object({
            id: z.string().max(36),
            standard: z.enum(['CHADEMO', 'IEC_62196_T2', 'IEC_62196_T2_COMBO', 'GB_T_20234_2', 'GB_T_20234_3', 'CCS', 'TESLA_R', 'TESLA_S']),
            format: z.enum(['CABLE', 'SOCKET']),
            power_type: z.enum(['AC_1_PHASE', 'AC_3_PHASE', 'DC']),
            last_updated: z.string().datetime()
        })),
        last_updated: z.string().datetime()
    })),
    time_zone: z.string(),
    last_updated: z.string().datetime()
});

// Session模块验证Schema
export const SessionSchema = z.object({
    country_code: z.string().length(2),
    party_id: z.string().max(3),
    id: z.string().max(36),
    start_date_time: z.string().datetime(),
    end_date_time: z.string().datetime().optional(),
    kwh: z.number().nonnegative(),
    cdr_token: z.object({
        uid: z.string(),
        type: z.enum(['RFID', 'APP_USER', 'REMOTE']),
        contract_id: z.string().optional()
    }),
    auth_method: z.enum(['AUTH_REQUEST', 'COMMAND', 'WHITELIST']),
    location_id: z.string().max(36),
    evse_uid: z.string().max(36),
    connector_id: z.string().max(36),
    status: z.enum(['ACTIVE', 'COMPLETED', 'INVALID', 'PENDING', 'RESERVATION']),
    last_updated: z.string().datetime()
});

// OCPI 2.3.0 Booking Module Schema
const BookingSchema = z.object({
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

// 模块验证器映射
export const ModuleValidators = {
    locations: LocationSchema,
    sessions: SessionSchema
};

// 验证函数
export const validateOCPIJson = (module, jsonData, version = '2.2.1-d2') => {
    let validator;
    
    // Handle bookings module (only available in 2.3.0)
    if (module === 'bookings') {
        if (version !== '2.3.0') {
            return { valid: false, errors: [`Bookings模块仅在OCPI 2.3.0版本中可用`] };
        }
        validator = BookingSchema;
    } else {
        // Use existing validators
        validator = ModuleValidators[module];
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
