import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Category from '../views/Category.vue'
import Transaction from '../views/Transaction.vue'
import Report from '../views/Report.vue'
import Page from '../views/Landing.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component:Home
        },
        {
            path: '/category',
            name: 'category',
            component:Category
        },
        {
            path: '/transaction',
            name: 'transaction',
            component:Transaction
        },
        {
            path: '/report',
            name: 'report',
            component:Report
        },
        {
            path: '/page',
            name: 'page',
            component: Page,
            meta:{hideNavigation:true}
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta:{hideNavigation:true}
        }
    ]
})

export default router