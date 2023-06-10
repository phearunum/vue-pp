
import request from '@/utils/request';

export function login(username, password) {
    const data = {
        username,
        password
    }
    return request({
        url: 'auth/login',
        method: 'POST',
        data:data
    })
}
export function listUser() {
    return request({
        url: 'users/lists',
        method: 'GET',
    })
}