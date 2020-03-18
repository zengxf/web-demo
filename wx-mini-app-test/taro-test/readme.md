# Taro 测试

- 入门：https://nervjs.github.io/taro/docs/GETTING-STARTED.html
- H5 运行：`npm run dev:h5`
  - H5 与 TaroUI 有冲突
- 微信运行：`npm run dev:weapp`
  - **可以用微信测试**

## 初始化
- `taro init taro-ui-test` 先设置名称
- `taro init` 交互式设置名称
- **注**：其会初始化 `git`
  - 所以，根据需要删除 `.git` 文件夹

## page 配置
- 在 `src/app.jsx` 文件中的 `config.pages` 配置

## 使用 Taro-UI
- `npm install taro-ui`

## 微信公众平台后台
- https://mp.weixin.qq.com

## 排除编译
- 要引入 `path` 模块
  - `const path = require('path')`
- 用相当路径
  - `path.resolve(__dirname, '..', 'src/xx/xx.js')`

## ECharts 使用
- 在线构建 https://www.echartsjs.com/zh/builder.html
- 小程序中使用 https://github.com/eyelly-wu/taro-echarts/issues/5