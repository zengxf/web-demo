
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Input } from 'antd';

const onChange = (e) => {
  console.log(e);
};

ReactDOM.render(
  <Input placeholder="input with clear icon" allowClear onChange={onChange} />
, document.getElementById('container'));
          