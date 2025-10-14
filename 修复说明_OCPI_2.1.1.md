# OCPI 2.1.1-d2 验证逻辑修复说明

根据您提供的 OCPI 2.1.1-d2 官方规范PDF文档,已对验证逻辑进行了全面修正。

## 关键修复内容

### 1. ✅ Session对象字段名称修正 (关键修复)
**问题**: 字段名称不符合规范
- **修改前**: `start_date_time`, `end_date_time`
- **修改后**: `start_datetime`, `end_datetime` (移除了下划线)
- **依据**: OCPI 2.1.1-d2 规范第45页明确显示字段名为 `start_datetime` 和 `end_datetime`

### 2. ✅ CDR对象结构重构 (重大修复)
**问题**: Location结构被错误简化
- **修改前**: 简化的location,只包含单个connector引用
- **修改后**: 完整的Location对象,包含嵌套的 `evses` 数组
- **依据**: OCPI 2.1.1 规范第51页示例显示CDR包含完整的Location对象结构

**新增字段**:
```javascript
location: {
  id, type, name, address, city, postal_code, country, coordinates,
  evses: [{
    uid, evse_id, status,
    connectors: [{
      id, standard, format, power_type, voltage, amperage, tariff_id, last_updated
    }],
    last_updated
  }],
  last_updated
}
```

### 3. ✅ CDR结束时间字段名修正 (关键修复)
**问题**: 字段名称错误
- **修改前**: `end_date_time`
- **修改后**: `stop_date_time`
- **依据**: OCPI 2.1.1 规范明确使用 `stop_date_time` 作为CDR的结束时间字段

### 4. ✅ CDR新增字段 (功能增强)
**新增字段**:
- `total_parking_time`: 可选,停车时长
- `remark`: 可选,备注说明(最大255字符)
- `tariffs`: 可选,关联的费率信息数组
- **依据**: OCPI 2.1.1 规范第50页的CDR对象定义

### 5. ✅ ChargingPeriod维度类型修正 (重大修复)
**问题**: Session和CDR的充电周期维度类型不完整
- **修改前**: 只有4种类型 (ENERGY, FLAT, PARKING_TIME, TIME)
- **修改后**: 6种类型 (增加了 MAX_CURRENT, MIN_CURRENT)
- **依据**: OCPI 2.1.1 规范第52页定义的 CdrDimensionType 枚举

**创建了版本专用的ChargingPeriod schema**:
```javascript
// OCPI 2.1.1 (6种维度类型)
ChargingPeriodSchema_211: 
  ENERGY, FLAT, MAX_CURRENT, MIN_CURRENT, PARKING_TIME, TIME

// OCPI 2.2.1+ (13种维度类型)  
ChargingPeriodSchema:
  CURRENT, ENERGY, ENERGY_EXPORT, ENERGY_IMPORT, MAX_CURRENT,
  MIN_CURRENT, MAX_POWER, MIN_POWER, PARKING_TIME, POWER,
  RESERVATION_TIME, STATE_OF_CHARGE, TIME
```

### 6. ✅ Tariff价格组件类型 (已验证正确)
- **OCPI 2.1.1 TariffDimensionType**: ENERGY, FLAT, PARKING_TIME, TIME (4种)
- **状态**: 无需修改,已符合规范

## 详细字段变更对照表

### SessionSchema_211 变更

| 字段 | 变更 | 原因 |
|------|------|------|
| `start_date_time` → `start_datetime` | ✅ 重命名 | 规范使用 `start_datetime` |
| `end_date_time` → `end_datetime` | ✅ 重命名 | 规范使用 `end_datetime` |
| `charging_periods.dimensions.type` | ✅ 更新枚举 | 新增 MAX_CURRENT, MIN_CURRENT |

### CDRSchema_211 变更

| 字段 | 变更 | 原因 |
|------|------|------|
| `end_date_time` → `stop_date_time` | ✅ 重命名 | 规范使用 `stop_date_time` |
| `location` 结构 | ✅ 重构 | 现在包含完整的 evses 数组 |
| `location.type` | ✅ 新增 | 可选的 LocationType 字段 |
| `location.evses` | ✅ 新增 | EVSE对象数组,包含connectors |
| `location.last_updated` | ✅ 新增 | 必填的DateTime字段 |
| `tariffs` | ✅ 新增 | 可选的Tariff引用数组 |
| `total_parking_time` | ✅ 新增 | 可选的数值字段 |
| `remark` | ✅ 新增 | 可选的字符串(最大255字符) |
| `charging_periods.dimensions.type` | ✅ 更新枚举 | 新增 MAX_CURRENT, MIN_CURRENT |

## 版本差异对比

### OCPI 2.1.1 vs 2.2.1+

| 特性 | OCPI 2.1.1 | OCPI 2.2.1+ |
|------|------------|-------------|
| Session日期时间字段 | `start_datetime`, `end_datetime` | `start_date_time`, `end_date_time` |
| CDR结束字段 | `stop_date_time` | `end_date_time` |
| CDR location结构 | 完整Location含evses数组 | 简化的CdrLocation |
| 充电维度类型 | 6种类型 | 13种类型 |
| 费率维度类型 | 4种类型 | 4种类型(相同) |

## 测试建议

### 1. Session对象验证
使用修正后的字段名进行测试:
```json
{
  "id": "101",
  "start_datetime": "2015-06-29T22:39:09Z",
  "end_datetime": "2015-06-29T23:50:16Z",
  "kwh": 41.00,
  "auth_id": "DE8ACC12E46L89",
  "auth_method": "WHITELIST",
  "currency": "EUR",
  "status": "COMPLETED",
  "last_updated": "2015-06-29T23:09:10Z"
}
```

### 2. CDR对象验证
使用完整的location结构进行测试:
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

### 3. 充电周期维度测试
测试所有6种有效的维度类型:
- ENERGY (能量)
- FLAT (固定费用)
- MAX_CURRENT (最大电流) ← 新增
- MIN_CURRENT (最小电流) ← 新增
- PARKING_TIME (停车时间)
- TIME (充电时间)

## 参考文档

- **OCPI 2.1.1-d2 规范**: 官方PDF文档
- **第45页**: Session对象示例,显示 `start_datetime` 字段
- **第50页**: CDR对象定义
- **第51页**: CDR示例,包含完整的location结构
- **第52页**: CdrDimensionType 枚举定义
- **第59页**: TariffDimensionType 枚举定义

## 验证结果

所有schema已更新并通过语法检查,无错误。建议运行完整的测试套件以确保与实际OCPI 2.1.1实现的兼容性。

## 修改文件

- **主文件**: `src/ocpi-validators.js`
- **文档**: `OCPI_2.1.1_CORRECTIONS.md` (英文详细说明)
- **文档**: `修复说明_OCPI_2.1.1.md` (本文件,中文说明)

---

修复完成时间: 2025-10-14
基于文档: OCPI_2.1.1-d2.pdf
