import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';

ReactDOM.render(
  <Button type="primary">Button</Button>
, document.getElementById('mountNode'));

ReactDOM.render(<Input placeholder="Basic usage" allowClear />, document.getElementById('input'));