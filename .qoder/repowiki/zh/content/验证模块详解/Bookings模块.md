# Bookings模块

<cite>
**Referenced Files in This Document**   
- [ocpi-validators.js](file://src/ocpi-validators.js)
- [sample-data.js](file://src/sample-data.js)
</cite>

## Table of Contents
1. [预约数据模型](#预约数据模型)
2. [预约生命周期管理](#预约生命周期管理)
3. [预约类型区分](#预约类型区分)
4. [取消政策配置](#取消政策配置)
5. [车辆信息与特殊限制](#车辆信息与特殊限制)
6. [时间戳记录规范](#时间戳记录规范)

## 预约数据模型

`BookingSchema_230` 定义了OCPI 2.3.0版本中预约（Booking）的核心数据结构，包含预约标识、关联令牌、地理位置、时间范围、状态和业务规则等关键字段。

**Section sources**
- [ocpi-validators.js](file://src/ocpi-validators.js#L705-L746)

## 预约生命周期管理

预约的 `status` 字段定义了其完整的生命周期状态，这些状态反映了预约从创建到结束的各个阶段：
- **ACCEPTED (已接受)**: 预约请求已被系统接受并创建。
- **REJECTED (已拒绝)**: 预约请求因资源冲突或其他原因被拒绝。
- **EXPIRED (已过期)**: 预约的有效期已过，且未开始充电。
- **CANCELLED (已取消)**: 用户或系统主动取消了预约。
- **ACTIVE (进行中)**: 预约时间段内，用户正在使用充电桩。
- **COMPLETED (已完成)**: 预约时间段结束，充电会话可能已完成。

此状态机确保了预约流程的清晰和可追踪性。

**Section sources**
- [ocpi-validators.js](file://src/ocpi-validators.js#L728-L729)

## 预约类型区分

`booking_type` 字段用于区分两种核心的预约模式：
- **RESERVATION (预留)**: 通常指一种较短的、即时的占位行为。它保证在短时间内（例如15分钟）为用户保留一个充电位，用户需要在此期间到达并启动充电，否则预留将失效。
- **BOOKING (预订)**: 指一种更正式、更长期的预约。它允许用户提前预定未来的某个时间段来使用充电桩，系统会为此时间段锁定资源。

这种区分使得平台能够支持灵活的用户需求，从即时占位到长期规划。

**Section sources**
- [ocpi-validators.js](file://src/ocpi-validators.js#L727)

## 取消政策配置

`cancellation_policy` 对象用于精细化管理预约的取消规则，主要包含两个方面：
1.  **取消费用 (cancellation_fee)**: 当用户在免费取消期限后取消预约时，可以配置需支付的费用。该费用可分别指定不含税 (`excl_vat`) 和含税 (`incl_vat`) 的金额。
2.  **免费取消时限 (free_cancellation_until)**: 这是一个日期时间字段，明确指出用户可以在哪个时间点之前免费取消预约而无需支付任何费用。一旦超过此时间点，取消将触发相应的费用。

这一机制平衡了用户的灵活性和运营商的资源利用率。

**Section sources**
- [ocpi-validators.js](file://src/ocpi-validators.js#L740-L744)

## 车辆信息与特殊限制

### 车辆信息 (vehicle_details)
`vehicle_details` 对象允许在预约时提供详细的车辆信息，这对于优化充电体验至关重要。根据 `sampleData_230.booking` 中的HDV示例，它可以包含：
- `license_plate`: 车牌号，用于身份识别。
- `brand` 和 `model`: 车辆品牌和型号，有助于提供个性化服务。
- `connector_type`: 车辆所需的连接器类型（如CCS），确保匹配正确的充电桩。
- `max_charging_power`: 车辆的最大充电功率，可用于智能分配最合适的充电桩。

### 特殊限制 (booking_restrictions)
`booking_restrictions` 是一个字符串数组，用于对预约施加特定条件。在HDV示例中，应用了以下限制：
- **'HDV_ONLY'**: 此预约仅限于重型车辆（Heavy Duty Vehicle）。
- **'FAST_CHARGING_ONLY'**: 此预约要求必须使用大功率快速充电桩。

这些限制确保了预约的资源能够满足特定车辆的需求。

**Section sources**
- [ocpi-validators.js](file://src/ocpi-validators.js#L732-L739)
- [sample-data.js](file://src/sample-data.js#L560-L579)

## 时间戳记录规范

为了精确追踪预约的整个过程，系统强制记录两个关键的时间戳：
- **created**: 记录预约对象最初被创建的时间。这个时间点是固定的，不会改变。
- **last_updated**: 记录预约对象最后一次被修改的时间。每当预约的状态、信息或任何属性发生变化时，此时间戳都会自动更新。

这两个时间戳共同提供了预约历史的完整审计线索。

**Section sources**
- [ocpi-validators.js](file://src/ocpi-validators.js#L745-L746)