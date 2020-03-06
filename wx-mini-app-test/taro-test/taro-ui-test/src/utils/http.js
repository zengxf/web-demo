import Taro from '@tarojs/taro'

const show = require('./show.js')
const constant = require("./constant")

const host = 'http://localhost:8899'
const loginPage = '/pages/login/login'


/** GET 请求，参数将转化到 url 拼接 */
export function get(url, params, doSuccess, doFail) {
    url += jointUrl(params)
    request(url, "GET", null, doSuccess, doFail)
}

/** POST 请求 */
export function post(url, jsonData, doSuccess, doFail) {
    request(url, "POST", jsonData, doSuccess, doFail)
}

/** PUT 请求 */
export function put(url, jsonData, doSuccess, doFail) {
    request(url, "PUT", jsonData, doSuccess, doFail)
}

/** Promise 模式调用 */
export const get2 = (url, params) => {
    url += jointUrl(params)
    return request2(url, null, 'GET')
}
export const post2 = (url, data) => request2(url, data, 'POST');
export const put2 = (url, data) => request2(url, data, 'PUT');
export const del2 = (url, data) => request2(url, data, 'DELETE');
const request2 = (url, data, method) => {
    return new Promise((resolve, reject) =>
        request(url, method, data, (res) => resolve(res), (res) => reject(res))
    )
}

/** 请求的封装 */
function request(url, method, data, doSuccess, doFail) {
    var token = Taro.getStorageSync(constant.USER_TOKEN_KEY)
    var tokenObj = {}
    tokenObj[constant.AUTH_TOKEN_KEY] = token

    Taro.request({
        url: host + url,
        method: method,
        data,
        success: function (res) {
            if (res.statusCode == 200) {
                doSuccess(res.data);
            } else if (res.statusCode == 401) {
                console.info("error 401: ", res)
                show.warn('请先登录')
                Taro.redirectTo({ url: loginPage })
            } else {
                console.info("error others: ", res)
                show.warn('请求失败：' + res.data.message)
            }
        },
        fail: doFail || function (res) {
            console.info("error: ", res)
            show.warn('未知原因请求失败')
        },
        dataType: "json",
        header: {
            "content-type": "application/json;charset=UTF-8",
            ...tokenObj
        },
        timeout: 3000,
    })
}

// 问号后面拼接参数
function jointUrl(obj) {
    const paramArr = []
    let param = ''
    if (obj && typeof obj === 'object') {
        if (paramArr.length === 0) {
            paramArr.push('?')
        }
        for (const i in obj) {
            if (obj.hasOwnProperty(i) && obj[i]) {
                paramArr.push(i)
                paramArr.push('=')
                paramArr.push(obj[i])
                paramArr.push('&')
            }
        }
        param = paramArr.join('').replace(/&$/, '')
    }
    return param
}

// module.exports.post = post
// module.exports.get = get
// module.exports.request = request