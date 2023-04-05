import request from './request'
// 获取购物车商品
function getShopCarList() {
    return request({
        url: '/api/shopcar/getShopCarList'
    })
}
function deleteShopCar(params, token) {
    return request({
        url: '/api/shopcar/deleteShopCar',
        params,
        headers: {
            token
        }
    })
}

// 批量删除
function deleteShopCars(data) {
    return request({
        url: '/api/shopcar/deleteShopCars',
        method: 'post',
        data
    })
}


function addShopCar(data, token) {
    return request({
        url: '/api/shopcar/addShopCar',
        method: 'post',
        data,
        headers: {
            token
        }
    })
}



export {
    getShopCarList,
    deleteShopCar,
    addShopCar,
    deleteShopCars
}