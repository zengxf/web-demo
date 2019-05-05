import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import 'antd/dist/antd.css';
import {
  Form, Icon, Input, Button, Checkbox
} from 'antd';

const http = axios.create({
  baseURL: '/api/test',
  timeout: 1000,
  headers: {
    'X-Feng-Test': 'zxf'
  }
});

class NormalLoginForm extends React.Component {

  findOne = (e) => {
    e.preventDefault();
    http.get("/find-one/4")
      .then(res => {
        console.log(res.data);
        return res.data.date;
      })
      .then(date => {
        console.log("op-date: ", date);
      });
  }

  updateOne = (e) => {
    e.preventDefault();
    http.post("/update-one", {
        id: 5, name: "zxf", sign: "test"
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  putOne = (e) => {
    e.preventDefault();
    http.put("/put-one", {
        id: 5, name: "zxf", sign: "put"
      })
      .then(res => {
        console.log(res.data);
      });
  }

  patchOne = (e) => {
    e.preventDefault();
    http.patch("/patch-one", {
        id: 5, name: "zxf"
      })
      .then(res => {
        console.log(res.data);
      });
  }

  deleteOne = (e) => {
    e.preventDefault();
    http.delete("/delete-one/6").then(res => { console.log(res.data); });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-form">
        <Form.Item style={{padding: 20}}>
          <Button onClick={this.findOne} type="primary" icon="search"> Find-One </Button>
          <Button onClick={this.updateOne} type="primary"> Update(Post)-One </Button>
          <Button onClick={this.putOne} type="primary"> Put-One </Button>
          <Button onClick={this.patchOne} type="primary"> Patch-One </Button>
          <Button onClick={this.deleteOne} type="primary"> Delete-One </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));