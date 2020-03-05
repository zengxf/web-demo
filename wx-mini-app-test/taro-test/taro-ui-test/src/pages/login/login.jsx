import Taro, { Component } from '@tarojs/taro'
import { AtButton, AtForm, AtInput, AtSwitch } from 'taro-ui'

const http = require('../../utils/http.js')
const show = require('../../utils/show.js')
const constant = require('../../utils/constant.js')

const indexPage = '/pages/index/index'

export default class Login extends Component {
    config = {
        navigationBarTitleText: '极简笔记-登录'
    }

    constructor() {
        super(...arguments)
        this.state = {}
    }

    handleChangeAccount = (value) => this.handleChange("account", value)
    handleChangePassword = (value) => this.handleChange("password", value)
    handleChangeRemember = (value) => this.handleChange("remember", value)
    handleChange = (key, value) => {
        var formObj = this.state.formObj || {}
        formObj[key] = value
        this.setState({ formObj: formObj })
        return value
    }

    onSubmit = () => {
        http.post('/api/security/login', this.state.formObj, res => {
            if (res.login == "ok") {
                console.info("登录成功", res)
                Taro.setStorageSync(constant.USER_TOKEN_KEY, res.token)
                Taro.redirectTo({
                    url: indexPage
                })
            } else {
                show.warn("用户名或密码不对")
            }
        })
    }

    render() {
        return (
            <AtForm onSubmit={this.onSubmit}>
                <AtInput
                    name='account'
                    title='账号'
                    type='text'
                    placeholder='请输入账号'
                    onChange={this.handleChangeAccount}
                />
                <AtInput
                    name='password'
                    title='密码'
                    type='password'
                    placeholder='请输入密码'
                    onChange={this.handleChangePassword}
                />
                <AtSwitch
                    title='记住我'
                    checked={true}
                    onChange={this.handleChangeRemember}
                />
                <AtButton formType='submit' type='primary'>登录</AtButton>
            </AtForm>
        )
    }
}