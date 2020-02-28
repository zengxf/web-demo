## 使用 npm
- 参考：https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html
1. 在根目录下，初始化 `npm init`
2. 安装测试包 `npm install --save miniprogram-sm-crypto`
3. 在对应的 js 中直接使用，不需要配置 *.json 中的 `usingComponents`
```
const sm2 = require('miniprogram-sm-crypto').sm2;
let keypair = sm2.generateKeyPairHex();
let publicKey = keypair.publicKey; // 公钥
console.info(publicKey)
```

### *.json 中的 `usingComponents`
- 是标签化组件
- 使用如：`<xx> xx </xx>`

### UI 库的安装
- `npm i @vant/weapp -S --production`
- 然后再点击 **工具 -> 构建 npm**
- 有赞 UI：https://youzan.github.io/vant-weapp/#/intro

### Markdown 预览
- 安装 `npm i towxml -S --production`