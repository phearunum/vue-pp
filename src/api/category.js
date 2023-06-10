
import request from '@/utils/request'

export function selectList() {
    return request({
        url: 'category/select',
        method: 'GET',
    })
}
export function listCategory(query) {
    return request({
        url: 'category/list',
        method: 'GET',
        params: query
    })
}

export function findOne(id) {
    return request({
        url: 'category/list',
        method: 'GET',
        params:id
    })
}


export function createCategory(dataObj) {
    return request({
        url: 'category/create',
        method: 'POST',
        data:dataObj
    })
}

export function updateCategory(dataObj) {
    return request({
        url: 'category/update',
        method: 'POST',
        data:dataObj
    })
}

export function deleteCategory(id) {
    return request({
        url: 'category/delete',
        method: 'POST',
        data:id
    })
}