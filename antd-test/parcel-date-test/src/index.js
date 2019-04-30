import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider, DatePicker, message, Alert } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import "antd/dist/antd.css";
import "./index.css";

moment.locale('zh-cn');

class App extends React.Component {
  state = {
    date: null,
  };

  handleChange = (date) => {
  	console.info(date)
    message.info(`您选择的日期是: ${date.format('YYYY-MM-DD')}`);
    this.setState({ date });
  }
  render() {
    const { date } = this.state;
    return (
      <LocaleProvider locale={zhCN}>
        <div style={{ width: 400, margin: '100px auto' }}>
          <DatePicker onChange={this.handleChange} />
          <div style={{ marginTop: 20 }}>
            <Alert message={`当前日期：${date ? date.format('YYYY-MM-DD') : '未选择'}`} type="success" />
          </div>
          <div className="App">test css</div>
        </div>
      </LocaleProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));