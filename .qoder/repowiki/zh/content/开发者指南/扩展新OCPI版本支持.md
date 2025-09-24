# 扩展新OCPI版本支持

<cite>
**本文档中引用的文件**  
- [ocpi-validators.js](file://src/ocpi-validators.js)
- [App.js](file://src/App.js)
- [sample-data.js](file://src/sample-data.js)
</cite>

## 目录
1. [简介](#简介)
2. [添加新OCPI规范版本的完整操作指南](#添加新ocpi规范版本的完整操作指南)
3. [向后兼容性维护策略](#向后兼容性维护策略)
4. [代码修改前后对比示例](#代码修改前后对比示例)
5. [总结](#总结)

## 简介
本指南旨在为开发者提供在现有系统中添加对新OCPI规范版本（如未来发布的2.4.0）支持的详细步骤。通过分析当前项目结构和实现机制，文档将逐步说明如何扩展验证器、更新核心逻辑、调整用户界面选项以及集成示例数据。重点强调向后兼容性的维护方法，包括弃用警告与版本降级提示机制，确保系统的稳定性和可维护性。

## 添加新OCPI规范版本的完整操作指南

### 1) 在ocpi-validators.js中定义新的Schema集合
要支持新的OCPI版本（例如2.4.0），首先需要在`ocpi-validators.js`文件中定义该版本对应的JSON Schema校验规则。这些Schema应基于Zod库构建，并遵循OCPI 2.4.0规范中的字段定义。

- 创建新的Location、Session等模块的Schema对象，命名格式为`LocationSchema_240`、`SessionSchema_240`。
- 参考已有Schema（如`LocationSchema_230`）的设计模式，确保包含所有必需字段及其约束条件。
- 若新版本引入了新增字段或变更类型，则需在Schema中体现这些变化。

```javascript
// 示例：定义 OCPI 2.4.0 的 Location Schema
export const LocationSchema_240 = z.object({
    country_code: z.string().length(2),
    party_id: z.string().max(3),
    id: z.string().max(36),
    // 新增字段示例
    accessibility_features: z.array(z.enum(['WHEELCHAIR_ACCESS', 'VISUAL_GUIDANCE'])).optional(),
    ...
});
```

**Section sources**
- [ocpi-validators.js](file://src/ocpi-validators.js#L421-L553)

### 2) 更新validateOCPIJson函数以识别新版本号
`validateOCPIJson`函数负责根据传入的版本号选择合适的Schema进行验证。为了支持新版本，必须修改此函数以识别“2.4.0”作为有效版本。

- 在`validateOCPIJson`函数中增加对`version === '2.4.0'`的判断分支。
- 将新版本映射到对应的Schema集合（如`ModuleValidators_240`）。
- 确保默认行为仍使用最新稳定版作为 fallback。

```javascript
if (version === '2.4.0') {
    validator = ModuleValidators_240[module];
} else if (version === '2.3.0') {
    ...
}
```

同时，需注册一个新的模块验证器映射表`ModuleValidators_240`，将各模块名称关联至其对应的新Schema。

```javascript
export const ModuleValidators_240 = {
    locations: LocationSchema_240,
    sessions: SessionSchema_240,
    cdrs: CDRSchema_240,
    tariffs: TariffSchema_240,
    tokens: TokenSchema_240,
    'commands/START_SESSION': StartSessionCommandSchema_240,
    ...
};
```

**Section sources**
- [ocpi-validators.js](file://src/ocpi-validators.js#L968-L1005)

### 3) 修改App.js中的Select组件选项列表
前端UI中的版本选择下拉菜单需要包含新版本选项，以便用户能够选择并测试针对2.4.0的数据。

- 打开`App.js`文件，定位到`Select`组件渲染版本选项的部分。
- 向`MenuItem`列表中添加一个新项：
```jsx
<MenuItem value="2.4.0">OCPI 2.4.0</MenuItem>
```
- 确保该选项出现在适当位置（通常按版本顺序排列）。

此外，还需检查是否有关联逻辑依赖于版本字符串，例如禁用某些不支持的模块（如2.1.1-d2中不可用的Commands），并在必要时扩展这些逻辑以适配2.4.0的行为。

**Section sources**
- [App.js](file://src/App.js#L137-L142)

### 4) 实现getVersionSpecificSampleData函数对新版本的支持
`getVersionSpecificSampleData`函数用于根据当前选择的模块和版本返回相应的示例数据。为支持2.4.0，需在此函数中加入对该版本的处理逻辑。

- 在函数内部添加对`version === '2.4.0'`的判断。
- 对于每个核心模块（locations, sessions等），返回`sampleData_240`中对应的数据。
- 若某模块在2.4.0中无特殊变更，可复用2.3.0或其他版本的数据。

```javascript
const isVersion240 = version === '2.4.0';

if (module === 'locations') {
    return isVersion240 ? sampleData_240.location : /* 其他版本 */;
}
```

**Section sources**
- [App.js](file://src/App.js#L43-L95)

### 5) 添加对应示例数据映射
最后一步是创建适用于2.4.0版本的示例数据集，供开发者测试使用。

- 在`sample-data.js`中导出一个新的常量`sampleData_240`。
- 包含符合2.4.0规范的典型实例数据，覆盖Locations、Sessions、CDRs等主要模块。
- 数据应体现新特性（如新增字段、枚举值变化等），并保持结构完整性。

```javascript
export const sampleData_240 = {
  location: {
    "country_code": "CN",
    "party_id": "DEF",
    "id": "LOC789",
    "accessibility_features": ["WHEELCHAIR_ACCESS"],
    ...
  },
  session: { ... }
};
```

确保在文件末尾正确导出这些数据，以便在应用中加载。

**Section sources**
- [sample-data.js](file://src/sample-data.js#L382-L588)

## 向后兼容性维护策略

### 弃用警告机制
当用户尝试使用即将被移除的功能或旧版本API时，系统应主动发出警告：

- 在`validateOCPIJson`中检测已弃用的字段或结构，添加非阻断式提示信息。
- 使用控制台日志输出建议升级的信息，例如：
```javascript
console.warn(`[DEPRECATION] 字段 'old_field' 已在 OCPI 2.4.0 中弃用，请改用 'new_field'`);
```

### 版本降级提示
若用户选择了高于当前支持范围的版本（如误选尚未实现的2.5.0），应在UI层面给出明确反馈：

- 在`App.js`中增强版本选择逻辑，捕获无效版本输入。
- 显示Toast通知或内联提示：“所选版本暂未支持，已自动切换至最新可用版本。”

### 默认版本回退机制
始终设置合理的默认版本（如当前最新稳定版），避免因配置缺失导致运行异常。

```javascript
export const validateOCPIJson = (module, jsonData, version = '2.3.0') => { ... };
```

## 代码修改前后对比示例

### ocpi-validators.js 修改前 vs 修改后

| 功能 | 修改前 | 修改后 |
|------|--------|--------|
| 支持版本判断 | 仅支持 `2.1.1-d2`, `2.2.1-d2`, `2.3.0` | 新增 `else if (version === '2.4.0')` 分支 |
| 模块验证器映射 | 仅有 `ModuleValidators_211`, `_221`, `_230` | 新增 `ModuleValidators_240` 映射表 |
| Schema 定义 | 无 `LocationSchema_240` | 新增完整 `LocationSchema_240` 定义 |

### App.js 修改前 vs 修改后

| 功能 | 修改前 | 修改后 |
|------|--------|--------|
| 版本选择菜单 | `<MenuItem value="2.3.0">OCPI 2.3.0</MenuItem>` | 增加 `<MenuItem value="2.4.0">OCPI 2.4.0</MenuItem>` |
| 示例数据获取 | 仅处理至 `2.3.0` | 在 `getVersionSpecificSampleData` 中加入 `isVersion240` 判断 |

### sample-data.js 修改前 vs 修改后

| 功能 | 修改前 | 修改后 |
|------|--------|--------|
| 示例数据集 | 最高版本为 `sampleData_230` | 新增 `sampleData_240` 并填充合规数据 |

## 总结
通过上述五个关键步骤——定义新Schema、更新验证逻辑、扩展UI选项、实现版本感知的数据加载及补充示例数据——可以系统化地为本项目添加对任意新OCPI版本（如2.4.0）的支持。整个过程注重代码可维护性与用户体验一致性，结合向后兼容策略，确保平滑过渡与长期稳定性。开发者应严格遵循此流程，以保证功能扩展的质量与效率。