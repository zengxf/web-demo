# 输入框测试
- 启动 `npm start`

## babel 备份
```
# .babelrc
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ]
  ]
}
# package.json
  "devDependencies": {
    "@babel/core": "^7.4.4",
    "@babel/plugin-proposal-class-properties": "^7.4.4",
    "@babel/preset-react": "^7.0.0"
  }
```