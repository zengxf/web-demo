import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { Table, Divider, Tag } from 'antd';

// 数据
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', '宅', 'teacher'],
}];

// 展示设置
const columns = [{
  title: '名称',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '地址',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '标签',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      {tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
  ),
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">邀请 {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">删除</a>
    </span>
  ),
}];

ReactDOM.render(<Table columns={columns} dataSource={data} />, document.getElementById("root"));