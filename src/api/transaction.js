import request from '@/utils/request'

export function getTransactionReport(dataObj) {
    return request({
        url: 'transaction/report',
        method: 'POST',
        data:dataObj
    })
}

export function createTransaction(dataObj) {
    return request({
        url: 'transaction/create',
        method: 'POST',
        data:dataObj
    })
}

export function listTransaction(query) {
    return request({
        url: 'transaction/list',
        method: 'GET',
        params: query
    })
}

export function getTransaction(dateObj) {
    return request({
        url: 'transaction/summary',
        method: 'POST',
        data:dateObj
    })
}