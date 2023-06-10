
import { defineStore } from "pinia";
import { login ,listUser} from "@/api/login";
import { setToken,removeToken} from "@/utils/auth";


const useUserStore = defineStore('user', {
    state:()=> ({
        userInfo: '',
        token: null,
        name: ''
    }),
    actions: {
        login(userInfo) {
            const username = userInfo.username.trim()
            const password = userInfo.password
            return new Promise((resolve, reject) => {
                login(username, password)
                    .then((resp) => {
                        if (resp.code == 200) {
                            setToken(resp.token)
                            resolve()
                        } else {
                            reject(resp)
                        }
                    })
                    .catch((err) => {
                     console.log(err)
                })

            })
        },
        userInfo() {
            return new Promise((resolve, reject) => {
                listUser()
                    .then((res) => {
                    resolve(res)
                    })
                    .catch((error) => {
                        reject('Faild get user info')
                })
            })
        },
        logout() {
            return new Promise((resolve, reject) => {
                this.token = ''
                removeToken()
                    resolve()
           
            })
        }
    }

})

export default useUserStore
