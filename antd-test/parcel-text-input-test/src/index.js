import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import './index.css'

const { TextArea, Password } = Input;

ReactDOM.render(<Input placeholder="Basic usage" allowClear />, document.getElementById('test-basic'));
ReactDOM.render(
  <div className="example-input">
    <Input size="large" placeholder="large size" />
    <Input placeholder="default size" />
    <Input size="small" placeholder="small size" />
  </div>,
  document.getElementById('test-input')
);
ReactDOM.render(<Password placeholder="input password" />, document.getElementById('test-pwd'));
ReactDOM.render(<TextArea rows={4} />, document.getElementById('test-area'));
