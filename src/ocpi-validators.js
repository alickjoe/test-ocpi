
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
        latitude: z.string().regex(/^[-+]?([1-8]?\d(\.\d{1,6})?|90(\.0{1,6})?)$/, '纬度格式不正确'),
        longitude: z.string().regex(/^[-+]?((1[0-7]\d(\.\d{1,6})?)|(0\d{0,2}(\.\d{1,6})?)|180(\.0{1,6})?)$/, '经度格式不正确')
    }),
    evses: z.array(z.object({
        uid: z.string().max(36),
        status: z.enum(['ACTIVE', 'INOPERATIVE', 'OUTOFORDER', 'PLANNED', 'REMOVED', 'RESERVED', 'UNKNOWN']),
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

// 模块验证器映射
export const ModuleValidators = {
    locations: LocationSchema,
    sessions: SessionSchema
};

// 验证函数
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
