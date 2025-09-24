# Commands模块

<cite>
**Referenced Files in This Document**  
- [sample-data.js](file://src/sample-data.js)
- [ocpi-validators.js](file://src/ocpi-validators.js)
</cite>

## 目录
1. [引言](#引言)  
2. [Commands模块概述](#commands模块概述)  
3. [通用请求结构](#通用请求结构)  
4. [命令类型与使用场景](#命令类型与使用场景)  
   - [START_SESSION（启动会话）](#start_session启动会话)  
   - [STOP_SESSION（停止会话）](#stop_session停止会话)  
   - [RESERVE_NOW（立即预约）](#reserve_now立即预约)  
   - [CANCEL_RESERVATION（取消预约）](#cancel_reservation取消预约)  
   - [UNLOCK_CONNECTOR（解锁连接器）](#unlock_connector解锁连接器)  
5. [身份验证机制](#身份验证机制)  
6. [异步执行与回调处理](#异步执行与回调处理)  
7. [最佳实践建议](#最佳实践建议)

## 引言

本文档旨在系统介绍OCPI协议中Commands（远程指令）模块的请求格式、上下文参数及典型使用场景。尽管`ocpi-validators.js`未提供显式的命令验证模式，但通过分析`sample-data.js`中的各类命令示例，可以归纳出统一的请求结构和业务逻辑。本文将重点说明每种命令所需的上下文参数及其业务含义，并通过具体JSON样例展示合法请求的构造方法，同时提醒开发者注意命令执行的异步特性及`response_url`的回调处理流程。

## Commands模块概述

Commands模块是OCPI协议中用于实现远程控制充电基础设施的核心功能。它允许CPO（充电点运营商）或eMSP（电子移动服务提供商）向对方系统发送特定指令，如启动/停止充电会话、预约充电位、取消预约或解锁连接器等。这些操作通常在用户通过应用程序发起请求后，由系统后台调用Commands API完成。

该模块的关键特点是**异步执行**：命令发送后，接收方系统不会立即返回最终结果，而是先确认接收，随后通过预设的`response_url`以回调方式通知命令执行结果。这种设计确保了系统的高可用性和容错能力。

**Section sources**
- [sample-data.js](file://src/sample-data.js#L668-L715)

## 通用请求结构

所有Commands请求均遵循一个统一的顶层结构，包含`response_url`和具体的命令参数。`response_url`是接收方系统在处理完命令后，用于回传执行结果的端点地址。

```json
{
  "response_url": "https://example.com/response",
  // 命令特定参数...
}
```

此结构确保了无论何种命令类型，接收方都能明确知道应将响应发送至何处，从而实现可靠的异步通信。

**Diagram sources**
- [sample-data.js](file://src/sample-data.js#L668-L681)

## 命令类型与使用场景

### START_SESSION（启动会话）

#### 功能描述
`START_SESSION`命令用于远程启动一次充电会话。当用户的认证令牌（Token）已通过白名单验证，且目标充电点（EVSE）处于可用状态时，可调用此命令开始充电。

#### 上下文参数
- **token**: 用户的身份凭证，包含`uid`、`type`（如RFID）、`auth_id`等信息。
- **location_id**: 充电站的唯一标识符。
- **evse_uid**: 具体充电点的唯一标识符。

#### JSON样例
```json
{
  "response_url": "https://example.com/response",
  "token": {
    "uid": "TOK123",
    "type": "RFID",
    "auth_id": "AUTH123",
    "issuer": "Sample Company",
    "valid": true,
    "whitelist": "ALLOWED"
  },
  "location_id": "LOC123",
  "evse_uid": "EVS123"
}
```

**Section sources**
- [sample-data.js](file://src/sample-data.js#L668-L681)

### STOP_SESSION（停止会话）

#### 功能描述
`STOP_SESSION`命令用于远程终止正在进行的充电会话。这通常发生在用户主动结束充电、达到预设电量或发生故障时。

#### 上下文参数
- **session_id**: 需要停止的会话的唯一标识符。

#### JSON样例
```json
{
  "response_url": "https://example.com/response",
  "session_id": "SES123"
}
```

**Section sources**
- [sample-data.js](file://src/sample-data.js#L683-L686)

### RESERVE_NOW（立即预约）

#### 功能描述
`RESERVE_NOW`命令用于为用户立即预约一个充电位。这对于确保用户到达时有可用充电点至关重要，尤其是在繁忙时段。

#### 上下文参数
- **token**: 预约用户的认证令牌。
- **expiry_date**: 预约的有效截止时间。
- **reservation_id**: 预约记录的唯一标识符。
- **location_id**: 充电站ID。
- **evse_uid**: 充电点ID。

#### JSON样例
```json
{
  "response_url": "https://example.com/response",
  "token": {
    "uid": "TOK123",
    "type": "RFID",
    "auth_id": "AUTH123"
  },
  "expiry_date": "2024-01-15T16:30:00Z",
  "reservation_id": "RES123",
  "location_id": "LOC123",
  "evse_uid": "EVS123"
}
```

**Section sources**
- [sample-data.js](file://src/sample-data.js#L688-L703)

### CANCEL_RESERVATION（取消预约）

#### 功能描述
`CANCEL_RESERVATION`命令用于取消先前创建的预约。当用户改变计划或未能按时到达时，应调用此命令释放资源。

#### 上下文参数
- **reservation_id**: 要取消的预约的唯一标识符。

#### JSON样例
```json
{
  "response_url": "https://example.com/response",
  "reservation_id": "RES123"
}
```

**Section sources**
- [sample-data.js](file://src/sample-data.js#L705-L708)

### UNLOCK_CONNECTOR（解锁连接器）

#### 功能描述
`UNLOCK_CONNECTOR`命令用于远程解锁充电连接器。这在用户完成充电后无法物理拔出连接器，或需要维护人员介入时非常有用。

#### 上下文参数
- **location_id**: 充电站ID。
- **evse_uid**: 充电点ID。
- **connector_id**: 具体连接器的ID。

#### JSON样例
```json
{
  "response_url": "https://example.com/response",
  "location_id": "LOC123",
  "evse_uid": "EVS123",
  "connector_id": "CON123"
}
```

**Section sources**
- [sample-data.js](file://src/sample-data.js#L710-L715)

## 身份验证机制

Commands模块依赖于强大的身份验证机制来确保操作的安全性。主要通过以下两种方式实现：

1. **Token-Based Authentication**: 大多数命令（如`START_SESSION`、`RESERVE_NOW`）要求提供完整的`token`对象。该对象不仅包含用户标识（`uid`），还包括发行方（`issuer`）、有效性（`valid`）和白名单状态（`whitelist`），确保只有授权用户才能执行关键操作。

2. **Identifier-Based Authorization**: 对于`STOP_SESSION`和`CANCEL_RESERVATION`等操作，系统仅需`session_id`或`reservation_id`即可执行。这表明系统内部已建立关联，无需重复验证用户身份，前提是调用方已被授权管理这些资源。

**Section sources**
- [sample-data.js](file://src/sample-data.js#L668-L715)

## 异步执行与回调处理

Commands模块的所有操作均为**异步执行**。这意味着当发送方调用API时，接收方系统首先进行基本的格式校验和权限检查，然后立即返回一个HTTP 200状态码表示“已接收”，而实际的命令处理将在后台进行。

处理完成后，接收方系统会向请求中指定的`response_url`发起一个POST请求，携带命令执行的结果（成功或失败）。开发者必须实现一个能够处理此类回调的服务器端点，并具备以下能力：
- 验证回调来源的合法性（防止伪造）。
- 解析并持久化执行结果。
- 在必要时向用户反馈最终状态。

忽略对`response_url`的处理将导致无法获知命令的真实执行结果，从而影响用户体验和系统可靠性。

**Section sources**
- [sample-data.js](file://src/sample-data.js#L668-L715)

## 最佳实践建议

1. **始终提供有效的`response_url`**：确保该URL可达且能安全处理回调数据。
2. **妥善处理错误情况**：即使命令被接收，也可能因设备故障、网络问题等原因执行失败。务必通过`response_url`的回调来确认最终状态。
3. **遵循幂等性原则**：对于可能重复发送的命令（如用户多次点击“启动充电”），系统设计应考虑幂等性，避免产生重复会话。
4. **保护敏感信息**：`token`等身份信息应在传输过程中加密，并在日志中脱敏处理。
5. **监控与日志**：建立完善的监控体系，记录所有命令的发送、接收和回调过程，便于故障排查和审计。

通过遵循以上指南，开发者可以高效、安全地集成和使用OCPI Commands模块，为用户提供流畅的远程充电控制体验。