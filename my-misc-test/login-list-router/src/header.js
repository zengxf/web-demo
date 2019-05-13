
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Breadcrumb } from 'antd';

class Header extends React.Component {
    render() {
        return (
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/">List</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="/login">Login</a>
                </Breadcrumb.Item>
            </Breadcrumb>
        )
    };
}

ReactDOM.render(<Header />, document.getElementById("header"))