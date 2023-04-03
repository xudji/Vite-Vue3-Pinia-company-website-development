import request from './request'
// 获取购物车商品
function getShopCarList() {
    return request({
        url: '/api/shopcar/getShopCarList'
    })
}
export {
    getShopCarList
}