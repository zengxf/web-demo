
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Input } from 'antd';

const { TextArea } = Input;

ReactDOM.render(<TextArea rows={4} />, document.getElementById('container'));
