# API参考

<cite>
**本文档中引用的文件**
- [ocpi-validators.js](file://src/ocpi-validators.js)
</cite>

## 目录
1. [函数签名与参数](#函数签名与参数)
2. [返回值结构](#返回值结构)
3. [Zod验证机制](#zod验证机制)
4. [公开验证器导出接口](#公开验证器导出接口)
5. [TypeScript类型定义](#typescript类型定义)
6. [同步验证调用示例](#同步验证调用示例)
7. [错误码体系](#错误码体系)
8. [异常处理策略](#异常处理策略)

## 函数签名与参数

`validateOCPIJson`函数用于验证OCPI（开放充电点接口）JSON数据的有效性。该函数根据指定的OCPI版本和模块选择相应的验证模式进行数据校验。

```ts
export const validateOCPIJson = (module: string, jsonData: object, version?: string) => ValidationResult
```

**参数说明：**

- `module`: 指定要验证的OCPI模块名称，如`locations`、`sessions`、`cdrs`等。此参数为必需项。
- `jsonData`: 需要验证的JSON对象数据。此参数为必需项。
- `version`: OCPI规范版本号，默认值为`'2.2.1-d2'`。支持的版本包括`'2.1.1-d2'`、`'2.2.1-d2'`和`'2.3.0'`。

**Section sources**
- [ocpi-validators.js](file://src/ocpi-validators.js#L968-L1004)

## 返回值结构

验证函数返回一个包含验证结果的对象，其结构如下：

```ts
interface ValidationResult {
    valid: boolean;
    errors?: string[];
    data?: any;
    version?: string;
}
```

**字段说明：**

- `valid`: 布尔值，表示验证是否成功。`true`表示数据有效，`false`表示数据无效。
- `errors`: 字符串数组，仅在验证失败时存在。包含详细的验证错误信息，每个错误以"路径: 错误消息"的格式呈现。
- `data`: 验证通过后的解析数据，包含经过类型转换和标准化处理后的对象。
- `version`: 返回输入的版本号，便于调用方确认使用的验证规则版本。

**Section sources**
- [ocpi-validators.js](file://src/ocpi-validators.js#L968-L1004)

## Zod验证机制

`validateOCPIJson`函数内部使用[Zod](https://zod.dev/)库进行数据验证。Zod是一个TypeScript优先的模式声明和验证库，提供类型安全的运行时验证。

### 验证流程

1. **模式选择**: 根据输入的`version`和`module`参数，从预定义的验证器集合中选择对应的Zod模式。
2. **安全解析**: 使用所选模式的`safeParse`方法对输入的`jsonData`进行解析。`safeParse`方法不会抛出异常，而是返回一个包含`success`标志的结果对象。
3. **结果处理**: 
   - 如果`result.success`为`true`，返回包含`valid: true`和解析后数据的成功结果。
   - 如果`result.success`为`false`，提取`result.error.issues`中的所有验证问题，格式化为字符串数组并返回。

### 错误信息格式化

验证错误信息被格式化为`路径: 错误消息`的形式，其中：
- `路径`表示JSON中出错字段的访问路径（如`coordinates.latitude`）
- `错误消息`描述具体的验证失败原因（如`纬度格式不正确`）

这种格式便于开发者快速定位和修复数据问题。

**Section sources**
- [ocpi-validators.js](file://src/ocpi-validators.js#L968-L1004)

## 公开验证器导出接口

该模块导出了多个针对不同OCPI版本和模块的验证器，以及版本特定的验证器映射。

### 版本特定验证器

| 验证器名称 | 对应OCPI版本 | 支持的模块 |
|-----------|------------|----------|
| `LocationSchema_211` | 2.1.1-d2 | locations |
| `SessionSchema_211` | 2.1.1-d2 | sessions |
| `CDRSchema_211` | 2.1.1-d2 | cdrs |
| `TariffSchema_211` | 2.1.1-d2 | tariffs |
| `TokenSchema_211` | 2.1.1-d2 | tokens |
| `LocationSchema_221` | 2.2.1-d2 | locations |
| `SessionSchema_221` | 2.2.1-d2 | sessions |
| `CDRSchema` | 2.2.1-d2/2.3.0 | cdrs |
| `TariffSchema` | 2.2.1-d2/2.3.0 | tariffs |
| `TokenSchema` | 2.2.1-d2/2.3.0 | tokens |
| `LocationSchema_230` | 2.3.0 | locations |
| `SessionSchema_230` | 2.3.0 | sessions |
| `BookingSchema_230` | 2.3.0 | bookings |

### 命令验证器

所有版本共享相同的命令验证器：

- `StartSessionCommandSchema`: 启动会话命令
- `StopSessionCommandSchema`: 停止会话命令  
- `ReserveNowCommandSchema`: 立即预订命令
- `CancelReservationCommandSchema`: 取消预订命令
- `UnlockConnectorCommandSchema`: 解锁连接器命令

### 验证器映射

通过`ModuleValidators_XYZ`对象将模块名称映射到相应的验证器：

- `ModuleValidators_211`: OCPI 2.1.1-d2版本的模块验证器映射
- `ModuleValidators_221`: OCPI 2.2.1-d2版本的模块验证器映射  
- `ModuleValidators_230`: OCPI 2.3.0版本的模块验证器映射

此外，还提供了向后兼容的别名：
- `LocationSchema`: 指向`LocationSchema_221`
- `SessionSchema`: 指向`SessionSchema_221`

**Section sources**
- [ocpi-validators.js](file://src/ocpi-validators.js#L43-L961)

## TypeScript类型定义

以下是相关类型的TypeScript定义参考：

```ts
// 验证结果类型
interface ValidationResult {
    valid: boolean;
    errors?: string[];
    data?: any;
    version?: string;
}

// 支持的OCPI版本类型
type OCPIVersion = '2.1.1-d2' | '2.2.1-d2' | '2.3.0';

// 支持的模块类型
type OCPIModel = 
    | 'locations'
    | 'sessions'
    | 'cdrs'
    | 'tariffs'
    | 'tokens'
    | 'bookings'
    | 'commands/START_SESSION'
    | 'commands/STOP_SESSION'
    | 'commands/RESERVE_NOW'
    | 'commands/CANCEL_RESERVATION'
    | 'commands/UNLOCK_CONNECTOR';

// 验证函数签名
declare function validateOCPIJson(
    module: OCPIModel,
    jsonData: object,
    version?: OCPIVersion
): ValidationResult;

// 公共模式类型
interface CountryCodeSchema {
    country_code: string; // 2位国家代码
}

interface PartyIdSchema {
    party_id: string; // 最大3位字符
}

interface DateTimeSchema {
    datetime: string; // ISO 8601日期时间格式
}
```

这些类型定义确保了在TypeScript项目中使用该验证函数时的类型安全。

**Section sources**
- [ocpi-validators.js](file://src/ocpi-validators.js#L1-L961)

## 同步验证调用示例

`validateOCPIJson`函数是同步执行的，可以直接调用而无需处理Promise。

### 基本验证示例

```js
// 验证位置数据 (OCPI 2.2.1-d2)
const locationData = {
    country_code: 'CN',
    party_id: 'ABC',
    id: 'LOC001',
    publish: true,
    address: '北京市朝阳区XX路123号',
    city: '北京',
    country: 'CHN',
    coordinates: {
        latitude: '39.9042',
        longitude: '116.4074'
    },
    evses: [{
        uid: 'EVSE001',
        status: 'AVAILABLE',
        connectors: [{
            id: 'CONN001',
            standard: 'IEC_62196_T2',
            format: 'SOCKET',
            power_type: 'AC_1_PHASE'
        }]
    }],
    time_zone: 'Asia/Shanghai',
    last_updated: '2023-01-01T12:00:00Z'
};

const result = validateOCPIJson('locations', locationData);

if (result.valid) {
    console.log('位置数据验证通过');
    console.log('解析后的数据:', result.data);
} else {
    console.error('位置数据验证失败:');
    result.errors.forEach(error => console.error(`- ${error}`));
}
```

### 指定版本验证

```js
// 验证预订数据 (必须使用OCPI 2.3.0)
const bookingData = {
    country_code: 'CN',
    party_id: 'ABC',
    id: 'BOOK001',
    token: {
        uid: 'TOKEN001',
        type: 'RFID',
        auth_id: 'AUTH001',
        issuer: 'IssuerName',
        valid: true,
        whitelist: 'ALLOWED',
        last_updated: '2023-01-01T12:00:00Z'
    },
    location_id: 'LOC001',
    evse_uid: 'EVSE001',
    start_date_time: '2023-01-02T08:00:00Z',
    end_date_time: '2023-01-02T10:00:00Z',
    booking_type: 'RESERVATION',
    status: 'ACCEPTED',
    created: '2023-01-01T12:00:00Z',
    last_updated: '2023-01-01T12:00:00Z'
};

const result = validateOCPIJson('bookings', bookingData, '2.3.0');

if (result.valid) {
    console.log('预订数据验证通过');
} else {
    console.error('预订数据验证失败:');
    result.errors.forEach(error => console.error(`- ${error}`));
}
```

### 处理不支持的模块

```js
// 尝试在不支持的版本中验证预订数据
const result = validateOCPIJson('bookings', bookingData, '2.2.1-d2');

// 输出: { valid: false, errors: ['Bookings模块仅在OCPI 2.3.0版本中可用'] }
console.log(result);
```

**Section sources**
- [ocpi-validators.js](file://src/ocpi-validators.js#L968-L1004)

## 错误码体系

验证函数通过返回的错误数组提供详细的错误信息，而不是使用数字错误码。错误信息采用人类可读的中文描述，便于理解和处理。

### 错误类型

#### 版本相关错误

- `模块在OCPI X.X.X版本中不可用`: 当请求的模块不支持指定的OCPI版本时返回
- `不支持的模块: ${module} (版本: ${version})`: 当指定的模块名称不在支持列表中时返回

#### 数据验证错误

由Zod模式生成的具体验证错误，包括：
- 字段长度超出限制（如`Location ID最大36位字符`）
- 枚举值不匹配（如`状态必须是AVAILABLE,BLOCKED,CHARGING等之一`）
- 数据类型错误（如`期望字符串，得到数字`）
- 格式错误（如`纬度格式不正确`）
- 必需字段缺失

### 错误信息格式

所有错误信息都遵循统一的格式：`[字段路径]: [具体错误描述]`

例如：
- `coordinates.latitude: 纬度格式不正确`
- `evses.0.connectors.0.standard: 必须是CHADEMO,IEC_62196_T2等之一`
- `country_code: 国家代码必须为2位字符`

这种格式使得错误定位非常精确，开发人员可以快速找到需要修正的数据字段。

**Section sources**
- [ocpi-validators.js](file://src/ocpi-validators.js#L968-L1004)

## 异常处理策略

`validateOCPIJson`函数采用了健壮的异常处理策略，确保在各种情况下都能提供有意义的反馈。

### 安全解析

函数使用Zod的`safeParse`方法而非`parse`方法，这确保了验证过程不会抛出运行时异常。即使输入数据完全无效或不符合预期结构，函数也会优雅地返回验证失败结果，而不是崩溃。

### 版本兼容性处理

函数实现了智能的版本降级逻辑：
- 默认使用`2.2.1-d2`版本进行验证
- 明确支持`2.1.1-d2`和`2.3.0`版本
- 对于不支持的模块组合（如在2.1.1-d2中使用命令模块），返回明确的错误信息而非静默失败

### 模块可用性检查

函数在验证前先检查模块在指定版本中的可用性：
- `bookings`模块仅在`2.3.0`版本中可用
- 命令模块（如`commands/START_SESSION`）在`2.1.1-d2`版本中不可用
- 未注册的模块名称会返回"不支持的模块"错误

### 输入验证

虽然函数主要验证JSON数据内容，但对输入参数也有基本的合理性检查：
- 确保`module`参数为字符串类型
- 确保`jsonData`参数为对象类型
- 验证`version`参数是否为支持的版本字符串

### 错误聚合

当存在多个验证错误时，函数会收集所有错误并返回完整的错误数组，而不是在遇到第一个错误时就停止。这有助于用户一次性发现和修复所有问题，提高调试效率。

**Section sources**
- [ocpi-validators.js](file://src/ocpi-validators.js#L968-L1004)