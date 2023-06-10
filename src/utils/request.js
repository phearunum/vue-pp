
import axios from 'axios'
import { getToken } from './auth'
import useUserStore from '../stores/modules/user'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf8'

const service = axios.create({
    baseURL: 'http://34.221.254.120:4000/api/',
    timeout:30000
})
service.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = 'Bearer '+ getToken()
        return config
    },
    (error) => {
        console.log(error)
        Promise.reject(error)
    }
)
service.interceptors.response.use(
    (res) => {
        if (res.status !== 200) {
            Promise.reject('network error')
            return
        }
        const { code, msg } = res.data
        if (code == 401) {
            useUserStore().logout().then(()=>{location.href='/'})
        } else {
            return res.data
        }
    },
    (error) => {
        useUserStore().logout().then(()=>{location.href='/login'})
        console.log(error)
    }
)
export default service