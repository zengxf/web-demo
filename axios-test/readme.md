# 用 axios 实现远程登录
- 需要 `babel`
- 启动 `npm start`

## 后端对应的项目
- 是 `spring-demo/spring-web/webflux-demo`

## 代理问题
- `parcel` 没有 proxy 功能
  - 需要 `express` 和 `http-proxy-middleware` 配合实现
- `parcel` API 代码写在 `root.js` 里面
  - 启动命令配置：`node root`
- `package.json` 里面的 `proxy` 配置无效