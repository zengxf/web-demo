import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './login.css';
import {
  Form, Icon, Input, Button, Checkbox
} from 'antd';

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入账号！' }],
          })(
            <Input prefix={<Icon type="user" />} placeholder="账号" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input.Password prefix={<Icon type="lock" />} allowClear placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <a className="login-form-forgot" href="#">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
          或 <a href="#">现在注册！</a>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default LoginForm;
