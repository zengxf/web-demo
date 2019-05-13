import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Table, Divider, Tag } from 'antd';
import reqwest from 'reqwest';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%',
}, {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
    ],
    width: '20%',
}, {
    title: 'Email',
    dataIndex: 'email',
}, {
    title: "cell-phone",
    dataIndex: 'cell-phone'
}, {
    title: "操作",
    key: 'action',
    render: (text, record) => (
        <span>
            <Link to={{ pathname: '/list/' + record.login.uuid, query: { name: record.name.first } }}>详情-{record.name.first}</Link>
        </span>
    )
}];

class List extends React.Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
    };

    componentDidMount() {
        this.fetch();
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }

    fetch = (params = {}) => {
        this.setState({ loading: true });
        reqwest({
            url: 'https://randomuser.me/api',
            method: 'get',
            data: {
                results: 3,
                ...params,
            },
            type: 'json',
        }).then((data) => {
            const pagination = { ...this.state.pagination };
            pagination.total = 200;

            data.results.forEach(ele => {
                ele["cell-phone"] = ele.cell + " / / / " + ele.phone;
            });

            this.setState({
                loading: false,
                data: data.results,
                pagination,
            });
        });
    }

    render() {
        return (
            <Table
                columns={columns}
                rowKey={record => record.login.uuid}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
            />
        );
    }
}

export default List;