import request from './request'
// 创建token
function creatToken(){
    return request({
        url:'/api/token/createToken'
    })
}


export {
    creatToken
}