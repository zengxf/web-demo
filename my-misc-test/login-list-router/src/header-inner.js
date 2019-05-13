
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Breadcrumb } from 'antd';

class InnerHeader extends React.Component {
    render() {
        return (
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/list">List</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/login">Login</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
        )
    };
}

export default InnerHeader