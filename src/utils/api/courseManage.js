
import request from './request'
function getFirstCategorys() {
    return request({
        url: '/api/course/category/getFirstCategorys',
    })
}

//获取二级分类
function getSecondCategorys(params) {
    return request({
        url: '/api/course/category/getSecondCategorys',
        params
    })
}




function tagsList(data) {
    return request({
        url: '/api/course/tags/list',
        method: 'post',
        data
    })
}


function searchCourse(data) {
    return request({
        url: '/api/course/search',
        method: 'post',
        data
    })
}



function getSliders() {
    return request({
        url: '/api/slider/getSliders'
    })
}




function newCourse(data) {
    return request({
        url: '/api/course/mostNew',
        method: 'post',
        data
    })
}


function setting() {
    return request({
        url: '/api/setting/get'
    })
}


function getCourseDetail(params) {
    return request({
        url: '/api/course/getDetail',
        params
    })
}

function courseCheckAuth(params) {
    return request({
        url: '/api/course/checkAuth',
        params
    })
}
// 下载课程资料
function downloadAttachment(params) {
    return request({
        url: '/api/course/downloadAttachment',
        params,
        responseType: 'blob'
    })
}
// 课程播放
function player(params) {
    return request({
        url: '/api/player/play',
        params,
    })
}
// 最后一次记录

function recordHistory(data) {
    return request({
        url: '/api/course/history/recordHistory',
        data,

    })
}

export {
    getFirstCategorys,
    tagsList,
    searchCourse,
    getSliders,
    newCourse,
    setting,
    getSecondCategorys,
    getCourseDetail,
    courseCheckAuth,
    downloadAttachment,
    player,
    recordHistory
}