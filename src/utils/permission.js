import router from "../router/index";
import { getToken } from "./auth";
router.beforeEach((to, from, next) => {
    const token = getToken()
    if (token !== null && to.path === '/login') {
        return next({name:'home'})
    }
    if (token == null && to.path === '/') {
        return next({name:'login'})
    }
    return next()
})