import request from './request'


//用户名密码登录
function loginByJson(data) {
    return request({
        url: '/api/u/loginByJson',
        method: 'post',
        data
    })
}
function sendCaptcha(params) {
    return request({
        url: '/api/sms/sendRegisterOrLoginCaptcha',
        params
    })
}
function loginByMobile(data) {
    return request({
        url: '/api/u/loginByMobile',
        method: 'post',
        data
    })
}

function getInfo(params) {
    return request({
        url: '/api/member/getInfo',
        params
    })
}

export {
    loginByJson,
    sendCaptcha,
    loginByMobile,
    getInfo
}