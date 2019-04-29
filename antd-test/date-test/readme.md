# Antd 日期组件测试
- 需要 `babel`
- 启动 `npm start`

## 代码说明
### 设置中文提示
- `import zhCN from 'antd/lib/locale-provider/zh_CN';` 
- `<LocaleProvider locale={zhCN}>`
- 这样日期组件会显示中文

### 导入 css
- 额外说明
- 要用相对路径 `import "./index.css";`
- 不能直接写成 `index.css`