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