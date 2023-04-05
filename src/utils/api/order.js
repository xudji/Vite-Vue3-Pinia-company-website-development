import request from './request'
// 去结算
function settlement(data) {
    return request({
        url: '/api/order/settlement',
        method: 'post',
        data
    })
}

// 支付宝
function alipayOrder(data) {
    return request({
        url: '/api/pay/alipay/createOrder',
        method: 'post',
        data
    })
}

// 查询支付宝，订单状态
function queryAlipay(params) {
    return request({
        url: '/api/pay/alipay/queryOrder',
        params
    })
}

// 微信
function wxpayOrder(params) {
    return request({
        url: '/api/pay/wxpay/createOrder',
        params
    })
}

// 查询支付宝，订单状态
function queryWxpay(params) {
    return request({
        url: '/api/pay/wxpay/queryOrder',
        params
    })
}

// 



export {
    settlement,
    alipayOrder,
    queryAlipay,
    wxpayOrder,
    queryWxpay
}