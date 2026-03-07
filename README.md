# OCPI JSON Validation Tool / OCPI JSON 验证工具

[English](#english) | [中文](#中文)

---

## English

### Introduction

A web-based JSON validation tool for the [OCPI (Open Charge Point Interface)](https://github.com/ocpi/ocpi) protocol. It helps EV charging developers and operators quickly validate whether their JSON data conforms to OCPI specifications.

### Features

- **Multi-version support**: OCPI 2.1.1-d2, OCPI 2.2.1-d2, OCPI 2.3.0
- **Comprehensive module coverage**:
  - Core modules: Locations, Sessions, CDRs, Tariffs, Tokens
  - Command modules (2.2.1+): START_SESSION, STOP_SESSION, RESERVE_NOW, CANCEL_RESERVATION, UNLOCK_CONNECTOR
  - Bookings module (2.3.0 only)
- **Built-in sample data**: Version-specific sample data for every module
- **Bilingual UI**: Seamless Chinese/English language switching
- **Schema validation**: Powered by [Zod](https://github.com/colinhacks/zod) for type-safe, precise validation
- **Docker deployment**: Ready for production with Docker + Nginx

### Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend Framework | [React](https://github.com/facebook/react) 19 |
| UI Components | [MUI (Material UI)](https://github.com/mui/material-ui) 7 |
| Schema Validation | [Zod](https://github.com/colinhacks/zod) 4 |
| Internationalization | [i18next](https://github.com/i18next/i18next) / [react-i18next](https://github.com/i18next/react-i18next) |
| Language Detection | [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) |
| Build Tool | [Create React App](https://github.com/facebook/create-react-app) |
| Testing | [Testing Library](https://github.com/testing-library/react-testing-library) / [jest-dom](https://github.com/testing-library/jest-dom) |

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Usage

1. **Select OCPI version** from the dropdown (2.1.1-d2 / 2.2.1-d2 / 2.3.0)
2. **Select module** (Locations, Sessions, CDRs, etc.)
3. **Enter or paste JSON data** into the input area, or click "Load Sample Data" to use built-in examples
4. Click **"Validate"** to check the data against the OCPI schema
5. View validation results with detailed error messages if any

### Docker Deployment

```bash
# Build the image
docker build -t ocpi-validator .

# Run the container
docker run -d --name ocpi-validator -p 3002:3002 ocpi-validator
```

Or use Docker Compose:

```bash
docker-compose up -d
```

### Project Structure

```
test-ocpi/
├── src/
│   ├── App.js                 # Main application component
│   ├── ocpi-validators.js     # OCPI schema definitions & validation logic
│   ├── sample-data.js         # Built-in sample data for all modules/versions
│   ├── i18n.js                # i18next configuration
│   ├── components/
│   │   ├── LanguageToggle.js  # Language switch component
│   │   └── LanguageProvider.js
│   └── locales/
│       ├── en.json            # English translations
│       └── zh.json            # Chinese translations
├── public/
│   └── nginx.conf             # Nginx configuration for production
├── Dockerfile                 # Multi-stage Docker build
└── docker-compose.yml         # Docker Compose orchestration
```

---

## 中文

### 简介

一个基于 Web 的 [OCPI（开放充电点接口）](https://github.com/ocpi/ocpi) 协议 JSON 验证工具。帮助电动汽车充电开发者和运营商快速验证其 JSON 数据是否符合 OCPI 规范。

### 功能特性

- **多版本支持**：OCPI 2.1.1-d2、OCPI 2.2.1-d2、OCPI 2.3.0
- **全面的模块覆盖**：
  - 核心模块：Locations、Sessions、CDRs、Tariffs、Tokens
  - 命令模块（2.2.1+）：START_SESSION、STOP_SESSION、RESERVE_NOW、CANCEL_RESERVATION、UNLOCK_CONNECTOR
  - Bookings 模块（仅 2.3.0）
- **内置示例数据**：为每个模块提供版本特定的示例数据
- **双语界面**：中英文无缝切换
- **Schema 验证**：基于 [Zod](https://github.com/colinhacks/zod) 实现类型安全的精确验证
- **Docker 部署**：支持 Docker + Nginx 生产环境部署

### 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | [React](https://github.com/facebook/react) 19 |
| UI 组件库 | [MUI (Material UI)](https://github.com/mui/material-ui) 7 |
| Schema 验证 | [Zod](https://github.com/colinhacks/zod) 4 |
| 国际化 | [i18next](https://github.com/i18next/i18next) / [react-i18next](https://github.com/i18next/react-i18next) |
| 语言检测 | [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) |
| 构建工具 | [Create React App](https://github.com/facebook/create-react-app) |
| 测试工具 | [Testing Library](https://github.com/testing-library/react-testing-library) / [jest-dom](https://github.com/testing-library/jest-dom) |

### 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

### 使用方法

1. 从下拉菜单中**选择 OCPI 版本**（2.1.1-d2 / 2.2.1-d2 / 2.3.0）
2. **选择模块**（Locations、Sessions、CDRs 等）
3. 在输入区域**输入或粘贴 JSON 数据**，或点击"加载示例数据"使用内置示例
4. 点击 **"验证"** 按钮，根据 OCPI Schema 检查数据
5. 查看验证结果，如有错误会显示详细的错误信息

### Docker 部署

```bash
# 构建镜像
docker build -t ocpi-validator .

# 运行容器
docker run -d --name ocpi-validator -p 3002:3002 ocpi-validator
```

或使用 Docker Compose：

```bash
docker-compose up -d
```

### 项目结构

```
test-ocpi/
├── src/
│   ├── App.js                 # 主应用组件
│   ├── ocpi-validators.js     # OCPI Schema 定义与验证逻辑
│   ├── sample-data.js         # 所有模块/版本的内置示例数据
│   ├── i18n.js                # i18next 国际化配置
│   ├── components/
│   │   ├── LanguageToggle.js  # 语言切换组件
│   │   └── LanguageProvider.js
│   └── locales/
│       ├── en.json            # 英文翻译
│       └── zh.json            # 中文翻译
├── public/
│   └── nginx.conf             # 生产环境 Nginx 配置
├── Dockerfile                 # 多阶段 Docker 构建
└── docker-compose.yml         # Docker Compose 编排
```

---

## Acknowledgements / 致谢

This project is built upon or references the following open-source projects:

本项目基于或引用了以下开源项目：

| Project / 项目 | Description / 说明 |
|----------------|-------------------|
| [ocpi/ocpi](https://github.com/ocpi/ocpi) | OCPI official specification / OCPI 官方规范 |
| [facebook/react](https://github.com/facebook/react) | Frontend UI library / 前端 UI 库 |
| [facebook/create-react-app](https://github.com/facebook/create-react-app) | React project scaffolding / React 项目脚手架 |
| [mui/material-ui](https://github.com/mui/material-ui) | Material Design UI components / Material Design UI 组件库 |
| [colinhacks/zod](https://github.com/colinhacks/zod) | TypeScript-first schema validation / TypeScript 优先的 Schema 验证库 |
| [i18next/i18next](https://github.com/i18next/i18next) | Internationalization framework / 国际化框架 |
| [i18next/react-i18next](https://github.com/i18next/react-i18next) | React bindings for i18next / i18next 的 React 绑定 |
| [i18next/i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector) | Browser language detection / 浏览器语言检测 |
| [testing-library/react-testing-library](https://github.com/testing-library/react-testing-library) | React component testing utilities / React 组件测试工具 |
| [testing-library/jest-dom](https://github.com/testing-library/jest-dom) | Custom Jest matchers for DOM testing / DOM 测试的自定义 Jest 匹配器 |
| [EV Roaming Foundation](https://evroaming.org/) | OCPI protocol maintainer / OCPI 协议维护组织 |

## License / 许可证

This project is private. / 本项目为私有项目。
