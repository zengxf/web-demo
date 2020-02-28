import Notify from '@vant/weapp/notify/notify';
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';
const app = getApp();

Page({
  data: {
    isLoading: true, // 判断是否尚在加载中
    article: {}
  },
  onLoad: function() {
    let mdvalue = `
# Markdown 
- ddd
  - ssb
    - 334
1. abc
2. bcd
    - efg
- [百度](https://www.baidu.com)
- 公式1 $a = b - \\sqrt{c}$
- 公式2 
  - $$ a = b - \\sqrt{c} $$
- aa: \`bb\`

## code
\`
function test() {
  return "test";
}
\`
    `

    let result = app.towxml(mdvalue, 'markdown', {
      base: '', // 相对资源的base路径
      theme: 'light', // 主题: dark 和 light，默认 dark
    });
    console.info(result)

    // 更新解析数据
    this.setData({
      article: result,
      isLoading: false
    });
  },

  show() {
    Notify({
      type: 'danger',
      message: '通知内容'
    });
  },
  show2() {
    Dialog.alert({
      title: '标题',
      message: '弹窗内容'
    }).then(() => {
      console.info("关闭")
    });
  },
  show3() {
    // Toast('我是提示文案')
    Toast.fail('失败文案')
  }
})